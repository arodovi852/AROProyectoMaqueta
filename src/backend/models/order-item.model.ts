/**
 * Modelo de entidad OrderItem
 * Representa un item individual dentro de un pedido
 */
export class OrderItem {
  /**
   * Identificador único del item (UUID)
   */
  id: string;

  /**
   * ID del pedido al que pertenece
   */
  orderId: string;

  /**
   * ID del producto
   */
  productId: string;

  /**
   * Nombre del producto (snapshot en el momento del pedido)
   */
  productName: string;

  /**
   * SKU del producto (snapshot)
   */
  productSku?: string;

  /**
   * Cantidad solicitada
   * @minimum 1
   */
  quantity: number;

  /**
   * Precio unitario (en el momento del pedido)
   * @minimum 0
   */
  unitPrice: number;

  /**
   * Precio total del item (unitPrice * quantity)
   * @minimum 0
   */
  totalPrice: number;

  /**
   * Descuento aplicado a este item
   * @default 0
   */
  discount: number;

  /**
   * Fecha de creación
   */
  createdAt: Date;

  constructor(data: Partial<OrderItem>) {
    this.id = data.id || '';
    this.orderId = data.orderId || '';
    this.productId = data.productId || '';
    this.productName = data.productName || '';
    this.productSku = data.productSku;
    this.quantity = data.quantity || 1;
    this.unitPrice = data.unitPrice || 0;
    this.totalPrice = data.totalPrice || this.calculateTotalPrice();
    this.discount = data.discount ?? 0;
    this.createdAt = data.createdAt || new Date();
  }

  /**
   * Calcula el precio total del item
   */
  calculateTotalPrice(): number {
    return (this.unitPrice * this.quantity) - this.discount;
  }

  /**
   * Actualiza el precio total
   */
  updateTotalPrice(): void {
    this.totalPrice = this.calculateTotalPrice();
  }

  /**
   * Obtiene el precio con descuento aplicado
   */
  getPriceAfterDiscount(): number {
    return this.unitPrice - (this.discount / this.quantity);
  }
}
