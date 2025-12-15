import { ReviewService } from '../services/review.service';
import { CreateReviewDto, UpdateReviewDto, FilterReviewsDto } from '../dtos/review.dto';

/**
 * Controlador REST para Reviews (Reseñas)
 * 
 * LÓGICA DE NEGOCIO:
 * - Solo un review por usuario por serie
 * - Solo se puede escribir review de series vistas
 * - Solo el autor puede editar/eliminar su review
 * - Los likes son de un solo usuario (no puede dar like dos veces)
 * 
 * Endpoints:
 * - GET    /api/reviews                    - Lista reviews (con filtros)
 * - GET    /api/reviews/:id                - Obtiene un review por ID
 * - GET    /api/reviews/series/:seriesId   - Reviews de una serie
 * - GET    /api/reviews/user/:userId       - Reviews de un usuario
 * - POST   /api/reviews                    - Crea un review (requiere haber visto la serie)
 * - PUT    /api/reviews/:id                - Actualiza un review (solo autor)
 * - DELETE /api/reviews/:id                - Elimina un review (solo autor)
 * - POST   /api/reviews/:id/like           - Da like a un review
 * - DELETE /api/reviews/:id/like           - Quita like de un review
 */
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  /**
   * GET /api/reviews
   * Lista reviews con filtros y paginación
   */
  async findAll(req: any, res: any): Promise<void> {
    try {
      const filter: FilterReviewsDto = {
        seriesId: req.query.seriesId,
        userId: req.query.userId,
        minRating: req.query.minRating ? parseFloat(req.query.minRating) : undefined,
        maxRating: req.query.maxRating ? parseFloat(req.query.maxRating) : undefined,
        hasSpoilers: req.query.hasSpoilers === 'true',
        sortBy: req.query.sortBy || 'createdAt',
        sortOrder: req.query.sortOrder || 'desc',
        page: req.query.page ? parseInt(req.query.page) : 1,
        limit: req.query.limit ? parseInt(req.query.limit) : 20,
      };

      const result = await this.reviewService.findAll(filter);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * GET /api/reviews/:id
   * Obtiene un review por ID
   */
  async findById(req: any, res: any): Promise<void> {
    try {
      const { id } = req.params;
      const review = await this.reviewService.findById(id);

      if (!review) {
        res.status(404).json({
          success: false,
          message: 'Review no encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: review,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * GET /api/reviews/series/:seriesId
   * Obtiene todos los reviews de una serie
   */
  async findBySeries(req: any, res: any): Promise<void> {
    try {
      const { seriesId } = req.params;
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit) : 20;

      const result = await this.reviewService.findBySeries(seriesId, page, limit);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * GET /api/reviews/user/:userId
   * Obtiene todos los reviews de un usuario
   */
  async findByUser(req: any, res: any): Promise<void> {
    try {
      const { userId } = req.params;
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit) : 20;

      const result = await this.reviewService.findByUser(userId, page, limit);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * POST /api/reviews
   * Crea un nuevo review
   * 
   * LÓGICA DE NEGOCIO:
   * - Solo se puede crear review de series que el usuario ha visto
   * - Solo un review por usuario por serie
   */
  async create(req: any, res: any): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
        });
        return;
      }

      const dto: CreateReviewDto = {
        ...req.body,
        userId,
      };

      const review = await this.reviewService.create(dto);

      res.status(201).json({
        success: true,
        message: 'Review creado exitosamente',
        data: review,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * PUT /api/reviews/:id
   * Actualiza un review
   * 
   * LÓGICA DE NEGOCIO: Solo el autor puede editar su review
   */
  async update(req: any, res: any): Promise<void> {
    try {
      const userId = req.user?.id;
      const { id } = req.params;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
        });
        return;
      }

      const dto: UpdateReviewDto = req.body;
      const review = await this.reviewService.update(id, userId, dto);

      res.status(200).json({
        success: true,
        message: 'Review actualizado exitosamente',
        data: review,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * DELETE /api/reviews/:id
   * Elimina un review
   * 
   * LÓGICA DE NEGOCIO: Solo el autor puede eliminar su review
   */
  async delete(req: any, res: any): Promise<void> {
    try {
      const userId = req.user?.id;
      const { id } = req.params;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
        });
        return;
      }

      const deleted = await this.reviewService.delete(id, userId);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Review no encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Review eliminado exitosamente',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * POST /api/reviews/:id/like
   * Da like a un review
   */
  async addLike(req: any, res: any): Promise<void> {
    try {
      const userId = req.user?.id;
      const { id } = req.params;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
        });
        return;
      }

      const review = await this.reviewService.addLike(id, userId);

      res.status(200).json({
        success: true,
        message: 'Like añadido exitosamente',
        data: review,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * DELETE /api/reviews/:id/like
   * Quita like de un review
   */
  async removeLike(req: any, res: any): Promise<void> {
    try {
      const userId = req.user?.id;
      const { id } = req.params;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
        });
        return;
      }

      const review = await this.reviewService.removeLike(id, userId);

      res.status(200).json({
        success: true,
        message: 'Like eliminado exitosamente',
        data: review,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}
