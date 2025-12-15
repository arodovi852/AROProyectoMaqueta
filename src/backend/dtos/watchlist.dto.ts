/**
 * DTO para agregar una serie a la watchlist
 */
export interface AddToWatchlistDto {
  seriesId: string;
}

/**
 * DTO de respuesta de watchlist
 */
export interface WatchlistResponseDto {
  id: string;
  userId: string;
  seriesId: string;
  series: {
    id: string;
    title: string;
    posterUrl?: string;
    releaseYear: number;
    averageRating: number;
  };
  createdAt: Date;
}

/**
 * DTO para obtener la watchlist de un usuario
 */
export interface FilterWatchlistDto {
  page?: number;
  limit?: number;
  sortBy?: 'title' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
