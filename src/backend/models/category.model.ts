/**
 * Modelo de entidad Category
 * Representa una categoría de productos con soporte para jerarquía (categorías padre-hijo)
 */
export class Category {
  /**
   * Identificador único de la categoría (UUID)
   */
  id: string;

  /**
   * Nombre de la categoría
   * @example "Cloud Computing"
   */
  name: string;

  /**
   * Descripción de la categoría
   */
  description: string;

  /**
   * Slug para URLs amigables
   * @example "cloud-computing"
   */
  slug: string;

  /**
   * ID de la categoría padre (para subcategorías)
   * null si es una categoría raíz
   */
  parentId?: string;

  /**
   * Indica si la categoría está activa y visible
   * @default true
   */
  isActive: boolean;

  /**
   * Orden de visualización
   * @default 0
   */
  displayOrder: number;

  /**
   * Fecha de creación
   */
  createdAt: Date;

  /**
   * Fecha de última actualización
   */
  updatedAt: Date;

  constructor(data: Partial<Category>) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.description = data.description || '';
    this.slug = data.slug || this.generateSlug(data.name || '');
    this.parentId = data.parentId;
    this.isActive = data.isActive ?? true;
    this.displayOrder = data.displayOrder ?? 0;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
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
   * Verifica si es una categoría raíz
   */
  isRoot(): boolean {
    return !this.parentId;
  }
}
