import { SeriesService } from '../services/series.service';
import { CreateSeriesDto, UpdateSeriesDto, FilterSeriesDto } from '../dtos/series.dto';

/**
 * Controlador REST para Series
 * 
 * Endpoints:
 * - GET    /api/series                - Lista todas las series (con filtros)
 * - GET    /api/series/:id            - Obtiene una serie por ID
 * - GET    /api/series/search/:title  - Busca series por título
 * - GET    /api/series/genre/:genreId - Series por género
 * - GET    /api/series/top-rated      - Series mejor valoradas
 * - GET    /api/series/popular        - Series más populares
 * - GET    /api/series/recent         - Series recién agregadas
 * - GET    /api/series/airing         - Series en emisión
 * - GET    /api/series/stats          - Estadísticas generales
 * - POST   /api/series                - Crea una nueva serie (ADMIN)
 * - PUT    /api/series/:id            - Actualiza una serie (ADMIN)
 * - DELETE /api/series/:id            - Elimina una serie (ADMIN)
 * - POST   /api/series/:id/genres/:genreId    - Asocia género (ADMIN)
 * - DELETE /api/series/:id/genres/:genreId    - Elimina género (ADMIN)
 */
export class SeriesController {
  constructor(private seriesService: SeriesService) {}

  /**
   * GET /api/series
   * Lista todas las series con filtros y paginación
   */
  async findAll(req: any, res: any): Promise<void> {
    try {
      const filter: FilterSeriesDto = {
        title: req.query.title,
        genreIds: req.query.genreIds ? req.query.genreIds.split(',') : undefined,
        status: req.query.status,
        minRating: req.query.minRating ? parseFloat(req.query.minRating) : undefined,
        maxRating: req.query.maxRating ? parseFloat(req.query.maxRating) : undefined,
        releaseYear: req.query.releaseYear ? parseInt(req.query.releaseYear) : undefined,
        originCountry: req.query.originCountry,
        sortBy: req.query.sortBy || 'title',
        sortOrder: req.query.sortOrder || 'asc',
        page: req.query.page ? parseInt(req.query.page) : 1,
        limit: req.query.limit ? parseInt(req.query.limit) : 20,
      };

      const result = await this.seriesService.findAll(filter);
      
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
   * GET /api/series/:id
   * Obtiene una serie por ID
   */
  async findById(req: any, res: any): Promise<void> {
    try {
      const { id } = req.params;
      const series = await this.seriesService.findById(id);

      if (!series) {
        res.status(404).json({
          success: false,
          message: 'Serie no encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: series,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * GET /api/series/search/:title
   * Busca series por título
   */
  async searchByTitle(req: any, res: any): Promise<void> {
    try {
      const { title } = req.params;
      const series = await this.seriesService.searchByTitle(title);

      res.status(200).json({
        success: true,
        data: series,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * GET /api/series/genre/:genreId
   * Obtiene series por género
   */
  async findByGenre(req: any, res: any): Promise<void> {
    try {
      const { genreId } = req.params;
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit) : 20;

      const result = await this.seriesService.findByGenre(genreId, page, limit);

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
   * GET /api/series/top-rated
   * Obtiene las series mejor valoradas
   */
  async getTopRated(req: any, res: any): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const minRatings = req.query.minRatings ? parseInt(req.query.minRatings) : 10;

      const series = await this.seriesService.getTopRated(limit, minRatings);

      res.status(200).json({
        success: true,
        data: series,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * GET /api/series/popular
   * Obtiene las series más populares
   */
  async getMostPopular(req: any, res: any): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const series = await this.seriesService.getMostPopular(limit);

      res.status(200).json({
        success: true,
        data: series,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * GET /api/series/recent
   * Obtiene series recién agregadas
   */
  async getRecentlyAdded(req: any, res: any): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const series = await this.seriesService.getRecentlyAdded(limit);

      res.status(200).json({
        success: true,
        data: series,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * GET /api/series/airing
   * Obtiene series actualmente en emisión
   */
  async getCurrentlyAiring(req: any, res: any): Promise<void> {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const series = await this.seriesService.getCurrentlyAiring(limit);

      res.status(200).json({
        success: true,
        data: series,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * GET /api/series/stats
   * Obtiene estadísticas generales
   */
  async getStatistics(req: any, res: any): Promise<void> {
    try {
      const stats = await this.seriesService.getStatistics();

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
   * POST /api/series
   * Crea una nueva serie (ADMIN)
   */
  async create(req: any, res: any): Promise<void> {
    try {
      const dto: CreateSeriesDto = req.body;
      const series = await this.seriesService.create(dto);

      res.status(201).json({
        success: true,
        message: 'Serie creada exitosamente',
        data: series,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * PUT /api/series/:id
   * Actualiza una serie (ADMIN)
   */
  async update(req: any, res: any): Promise<void> {
    try {
      const { id } = req.params;
      const dto: UpdateSeriesDto = req.body;
      
      const series = await this.seriesService.update(id, dto);

      res.status(200).json({
        success: true,
        message: 'Serie actualizada exitosamente',
        data: series,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * DELETE /api/series/:id
   * Elimina una serie (ADMIN)
   */
  async delete(req: any, res: any): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.seriesService.delete(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Serie no encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Serie eliminada exitosamente',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * POST /api/series/:id/genres/:genreId
   * Asocia un género a una serie (ADMIN)
   */
  async addGenre(req: any, res: any): Promise<void> {
    try {
      const { id, genreId } = req.params;
      await this.seriesService.addGenre(id, genreId);

      res.status(200).json({
        success: true,
        message: 'Género asociado exitosamente',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * DELETE /api/series/:id/genres/:genreId
   * Elimina un género de una serie (ADMIN)
   */
  async removeGenre(req: any, res: any): Promise<void> {
    try {
      const { id, genreId } = req.params;
      await this.seriesService.removeGenre(id, genreId);

      res.status(200).json({
        success: true,
        message: 'Género eliminado exitosamente',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}
