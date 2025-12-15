import { Review } from '../models/review.model';
import { ReviewRepository } from '../repositories/review.repository';
import { UserSeriesRepository } from '../repositories/user-series.repository';
import { SeriesRepository } from '../repositories/series.repository';
import { CreateReviewDto, UpdateReviewDto, FilterReviewsDto, ReviewResponseDto } from '../dtos/review.dto';
import { PageResponseDto } from '../dtos/common.dto';

/**
 * Servicio de Reviews
 * Lógica de negocio: una review por usuario/serie, solo si ha visto la serie
 */
export class ReviewService {
  constructor(
    private reviewRepository: ReviewRepository,
    private userSeriesRepository: UserSeriesRepository,
    private seriesRepository: SeriesRepository
  ) {}

  /**
   * Crea una nueva review
   * REGLAS:
   * - Solo una review por usuario/serie
   * - El usuario debe haber visto la serie
   * - Contenido mínimo 50 caracteres
   */
  async create(userId: string, dto: CreateReviewDto): Promise<ReviewResponseDto> {
    // Verificar que la serie existe
    const series = await this.seriesRepository.findById(dto.seriesId);
    if (!series) {
      throw new Error('Serie no encontrada');
    }

    // Verificar que el usuario ha visto la serie
    const userSeries = await this.userSeriesRepository.findByUserAndSeries(userId, dto.seriesId);
    if (!userSeries || !userSeries.isWatched) {
      throw new Error('No puedes escribir una review de una serie que no has visto');
    }

    // Verificar que no existe ya una review del usuario para esta serie
    const existingReview = await this.reviewRepository.findByUserAndSeries(userId, dto.seriesId);
    if (existingReview) {
      throw new Error('Ya has escrito una review para esta serie. Puedes editarla en su lugar.');
    }

    // Validar contenido mínimo
    if (dto.content.trim().length < 50) {
      throw new Error('La review debe tener al menos 50 caracteres');
    }

    // Validar rating si está presente
    if (dto.rating !== undefined) {
      if (dto.rating < 0 || dto.rating > 10) {
        throw new Error('El rating debe estar entre 0 y 10');
      }

      // Sincronizar rating con UserSeries
      if (userSeries.rating !== dto.rating) {
        await this.userSeriesRepository.update(userSeries.id, {
          rating: dto.rating,
        });
        await this.userSeriesRepository.updateSeriesRating(dto.seriesId);
      }
    }

    const review = new Review({
      userId,
      ...dto,
      likes: 0,
    });

    const created = await this.reviewRepository.create(review);
    
    return await this.getReviewResponseDto(created.id);
  }

  /**
   * Actualiza una review existente
   * REGLA: Solo el autor puede editar su review
   */
  async update(userId: string, reviewId: string, dto: UpdateReviewDto): Promise<ReviewResponseDto> {
    const review = await this.reviewRepository.findById(reviewId);
    if (!review) {
      throw new Error('Review no encontrada');
    }

    // Verificar que es el autor
    if (review.userId !== userId) {
      throw new Error('No tienes permiso para editar esta review');
    }

    // Validar contenido si se está actualizando
    if (dto.content && dto.content.trim().length < 50) {
      throw new Error('La review debe tener al menos 50 caracteres');
    }

    // Validar rating si está siendo actualizado
    if (dto.rating !== undefined) {
      if (dto.rating < 0 || dto.rating > 10) {
        throw new Error('El rating debe estar entre 0 y 10');
      }

      // Sincronizar con UserSeries si cambió
      if (dto.rating !== review.rating) {
        const userSeries = await this.userSeriesRepository.findByUserAndSeries(userId, review.seriesId);
        if (userSeries) {
          await this.userSeriesRepository.update(userSeries.id, {
            rating: dto.rating,
          });
          await this.userSeriesRepository.updateSeriesRating(review.seriesId);
        }
      }
    }

    const updated = await this.reviewRepository.update(reviewId, dto);
    if (!updated) {
      throw new Error('Error al actualizar la review');
    }

    return await this.getReviewResponseDto(reviewId);
  }

