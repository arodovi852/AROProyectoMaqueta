import { User } from '../models/user.model';
import { UserRole } from '../models/enums';

/**
 * Interfaz del repositorio de usuarios
 * Define todas las operaciones de acceso a datos para usuarios
 */
export interface IUserRepository {
  // CRUD básico
  /**
   * Crea un nuevo usuario
   */
  create(user: User): Promise<User>;

  /**
   * Busca un usuario por su ID
   */
  findById(id: string): Promise<User | null>;

  /**
   * Busca todos los usuarios
   */
  findAll(): Promise<User[]>;

  /**
   * Actualiza un usuario existente
   */
  update(id: string, user: Partial<User>): Promise<User>;

  /**
   * Elimina un usuario
   */
  delete(id: string): Promise<boolean>;

  // Consultas personalizadas
  /**
   * Busca un usuario por email
   * @param email - Email del usuario
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Verifica si existe un usuario con el email dado
   * @param email - Email a verificar
   */
  existsByEmail(email: string): Promise<boolean>;

  /**
   * Busca usuarios por rol
   * @param role - Rol de usuario
   */
  findByRole(role: UserRole): Promise<User[]>;

  /**
   * Busca usuarios activos
   */
  findActiveUsers(): Promise<User[]>;

  /**
   * Busca usuarios inactivos
   */
  findInactiveUsers(): Promise<User[]>;

  /**
   * Busca usuarios creados en un rango de fechas
   * @param startDate - Fecha de inicio
   * @param endDate - Fecha de fin
   */
  findByDateRange(startDate: Date, endDate: Date): Promise<User[]>;

  /**
   * Busca usuarios por nombre (firstName o lastName)
   * @param searchTerm - Término de búsqueda
   */
  searchByName(searchTerm: string): Promise<User[]>;

  /**
   * Cuenta el total de usuarios
   */
  count(): Promise<number>;

  /**
   * Cuenta usuarios por rol
   * @param role - Rol de usuario
   */
  countByRole(role: UserRole): Promise<number>;

  /**
   * Verifica las credenciales de un usuario
   * @param email - Email del usuario
   * @param password - Contraseña hasheada
   */
  verifyCredentials(email: string, password: string): Promise<User | null>;

  /**
   * Actualiza la contraseña de un usuario
   * @param userId - ID del usuario
   * @param newPassword - Nueva contraseña hasheada
   */
  updatePassword(userId: string, newPassword: string): Promise<boolean>;

  /**
   * Obtiene los últimos N usuarios registrados
   * @param limit - Número de usuarios a obtener
   */
  getRecentUsers(limit: number): Promise<User[]>;

  /**
   * Busca usuarios con paginación
   * @param page - Número de página (empezando en 1)
   * @param limit - Número de resultados por página
   */
  findWithPagination(page: number, limit: number): Promise<{
    users: User[];
    total: number;
    page: number;
    totalPages: number;
  }>;

  /**
   * Activa o desactiva un usuario
   * @param userId - ID del usuario
   * @param isActive - Estado activo/inactivo
   */
  setActiveStatus(userId: string, isActive: boolean): Promise<boolean>;
}
