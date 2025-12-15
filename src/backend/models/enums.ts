/**
 * Enumeraciones utilizadas en la plataforma de tracking de series
 */

/**
 * Roles de usuario en el sistema
 */
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

/**
 * Estados posibles de una serie de televisión
 */
export enum SeriesStatus {
  RETURNING = 'returning',      // Serie en emisión con más temporadas confirmadas
  ENDED = 'ended',               // Serie finalizada
  CANCELLED = 'cancelled',       // Serie cancelada
  IN_PRODUCTION = 'in_production' // Serie en producción/próximo estreno
}

/**
 * Estados posibles de un mensaje de contacto
 */
export enum ContactStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed'
}
