import { Series } from '../models/series.model';
import { FilterSeriesDto, SeriesResponseDto, SeriesSummaryDto } from '../dtos/series.dto';
import { PageResponseDto } from '../dtos/common.dto';

/**
 * Repositorio para la gestión de Series
 * Define las operaciones de acceso a datos para la entidad Series
 */
export interface SeriesRepository {
  // ============================================
  // CRUD Básico
  // ============================================
  
  /**
   * Crea una nueva serie
   * @param series - Datos de la serie a crear
   * @returns Serie creada con ID generado
   */
  create(series: Series): Promise<Series>;

  /**
   * Busca una serie por su ID
   * @param id - ID de la serie
   * @returns Serie encontrada o null
   */
  findById(id: string): Promise<Series | null>;

  /**
   * Busca una serie por su TMDB ID
   * @param tmdbId - ID de TMDB
   * @returns Serie encontrada o null
   */
  findByTmdbId(tmdbId: string): Promise<Series | null>;

  /**
   * Busca una serie por su IMDb ID
   * @param imdbId - ID de IMDb
   * @returns Serie encontrada o null
   */
  findByImdbId(imdbId: string): Promise<Series | null>;

  /**
   * Actualiza una serie existente
   * @param id - ID de la serie
   * @param series - Datos actualizados
   * @returns Serie actualizada o null si no existe
   */
  update(id: string, series: Partial<Series>): Promise<Series | null>;

  /**
   * Elimina una serie (soft delete)
   * @param id - ID de la serie
   * @returns true si se eliminó, false si no existe
   */
  delete(id: string): Promise<boolean>;

  // ============================================
  // Consultas de Búsqueda y Filtrado
  // ============================================

  /**
   * Obtiene todas las series con filtros y paginación
   * @param filter - Filtros a aplicar
   * @returns Listado paginado de series
   */
  findAll(filter: FilterSeriesDto): Promise<PageResponseDto<SeriesSummaryDto>>;

  /**
   * Busca series por título (búsqueda parcial)
   * @param title - Título o parte del título
   * @returns Lista de series encontradas
   */
  findByTitle(title: string): Promise<Series[]>;

  /**
   * Busca series por género
   * @param genreId - ID del género
   * @param page - Página actual
   * @param limit - Número de resultados por página
   * @returns Listado paginado de series del género
   */
  findByGenre(genreId: string, page: number, limit: number): Promise<PageResponseDto<SeriesSummaryDto>>;

  /**
   * Busca series por múltiples géneros
   * @param genreIds - IDs de los géneros
   * @returns Series que tienen todos esos géneros
   */
  findByGenres(genreIds: string[]): Promise<Series[]>;

  /**
   * Busca series por estado
   * @param status - Estado de la serie
   * @returns Lista de series en ese estado
   */
  findByStatus(status: string): Promise<Series[]>;

  /**
   * Busca series por país de origen
   * @param country - Código del país
   * @returns Lista de series de ese país
   */
  findByCountry(country: string): Promise<Series[]>;

  /**
   * Busca series por año de estreno
   * @param year - Año de estreno
   * @returns Lista de series de ese año
   */
  findByReleaseYear(year: number): Promise<Series[]>;

  // ============================================
  // Consultas de Top/Populares
  // ============================================

  /**
   * Obtiene las series mejor valoradas
   * @param limit - Número de series a devolver
   * @param minRatings - Mínimo de valoraciones requeridas
   * @returns Series con mejor rating
   */
  getTopRated(limit: number, minRatings?: number): Promise<SeriesSummaryDto[]>;

  /**
   * Obtiene las series más populares (por número de valoraciones)
   * @param limit - Número de series a devolver
   * @returns Series con más valoraciones
   */
  getMostRated(limit: number): Promise<SeriesSummaryDto[]>;

  /**
   * Obtiene series recientemente agregadas
   * @param limit - Número de series a devolver
   * @returns Series añadidas recientemente a la plataforma
   */
  getRecentlyAdded(limit: number): Promise<SeriesSummaryDto[]>;

  /**
   * Obtiene series próximas a estrenar
   * @param limit - Número de series a devolver
   * @returns Series con fecha de estreno futura
   */
  getUpcoming(limit: number): Promise<SeriesSummaryDto[]>;

  /**
   * Obtiene series actualmente en emisión
   * @param limit - Número de series a devolver
   * @returns Series con estado RETURNING
   */
  getCurrentlyAiring(limit: number): Promise<SeriesSummaryDto[]>;

  // ============================================
  // Estadísticas y Agregaciones
  // ============================================

  /**
   * Cuenta el total de series en la plataforma
   * @returns Número total de series
   */
  count(): Promise<number>;

  /**
   * Cuenta series por género
   * @param genreId - ID del género
   * @returns Número de series en ese género
   */
  countByGenre(genreId: string): Promise<number>;

  /**
   * Cuenta series por estado
   * @param status - Estado de la serie
   * @returns Número de series en ese estado
   */
  countByStatus(status: string): Promise<number>;

  /**
   * Obtiene estadísticas generales de series
   * @returns Objeto con estadísticas (total, por estado, rating promedio)
   */
  getStatistics(): Promise<{
    total: number;
    byStatus: Record<string, number>;
    averageRating: number;
    totalRatings: number;
  }>;

  // ============================================
  // Relaciones con otras entidades
  // ============================================

  /**
   * Obtiene los géneros de una serie
   * @param seriesId - ID de la serie
   * @returns Lista de géneros asociados
   */
  getGenres(seriesId: string): Promise<any[]>;

  /**
   * Asocia un género a una serie
   * @param seriesId - ID de la serie
   * @param genreId - ID del género
   * @returns true si se asoció correctamente
   */
  addGenre(seriesId: string, genreId: string): Promise<boolean>;

  /**
   * Elimina un género de una serie
   * @param seriesId - ID de la serie
   * @param genreId - ID del género
   * @returns true si se eliminó correctamente
   */
  removeGenre(seriesId: string, genreId: string): Promise<boolean>;

  /**
   * Actualiza el rating promedio de una serie
   * @param seriesId - ID de la serie
   * @returns Serie con rating actualizado
   */
  updateAverageRating(seriesId: string): Promise<Series | null>;
}