  /**
   * Elimina una review
   * REGLA: Solo el autor o un admin pueden eliminar
   */
  async delete(userId: string, reviewId: string, isAdmin: boolean = false): Promise<boolean> {
    const review = await this.reviewRepository.findById(reviewId);
    if (!review) {
      throw new Error('Review no encontrada');
    }

    // Verificar permisos
    if (!isAdmin && review.userId !== userId) {
      throw new Error('No tienes permiso para eliminar esta review');
    }

    return await this.reviewRepository.delete(reviewId);
  }

  /**
   * Obtiene una review por ID
   */
  async findById(reviewId: string): Promise<ReviewResponseDto | null> {
    const review = await this.reviewRepository.findById(reviewId);
    if (!review) return null;

    return await this.getReviewResponseDto(reviewId);
  }

  /**
   * Obtiene reviews con filtros
   */
  async findAll(filter: FilterReviewsDto): Promise<PageResponseDto<ReviewResponseDto>> {
    return await this.reviewRepository.findAll(filter);
  }

  /**
   * Obtiene reviews de una serie específica
   */
  async findBySeries(seriesId: string, page: number = 1, limit: number = 20): Promise<PageResponseDto<ReviewResponseDto>> {
    return await this.reviewRepository.findBySeries(seriesId, page, limit);
  }

  /**
   * Obtiene reviews de un usuario específico
   */
  async findByUser(userId: string, page: number = 1, limit: number = 20): Promise<PageResponseDto<ReviewResponseDto>> {
    return await this.reviewRepository.findByUser(userId, page, limit);
  }

  /**
   * Obtiene las reviews más populares (más likes)
   */
  async getMostLiked(limit: number = 10): Promise<ReviewResponseDto[]> {
    return await this.reviewRepository.getMostLiked(limit);
  }

  /**
   * Obtiene las reviews más recientes
   */
  async getRecentReviews(limit: number = 10): Promise<ReviewResponseDto[]> {
    return await this.reviewRepository.getRecentReviews(limit);
  }

  /**
   * Añade un "like" a una review
   */
  async addLike(reviewId: string): Promise<ReviewResponseDto> {
    const review = await this.reviewRepository.addLike(reviewId);
    if (!review) {
      throw new Error('Review no encontrada');
    }

    return await this.getReviewResponseDto(reviewId);
  }

  /**
   * Elimina un "like" de una review
   */
  async removeLike(reviewId: string): Promise<ReviewResponseDto> {
    const review = await this.reviewRepository.removeLike(reviewId);
    if (!review) {
      throw new Error('Review no encontrada');
    }

    return await this.getReviewResponseDto(reviewId);
  }

  /**
   * Verifica si el usuario ya ha escrito una review para una serie
   */
  async hasUserReviewed(userId: string, seriesId: string): Promise<boolean> {
    return await this.reviewRepository.exists(userId, seriesId);
  }

  /**
   * Obtiene estadísticas de reviews
   */
  async getStatistics(): Promise<{
    totalReviews: number;
    averageLikes: number;
    topReviewers: Array<{ userId: string; reviewCount: number }>;
  }> {
    // Implementación específica según la BD
    return {
      totalReviews: 0,
      averageLikes: 0,
      topReviewers: [],
    };
  }

  /**
   * Helper para obtener ReviewResponseDto completo con datos relacionados
   */
  private async getReviewResponseDto(reviewId: string): Promise<ReviewResponseDto> {
    const review = await this.reviewRepository.findById(reviewId);
    if (!review) {
      throw new Error('Review no encontrada');
    }

    // En una implementación real, esto vendría del repositorio con JOINs
    // Por ahora es una representación de la estructura esperada
    return {
      id: review.id,
      userId: review.userId,
      seriesId: review.seriesId,
      title: review.title,
      content: review.content,
      rating: review.rating,
      isSpoiler: review.isSpoiler,
      likes: review.likes,
      user: {
        id: review.userId,
        username: 'username', // Se obtendría del UserRepository
        displayName: 'Display Name',
        avatar: undefined,
      },
      series: {
        id: review.seriesId,
        title: 'Series Title', // Se obtendría del SeriesRepository
        posterUrl: undefined,
        releaseYear: 2020,
      },
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  }
}
