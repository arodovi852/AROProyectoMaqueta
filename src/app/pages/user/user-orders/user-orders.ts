import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService, Order } from '../../../services/order.service';
import { Button } from '../../../components/shared/button/button';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, Button],
  templateUrl: './user-orders.html',
  styleUrl: './user-orders.scss'
})
export class UserOrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    // Leer datos del resolver
    this.route.data.subscribe(({ orders }) => {
      if (orders) {
        this.orders = orders;
        this.loading = false;
      }
    });
  }

  getStatusLabel(status: Order['status']): string {
    return this.orderService.getStatusLabel(status);
  }

  getStatusClass(status: Order['status']): string {
    return this.orderService.getStatusClass(status);
  }

  cancelOrder(order: Order): void {
    if (order.status !== 'pending') {
      this.toastService.warning('Solo puedes cancelar pedidos pendientes');
      return;
    }

    if (confirm(`¿Seguro que quieres cancelar el pedido #${order.id}?`)) {
      this.orderService.cancelOrder(order.id).subscribe({
        next: (success) => {
          if (success) {
            order.status = 'cancelled';
            this.toastService.success('Pedido cancelado correctamente');
          } else {
            this.toastService.error('No se pudo cancelar el pedido');
          }
        },
        error: () => {
          this.toastService.error('Error al cancelar el pedido');
        }
      });
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
