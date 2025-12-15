import { Watchlist } from '../models/watchlist.model';
import { PageResponseDto } from '../dtos/common.dto';
import { WatchlistResponseDto } from '../dtos/watchlist.dto';

/**
 * Repositorio para la gestión de Watchlist
 */
export interface WatchlistRepository {
  // CRUD Básico
  create(watchlist: Watchlist): Promise<Watchlist>;
  findById(id: string): Promise<Watchlist | null>;
  delete(id: string): Promise<boolean>;

  // Consultas específicas
  findByUserAndSeries(userId: string, seriesId: string): Promise<Watchlist | null>;
  findByUser(userId: string, page: number, limit: number): Promise<PageResponseDto<WatchlistResponseDto>>;
  existsInWatchlist(userId: string, seriesId: string): Promise<boolean>;
  removeByUserAndSeries(userId: string, seriesId: string): Promise<boolean>;
  
  // Estadísticas
  countByUser(userId: string): Promise<number>;
  getMostAddedSeries(limit: number): Promise<Array<{ seriesId: string; count: number }>>;
}
