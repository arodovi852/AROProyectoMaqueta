import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './core/guards/auth.guard';
import { pendingChangesGuard } from './core/guards/pending-changes.guard';
import { seriesResolver, seriesListResolver } from './core/resolvers/series.resolver';

/**
 * Configuración de rutas de la aplicación (FASE 4)
 * 
 * Implementa:
 * - Rutas principales con breadcrumbs
 * - Rutas con parámetros (:id)
 * - Rutas hijas anidadas
 * - Lazy loading para módulos de features
 * - Guards de autenticación y cambios pendientes
 * - Resolvers para precarga de datos
 * - Ruta wildcard 404
 */
export const routes: Routes = [
  // ========== RUTAS PÚBLICAS ==========
  
  {
    path: '',
    component: Home,
    title: 'BROADCAST - Soluciones tecnológicas innovadoras',
    data: { breadcrumb: 'Inicio' }
  },

  // Ruta principal de la app de series
  {
    path: 'main',
    loadComponent: () => import('./pages/main/main').then(m => m.Main),
    title: 'BROADCASTTD - Track series. Rate them. See what\'s good.',
    data: { breadcrumb: 'BROADCASTTD' }
  },

  // ========== RUTAS DE PRODUCTOS (Lazy Loading) ==========
  
  {
    path: 'productos',
    loadComponent: () => import('./pages/productos/productos').then(m => m.Productos),
    title: 'Productos - BROADCAST',
    data: { breadcrumb: 'Productos' }
  },

  // ========== RUTAS DE SERIES (Con parámetros y resolver) ==========
  
  {
    path: 'series',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/main/main').then(m => m.Main),
        title: 'Series - BROADCASTTD',
        data: { breadcrumb: 'Series' },
        resolve: { series: seriesListResolver }
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/series-info/series-info').then(m => m.SeriesInfo),
        title: 'Detalle de Serie - BROADCASTTD',
        data: { breadcrumb: 'Detalle' },
        resolve: { series: seriesResolver }
      }
    ]
  },

  // ========== RUTAS DE LISTAS ==========
  
  {
    path: 'lists',
    loadComponent: () => import('./pages/lists/lists').then(m => m.Lists),
    title: 'Lists - BROADCASTTD',
    data: { breadcrumb: 'Listas' }
  },
  {
    path: 'listinfo',
    loadComponent: () => import('./pages/list-info/list-info').then(m => m.ListInfo),
    title: 'Create List - BROADCASTTD',
    data: { breadcrumb: 'Crear Lista' }
  },
  {
    path: 'listcontent',
    loadComponent: () => import('./pages/list-content/list-content').then(m => m.ListContent),
    title: 'List Content - BROADCASTTD',
    data: { breadcrumb: 'Contenido de Lista' }
  },

  // ========== RUTAS DE USUARIO (Protegidas con authGuard) ==========
  
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
    title: 'Profile - BROADCASTTD',
    data: { breadcrumb: 'Perfil' },
    canActivate: [authGuard]
  },

  // ========== RUTAS ADICIONALES ==========
  
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto/contacto').then(m => m.Contacto),
    title: 'Contacto - BROADCAST',
    data: { breadcrumb: 'Contacto' },
    canDeactivate: [pendingChangesGuard] // Proteger formulario de contacto
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    title: 'Sobre Nosotros - BROADCAST',
    data: { breadcrumb: 'Sobre Nosotros' }
  },
  {
    path: 'searchresult',
    loadComponent: () => import('./pages/search-result/search-result').then(m => m.SearchResult),
    title: 'Search Results - BROADCASTTD',
    data: { breadcrumb: 'Resultados de Búsqueda' }
  },
  {
    path: 'demo',
    loadComponent: () => import('./pages/demo-components/demo-components').then(m => m.DemoComponents),
    title: 'Demo Componentes - BROADCAST',
    data: { breadcrumb: 'Demo' }
  },
  {
    path: 'seriesinfo',
    loadComponent: () => import('./pages/series-info/series-info').then(m => m.SeriesInfo),
    title: 'Series Info - BROADCASTTD',
    data: { breadcrumb: 'Info de Serie' }
  },

  // ========== RUTA 404 (Wildcard - siempre al final) ==========
  
  {
    path: '**',
    component: NotFound,
    title: '404 - Página no encontrada',
    data: { breadcrumb: 'No encontrado' }
  }
];
