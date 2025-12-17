import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ProductService, Product } from '../services/product.service';

/**
 * Resolver que precarga la lista completa de productos antes de activar la ruta
 */
export const productsResolver: ResolveFn<Product[]> = (route, state) => {
  const productService = inject(ProductService);
  
  console.log('🔄 productsResolver: Cargando lista de productos...');
  
  return productService.getProducts().pipe(
    catchError(error => {
      console.error('❌ productsResolver: Error al cargar productos', error);
      return of([]);
    })
  );
};

/**
 * Resolver que precarga un producto específico antes de activar la ruta
 * Si no existe, redirige a /productos con mensaje de error
 */
export const productResolver: ResolveFn<Product | null> = (route, state) => {
  const productService = inject(ProductService);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if (!id) {
    router.navigate(['/productos']);
    return of(null);
  }

  console.log(`🔄 productResolver: Cargando producto ${id}...`);

  return productService.getProductById(id).pipe(
    catchError(error => {
      console.error(`❌ productResolver: Producto ${id} no encontrado`, error);
      router.navigate(['/productos'], {
        state: { error: `No se encontró el producto con ID ${id}` }
      });
      return of(null);
    })
  );
};
