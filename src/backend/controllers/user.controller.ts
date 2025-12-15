import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto, LoginDto, FilterUsersDto } from '../dtos/user.dto';

/**
 * Controlador REST para Users (Usuarios)
 * 
 * LÓGICA DE NEGOCIO:
 * - Email y username deben ser únicos
 * - Contraseña mínimo 8 caracteres
 * - Solo el propio usuario o ADMIN puede actualizar perfil
 * - Solo ADMIN puede cambiar roles
 * 
 * Endpoints:
 * - POST   /api/users/register       - Registro de nuevo usuario
 * - POST   /api/users/login          - Login de usuario
 * - GET    /api/users/profile        - Obtiene perfil del usuario autenticado
 * - GET    /api/users/:id            - Obtiene perfil público de un usuario
 * - PUT    /api/users/:id            - Actualiza perfil
 * - DELETE /api/users/:id            - Elimina cuenta (soft delete)
 * - GET    /api/users                - Lista usuarios (ADMIN)
 */
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * POST /api/users/register
   * Registro de nuevo usuario
   */
  async register(req: any, res: any): Promise<void> {
    try {
      const dto: CreateUserDto = req.body;
      const user = await this.userService.create(dto);

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: user,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * POST /api/users/login
   * Login de usuario
   * Retorna usuario y token JWT
   */
  async login(req: any, res: any): Promise<void> {
    try {
      const dto: LoginDto = req.body;
      const result = await this.userService.login(dto);

      res.status(200).json({
        success: true,
        message: 'Login exitoso',
        data: result,
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * GET /api/users/profile
   * Obtiene perfil completo del usuario autenticado
   */
  async getProfile(req: any, res: any): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
        });
        return;
      }

      const user = await this.userService.findById(userId);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Usuario no encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * GET /api/users/:id
   * Obtiene perfil público de un usuario
   */
  async findById(req: any, res: any): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.userService.findById(id);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Usuario no encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * GET /api/users
   * Lista todos los usuarios (ADMIN)
   */
  async findAll(req: any, res: any): Promise<void> {
    try {
      const filter: FilterUsersDto = {
        role: req.query.role,
        search: req.query.search,
        sortBy: req.query.sortBy || 'createdAt',
        sortOrder: req.query.sortOrder || 'desc',
        page: req.query.page ? parseInt(req.query.page) : 1,
        limit: req.query.limit ? parseInt(req.query.limit) : 20,
      };

      const result = await this.userService.findAll(filter);

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
   * PUT /api/users/:id
   * Actualiza perfil de usuario
   * 
   * LÓGICA DE NEGOCIO:
   * - Solo el propio usuario o ADMIN puede actualizar
   * - Solo ADMIN puede cambiar roles
   */
  async update(req: any, res: any): Promise<void> {
    try {
      const { id } = req.params;
      const currentUserId = req.user?.id;
      const currentUserRole = req.user?.role;

      // Verificar autorización
      if (currentUserId !== id && currentUserRole !== 'ADMIN') {
        res.status(403).json({
          success: false,
          message: 'No tienes permiso para actualizar este perfil',
        });
        return;
      }

      const dto: UpdateUserDto = req.body;

      // Solo ADMIN puede cambiar roles
      if (dto.role && currentUserRole !== 'ADMIN') {
        res.status(403).json({
          success: false,
          message: 'Solo los administradores pueden cambiar roles',
        });
        return;
      }

      const user = await this.userService.update(id, dto);

      res.status(200).json({
        success: true,
        message: 'Perfil actualizado exitosamente',
        data: user,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  /**
   * DELETE /api/users/:id
   * Elimina cuenta de usuario (soft delete)
   * 
   * LÓGICA DE NEGOCIO:
   * - Solo el propio usuario o ADMIN puede eliminar
   */
  async delete(req: any, res: any): Promise<void> {
    try {
      const { id } = req.params;
      const currentUserId = req.user?.id;
      const currentUserRole = req.user?.role;

      // Verificar autorización
      if (currentUserId !== id && currentUserRole !== 'ADMIN') {
        res.status(403).json({
          success: false,
          message: 'No tienes permiso para eliminar esta cuenta',
        });
        return;
      }

      const deleted = await this.userService.delete(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Usuario no encontrado',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Cuenta eliminada exitosamente',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
