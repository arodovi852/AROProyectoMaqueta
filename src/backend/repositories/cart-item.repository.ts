import { CartItem } from '../models/cart-item.model';

/**
 * Interfaz del repositorio de items del carrito
 * Define todas las operaciones de acceso a datos para items del carrito
 */
export interface ICartItemRepository {
  // CRUD básico
  /**
   * Crea un nuevo item en el carrito
   */
  create(cartItem: CartItem): Promise<CartItem>;

  /**
   * Busca un item del carrito por su ID
   */
  findById(id: string): Promise<CartItem | null>;

  /**
   * Busca todos los items del carrito
   */
  findAll(): Promise<CartItem[]>;

  /**
   * Actualiza un item del carrito existente
   */
  update(id: string, cartItem: Partial<CartItem>): Promise<CartItem>;

  /**
   * Elimina un item del carrito
   */
  delete(id: string): Promise<boolean>;

  // Consultas personalizadas
  /**
   * Busca todos los items del carrito de un usuario
   * @param userId - ID del usuario
   */
  findByUserId(userId: string): Promise<CartItem[]>;

  /**
   * Busca un item específico del carrito de un usuario
   * @param userId - ID del usuario
   * @param productId - ID del producto
   */
  findByUserIdAndProductId(userId: string, productId: string): Promise<CartItem | null>;

  /**
   * Busca items del carrito que contienen un producto
   * @param productId - ID del producto
   */
  findByProductId(productId: string): Promise<CartItem[]>;

  /**
   * Cuenta el número de items en el carrito de un usuario
   * @param userId - ID del usuario
   */
  countByUserId(userId: string): Promise<number>;

  /**
   * Cuenta el número total de productos (suma de cantidades) en el carrito
   * @param userId - ID del usuario
   */
  getTotalItemQuantity(userId: string): Promise<number>;

  /**
   * Verifica si un usuario tiene un producto en su carrito
   * @param userId - ID del usuario
   * @param productId - ID del producto
   */
  hasProduct(userId: string, productId: string): Promise<boolean>;

  /**
   * Actualiza la cantidad de un item del carrito
   * @param userId - ID del usuario
   * @param productId - ID del producto
   * @param quantity - Nueva cantidad
   */
  updateQuantity(userId: string, productId: string, quantity: number): Promise<boolean>;

  /**
   * Incrementa la cantidad de un item del carrito
   * @param userId - ID del usuario
   * @param productId - ID del producto
   * @param amount - Cantidad a incrementar
   */
  incrementQuantity(userId: string, productId: string, amount: number): Promise<boolean>;

  /**
   * Decrementa la cantidad de un item del carrito
   * @param userId - ID del usuario
   * @param productId - ID del producto
   * @param amount - Cantidad a decrementar
   */
  decrementQuantity(userId: string, productId: string, amount: number): Promise<boolean>;

  /**
   * Elimina un item específico del carrito
   * @param userId - ID del usuario
   * @param productId - ID del producto
   */
  removeItem(userId: string, productId: string): Promise<boolean>;

  /**
   * Elimina todos los items del carrito de un usuario
   * @param userId - ID del usuario
   */
  clearCart(userId: string): Promise<boolean>;

  /**
   * Obtiene items del carrito con información de productos
   * @param userId - ID del usuario
   */
  getCartWithProductDetails(userId: string): Promise<Array<{
    cartItem: CartItem;
    productName: string;
    productPrice: number;
    productImageUrl: string;
    productStock: number;
    subtotal: number;
  }>>;

  /**
   * Calcula el total del carrito de un usuario
   * @param userId - ID del usuario
   */
  calculateCartTotal(userId: string): Promise<number>;

  /**
   * Busca items del carrito con productos inactivos o sin stock
   * @param userId - ID del usuario
   */
  findInvalidItems(userId: string): Promise<CartItem[]>;

  /**
   * Elimina items del carrito con productos inactivos o sin stock
   * @param userId - ID del usuario
   */
  removeInvalidItems(userId: string): Promise<number>;

  /**
   * Obtiene carritos abandonados (sin actividad en X días)
   * @param days - Número de días sin actividad
   */
  findAbandonedCarts(days: number): Promise<Array<{
    userId: string;
    itemCount: number;
    lastUpdate: Date;
  }>>;

  /**
   * Obtiene estadísticas del carrito de un usuario
   * @param userId - ID del usuario
   */
  getCartStats(userId: string): Promise<{
    itemCount: number;
    totalQuantity: number;
    subtotal: number;
    lastUpdated: Date;
  }>;

  /**
   * Fusiona carritos (útil al hacer login después de ser invitado)
   * @param guestUserId - ID del usuario invitado
   * @param authenticatedUserId - ID del usuario autenticado
   */
  mergeCarts(guestUserId: string, authenticatedUserId: string): Promise<boolean>;

  /**
   * Obtiene items del carrito ordenados por fecha de adición
   * @param userId - ID del usuario
   */
  findByUserIdOrderedByDate(userId: string): Promise<CartItem[]>;
}
