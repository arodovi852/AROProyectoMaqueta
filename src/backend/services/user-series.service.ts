import { UserSeries } from '../models/user-series.model';
import { UserSeriesRepository } from '../repositories/user-series.repository';
import { SeriesRepository } from '../repositories/series.repository';
import { WatchlistRepository } from '../repositories/watchlist.repository';
import { MarkAsWatchedDto, RateSeriesDto, UserSeriesResponseDto, FilterUserSeriesDto } from '../dtos/user-series.dto';
import { PageResponseDto } from '../dtos/common.dto';

/**
 * Servicio de UserSeries - Gestiona series vistas y valoradas
 * Lógica de negocio crítica: no permitir valorar sin haber visto
 */
export class UserSeriesService {
  constructor(
    private userSeriesRepository: UserSeriesRepository,
    private seriesRepository: SeriesRepository,
    private watchlistRepository: WatchlistRepository
  ) {}

  /**
   * Marca una serie como vista
   * Opcionalmente puede incluir valoración inicial
   * Regla: al marcar como vista, opcionalmente se elimina de watchlist
   */
  async markAsWatched(userId: string, dto: MarkAsWatchedDto): Promise<UserSeriesResponseDto> {
    // Verificar que la serie existe
    const series = await this.seriesRepository.findById(dto.seriesId);
    if (!series) {
      throw new Error('Serie no encontrada');
    }

    // Verificar si ya existe un registro
    let userSeries = await this.userSeriesRepository.findByUserAndSeries(userId, dto.seriesId);

    if (userSeries) {
      // Ya existe, actualizar
      userSeries.markAsWatched();
      
      if (dto.rating !== undefined) {
        // Validar rating
        if (dto.rating < 0 || dto.rating > 10) {
          throw new Error('El rating debe estar entre 0 y 10');
        }
        userSeries.rating = dto.rating;
      }

      const updated = await this.userSeriesRepository.update(userSeries.id, userSeries);
      if (!updated) {
        throw new Error('Error al actualizar el registro');
      }
      userSeries = updated;
    } else {
      // Crear nuevo registro
      userSeries = new UserSeries({
        userId,
        seriesId: dto.seriesId,
        isWatched: true,
        watchedAt: new Date(),
        rating: dto.rating,
      });

      if (dto.rating !== undefined) {
        if (dto.rating < 0 || dto.rating > 10) {
          throw new Error('El rating debe estar entre 0 y 10');
        }
      }

      userSeries = await this.userSeriesRepository.create(userSeries);
    }

    // Eliminar de watchlist si estaba ahí
    await this.watchlistRepository.removeByUserAndSeries(userId, dto.seriesId);

    // Actualizar rating promedio de la serie si se proporcionó rating
    if (dto.rating !== undefined) {
      await this.userSeriesRepository.updateSeriesRating(dto.seriesId);
    }

    return this.mapToResponseDto(userSeries, series);
  }

  /**
   * Valora o actualiza la valoración de una serie
   * REGLA DE NEGOCIO CRÍTICA: Solo se puede valorar si está marcada como vista
   */
  async rateSeries(userId: string, dto: RateSeriesDto): Promise<UserSeriesResponseDto> {
    // Validar rating
    if (dto.rating < 0 || dto.rating > 10) {
      throw new Error('El rating debe estar entre 0 y 10');
    }

    // Verificar que la serie existe
    const series = await this.seriesRepository.findById(dto.seriesId);
    if (!series) {
      throw new Error('Serie no encontrada');
    }

    // Buscar o crear registro de UserSeries
    let userSeries = await this.userSeriesRepository.findByUserAndSeries(userId, dto.seriesId);

    if (!userSeries) {
      // No existe registro, crear uno nuevo marcándola automáticamente como vista
      userSeries = new UserSeries({
        userId,
        seriesId: dto.seriesId,
        isWatched: true,
        watchedAt: new Date(),
        rating: dto.rating,
      });

      userSeries = await this.userSeriesRepository.create(userSeries);
      
      // Eliminar de watchlist si estaba ahí
      await this.watchlistRepository.removeByUserAndSeries(userId, dto.seriesId);
    } else {
      // Ya existe registro
      if (!userSeries.isWatched) {
        throw new Error('No puedes valorar una serie que no has marcado como vista');
      }

      // Actualizar rating
      userSeries.updateRating(dto.rating);
      const updated = await this.userSeriesRepository.update(userSeries.id, userSeries);
      if (!updated) {
        throw new Error('Error al actualizar la valoración');
      }
      userSeries = updated;
    }

    // Actualizar rating promedio de la serie
    await this.userSeriesRepository.updateSeriesRating(dto.seriesId);

    return this.mapToResponseDto(userSeries, series);
  }

