/**
 * DTO para crear un producto
 */
export interface CreateProductDto {
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  stock: number;
  categoryId: string;
  imageUrl: string;
  icon?: string;
  color?: string;
  features: string[];
  isFeatured?: boolean;
  sku?: string;
  weight?: number;
  tags?: string[];
}

/**
 * DTO para actualizar un producto
 */
export interface UpdateProductDto {
  name?: string;
  description?: string;
  shortDescription?: string;
  price?: number;
  stock?: number;
  categoryId?: string;
  imageUrl?: string;
  icon?: string;
  color?: string;
  features?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
  sku?: string;
  weight?: number;
  tags?: string[];
}

/**
 * DTO de respuesta de producto
 */
export interface ProductResponseDto {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  formattedPrice: string;
  stock: number;
  isInStock: boolean;
  categoryId: string;
  categoryName?: string;
  imageUrl: string;
  icon?: string;
  color?: string;
  features: string[];
  isActive: boolean;
  isFeatured: boolean;
  sku?: string;
  weight?: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * DTO para listado de productos (versión simplificada)
 */
export interface ProductListItemDto {
  id: string;
  name: string;
  shortDescription: string;
  price: number;
  formattedPrice: string;
  imageUrl: string;
  icon?: string;
  color?: string;
  isInStock: boolean;
  isFeatured: boolean;
  categoryName: string;
}

/**
 * DTO para filtros de productos
 */
export interface ProductFilterDto {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isFeatured?: boolean;
  search?: string;
  tags?: string[];
  sortBy?: 'name' | 'price' | 'createdAt' | 'stock';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

/**
 * DTO de respuesta paginada de productos
 */
export interface ProductPageResponseDto {
  products: ProductListItemDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * DTO para actualizar stock
 */
export interface UpdateStockDto {
  productId: string;
  quantity: number;
  operation: 'increase' | 'decrease' | 'set';
}
