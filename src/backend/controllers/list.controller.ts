import { ListService } from '../services/list.service';
import { CreateListDto, UpdateListDto, AddSeriesToListDto, ReorderListItemsDto, FilterListsDto } from '../dtos/list.dto';

/**
 * Controlador REST para Lists (Listas personalizadas de series)
 * 
 * LÓGICA DE NEGOCIO:
 * - El nombre de lista debe ser único por usuario
 * - Solo el propietario puede modificar su lista
 * - No se permiten series duplicadas en una misma lista
 * - Se puede reordenar las series dentro de una lista
 * 
 * Endpoints:
 * - GET    /api/lists                    - Lista todas las listas públicas
 * - GET    /api/lists/user/:userId       - Listas de un usuario
 * - GET    /api/lists/my-lists           - Listas del usuario autenticado
 * - GET    /api/lists/:id                - Obtiene una lista por ID
 * - POST   /api/lists                    - Crea una nueva lista
 * - PUT    /api/lists/:id                - Actualiza una lista
 * - DELETE /api/lists/:id                - Elimina una lista
 * - POST   /api/lists/:id/series         - Añade serie a lista
 * - DELETE /api/lists/:id/series/:seriesId - Elimina serie de lista
 * - PUT    /api/lists/:id/reorder        - Reordena series en lista
 */
export class ListController {
  constructor(private listService: ListService) {}

  /**
   * GET /api/lists
   * Lista todas las listas públicas
   */
  async findAll(req: any, res: any): Promise<void> {
    try {
      const filter: FilterListsDto = {
        isPublic: true,
        sortBy: req.query.sortBy || 'createdAt',
        sortOrder: req.query.sortOrder || 'desc',
        page: req.query.page ? parseInt(req.query.page) : 1,
        limit: req.query.limit ? parseInt(req.query.limit) : 20,
      };

      const result = await this.listService.findAll(filter);

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
   * GET /api/lists/user/:userId
   * Obtiene listas de un usuario específico
   */
  async findByUser(req: any, res: any): Promise<void> {
    try {
      const { userId } = req.params;
      const currentUserId = req.user?.id;

      const filter: FilterListsDto = {
        userId,
        // Si no es el propietario, solo mostrar listas públicas
        isPublic: userId !== currentUserId ? true : undefined,
        sortBy: req.query.sortBy || 'createdAt',
        sortOrder: req.query.sortOrder || 'desc',
        page: req.query.page ? parseInt(req.query.page) : 1,
        limit: req.query.limit ? parseInt(req.query.limit) : 20,
      };

      const result = await this.listService.findByUser(filter);

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
   * GET /api/lists/my-lists
   * Obtiene las listas del usuario autenticado (públicas y privadas)
   */
  async findMyLists(req: any, res: any): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
        });
        return;
      }

      const filter: FilterListsDto = {
        userId,
        sortBy: req.query.sortBy || 'createdAt',
        sortOrder: req.query.sortOrder || 'desc',
        page: req.query.page ? parseInt(req.query.page) : 1,
        limit: req.query.limit ? parseInt(req.query.limit) : 20,
      };

      const result = await this.listService.findByUser(filter);

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
   * GET /api/lists/:id
   * Obtiene una lista por ID
   */
  async findById(req: any, res: any): Promise<void> {
    try {
      const { id } = req.params;
      const currentUserId = req.user?.id;

      const list = await this.listService.findById(id);

      if (!list) {
        res.status(404).json({
          success: false,
          message: 'Lista no encontrada',
        });
        return;
      }

      // Si es privada y no es el propietario, denegar acceso
      if (!list.isPublic && list.userId !== currentUserId) {
        res.status(403).json({
          success: false,
          message: 'No tienes permiso para ver esta lista',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: list,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * POST /api/lists
   * Crea una nueva lista
   * 
   * LÓGICA DE NEGOCIO: El nombre debe ser único por usuario
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

      const dto: CreateListDto = {
        ...req.body,
        userId,
      };

      const list = await this.listService.create(dto);

      res.status(201).json({
        success: true,
        message: 'Lista creada exitosamente',
        data: list,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * PUT /api/lists/:id
   * Actualiza una lista
   * 
   * LÓGICA DE NEGOCIO: Solo el propietario puede actualizar
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

      const dto: UpdateListDto = req.body;
      const list = await this.listService.update(id, userId, dto);

      res.status(200).json({
        success: true,
        message: 'Lista actualizada exitosamente',
        data: list,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * DELETE /api/lists/:id
   * Elimina una lista
   * 
   * LÓGICA DE NEGOCIO: Solo el propietario puede eliminar
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

      const deleted = await this.listService.delete(id, userId);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Lista no encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Lista eliminada exitosamente',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * POST /api/lists/:id/series
   * Añade una serie a la lista
   * 
   * LÓGICA DE NEGOCIO: No permite duplicados, solo el propietario puede añadir
   */
  async addSeries(req: any, res: any): Promise<void> {
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

      const dto: AddSeriesToListDto = {
        listId: id,
        seriesId: req.body.seriesId,
        notes: req.body.notes,
      };

      const listItem = await this.listService.addSeries(dto, userId);

      res.status(201).json({
        success: true,
        message: 'Serie añadida a la lista exitosamente',
        data: listItem,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * DELETE /api/lists/:id/series/:seriesId
   * Elimina una serie de la lista
   */
  async removeSeries(req: any, res: any): Promise<void> {
    try {
      const userId = req.user?.id;
      const { id, seriesId } = req.params;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
        });
        return;
      }

      const deleted = await this.listService.removeSeries(id, seriesId, userId);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Serie no encontrada en la lista',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Serie eliminada de la lista exitosamente',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * PUT /api/lists/:id/reorder
   * Reordena las series dentro de una lista
   */
  async reorderItems(req: any, res: any): Promise<void> {
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

      const dto: ReorderListItemsDto = {
        listId: id,
        itemOrders: req.body.itemOrders,
      };

      await this.listService.reorderItems(dto, userId);

      res.status(200).json({
        success: true,
        message: 'Lista reordenada exitosamente',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}
