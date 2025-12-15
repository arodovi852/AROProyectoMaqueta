/**
 * Modelo de entidad Genre
 * Representa un género de series (Drama, Comedy, Sci-Fi, etc.)
 */
export class Genre {
  /**
   * Identificador único del género (UUID)
   */
  id: string;

  /**
   * Nombre del género
   * @example "Drama"
   */
  name: string;

  /**
   * Slug URL-friendly
   * @example "drama"
   */
  slug: string;

  /**
   * Fecha de creación del registro
   */
  createdAt: Date;

  constructor(data: Partial<Genre>) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.slug = data.slug || this.generateSlug(data.name || '');
    this.createdAt = data.createdAt || new Date();
  }

  /**
   * Genera un slug a partir del nombre
   */
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Actualiza el slug cuando cambia el nombre
   */
  updateSlug(): void {
    this.slug = this.generateSlug(this.name);
  }
}
