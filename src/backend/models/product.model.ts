/**
 * Modelo de entidad Product
 * Representa un producto del catálogo
 */
export class Product {
  /**
   * Identificador único del producto (UUID)
   */
  id: string;

  /**
   * Nombre del producto
   * @example "Cloud Enterprise"
   */
  name: string;

  /**
   * Descripción completa del producto
   */
  description: string;

  /**
   * Descripción corta para listados
   * @maxLength 200
   */
  shortDescription: string;

  /**
   * Precio del producto
   * @minimum 0
   */
  price: number;

  /**
   * Stock disponible
   * @minimum 0
   * @default 0
   */
  stock: number;

  /**
   * ID de la categoría a la que pertenece
   */
  categoryId: string;

  /**
   * URL de la imagen principal del producto
   */
  imageUrl: string;

  /**
   * Icono SVG del producto (como string HTML)
   */
  icon?: string;

  /**
   * Color asociado al producto (variable CSS o hex)
   * @example "var(--color-primary)" o "#A264BF"
   */
  color?: string;

  /**
   * Lista de características del producto
   */
  features: string[];

  /**
   * Indica si el producto está activo y visible en el catálogo
   * @default true
   */
  isActive: boolean;

  /**
   * Indica si el producto está destacado
   * @default false
   */
  isFeatured: boolean;

  /**
   * SKU del producto (Stock Keeping Unit)
   */
  sku?: string;

  /**
   * Peso del producto en gramos (para cálculo de envío)
   */
  weight?: number;

  /**
   * Etiquetas para búsqueda y filtrado
   */
  tags: string[];

  /**
   * Fecha de creación
   */
  createdAt: Date;

  /**
   * Fecha de última actualización
   */
  updatedAt: Date;

  constructor(data: Partial<Product>) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.description = data.description || '';
    this.shortDescription = data.shortDescription || '';
    this.price = data.price || 0;
    this.stock = data.stock ?? 0;
    this.categoryId = data.categoryId || '';
    this.imageUrl = data.imageUrl || '';
    this.icon = data.icon;
    this.color = data.color;
    this.features = data.features || [];
    this.isActive = data.isActive ?? true;
    this.isFeatured = data.isFeatured ?? false;
    this.sku = data.sku;
    this.weight = data.weight;
    this.tags = data.tags || [];
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  /**
   * Verifica si el producto está en stock
   */
  isInStock(): boolean {
    return this.stock > 0;
  }

  /**
   * Verifica si hay suficiente stock para una cantidad solicitada
   */
  hasStock(quantity: number): boolean {
    return this.stock >= quantity;
  }

  /**
   * Reduce el stock del producto
   */
  reduceStock(quantity: number): void {
    if (!this.hasStock(quantity)) {
      throw new Error(`Stock insuficiente. Disponible: ${this.stock}, Solicitado: ${quantity}`);
    }
    this.stock -= quantity;
  }

  /**
   * Aumenta el stock del producto
   */
  increaseStock(quantity: number): void {
    this.stock += quantity;
  }

  /**
   * Obtiene el precio formateado
   */
  getFormattedPrice(currency: string = '€'): string {
    return `${this.price.toFixed(2)}${currency}`;
  }
}
