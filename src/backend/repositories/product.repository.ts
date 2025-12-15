import { Product } from '../models/product.model';
import { ProductFilterDto } from '../dtos/product.dto';

/**
 * Interfaz del repositorio de productos
 * Define todas las operaciones de acceso a datos para productos
 */
export interface IProductRepository {
  // CRUD básico
  /**
   * Crea un nuevo producto
   */
  create(product: Product): Promise<Product>;

  /**
   * Busca un producto por su ID
   */
  findById(id: string): Promise<Product | null>;

  /**
   * Busca todos los productos
   */
  findAll(): Promise<Product[]>;

  /**
   * Actualiza un producto existente
   */
  update(id: string, product: Partial<Product>): Promise<Product>;

  /**
   * Elimina un producto
   */
  delete(id: string): Promise<boolean>;

  // Consultas personalizadas
  /**
   * Busca un producto por su SKU
   * @param sku - SKU del producto
   */
  findBySku(sku: string): Promise<Product | null>;

  /**
   * Verifica si existe un producto con el SKU dado
   * @param sku - SKU a verificar
   */
  existsBySku(sku: string): Promise<boolean>;

  /**
   * Busca productos por categoría
   * @param categoryId - ID de la categoría
   */
  findByCategoryId(categoryId: string): Promise<Product[]>;

  /**
   * Busca productos activos
   */
  findActiveProducts(): Promise<Product[]>;

  /**
   * Busca productos destacados
   */
  findFeaturedProducts(): Promise<Product[]>;

  /**
   * Busca productos en stock
   */
  findInStockProducts(): Promise<Product[]>;

  /**
   * Busca productos sin stock
   */
  findOutOfStockProducts(): Promise<Product[]>;

  /**
   * Busca productos por rango de precio
   * @param minPrice - Precio mínimo
   * @param maxPrice - Precio máximo
   */
  findByPriceRange(minPrice: number, maxPrice: number): Promise<Product[]>;

  /**
   * Busca productos por nombre (búsqueda parcial)
   * @param searchTerm - Término de búsqueda
   */
  searchByName(searchTerm: string): Promise<Product[]>;

  /**
   * Busca productos por nombre o descripción
   * @param searchTerm - Término de búsqueda
   */
  searchFullText(searchTerm: string): Promise<Product[]>;

  /**
   * Busca productos por etiquetas
   * @param tags - Array de etiquetas
   */
  findByTags(tags: string[]): Promise<Product[]>;

  /**
   * Busca productos con filtros avanzados
   * @param filters - Objeto con filtros
   */
  findWithFilters(filters: ProductFilterDto): Promise<{
    products: Product[];
    total: number;
  }>;

  /**
   * Obtiene productos con paginación
   * @param page - Número de página
   * @param limit - Productos por página
   * @param sortBy - Campo por el que ordenar
   * @param sortOrder - Orden ascendente o descendente
   */
  findWithPagination(
    page: number,
    limit: number,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc'
  ): Promise<{
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
  }>;

  /**
   * Obtiene los productos más vendidos
   * @param limit - Número de productos a obtener
   */
  getBestSellers(limit: number): Promise<Product[]>;

  /**
   * Obtiene los productos más recientes
   * @param limit - Número de productos a obtener
   */
  getRecentProducts(limit: number): Promise<Product[]>;

  /**
   * Obtiene productos relacionados (misma categoría)
   * @param productId - ID del producto
   * @param limit - Número de productos a obtener
   */
  getRelatedProducts(productId: string, limit: number): Promise<Product[]>;

  /**
   * Actualiza el stock de un producto
   * @param productId - ID del producto
   * @param quantity - Cantidad a añadir o restar
   */
  updateStock(productId: string, quantity: number): Promise<boolean>;

  /**
   * Reduce el stock de un producto (para pedidos)
   * @param productId - ID del producto
   * @param quantity - Cantidad a reducir
   */
  reduceStock(productId: string, quantity: number): Promise<boolean>;

  /**
   * Aumenta el stock de un producto (para cancelaciones)
   * @param productId - ID del producto
   * @param quantity - Cantidad a aumentar
   */
  increaseStock(productId: string, quantity: number): Promise<boolean>;

  /**
   * Cuenta el total de productos
   */
  count(): Promise<number>;

  /**
   * Cuenta productos por categoría
   * @param categoryId - ID de la categoría
   */
  countByCategory(categoryId: string): Promise<number>;

  /**
   * Obtiene el precio promedio de productos
   */
  getAveragePrice(): Promise<number>;

  /**
   * Obtiene el precio promedio por categoría
   * @param categoryId - ID de la categoría
   */
  getAveragePriceByCategory(categoryId: string): Promise<number>;

  /**
   * Obtiene el valor total del inventario
   */
  getTotalInventoryValue(): Promise<number>;

  /**
   * Busca productos con stock bajo
   * @param threshold - Umbral de stock bajo
   */
  findLowStockProducts(threshold: number): Promise<Product[]>;

  /**
   * Activa o desactiva un producto
   * @param productId - ID del producto
   * @param isActive - Estado activo/inactivo
   */
  setActiveStatus(productId: string, isActive: boolean): Promise<boolean>;

  /**
   * Marca o desmarca un producto como destacado
   * @param productId - ID del producto
   * @param isFeatured - Estado destacado
   */
  setFeaturedStatus(productId: string, isFeatured: boolean): Promise<boolean>;
}
