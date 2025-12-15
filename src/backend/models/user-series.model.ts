/**
 * Modelo de entidad UserSeries
 * Almacena las series que el usuario ha visto y su valoración
 */
export class UserSeries {
  /**
   * Identificador único (UUID)
   */
  id: string;

  /**
   * ID del usuario
   */
  userId: string;

  /**
   * ID de la serie
   */
  seriesId: string;

  /**
   * Valoración del usuario (0-10)
   * @minimum 0
   * @maximum 10
   */
  rating?: number;

  /**
   * Indica si el usuario ha visto la serie
   * @default false
   */
  isWatched: boolean;

  /**
   * Fecha en que se marcó como vista
   */
  watchedAt?: Date;

  /**
   * Fecha de creación del registro
   */
  createdAt: Date;

  /**
   * Fecha de última actualización
   */
  updatedAt: Date;

  constructor(data: Partial<UserSeries>) {
    this.id = data.id || '';
    this.userId = data.userId || '';
    this.seriesId = data.seriesId || '';
    this.rating = data.rating;
    this.isWatched = data.isWatched ?? false;
    this.watchedAt = data.watchedAt;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  /**
   * Verifica si la serie tiene valoración
   */
  hasRating(): boolean {
    return this.rating !== undefined && this.rating !== null;
  }

  /**
   * Marca la serie como vista
   */
  markAsWatched(): void {
    this.isWatched = true;
    this.watchedAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Actualiza la valoración de la serie
   */
  updateRating(rating: number): void {
    if (rating < 0 || rating > 10) {
      throw new Error('El rating debe estar entre 0 y 10');
    }
    
    if (!this.isWatched) {
      throw new Error('No se puede valorar una serie que no se ha visto');
    }

    this.rating = rating;
    this.updatedAt = new Date();
  }

  /**
   * Obtiene la valoración en estrellas (0-5)
   */
  get ratingInStars(): number {
    return this.rating ? this.rating / 2 : 0;
  }

  /**
   * Verifica si la valoración es alta (>= 8.0)
   */
  isHighRating(): boolean {
    return this.rating !== undefined && this.rating >= 8.0;
  }

  /**
   * Verifica si fue vista recientemente (últimos 30 días)
   */
  isRecentlyWatched(): boolean {
    if (!this.watchedAt) return false;
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return this.watchedAt >= thirtyDaysAgo;
  }
}
