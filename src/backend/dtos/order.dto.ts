import { OrderStatus } from '../models/enums';

/**
 * DTO para crear un pedido
 */
export interface CreateOrderDto {
  userId: string;
  items: CreateOrderItemDto[];
  shippingAddress: string;
  billingAddress: string;
  notes?: string;
  shippingCost?: number;
  discountAmount?: number;
}

/**
 * DTO para crear un item de pedido
 */
export interface CreateOrderItemDto {
  productId: string;
  quantity: number;
}

/**
 * DTO para actualizar un pedido
 */
export interface UpdateOrderDto {
  status?: OrderStatus;
  shippingAddress?: string;
  billingAddress?: string;
  notes?: string;
  shippingCost?: number;
  discountAmount?: number;
}

/**
 * DTO de respuesta de item de pedido
 */
export interface OrderItemResponseDto {
  id: string;
  productId: string;
  productName: string;
  productSku?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discount: number;
  createdAt: Date;
}

/**
 * DTO de respuesta de pedido
 */
export interface OrderResponseDto {
  id: string;
  userId: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItemResponseDto[];
  subtotal: number;
  taxAmount: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;
  shippingAddress: string;
  billingAddress: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
}

/**
 * DTO para listado de pedidos (versión simplificada)
 */
export interface OrderListItemDto {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  itemCount: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * DTO para filtros de pedidos
 */
export interface OrderFilterDto {
  userId?: string;
  status?: OrderStatus;
  dateFrom?: Date;
  dateTo?: Date;
  minAmount?: number;
  maxAmount?: number;
  sortBy?: 'createdAt' | 'totalAmount' | 'status';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

/**
 * DTO de respuesta paginada de pedidos
 */
export interface OrderPageResponseDto {
  orders: OrderListItemDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * DTO para cambiar estado de pedido
 */
export interface ChangeOrderStatusDto {
  orderId: string;
  status: OrderStatus;
  notes?: string;
}

/**
 * DTO para estadísticas de pedidos
 */
export interface OrderStatsDto {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<OrderStatus, number>;
  recentOrders: OrderListItemDto[];
}
