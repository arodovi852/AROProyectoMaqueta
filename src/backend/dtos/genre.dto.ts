/**
 * DTO para crear un nuevo género
 */
export interface CreateGenreDto {
  name: string;
}

/**
 * DTO para actualizar un género
 */
export interface UpdateGenreDto {
  name?: string;
}

/**
 * DTO de respuesta de género
 */
export interface GenreResponseDto {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
}

/**
 * DTO de respuesta con estadísticas
 */
export interface GenreWithStatsDto extends GenreResponseDto {
  seriesCount: number; // Número de series en este género
}
