import { Review } from '../models/review.model';
import { PageResponseDto } from '../dtos/common.dto';
import { ReviewResponseDto, FilterReviewsDto } from '../dtos/review.dto';

/**
 * Repositorio para la gestión de Reviews
 */
export interface ReviewRepository {
  // CRUD Básico
  create(review: Review): Promise<Review>;
  findById(id: string): Promise<Review | null>;
  findByUserAndSeries(userId: string, seriesId: string): Promise<Review | null>;
  update(id: string, review: Partial<Review>): Promise<Review | null>;
  delete(id: string): Promise<boolean>;

  // Consultas con filtros
  findAll(filter: FilterReviewsDto): Promise<PageResponseDto<ReviewResponseDto>>;
  findBySeries(seriesId: string, page: number, limit: number): Promise<PageResponseDto<ReviewResponseDto>>;
  findByUser(userId: string, page: number, limit: number): Promise<PageResponseDto<ReviewResponseDto>>;
  
  // Reviews destacadas
  getMostLiked(limit: number): Promise<ReviewResponseDto[]>;
  getRecentReviews(limit: number): Promise<ReviewResponseDto[]>;
  
  // Likes
  addLike(reviewId: string): Promise<Review | null>;
  removeLike(reviewId: string): Promise<Review | null>;
  
  // Validaciones
  exists(userId: string, seriesId: string): Promise<boolean>;
  canUserReview(userId: string, seriesId: string): Promise<boolean>; // Verifica si ha visto la serie
  isAuthor(reviewId: string, userId: string): Promise<boolean>;
  
  // Estadísticas
  countBySeries(seriesId: string): Promise<number>;
  countByUser(userId: string): Promise<number>;
}
