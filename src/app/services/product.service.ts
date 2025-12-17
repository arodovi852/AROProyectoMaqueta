import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop Gaming Pro',
      description: 'Portátil de alta gama para gaming con procesador i9 y RTX 4080',
      price: 1899.99,
      category: 'Informática',
      stock: 15,
      imageUrl: 'https://via.placeholder.com/300x200/667eea/ffffff?text=Laptop'
    },
    {
      id: 2,
      name: 'Monitor 4K UltraWide',
      description: 'Monitor curvo de 34 pulgadas con resolución 4K',
      price: 599.99,
      category: 'Periféricos',
      stock: 23,
      imageUrl: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Monitor'
    },
    {
      id: 3,
      name: 'Teclado Mecánico RGB',
      description: 'Teclado mecánico con switches Cherry MX e iluminación RGB',
      price: 149.99,
      category: 'Periféricos',
      stock: 42,
      imageUrl: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=Teclado'
    },
    {
      id: 4,
      name: 'Ratón Inalámbrico Pro',
      description: 'Ratón gaming inalámbrico con sensor de 25,600 DPI',
      price: 89.99,
      category: 'Periféricos',
      stock: 38,
      imageUrl: 'https://via.placeholder.com/300x200/ef4444/ffffff?text=Raton'
    },
    {
      id: 5,
      name: 'Auriculares Noise Cancelling',
      description: 'Auriculares over-ear con cancelación activa de ruido',
      price: 299.99,
      category: 'Audio',
      stock: 28,
      imageUrl: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Auriculares'
    },
    {
      id: 6,
      name: 'Webcam Full HD',
      description: 'Cámara web con resolución 1080p y micrófono integrado',
      price: 79.99,
      category: 'Periféricos',
      stock: 31,
      imageUrl: 'https://via.placeholder.com/300x200/ec4899/ffffff?text=Webcam'
    }
  ];

  /**
   * Obtiene todos los productos con un delay simulado
   */
  getProducts(): Observable<Product[]> {
    return of([...this.products]).pipe(delay(800));
  }

  /**
   * Obtiene un producto por ID con delay simulado
   */
  getProductById(id: string): Observable<Product> {
    const product = this.products.find(p => p.id === Number(id));
    
    if (!product) {
      return throwError(() => new Error(`Producto con id ${id} no encontrado`)).pipe(delay(500));
    }
    
    return of({ ...product }).pipe(delay(600));
  }

  /**
   * Crea un nuevo producto
   */
  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    const newProduct: Product = {
      ...product,
      id: Math.max(...this.products.map(p => p.id)) + 1
    };
    
    this.products.push(newProduct);
    return of(newProduct).pipe(delay(500));
  }

  /**
   * Actualiza un producto existente
   */
  updateProduct(id: number, updates: Partial<Product>): Observable<Product> {
    const index = this.products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return throwError(() => new Error(`Producto con id ${id} no encontrado`)).pipe(delay(300));
    }
    
    this.products[index] = { ...this.products[index], ...updates };
    return of(this.products[index]).pipe(delay(500));
  }

  /**
   * Elimina un producto
   */
  deleteProduct(id: number): Observable<boolean> {
    const index = this.products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return throwError(() => new Error(`Producto con id ${id} no encontrado`)).pipe(delay(300));
    }
    
    this.products.splice(index, 1);
    return of(true).pipe(delay(400));
  }

  /**
   * Filtra productos por categoría
   */
  getProductsByCategory(category: string): Observable<Product[]> {
    const filtered = this.products.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
    return of(filtered).pipe(delay(600));
  }
}
