import { UserSeriesService } from '../services/user-series.service';
import { MarkAsWatchedDto, RateSeriesDto, FilterUserSeriesDto } from '../dtos/user-series.dto';

/**
 * Controlador REST para UserSeries (Series vistas y valoradas)
 * 
 * LÓGICA DE NEGOCIO CRÍTICA:
 * - No se puede valorar una serie sin haberla marcado como vista
 * - Solo se puede tener una entrada por usuario-serie
 * - Al agregar/actualizar rating se recalcula el promedio de la serie
 * 
 * Endpoints:
 * - GET    /api/user-series               - Lista series vistas del usuario
 * - GET    /api/user-series/:seriesId     - Obtiene relación usuario-serie
 * - GET    /api/user-series/user/:userId/stats - Estadísticas del usuario
 * - POST   /api/user-series/watch         - Marca serie como vista
 * - POST   /api/user-series/rate          - Valora una serie (requiere haberla visto)
 * - PUT    /api/user-series/:seriesId     - Actualiza valoración/fecha vista
 * - DELETE /api/user-series/:seriesId     - Elimina relación (desmarca como vista)
 */
export class UserSeriesController {
  constructor(private userSeriesService: UserSeriesService) {}

  /**
   * GET /api/user-series
   * Lista todas las series vistas del usuario autenticado
   */
  async findByUser(req: any, res: any): Promise<void> {
    try {
      const userId = req.user?.id; // Del middleware de autenticación
      
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
        });
        return;
      }

      const filter: FilterUserSeriesDto = {
        userId,
        isWatched: req.query.isWatched === 'true',
        minRating: req.query.minRating ? parseFloat(req.query.minRating) : undefined,
        maxRating: req.query.maxRating ? parseFloat(req.query.maxRating) : undefined,
        isFavorite: req.query.isFavorite === 'true',
        watchedYear: req.query.watchedYear ? parseInt(req.query.watchedYear) : undefined,
        sortBy: req.query.sortBy || 'watchedDate',
        sortOrder: req.query.sortOrder || 'desc',
        page: req.query.page ? parseInt(req.query.page) : 1,
        limit: req.query.limit ? parseInt(req.query.limit) : 20,
      };

      const result = await this.userSeriesService.findByUser(filter);

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
   * GET /api/user-series/:seriesId
   * Obtiene la relación del usuario autenticado con una serie específica
   */
  async findOne(req: any, res: any): Promise<void> {
    try {
      const userId = req.user?.id;
      const { seriesId } = req.params;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
        });
        return;
      }

      const userSeries = await this.userSeriesService.findOne(userId, seriesId);

      if (!userSeries) {
        res.status(404).json({
          success: false,
          message: 'No has marcado esta serie como vista',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: userSeries,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * GET /api/user-series/user/:userId/stats
   * Obtiene estadísticas de un usuario
   */
  async getUserStats(req: any, res: any): Promise<void> {
    try {
      const { userId } = req.params;
      const stats = await this.userSeriesService.getUserStats(userId);

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * POST /api/user-series/watch
   * Marca una serie como vista
   */
  async markAsWatched(req: any, res: any): Promise<void> {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
        });
        return;
      }

      const dto: MarkAsWatchedDto = {
        ...req.body,
        userId,
      };

      const userSeries = await this.userSeriesService.markAsWatched(dto);

      res.status(201).json({
        success: true,
        message: 'Serie marcada como vista exitosamente',
        data: userSeries,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * POST /api/user-series/rate
   * Valora una serie (REQUIERE haberla marcado como vista primero)
   * 
   * LÓGICA DE NEGOCIO: Similar al ejemplo de la biblioteca - no puedes
   * pedir más libros sin devolver los anteriores, aquí no puedes valorar
   * una serie sin haberla visto primero.
   */
  async rateSeries(req: any, res: any): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
        });
        return;
      }

      const dto: RateSeriesDto = {
        ...req.body,
        userId,
      };

      const userSeries = await this.userSeriesService.rateSeries(dto);

      res.status(200).json({
        success: true,
        message: 'Valoración guardada exitosamente',
        data: userSeries,
      });
    } catch (error: any) {
      // El servicio lanza error si intentas valorar sin haber visto
      res.status(400).json({
        success: false,
        message: error.message, // "No puedes valorar una serie que no has visto"
      });
    }
  }

  /**
   * PUT /api/user-series/:seriesId
   * Actualiza una relación usuario-serie existente
   */
  async update(req: any, res: any): Promise<void> {
    try {
      const userId = req.user?.id;
      const { seriesId } = req.params;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
        });
        return;
      }

      const userSeries = await this.userSeriesService.update(userId, seriesId, req.body);

      res.status(200).json({
        success: true,
        message: 'Actualizado exitosamente',
        data: userSeries,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * DELETE /api/user-series/:seriesId
   * Elimina la relación (desmarca como vista y elimina valoración)
   */
  async delete(req: any, res: any): Promise<void> {
    try {
      const userId = req.user?.id;
      const { seriesId } = req.params;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
        });
        return;
      }

      const deleted = await this.userSeriesService.delete(userId, seriesId);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Relación no encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Eliminado exitosamente',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * POST /api/user-series/:seriesId/favorite
   * Marca/desmarca serie como favorita
   */
  async toggleFavorite(req: any, res: any): Promise<void> {
    try {
      const userId = req.user?.id;
      const { seriesId } = req.params;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
        });
        return;
      }

      const userSeries = await this.userSeriesService.toggleFavorite(userId, seriesId);

      res.status(200).json({
        success: true,
        message: userSeries.isFavorite ? 'Añadido a favoritos' : 'Eliminado de favoritos',
        data: userSeries,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}
