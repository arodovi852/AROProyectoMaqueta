import { Routes } from '@angular/router';
import { Main } from './pages/main/main';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './core/guards/auth.guard';
import { pendingChangesGuard } from './core/guards/pending-changes.guard';
import { seriesResolver, seriesListResolver } from './core/resolvers/series.resolver';

/**
 * Application routes configuration (PHASE 4)
 * 
 * Implements:
 * - Main routes with breadcrumbs
 * - Routes with parameters (:id)
 * - Nested child routes
 * - Lazy loading for feature modules
 * - Authentication and pending changes guards
 * - Resolvers for data preloading
 * - Wildcard 404 route
 */
export const routes: Routes = [
  // ========== LANDING PAGE (ROOT ROUTE) ==========
  
  {
    path: '',
    component: Main,
    title: 'BROADCASTTD - Track series. Rate them. See what\'s good.',
    data: { breadcrumb: 'Home' }
  },

  // Style guide and component demonstration
  {
    path: 'guiadeestilos',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    title: 'Style Guide - BROADCAST',
    data: { breadcrumb: 'Style Guide' }
  },

  // ========== PRODUCT ROUTES (Lazy Loading) ==========
  
  {
    path: 'productos',
    loadComponent: () => import('./pages/productos/productos').then(m => m.Productos),
    title: 'Products - BROADCAST',
    data: { breadcrumb: 'Products' }
  },

  // ========== SERIES ROUTES (With parameters and resolver) ==========
  
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
        title: 'Series Detail - BROADCASTTD',
        data: { breadcrumb: 'Detail' },
        resolve: { series: seriesResolver }
      }
    ]
  },

  // ========== LIST ROUTES ==========
  
  {
    path: 'lists',
    loadComponent: () => import('./pages/lists/lists').then(m => m.Lists),
    title: 'Lists - BROADCASTTD',
    data: { breadcrumb: 'Lists' }
  },
  {
    path: 'listinfo',
    loadComponent: () => import('./pages/list-info/list-info').then(m => m.ListInfo),
    title: 'Create List - BROADCASTTD',
    data: { breadcrumb: 'Create List' }
  },
  {
    path: 'listcontent',
    redirectTo: 'listcontent/horror',
    pathMatch: 'full'
  },
  {
    path: 'listcontent/:listId',
    loadComponent: () => import('./pages/list-content/list-content').then(m => m.ListContent),
    title: 'List Content - BROADCASTTD',
    data: { breadcrumb: 'List Content' }
  },
  {
    path: 'seemore',
    loadComponent: () => import('./pages/see-more/see-more').then(m => m.SeeMore),
    title: 'See More - BROADCASTTD',
    data: { breadcrumb: 'See More' }
  },

  // ========== USER ROUTES (Protected with authGuard) ==========
  
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
    title: 'Profile - BROADCASTTD',
    data: { breadcrumb: 'Profile' },
    canActivate: [authGuard]
  },

  // ========== ADDITIONAL ROUTES ==========
  
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto/contacto').then(m => m.Contacto),
    title: 'Contact - BROADCAST',
    data: { breadcrumb: 'Contact' },
    canDeactivate: [pendingChangesGuard] // Protect contact form
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    title: 'About Us - BROADCAST',
    data: { breadcrumb: 'About Us' }
  },
  {
    path: 'searchresult',
    loadComponent: () => import('./pages/search-result/search-result').then(m => m.SearchResult),
    title: 'Search Results - BROADCASTTD',
    data: { breadcrumb: 'Search Results' }
  },
  {
    path: 'demo',
    loadComponent: () => import('./pages/demo-components/demo-components').then(m => m.DemoComponents),
    title: 'Component Demo - BROADCAST',
    data: { breadcrumb: 'Demo' }
  },
  {
    path: 'seriesinfo',
    redirectTo: '/series/1',
    pathMatch: 'full'
  },

  // ========== 404 ROUTE (Wildcard - always last) ==========
  
  {
    path: '**',
    component: NotFound,
    title: '404 - Page not found',
    data: { breadcrumb: 'Not found' }
  }
];
