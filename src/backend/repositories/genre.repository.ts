import { Genre } from '../models/genre.model';

/**
 * Repositorio para la gestión de Géneros
 */
export interface GenreRepository {
  // CRUD Básico
  create(genre: Genre): Promise<Genre>;
  findById(id: string): Promise<Genre | null>;
  findBySlug(slug: string): Promise<Genre | null>;
  findByName(name: string): Promise<Genre | null>;
  findAll(): Promise<Genre[]>;
  update(id: string, genre: Partial<Genre>): Promise<Genre | null>;
  delete(id: string): Promise<boolean>;

  // Consultas específicas
  findGenresWithSeriesCount(): Promise<Array<Genre & { seriesCount: number }>>;
  canDelete(id: string): Promise<boolean>; // Verifica si tiene series asociadas
}
