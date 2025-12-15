/**
 * DTO para crear una reseña
 */
export interface CreateReviewDto {
  seriesId: string;
  title: string;
  content: string;
  rating?: number;
  isSpoiler?: boolean;
}

/**
 * DTO para actualizar una reseña
 */
export interface UpdateReviewDto {
  title?: string;
  content?: string;
  rating?: number;
  isSpoiler?: boolean;
}

/**
 * DTO de respuesta de reseña
 */
export interface ReviewResponseDto {
  id: string;
  userId: string;
  seriesId: string;
  title: string;
  content: string;
  rating?: number;
  isSpoiler: boolean;
  likes: number;
  user: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
  };
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
 * DTO para filtrar reseñas
 */
export interface FilterReviewsDto {
  seriesId?: string;
  userId?: string;
  minRating?: number;
  maxRating?: number;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'likes' | 'rating';
  sortOrder?: 'asc' | 'desc';
}
