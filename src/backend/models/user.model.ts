import { UserRole } from './enums';

/**
 * Modelo de entidad User
 * Representa un usuario de la plataforma de tracking de series
 */
export class User {
  /**
   * Identificador único del usuario (UUID)
   */
  id: string;

  /**
   * Nombre de usuario único
   * @example "johndoe"
   * @minLength 3
   */
  username: string;

  /**
   * Email del usuario (único)
   * @example "usuario@ejemplo.com"
   */
  email: string;

  /**
   * Contraseña hasheada (bcrypt)
   * @minLength 8
   */
  password: string;

  /**
   * Nombre visible en el perfil
   * @example "John Doe"
   */
  displayName: string;

  /**
   * Biografía del usuario (opcional)
   * @maxLength 500
   */
  bio?: string;

  /**
   * URL del avatar del usuario (opcional)
   * @example "https://example.com/avatar.jpg"
   */
  avatar?: string;

  /**
   * Rol del usuario en el sistema
   * @default UserRole.USER
   */
  role: UserRole;

  /**
   * Indica si el usuario está activo
   * @default true
   */
  isActive: boolean;

  /**
   * Fecha de creación del usuario
   */
  createdAt: Date;

  /**
   * Fecha de última actualización
   */
  updatedAt: Date;

  constructor(data: Partial<User>) {
    this.id = data.id || '';
    this.username = data.username || '';
    this.email = data.email || '';
    this.password = data.password || '';
    this.displayName = data.displayName || '';
    this.bio = data.bio;
    this.avatar = data.avatar;
    this.role = data.role || UserRole.USER;
    this.isActive = data.isActive ?? true;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  /**
   * Obtiene el nombre de visualización o username como fallback
   */
  get displayNameOrUsername(): string {
    return this.displayName || this.username;
  }

  /**
   * Verifica si el usuario es administrador
   */
  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  /**
   * Verifica si el usuario es cliente
   */
  isCustomer(): boolean {
    return this.role === UserRole.CUSTOMER;
  }
}
