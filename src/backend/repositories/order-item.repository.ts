import { OrderItem } from '../models/order-item.model';

/**
 * Interfaz del repositorio de items de pedido
 * Define todas las operaciones de acceso a datos para items de pedido
 */
export interface IOrderItemRepository {
  // CRUD básico
  /**
   * Crea un nuevo item de pedido
   */
  create(orderItem: OrderItem): Promise<OrderItem>;

  /**
   * Crea múltiples items de pedido
   */
  createMany(orderItems: OrderItem[]): Promise<OrderItem[]>;

  /**
   * Busca un item de pedido por su ID
   */
  findById(id: string): Promise<OrderItem | null>;

  /**
   * Busca todos los items de pedido
   */
  findAll(): Promise<OrderItem[]>;

  /**
   * Actualiza un item de pedido existente
   */
  update(id: string, orderItem: Partial<OrderItem>): Promise<OrderItem>;

  /**
   * Elimina un item de pedido
   */
  delete(id: string): Promise<boolean>;

  // Consultas personalizadas
  /**
   * Busca todos los items de un pedido
   * @param orderId - ID del pedido
   */
  findByOrderId(orderId: string): Promise<OrderItem[]>;

  /**
   * Busca items por producto
   * @param productId - ID del producto
   */
  findByProductId(productId: string): Promise<OrderItem[]>;

  /**
   * Busca items de un pedido específico para un producto
   * @param orderId - ID del pedido
   * @param productId - ID del producto
   */
  findByOrderAndProduct(orderId: string, productId: string): Promise<OrderItem | null>;

  /**
   * Cuenta el número de items en un pedido
   * @param orderId - ID del pedido
   */
  countByOrderId(orderId: string): Promise<number>;

  /**
   * Calcula el total de un pedido sumando sus items
   * @param orderId - ID del pedido
   */
  calculateOrderTotal(orderId: string): Promise<number>;

  /**
   * Obtiene los productos más vendidos
   * @param limit - Número de productos a obtener
   */
  getBestSellingProducts(limit: number): Promise<Array<{
    productId: string;
    productName: string;
    totalQuantity: number;
    totalRevenue: number;
  }>>;

  /**
   * Obtiene estadísticas de ventas de un producto
   * @param productId - ID del producto
   */
  getProductSalesStats(productId: string): Promise<{
    totalOrders: number;
    totalQuantity: number;
    totalRevenue: number;
  }>;

  /**
   * Obtiene la cantidad total vendida de un producto
   * @param productId - ID del producto
   */
  getTotalQuantitySold(productId: string): Promise<number>;

  /**
   * Obtiene los ingresos totales de un producto
   * @param productId - ID del producto
   */
  getTotalRevenueByProduct(productId: string): Promise<number>;

  /**
   * Busca items con descuento
   */
  findItemsWithDiscount(): Promise<OrderItem[]>;

  /**
   * Busca items sin descuento
   */
  findItemsWithoutDiscount(): Promise<OrderItem[]>;

  /**
   * Obtiene el precio promedio de venta de un producto
   * @param productId - ID del producto
   */
  getAverageSalePriceByProduct(productId: string): Promise<number>;

  /**
   * Elimina todos los items de un pedido
   * @param orderId - ID del pedido
   */
  deleteByOrderId(orderId: string): Promise<boolean>;

  /**
   * Obtiene items en un rango de fechas
   * @param startDate - Fecha de inicio
   * @param endDate - Fecha de fin
   */
  findByDateRange(startDate: Date, endDate: Date): Promise<OrderItem[]>;

  /**
   * Verifica si un producto ha sido pedido
   * @param productId - ID del producto
   */
  hasBeenOrdered(productId: string): Promise<boolean>;
}
