/**
 * Modelo de entidad Review
 * Representa una reseña escrita por un usuario sobre una serie
 */
export class Review {
  /**
   * Identificador único de la reseña (UUID)
   */
  id: string;

  /**
   * ID del usuario autor
   */
  userId: string;

  /**
   * ID de la serie
   */
  seriesId: string;

  /**
   * Título de la reseña
   * @example "Una obra maestra del drama televisivo"
   */
  title: string;

  /**
   * Contenido de la reseña
   * @minLength 50
   */
  content: string;

  /**
   * Valoración asociada (opcional, sincronizada con UserSeries)
   * @minimum 0
   * @maximum 10
   */
  rating?: number;

  /**
   * Indica si contiene spoilers
   * @default false
   */
  isSpoiler: boolean;

  /**
   * Número de "me gusta"
   * @default 0
   */
  likes: number;

  /**
   * Fecha de creación de la reseña
   */
  createdAt: Date;

  /**
   * Fecha de última actualización
   */
  updatedAt: Date;

  constructor(data: Partial<Review>) {
    this.id = data.id || '';
    this.userId = data.userId || '';
    this.seriesId = data.seriesId || '';
    this.title = data.title || '';
    this.content = data.content || '';
    this.rating = data.rating;
    this.isSpoiler = data.isSpoiler ?? false;
    this.likes = data.likes || 0;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  /**
   * Valida que el contenido cumpla con el mínimo de caracteres
   */
  validateContent(): boolean {
    return this.content.length >= 50;
  }

  /**
   * Incrementa el contador de "me gusta"
   */
  addLike(): void {
    this.likes += 1;
  }

  /**
   * Decrementa el contador de "me gusta"
   */
  removeLike(): void {
    if (this.likes > 0) {
      this.likes -= 1;
    }
  }

  /**
   * Verifica si la reseña es popular (>= 10 likes)
   */
  isPopular(): boolean {
    return this.likes >= 10;
  }

  /**
   * Verifica si fue editada recientemente (últimos 7 días)
   */
  wasRecentlyEdited(): boolean {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    return this.updatedAt >= sevenDaysAgo && 
           this.updatedAt.getTime() !== this.createdAt.getTime();
  }

  /**
   * Obtiene un extracto del contenido (primeros 100 caracteres)
   */
  get excerpt(): string {
    return this.content.length > 100 
      ? this.content.substring(0, 100) + '...'
      : this.content;
  }

  /**
   * Calcula el número de palabras en la reseña
   */
  get wordCount(): number {
    return this.content.trim().split(/\s+/).length;
  }
}
