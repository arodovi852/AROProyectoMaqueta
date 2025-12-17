import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService, Product } from '../../../services/product.service';
import { Button } from '../../../components/shared/button/button';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, Button],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    // Leer producto desde resolver
    this.route.data.subscribe(({ product }) => {
      if (product) {
        this.product = product;
        this.loading = false;
      }
    });
  }

  incrementQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product) {
      this.toastService.success(`${this.quantity} x ${this.product.name} añadido al carrito`);
      console.log('Añadiendo al carrito:', { product: this.product, quantity: this.quantity });
    }
  }

  deleteProduct(): void {
    if (!this.product) return;

    if (confirm(`¿Estás seguro de eliminar "${this.product.name}"?`)) {
      this.productService.deleteProduct(this.product.id).subscribe({
        next: () => {
          this.toastService.success('Producto eliminado correctamente');
          this.router.navigate(['/productos']);
        },
        error: (error) => {
          this.toastService.error('Error al eliminar el producto');
          console.error('Error:', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/productos']);
  }
}