  /**
   * Elimina la valoración de una serie (pero mantiene como vista)
   */
  async removeRating(userId: string, seriesId: string): Promise<UserSeriesResponseDto> {
    const userSeries = await this.userSeriesRepository.findByUserAndSeries(userId, seriesId);
    
    if (!userSeries) {
      throw new Error('No has visto esta serie');
    }

    if (!userSeries.rating) {
      throw new Error('Esta serie no tiene valoración');
    }

    // Eliminar rating pero mantener como vista
    const updated = await this.userSeriesRepository.update(userSeries.id, {
      rating: undefined,
    });

    if (!updated) {
      throw new Error('Error al eliminar la valoración');
    }

    // Actualizar rating promedio de la serie
    await this.userSeriesRepository.updateSeriesRating(seriesId);

    const series = await this.seriesRepository.findById(seriesId);
    return this.mapToResponseDto(updated, series!);
  }

  /**
   * Desmarca una serie como vista (elimina el registro completo)
   */
  async unmarkAsWatched(userId: string, seriesId: string): Promise<boolean> {
    const userSeries = await this.userSeriesRepository.findByUserAndSeries(userId, seriesId);
    
    if (!userSeries) {
      throw new Error('Esta serie no está marcada como vista');
    }

    const deleted = await this.userSeriesRepository.delete(userSeries.id);

    // Si tenía rating, actualizar el promedio de la serie
    if (userSeries.rating) {
      await this.userSeriesRepository.updateSeriesRating(seriesId);
    }

    return deleted;
  }

  /**
   * Obtiene las series vistas de un usuario
   */
  async getWatchedSeries(userId: string, filter: FilterUserSeriesDto): Promise<PageResponseDto<UserSeriesResponseDto>> {
    const page = filter.page || 1;
    const limit = filter.limit || 20;

    return await this.userSeriesRepository.findWatchedByUser(userId, page, limit);
  }

  /**
   * Obtiene las series valoradas de un usuario
   */
  async getRatedSeries(userId: string, filter: FilterUserSeriesDto): Promise<PageResponseDto<UserSeriesResponseDto>> {
    const page = filter.page || 1;
    const limit = filter.limit || 20;

    return await this.userSeriesRepository.findRatedByUser(userId, page, limit);
  }

  /**
   * Obtiene series recientemente vistas por el usuario
   */
  async getRecentlyWatched(userId: string, limit: number = 10): Promise<UserSeriesResponseDto[]> {
    return await this.userSeriesRepository.findRecentlyWatchedByUser(userId, limit);
  }

  /**
   * Obtiene estadísticas del usuario
   */
  async getUserStats(userId: string): Promise<{
    totalWatched: number;
    totalRated: number;
    averageRating: number;
  }> {
    return await this.userSeriesRepository.getUserStats(userId);
  }

  /**
   * Verifica si el usuario ha visto una serie
   */
  async hasWatched(userId: string, seriesId: string): Promise<boolean> {
    const userSeries = await this.userSeriesRepository.findByUserAndSeries(userId, seriesId);
    return userSeries?.isWatched || false;
  }

  /**
   * Verifica si el usuario ha valorado una serie
   */
  async hasRated(userId: string, seriesId: string): Promise<boolean> {
    return await this.userSeriesRepository.hasRating(userId, seriesId);
  }

  /**
   * Mapea a DTO de respuesta
   */
  private mapToResponseDto(userSeries: UserSeries, series: any): UserSeriesResponseDto {
    return {
      id: userSeries.id,
      userId: userSeries.userId,
      seriesId: userSeries.seriesId,
      rating: userSeries.rating,
      isWatched: userSeries.isWatched,
      watchedAt: userSeries.watchedAt,
      series: {
        id: series.id,
        title: series.title,
        posterUrl: series.posterUrl,
        releaseYear: series.releaseYear,
      },
      createdAt: userSeries.createdAt,
      updatedAt: userSeries.updatedAt,
    };
  }
}
