/**
 * DTO para crear una categoría
 */
export interface CreateCategoryDto {
  name: string;
  description: string;
  slug?: string;
  parentId?: string;
  displayOrder?: number;
}

/**
 * DTO para actualizar una categoría
 */
export interface UpdateCategoryDto {
  name?: string;
  description?: string;
  slug?: string;
  parentId?: string;
  isActive?: boolean;
  displayOrder?: number;
}

/**
 * DTO de respuesta de categoría
 */
export interface CategoryResponseDto {
  id: string;
  name: string;
  description: string;
  slug: string;
  parentId?: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
  productCount?: number; // Contador de productos en la categoría
  subcategories?: CategoryResponseDto[]; // Subcategorías hijas
}

/**
 * DTO para árbol de categorías
 */
export interface CategoryTreeDto {
  id: string;
  name: string;
  slug: string;
  children: CategoryTreeDto[];
  productCount: number;
}
