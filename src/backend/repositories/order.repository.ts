import { Order } from '../models/order.model';
import { OrderStatus } from '../models/enums';
import { OrderFilterDto } from '../dtos/order.dto';

/**
 * Interfaz del repositorio de pedidos
 * Define todas las operaciones de acceso a datos para pedidos
 */
export interface IOrderRepository {
  // CRUD básico
  /**
   * Crea un nuevo pedido
   */
  create(order: Order): Promise<Order>;

  /**
   * Busca un pedido por su ID
   */
  findById(id: string): Promise<Order | null>;

  /**
   * Busca todos los pedidos
   */
  findAll(): Promise<Order[]>;

  /**
   * Actualiza un pedido existente
   */
  update(id: string, order: Partial<Order>): Promise<Order>;

  /**
   * Elimina un pedido
   */
  delete(id: string): Promise<boolean>;

  // Consultas personalizadas
  /**
   * Busca un pedido por su número de pedido
   * @param orderNumber - Número de pedido
   */
  findByOrderNumber(orderNumber: string): Promise<Order | null>;

  /**
   * Busca pedidos de un usuario
   * @param userId - ID del usuario
   */
  findByUserId(userId: string): Promise<Order[]>;

  /**
   * Busca pedidos por estado
   * @param status - Estado del pedido
   */
  findByStatus(status: OrderStatus): Promise<Order[]>;

  /**
   * Busca pedidos de un usuario por estado
   * @param userId - ID del usuario
   * @param status - Estado del pedido
   */
  findByUserIdAndStatus(userId: string, status: OrderStatus): Promise<Order[]>;

  /**
   * Busca pedidos en un rango de fechas
   * @param startDate - Fecha de inicio
   * @param endDate - Fecha de fin
   */
  findByDateRange(startDate: Date, endDate: Date): Promise<Order[]>;

  /**
   * Busca pedidos por rango de importe
   * @param minAmount - Importe mínimo
   * @param maxAmount - Importe máximo
   */
  findByAmountRange(minAmount: number, maxAmount: number): Promise<Order[]>;

  /**
   * Busca pedidos con filtros avanzados
   * @param filters - Objeto con filtros
   */
  findWithFilters(filters: OrderFilterDto): Promise<{
    orders: Order[];
    total: number;
  }>;

  /**
   * Obtiene pedidos con paginación
   * @param page - Número de página
   * @param limit - Pedidos por página
   * @param sortBy - Campo por el que ordenar
   * @param sortOrder - Orden ascendente o descendente
   */
  findWithPagination(
    page: number,
    limit: number,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc'
  ): Promise<{
    orders: Order[];
    total: number;
    page: number;
    totalPages: number;
  }>;

  /**
   * Obtiene los pedidos más recientes
   * @param limit - Número de pedidos a obtener
   */
  getRecentOrders(limit: number): Promise<Order[]>;

  /**
   * Obtiene pedidos pendientes
   */
  getPendingOrders(): Promise<Order[]>;

  /**
   * Obtiene pedidos en procesamiento
   */
  getProcessingOrders(): Promise<Order[]>;

  /**
   * Obtiene pedidos enviados
   */
  getShippedOrders(): Promise<Order[]>;

  /**
   * Obtiene pedidos entregados
   */
  getDeliveredOrders(): Promise<Order[]>;

  /**
   * Obtiene pedidos cancelados
   */
  getCancelledOrders(): Promise<Order[]>;

  /**
   * Actualiza el estado de un pedido
   * @param orderId - ID del pedido
   * @param newStatus - Nuevo estado
   */
  updateStatus(orderId: string, newStatus: OrderStatus): Promise<boolean>;

  /**
   * Cuenta el total de pedidos
   */
  count(): Promise<number>;

  /**
   * Cuenta pedidos por estado
   * @param status - Estado del pedido
   */
  countByStatus(status: OrderStatus): Promise<number>;

  /**
   * Cuenta pedidos de un usuario
   * @param userId - ID del usuario
   */
  countByUserId(userId: string): Promise<number>;

  /**
   * Calcula el total de ventas
   */
  getTotalRevenue(): Promise<number>;

  /**
   * Calcula el total de ventas en un período
   * @param startDate - Fecha de inicio
   * @param endDate - Fecha de fin
   */
  getRevenueByDateRange(startDate: Date, endDate: Date): Promise<number>;

  /**
   * Calcula el valor promedio de pedidos
   */
  getAverageOrderValue(): Promise<number>;

  /**
   * Obtiene estadísticas de pedidos por estado
   */
  getOrderStatsByStatus(): Promise<Record<OrderStatus, number>>;

  /**
   * Obtiene estadísticas mensuales de ventas
   * @param year - Año
   */
  getMonthlySalesStats(year: number): Promise<Array<{
    month: number;
    totalOrders: number;
    totalRevenue: number;
  }>>;

  /**
   * Obtiene los mejores clientes
   * @param limit - Número de clientes a obtener
   */
  getTopCustomers(limit: number): Promise<Array<{
    userId: string;
    totalOrders: number;
    totalSpent: number;
  }>>;

  /**
   * Busca pedidos que contienen un producto específico
   * @param productId - ID del producto
   */
  findOrdersWithProduct(productId: string): Promise<Order[]>;

  /**
   * Verifica si un pedido puede ser cancelado
   * @param orderId - ID del pedido
   */
  canBeCancelled(orderId: string): Promise<boolean>;

  /**
   * Obtiene pedidos que necesitan atención (pendientes > X días)
   * @param days - Número de días
   */
  getOrdersNeedingAttention(days: number): Promise<Order[]>;
}
