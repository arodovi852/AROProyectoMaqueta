/**
 * Modelo de entidad SeriesGenre
 * Tabla de relación muchos a muchos entre Series y Géneros
 */
export class SeriesGenre {
  /**
   * Identificador único de la relación (UUID)
   */
  id: string;

  /**
   * ID de la serie
   */
  seriesId: string;

  /**
   * ID del género
   */
  genreId: string;

  /**
   * Fecha de creación de la relación
   */
  createdAt: Date;

  constructor(data: Partial<SeriesGenre>) {
    this.id = data.id || '';
    this.seriesId = data.seriesId || '';
    this.genreId = data.genreId || '';
    this.createdAt = data.createdAt || new Date();
  }
}
