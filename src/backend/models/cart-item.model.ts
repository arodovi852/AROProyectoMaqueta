/**
 * Modelo de entidad CartItem
 * Representa un item en el carrito de compras de un usuario
 */
export class CartItem {
  /**
   * Identificador único del item del carrito (UUID)
   */
  id: string;

  /**
   * ID del usuario propietario del carrito
   */
  userId: string;

  /**
   * ID del producto
   */
  productId: string;

  /**
   * Cantidad del producto en el carrito
   * @minimum 1
   */
  quantity: number;

  /**
   * Fecha en que se añadió al carrito
   */
  createdAt: Date;

  /**
   * Fecha de última actualización
   */
  updatedAt: Date;

  constructor(data: Partial<CartItem>) {
    this.id = data.id || '';
    this.userId = data.userId || '';
    this.productId = data.productId || '';
    this.quantity = data.quantity || 1;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  /**
   * Incrementa la cantidad del producto
   */
  increaseQuantity(amount: number = 1): void {
    this.quantity += amount;
    this.updatedAt = new Date();
  }

  /**
   * Decrementa la cantidad del producto
   */
  decreaseQuantity(amount: number = 1): void {
    if (this.quantity - amount < 1) {
      throw new Error('La cantidad mínima es 1');
    }
    this.quantity -= amount;
    this.updatedAt = new Date();
  }

  /**
   * Actualiza la cantidad del producto
   */
  updateQuantity(newQuantity: number): void {
    if (newQuantity < 1) {
      throw new Error('La cantidad mínima es 1');
    }
    this.quantity = newQuantity;
    this.updatedAt = new Date();
  }
}
