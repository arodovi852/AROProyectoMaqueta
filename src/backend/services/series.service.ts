import { Series } from '../models/series.model';
import { SeriesRepository } from '../repositories/series.repository';
import { UserSeriesRepository } from '../repositories/user-series.repository';
import { CreateSeriesDto, UpdateSeriesDto, FilterSeriesDto, SeriesResponseDto, SeriesSummaryDto } from '../dtos/series.dto';
import { PageResponseDto } from '../dtos/common.dto';

/**
 * Servicio de Series - Implementa la lógica de negocio
 */
export class SeriesService {
  constructor(
    private seriesRepository: SeriesRepository,
    private userSeriesRepository: UserSeriesRepository
  ) {}

  /**
   * Crea una nueva serie
   * Validaciones: título único, TMDB/IMDb únicos si están presentes
   */
  async create(dto: CreateSeriesDto): Promise<SeriesResponseDto> {
    // Validar que no exista una serie con el mismo TMDB ID
    if (dto.tmdbId) {
      const existingByTmdb = await this.seriesRepository.findByTmdbId(dto.tmdbId);
      if (existingByTmdb) {
        throw new Error('Ya existe una serie con este TMDB ID');
      }
    }

    // Validar que no exista una serie con el mismo IMDb ID
    if (dto.imdbId) {
      const existingByImdb = await this.seriesRepository.findByImdbId(dto.imdbId);
      if (existingByImdb) {
        throw new Error('Ya existe una serie con este IMDb ID');
      }
    }

    // Validaciones de datos
    if (dto.numberOfSeasons < 1) {
      throw new Error('El número de temporadas debe ser al menos 1');
    }

    if (dto.numberOfEpisodes < 1) {
      throw new Error('El número de episodios debe ser al menos 1');
    }

    const series = new Series({
      ...dto,
      averageRating: 0,
      ratingsCount: 0,
    });

    const created = await this.seriesRepository.create(series);

    // Asociar géneros si fueron proporcionados
    if (dto.genreIds && dto.genreIds.length > 0) {
      for (const genreId of dto.genreIds) {
        await this.seriesRepository.addGenre(created.id, genreId);
      }
    }

    return this.mapToResponseDto(created);
  }

  /**
   * Obtiene una serie por ID
   */
  async findById(id: string): Promise<SeriesResponseDto | null> {
    const series = await this.seriesRepository.findById(id);
    if (!series) return null;

    return this.mapToResponseDto(series);
  }

  /**
   * Actualiza una serie
   * Validación: no permitir cambiar TMDB/IMDb a IDs ya existentes
   */
  async update(id: string, dto: UpdateSeriesDto): Promise<SeriesResponseDto> {
    const existing = await this.seriesRepository.findById(id);
    if (!existing) {
      throw new Error('Serie no encontrada');
    }

    // Validar TMDB ID si está siendo actualizado
    if (dto.tmdbId && dto.tmdbId !== existing.tmdbId) {
      const conflicting = await this.seriesRepository.findByTmdbId(dto.tmdbId);
      if (conflicting && conflicting.id !== id) {
        throw new Error('Ya existe otra serie con este TMDB ID');
      }
    }

    // Validar IMDb ID si está siendo actualizado
    if (dto.imdbId && dto.imdbId !== existing.imdbId) {
      const conflicting = await this.seriesRepository.findByImdbId(dto.imdbId);
      if (conflicting && conflicting.id !== id) {
        throw new Error('Ya existe otra serie con este IMDb ID');
      }
    }

    const updated = await this.seriesRepository.update(id, dto);
    if (!updated) {
      throw new Error('Error al actualizar la serie');
    }

    return this.mapToResponseDto(updated);
  }

  /**
   * Elimina una serie
   * Regla de negocio: no permitir eliminar si tiene valoraciones o reviews
   */
  async delete(id: string): Promise<boolean> {
    const series = await this.seriesRepository.findById(id);
    if (!series) {
      throw new Error('Serie no encontrada');
    }

    // Verificar si tiene valoraciones
    if (series.ratingsCount > 0) {
      throw new Error('No se puede eliminar una serie que tiene valoraciones. Considera desactivarla en su lugar.');
    }

    return await this.seriesRepository.delete(id);
  }

