import { UserRole } from '../models/enums';

/**
 * DTO para crear un usuario
 */
export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  displayName: string;
  bio?: string;
  avatar?: string;
}

/**
 * DTO para actualizar un usuario
 */
export interface UpdateUserDto {
  displayName?: string;
  bio?: string;
  avatar?: string;
}

/**
 * DTO de respuesta de usuario
 */
export interface UserResponseDto {
  id: string;
  username: string;
  email: string;
  displayName: string;
  bio?: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * DTO de respuesta simplificado (para referencias)
 */
export interface UserSummaryDto {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
}

/**
 * DTO para respuesta de perfil con estadísticas
 */
export interface UserProfileDto extends UserResponseDto {
  stats: {
    watchedSeriesCount: number;
    watchlistCount: number;
    reviewsCount: number;
    listsCount: number;
    averageRating: number;
  };
}

/**
 * DTO para login
 */
export interface LoginDto {
  email: string;
  password: string;
}

/**
 * DTO de respuesta de autenticación
 */
export interface AuthResponseDto {
  user: UserResponseDto;
  token: string;
  expiresIn: number;
}
