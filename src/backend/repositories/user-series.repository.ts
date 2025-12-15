import { UserSeries } from '../models/user-series.model';
import { PageResponseDto } from '../dtos/common.dto';
import { UserSeriesResponseDto } from '../dtos/user-series.dto';

/**
 * Repositorio para la gestión de UserSeries (series vistas/valoradas)
 */
export interface UserSeriesRepository {
  // CRUD Básico
  create(userSeries: UserSeries): Promise<UserSeries>;
  findById(id: string): Promise<UserSeries | null>;
  findByUserAndSeries(userId: string, seriesId: string): Promise<UserSeries | null>;
  update(id: string, userSeries: Partial<UserSeries>): Promise<UserSeries | null>;
  delete(id: string): Promise<boolean>;

  // Consultas de usuario
  findWatchedBySer(userId: string, page: number, limit: number): Promise<PageResponseDto<UserSeriesResponseDto>>;
  findRatedByUser(userId: string, page: number, limit: number): Promise<PageResponseDto<UserSeriesResponseDto>>;
  findRecentlyWatchedByUser(userId: string, limit: number): Promise<UserSeriesResponseDto[]>;
  
  // Consultas de series
  findRatingsBySeriesuser(seriesId: string): Promise<UserSeries[]>;
  getAverageRating(seriesId: string): Promise<{ average: number; count: number }>;
  
  // Estadísticas de usuario
  getUserStats(userId: string): Promise<{
    totalWatched: number;
    totalRated: number;
    averageRating: number;
  }>;
  
  // Validaciones
  exists(userId: string, seriesId: string): Promise<boolean>;
  hasRating(userId: string, seriesId: string): Promise<boolean>;
  
  // Actualización de ratings
  updateSeriesRating(seriesId: string): Promise<void>;
}