  /**
   * Busca series con filtros y paginación
   */
  async findAll(filter: FilterSeriesDto): Promise<PageResponseDto<SeriesSummaryDto>> {
    return await this.seriesRepository.findAll(filter);
  }

  /**
   * Busca series por título (búsqueda parcial)
   */
  async searchByTitle(title: string): Promise<SeriesResponseDto[]> {
    const series = await this.seriesRepository.findByTitle(title);
    return series.map(s => this.mapToResponseDto(s));
  }

  /**
   * Obtiene series por género
   */
  async findByGenre(genreId: string, page: number = 1, limit: number = 20): Promise<PageResponseDto<SeriesSummaryDto>> {
    return await this.seriesRepository.findByGenre(genreId, page, limit);
  }

  /**
   * Obtiene las series mejor valoradas
   */
  async getTopRated(limit: number = 10, minRatings: number = 10): Promise<SeriesSummaryDto[]> {
    return await this.seriesRepository.getTopRated(limit, minRatings);
  }

  /**
   * Obtiene las series más populares (más valoraciones)
   */
  async getMostPopular(limit: number = 10): Promise<SeriesSummaryDto[]> {
    return await this.seriesRepository.getMostRated(limit);
  }

  /**
   * Obtiene series recientemente agregadas
   */
  async getRecentlyAdded(limit: number = 10): Promise<SeriesSummaryDto[]> {
    return await this.seriesRepository.getRecentlyAdded(limit);
  }

  /**
   * Obtiene series actualmente en emisión
   */
  async getCurrentlyAiring(limit: number = 10): Promise<SeriesSummaryDto[]> {
    return await this.seriesRepository.getCurrentlyAiring(limit);
  }

  /**
   * Obtiene estadísticas generales de series
   */
  async getStatistics(): Promise<{
    total: number;
    byStatus: Record<string, number>;
    averageRating: number;
    totalRatings: number;
  }> {
    return await this.seriesRepository.getStatistics();
  }

  /**
   * Asocia un género a una serie
   */
  async addGenre(seriesId: string, genreId: string): Promise<boolean> {
    const series = await this.seriesRepository.findById(seriesId);
    if (!series) {
      throw new Error('Serie no encontrada');
    }

    return await this.seriesRepository.addGenre(seriesId, genreId);
  }

  /**
   * Elimina un género de una serie
   */
  async removeGenre(seriesId: string, genreId: string): Promise<boolean> {
    return await this.seriesRepository.removeGenre(seriesId, genreId);
  }

  /**
   * Actualiza el rating promedio de una serie
   * Se llama automáticamente cuando se agrega/actualiza/elimina una valoración
   */
  async updateAverageRating(seriesId: string): Promise<void> {
    const { average, count } = await this.userSeriesRepository.getAverageRating(seriesId);
    
    await this.seriesRepository.update(seriesId, {
      averageRating: average,
      ratingsCount: count,
    });
  }

  /**
   * Mapea una entidad Series a DTO de respuesta
   */
  private mapToResponseDto(series: Series): SeriesResponseDto {
    return {
      id: series.id,
      title: series.title,
      originalTitle: series.originalTitle,
      overview: series.overview,
      releaseDate: series.releaseDate,
      endDate: series.endDate,
      status: series.status,
      statusDisplay: series.statusDisplay,
      posterUrl: series.posterUrl,
      backdropUrl: series.backdropUrl,
      numberOfSeasons: series.numberOfSeasons,
      numberOfEpisodes: series.numberOfEpisodes,
      runtime: series.runtime,
      originCountry: series.originCountry,
      originalLanguage: series.originalLanguage,
      tmdbId: series.tmdbId,
      imdbId: series.imdbId,
      averageRating: series.averageRating,
      ratingsCount: series.ratingsCount,
      releaseYear: series.releaseYear,
      createdAt: series.createdAt,
      updatedAt: series.updatedAt,
    };
  }
}
