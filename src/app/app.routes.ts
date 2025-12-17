import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Productos } from './pages/productos/productos';
import { Contacto } from './pages/contacto/contacto';
import { DemoComponents } from './pages/demo-components/demo-components';

// Fase 4: Imports para lazy loading y guards
import { authGuard } from './guards/auth.guard';
import { pendingChangesGuard } from './guards/pending-changes.guard';
import { productsResolver, productResolver } from './resolvers/product.resolver';
import { ordersResolver } from './resolvers/order.resolver';
import { userResolver } from './resolvers/user.resolver';

export const routes: Routes = [
  // Ruta raíz redirige a home
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
    data: { breadcrumb: 'Inicio' }
  },
  
  // Página Home
  {
    path: 'home',
    component: Home,
    title: 'BROADCAST - Soluciones tecnológicas innovadoras',
    data: { breadcrumb: 'Inicio' }
  },

  // Catálogo de productos (Fase 4) - Con lazy loading
  {
    path: 'productos',
    loadComponent: () => import('./pages/products/product-list/product-list').then(m => m.ProductListComponent),
    title: 'Catálogo de Productos - BROADCAST',
    resolve: { products: productsResolver },
    data: { breadcrumb: 'Productos' }
  },

  // Nuevo producto
  {
    path: 'productos/nuevo',
    loadComponent: () => import('./pages/products/product-form/product-form').then(m => m.ProductFormComponent),
    title: 'Nuevo Producto - BROADCAST',
    canActivate: [authGuard],
    canDeactivate: [pendingChangesGuard],
    data: { breadcrumb: 'Nuevo Producto' }
  },

  // Detalle de producto
  {
    path: 'productos/:id',
    loadComponent: () => import('./pages/products/product-detail/product-detail').then(m => m.ProductDetailComponent),
    title: 'Detalle Producto - BROADCAST',
    resolve: { product: productResolver },
    data: { breadcrumb: 'Detalle' }
  },

  // Editar producto
  {
    path: 'productos/:id/editar',
    loadComponent: () => import('./pages/products/product-form/product-form').then(m => m.ProductFormComponent),
    title: 'Editar Producto - BROADCAST',
    canActivate: [authGuard],
    canDeactivate: [pendingChangesGuard],
    resolve: { product: productResolver },
    data: { breadcrumb: 'Editar' }
  },

  // Área de usuario (rutas anidadas)
  {
    path: 'usuario',
    loadComponent: () => import('./pages/user/user-layout/user-layout').then(m => m.UserLayoutComponent),
    canActivate: [authGuard],
    data: { breadcrumb: 'Usuario' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'perfil'
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/user/user-profile/user-profile').then(m => m.UserProfileComponent),
        title: 'Mi Perfil - BROADCAST',
        resolve: { user: userResolver },
        canDeactivate: [pendingChangesGuard],
        data: { breadcrumb: 'Perfil' }
      },
      {
        path: 'pedidos',
        loadComponent: () => import('./pages/user/user-orders/user-orders').then(m => m.UserOrdersComponent),
        title: 'Mis Pedidos - BROADCAST',
        resolve: { orders: ordersResolver },
        data: { breadcrumb: 'Pedidos' }
      }
    ]
  },

  // Acerca de (Fase 4)
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.AboutComponent),
    title: 'Acerca de - BROADCAST',
    data: { breadcrumb: 'Acerca de' }
  },

  // Páginas originales del proyecto
  {
    path: 'contacto',
    component: Contacto,
    title: 'Contacto - BROADCAST',
    data: { breadcrumb: 'Contacto' }
  },
  {
    path: 'demo',
    component: DemoComponents,
    title: 'Demo Componentes - BROADCAST',
    data: { breadcrumb: 'Demo' }
  },

  // Ruta 404 (siempre la última)
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFoundComponent),
    title: '404 - Página No Encontrada - BROADCAST'
  }
];
