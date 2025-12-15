/**
 * DTO para añadir un item al carrito
 */
export interface AddToCartDto {
  userId: string;
  productId: string;
  quantity: number;
}

/**
 * DTO para actualizar la cantidad de un item del carrito
 */
export interface UpdateCartItemDto {
  quantity: number;
}

/**
 * DTO de respuesta de item del carrito (con datos del producto)
 */
export interface CartItemResponseDto {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  productStock: number;
  quantity: number;
  subtotal: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * DTO de respuesta del carrito completo
 */
export interface CartResponseDto {
  userId: string;
  items: CartItemResponseDto[];
  itemCount: number;
  totalItems: number; // Suma de cantidades
  subtotal: number;
  tax: number;
  total: number;
  updatedAt: Date;
}

/**
 * DTO para resumen del carrito
 */
export interface CartSummaryDto {
  itemCount: number;
  totalItems: number;
  subtotal: number;
  total: number;
}
