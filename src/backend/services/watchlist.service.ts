import { Watchlist } from '../models/watchlist.model';
import { WatchlistRepository } from '../repositories/watchlist.repository';
import { SeriesRepository } from '../repositories/series.repository';
import { AddToWatchlistDto, WatchlistResponseDto, FilterWatchlistDto } from '../dtos/watchlist.dto';
import { PageResponseDto } from '../dtos/common.dto';

/**
 * Servicio de Watchlist
 * Lógica: no permitir duplicados, una serie por usuario solo una vez
 */
export class WatchlistService {
  constructor(
    private watchlistRepository: WatchlistRepository,
    private seriesRepository: SeriesRepository
  ) {}

  /**
   * Agrega una serie a la watchlist
   * REGLA: No permitir duplicados
   */
  async addToWatchlist(userId: string, dto: AddToWatchlistDto): Promise<WatchlistResponseDto> {
    // Verificar que la serie existe
    const series = await this.seriesRepository.findById(dto.seriesId);
    if (!series) {
      throw new Error('Serie no encontrada');
    }

    // Verificar que no está ya en la watchlist
    const exists = await this.watchlistRepository.existsInWatchlist(userId, dto.seriesId);
    if (exists) {
      throw new Error('Esta serie ya está en tu watchlist');
    }

    const watchlist = new Watchlist({
      userId,
      seriesId: dto.seriesId,
    });

    const created = await this.watchlistRepository.create(watchlist);
    
    return {
      id: created.id,
      userId: created.userId,
      seriesId: created.seriesId,
      series: {
        id: series.id,
        title: series.title,
        posterUrl: series.posterUrl,
        releaseYear: series.releaseYear,
        averageRating: series.averageRating,
      },
      createdAt: created.createdAt,
    };
  }

  /**
   * Elimina una serie de la watchlist
   */
  async removeFromWatchlist(userId: string, seriesId: string): Promise<boolean> {
    const exists = await this.watchlistRepository.existsInWatchlist(userId, seriesId);
    if (!exists) {
      throw new Error('Esta serie no está en tu watchlist');
    }

    return await this.watchlistRepository.removeByUserAndSeries(userId, seriesId);
  }

  /**
   * Obtiene la watchlist de un usuario
   */
  async getWatchlist(userId: string, filter: FilterWatchlistDto): Promise<PageResponseDto<WatchlistResponseDto>> {
    const page = filter.page || 1;
    const limit = filter.limit || 20;

    return await this.watchlistRepository.findByUser(userId, page, limit);
  }

  /**
   * Verifica si una serie está en la watchlist del usuario
   */
  async isInWatchlist(userId: string, seriesId: string): Promise<boolean> {
    return await this.watchlistRepository.existsInWatchlist(userId, seriesId);
  }

  /**
   * Cuenta cuántas series tiene el usuario en su watchlist
   */
  async countUserWatchlist(userId: string): Promise<number> {
    return await this.watchlistRepository.countByUser(userId);
  }
}
