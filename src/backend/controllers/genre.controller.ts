import { GenreService } from '../services/genre.service';
import { CreateGenreDto, UpdateGenreDto } from '../dtos/genre.dto';

/**
 * Controlador REST para Genres (Géneros)
 * 
 * LÓGICA DE NEGOCIO:
 * - No se puede eliminar un género si tiene series asociadas
 * - Los slugs deben ser únicos
 * 
 * Endpoints:
 * - GET    /api/genres     - Lista todos los géneros
 * - GET    /api/genres/:id - Obtiene un género por ID
 * - POST   /api/genres     - Crea un nuevo género (ADMIN)
 * - PUT    /api/genres/:id - Actualiza un género (ADMIN)
 * - DELETE /api/genres/:id - Elimina un género (ADMIN, solo si no tiene series)
 */
export class GenreController {
  constructor(private genreService: GenreService) {}

  /**
   * GET /api/genres
   * Lista todos los géneros
   */
  async findAll(req: any, res: any): Promise<void> {
    try {
      const genres = await this.genreService.findAll();

      res.status(200).json({
        success: true,
        data: genres,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * GET /api/genres/:id
   * Obtiene un género por ID
   */
  async findById(req: any, res: any): Promise<void> {
    try {
      const { id } = req.params;
      const genre = await this.genreService.findById(id);

      if (!genre) {
        res.status(404).json({
          success: false,
          message: 'Género no encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: genre,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * POST /api/genres
   * Crea un nuevo género (ADMIN)
   */
  async create(req: any, res: any): Promise<void> {
    try {
      const dto: CreateGenreDto = req.body;
      const genre = await this.genreService.create(dto);

      res.status(201).json({
        success: true,
        message: 'Género creado exitosamente',
        data: genre,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * PUT /api/genres/:id
   * Actualiza un género (ADMIN)
   */
  async update(req: any, res: any): Promise<void> {
    try {
      const { id } = req.params;
      const dto: UpdateGenreDto = req.body;
      
      const genre = await this.genreService.update(id, dto);

      res.status(200).json({
        success: true,
        message: 'Género actualizado exitosamente',
        data: genre,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * DELETE /api/genres/:id
   * Elimina un género (ADMIN)
   * 
   * LÓGICA DE NEGOCIO: No se puede eliminar si tiene series asociadas
   */
  async delete(req: any, res: any): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.genreService.delete(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Género no encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Género eliminado exitosamente',
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message, // "No se puede eliminar un género que tiene series asociadas"
      });
    }
  }
}
