import { WatchlistService } from '../services/watchlist.service';
import { AddToWatchlistDto, FilterWatchlistDto } from '../dtos/watchlist.dto';

/**
 * Controlador REST para Watchlist (Series pendientes de ver)
 * 
 * LÓGICA DE NEGOCIO:
 * - No permite duplicados (una serie solo puede estar una vez en watchlist)
 * - Solo el usuario propietario puede modificar su watchlist
 * 
 * Endpoints:
 * - GET    /api/watchlist           - Lista watchlist del usuario
 * - POST   /api/watchlist           - Añade serie a watchlist
 * - DELETE /api/watchlist/:seriesId - Elimina serie de watchlist
 */
export class WatchlistController {
  constructor(private watchlistService: WatchlistService) {}

  /**
   * GET /api/watchlist
   * Lista la watchlist del usuario autenticado
   */
  async findByUser(req: any, res: any): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
        });
        return;
      }

      const filter: FilterWatchlistDto = {
        userId,
        sortBy: req.query.sortBy || 'addedDate',
        sortOrder: req.query.sortOrder || 'desc',
        page: req.query.page ? parseInt(req.query.page) : 1,
        limit: req.query.limit ? parseInt(req.query.limit) : 20,
      };

      const result = await this.watchlistService.findByUser(filter);

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
   * POST /api/watchlist
   * Añade una serie a la watchlist
   * 
   * LÓGICA DE NEGOCIO: No permite duplicados
   */
  async add(req: any, res: any): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
        });
        return;
      }

      const dto: AddToWatchlistDto = {
        ...req.body,
        userId,
      };

      const watchlist = await this.watchlistService.add(dto);

      res.status(201).json({
        success: true,
        message: 'Serie añadida a watchlist exitosamente',
        data: watchlist,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * DELETE /api/watchlist/:seriesId
   * Elimina una serie de la watchlist
   */
  async remove(req: any, res: any): Promise<void> {
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

      const deleted = await this.watchlistService.remove(userId, seriesId);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Serie no encontrada en watchlist',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Serie eliminada de watchlist exitosamente',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
