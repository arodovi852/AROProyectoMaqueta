import { Category } from '../models/category.model';

/**
 * Interfaz del repositorio de categorías
 * Define todas las operaciones de acceso a datos para categorías
 */
export interface ICategoryRepository {
  // CRUD básico
  /**
   * Crea una nueva categoría
   */
  create(category: Category): Promise<Category>;

  /**
   * Busca una categoría por su ID
   */
  findById(id: string): Promise<Category | null>;

  /**
   * Busca todas las categorías
   */
  findAll(): Promise<Category[]>;

  /**
   * Actualiza una categoría existente
   */
  update(id: string, category: Partial<Category>): Promise<Category>;

  /**
   * Elimina una categoría
   */
  delete(id: string): Promise<boolean>;

  // Consultas personalizadas
  /**
   * Busca una categoría por su slug
   * @param slug - Slug de la categoría
   */
  findBySlug(slug: string): Promise<Category | null>;

  /**
   * Verifica si existe una categoría con el slug dado
   * @param slug - Slug a verificar
   */
  existsBySlug(slug: string): Promise<boolean>;

  /**
   * Busca categorías activas
   */
  findActiveCategories(): Promise<Category[]>;

  /**
   * Busca todas las categorías raíz (sin padre)
   */
  findRootCategories(): Promise<Category[]>;

  /**
   * Busca las subcategorías de una categoría padre
   * @param parentId - ID de la categoría padre
   */
  findByParentId(parentId: string): Promise<Category[]>;

  /**
   * Busca categorías activas de nivel raíz
   */
  findActiveRootCategories(): Promise<Category[]>;

  /**
   * Obtiene el árbol completo de categorías
   * Devuelve categorías raíz con sus subcategorías anidadas
   */
  getCategoryTree(): Promise<Category[]>;

  /**
   * Busca categorías por nombre (búsqueda parcial)
   * @param searchTerm - Término de búsqueda
   */
  searchByName(searchTerm: string): Promise<Category[]>;

  /**
   * Cuenta el número de productos en una categoría
   * @param categoryId - ID de la categoría
   */
  countProducts(categoryId: string): Promise<number>;

  /**
   * Obtiene categorías ordenadas por displayOrder
   */
  findOrderedByDisplay(): Promise<Category[]>;

  /**
   * Actualiza el orden de visualización
   * @param categoryId - ID de la categoría
   * @param newOrder - Nuevo orden
   */
  updateDisplayOrder(categoryId: string, newOrder: number): Promise<boolean>;

  /**
   * Verifica si una categoría tiene productos asociados
   * @param categoryId - ID de la categoría
   */
  hasProducts(categoryId: string): Promise<boolean>;

  /**
   * Verifica si una categoría tiene subcategorías
   * @param categoryId - ID de la categoría
   */
  hasSubcategories(categoryId: string): Promise<boolean>;

  /**
   * Obtiene la ruta completa de una categoría (breadcrumb)
   * @param categoryId - ID de la categoría
   * @returns Array de categorías desde la raíz hasta la categoría dada
   */
  getCategoryPath(categoryId: string): Promise<Category[]>;

  /**
   * Cuenta el total de categorías
   */
  count(): Promise<number>;

  /**
   * Obtiene categorías con más productos
   * @param limit - Número de categorías a obtener
   */
  getTopCategoriesByProducts(limit: number): Promise<Array<{
    category: Category;
    productCount: number;
  }>>;
}
