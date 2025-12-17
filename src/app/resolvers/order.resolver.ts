import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, of } from 'rxjs';
import { OrderService, Order } from '../services/order.service';

/**
 * Resolver que precarga los pedidos del usuario antes de activar la ruta
 */
export const ordersResolver: ResolveFn<Order[]> = (route, state) => {
  const orderService = inject(OrderService);
  
  console.log('🔄 ordersResolver: Cargando pedidos del usuario...');
  
  return orderService.getOrders().pipe(
    catchError(error => {
      console.error('❌ ordersResolver: Error al cargar pedidos', error);
      return of([]);
    })
  );
};
