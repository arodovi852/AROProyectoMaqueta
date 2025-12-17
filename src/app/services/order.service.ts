import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Order {
  id: number;
  date: Date;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [
    {
      id: 1001,
      date: new Date('2024-12-10'),
      total: 1899.99,
      status: 'delivered',
      items: [
        { productId: 1, productName: 'Laptop Gaming Pro', quantity: 1, price: 1899.99 }
      ]
    },
    {
      id: 1002,
      date: new Date('2024-12-12'),
      total: 839.97,
      status: 'shipped',
      items: [
        { productId: 2, productName: 'Monitor 4K UltraWide', quantity: 1, price: 599.99 },
        { productId: 4, productName: 'Ratón Inalámbrico Pro', quantity: 1, price: 89.99 },
        { productId: 3, productName: 'Teclado Mecánico RGB', quantity: 1, price: 149.99 }
      ]
    },
    {
      id: 1003,
      date: new Date('2024-12-15'),
      total: 379.98,
      status: 'processing',
      items: [
        { productId: 5, productName: 'Auriculares Noise Cancelling', quantity: 1, price: 299.99 },
        { productId: 6, productName: 'Webcam Full HD', quantity: 1, price: 79.99 }
      ]
    },
    {
      id: 1004,
      date: new Date('2024-12-16'),
      total: 149.99,
      status: 'pending',
      items: [
        { productId: 3, productName: 'Teclado Mecánico RGB', quantity: 1, price: 149.99 }
      ]
    }
  ];

  /**
   * Obtiene todos los pedidos del usuario con delay simulado
   */
  getOrders(): Observable<Order[]> {
    return of([...this.orders]).pipe(delay(700));
  }

  /**
   * Obtiene un pedido específico por ID
   */
  getOrderById(id: number): Observable<Order | undefined> {
    const order = this.orders.find(o => o.id === id);
    return of(order ? { ...order } : undefined).pipe(delay(500));
  }

  /**
   * Cancela un pedido
   */
  cancelOrder(id: number): Observable<boolean> {
    const order = this.orders.find(o => o.id === id);
    if (order && order.status === 'pending') {
      order.status = 'cancelled';
      return of(true).pipe(delay(600));
    }
    return of(false).pipe(delay(300));
  }

  /**
   * Obtiene el estado de un pedido con traducción
   */
  getStatusLabel(status: Order['status']): string {
    const labels = {
      pending: 'Pendiente',
      processing: 'En Proceso',
      shipped: 'Enviado',
      delivered: 'Entregado',
      cancelled: 'Cancelado'
    };
    return labels[status];
  }

  /**
   * Obtiene la clase CSS según el estado
   */
  getStatusClass(status: Order['status']): string {
    const classes = {
      pending: 'status-pending',
      processing: 'status-processing',
      shipped: 'status-shipped',
      delivered: 'status-delivered',
      cancelled: 'status-cancelled'
    };
    return classes[status];
  }
}
