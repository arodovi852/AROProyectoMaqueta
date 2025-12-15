/**
 * DTO para marcar una serie como vista
 */
export interface MarkAsWatchedDto {
  seriesId: string;
  rating?: number; // Opcional: puede valorar al mismo tiempo
}

/**
 * DTO para valorar una serie
 */
export interface RateSeriesDto {
  seriesId: string;
  rating: number; // 0-10
}

/**
 * DTO de respuesta de user-series
 */
export interface UserSeriesResponseDto {
  id: string;
  userId: string;
  seriesId: string;
  rating?: number;
  isWatched: boolean;
  watchedAt?: Date;
  series: {
    id: string;
    title: string;
    posterUrl?: string;
    releaseYear: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

/**
 * DTO para filtrar series vistas del usuario
 */
export interface FilterUserSeriesDto {
  isWatched?: boolean;
  minRating?: number;
  maxRating?: number;
  page?: number;
  limit?: number;
  sortBy?: 'title' | 'rating' | 'watchedAt';
  sortOrder?: 'asc' | 'desc';
}
