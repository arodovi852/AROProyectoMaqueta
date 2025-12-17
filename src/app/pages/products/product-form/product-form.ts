import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Button } from '../../../components/shared/button/button';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Button],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss'
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId: number | null = null;
  submitting = false;
  categories = ['Informática', 'Periféricos', 'Audio', 'Otros'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastService: ToastService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      category: ['Informática', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['https://via.placeholder.com/300x200/667eea/ffffff?text=Producto', Validators.required]
    });
  }

  ngOnInit(): void {
    // Detectar si estamos en modo edición
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productId = Number(id);
      this.loadProduct(id);
    }
  }

  loadProduct(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue(product);
      },
      error: (error) => {
        this.toastService.error('Error al cargar el producto');
        console.error('Error:', error);
        this.router.navigate(['/productos']);
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.toastService.warning('Por favor, corrige los errores del formulario');
      return;
    }

    this.submitting = true;
    const formData = this.productForm.value;

    if (this.isEditMode && this.productId) {
      this.productService.updateProduct(this.productId, formData).subscribe({
        next: () => {
          this.toastService.success('Producto actualizado correctamente');
          this.router.navigate(['/productos', this.productId]);
        },
        error: (error) => {
          this.toastService.error('Error al actualizar el producto');
          console.error('Error:', error);
          this.submitting = false;
        }
      });
    } else {
      this.productService.createProduct(formData).subscribe({
        next: (product) => {
          this.toastService.success('Producto creado correctamente');
          this.router.navigate(['/productos', product.id]);
        },
        error: (error) => {
          this.toastService.error('Error al crear el producto');
          console.error('Error:', error);
          this.submitting = false;
        }
      });
    }
  }

  onCancel(): void {
    if (this.productForm.dirty) {
      if (confirm('¿Seguro que quieres cancelar? Los cambios no guardados se perderán.')) {
        this.router.navigate(['/productos']);
      }
    } else {
      this.router.navigate(['/productos']);
    }
  }
}
