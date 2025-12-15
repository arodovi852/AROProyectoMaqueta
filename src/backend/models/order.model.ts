import { OrderStatus } from './enums';

/**
 * Modelo de entidad Order
 * Representa un pedido realizado por un usuario
 */
export class Order {
  /**
   * Identificador único del pedido (UUID)
   */
  id: string;

  /**
   * ID del usuario que realizó el pedido
   */
  userId: string;

  /**
   * Número de pedido único y legible
   * @example "ORD-2024-00001"
   */
  orderNumber: string;

  /**
   * Estado actual del pedido
   * @default OrderStatus.PENDING
   */
  status: OrderStatus;

  /**
   * Importe total del pedido
   * @minimum 0
   */
  totalAmount: number;

  /**
   * Subtotal (sin impuestos ni envío)
   */
  subtotal: number;

  /**
   * Impuestos aplicados
   * @default 0
   */
  taxAmount: number;

  /**
   * Coste de envío
   * @default 0
   */
  shippingCost: number;

  /**
   * Descuento aplicado
   * @default 0
   */
  discountAmount: number;

  /**
   * Dirección de envío
   */
  shippingAddress: string;

  /**
   * Dirección de facturación
   */
  billingAddress: string;

  /**
   * Notas adicionales del pedido
   */
  notes?: string;

  /**
   * Fecha de creación del pedido
   */
  createdAt: Date;

  /**
   * Fecha de última actualización
   */
  updatedAt: Date;

  /**
   * Fecha de envío
   */
  shippedAt?: Date;

  /**
   * Fecha de entrega
   */
  deliveredAt?: Date;

  /**
   * Fecha de cancelación
   */
  cancelledAt?: Date;

  constructor(data: Partial<Order>) {
    this.id = data.id || '';
    this.userId = data.userId || '';
    this.orderNumber = data.orderNumber || this.generateOrderNumber();
    this.status = data.status || OrderStatus.PENDING;
    this.totalAmount = data.totalAmount || 0;
    this.subtotal = data.subtotal || 0;
    this.taxAmount = data.taxAmount ?? 0;
    this.shippingCost = data.shippingCost ?? 0;
    this.discountAmount = data.discountAmount ?? 0;
    this.shippingAddress = data.shippingAddress || '';
    this.billingAddress = data.billingAddress || '';
    this.notes = data.notes;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.shippedAt = data.shippedAt;
    this.deliveredAt = data.deliveredAt;
    this.cancelledAt = data.cancelledAt;
  }

  /**
   * Genera un número de pedido único
   */
  private generateOrderNumber(): string {
    const date = new Date();
    const year = date.getFullYear();
    const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `ORD-${year}-${random}`;
  }

  /**
   * Calcula el total del pedido
   */
  calculateTotal(): void {
    this.totalAmount = this.subtotal + this.taxAmount + this.shippingCost - this.discountAmount;
  }

  /**
   * Verifica si el pedido puede ser cancelado
   */
  canBeCancelled(): boolean {
    return [OrderStatus.PENDING, OrderStatus.PROCESSING].includes(this.status);
  }

  /**
   * Verifica si el pedido está completado
   */
  isCompleted(): boolean {
    return this.status === OrderStatus.DELIVERED;
  }

  /**
   * Verifica si el pedido está pendiente
   */
  isPending(): boolean {
    return this.status === OrderStatus.PENDING;
  }

  /**
   * Marca el pedido como enviado
   */
  markAsShipped(): void {
    if (this.status !== OrderStatus.PROCESSING) {
      throw new Error('Solo se pueden marcar como enviados los pedidos en procesamiento');
    }
    this.status = OrderStatus.SHIPPED;
    this.shippedAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Marca el pedido como entregado
   */
  markAsDelivered(): void {
    if (this.status !== OrderStatus.SHIPPED) {
      throw new Error('Solo se pueden marcar como entregados los pedidos enviados');
    }
    this.status = OrderStatus.DELIVERED;
    this.deliveredAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Cancela el pedido
   */
  cancel(): void {
    if (!this.canBeCancelled()) {
      throw new Error('Este pedido no puede ser cancelado en su estado actual');
    }
    this.status = OrderStatus.CANCELLED;
    this.cancelledAt = new Date();
    this.updatedAt = new Date();
  }
}
