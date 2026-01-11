import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Interface de Breadcrumb (FASE 4 - Tarea 6)
 */
export interface Breadcrumb {
  label: string;
  url: string;
}

/**
 * Servicio de Breadcrumbs (FASE 4 - Tarea 6)
 * 
 * Genera breadcrumbs dinámicos basados en la configuración de rutas.
 * Se actualiza automáticamente con cada navegación.
 */
@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private router = inject(Router);
  
  private breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  constructor() {
    // Escuchar cambios de navegación
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const breadcrumbs = this.buildBreadcrumbs(this.router.routerState.snapshot.root);
      this.breadcrumbsSubject.next(breadcrumbs);
    });
  }

  /**
   * Construye los breadcrumbs recursivamente desde la ruta raíz
   */
  private buildBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    // Obtener el título de la ruta (desde data.breadcrumb o title)
    const label = route.data['breadcrumb'] || route.title || '';
    
    // Construir la URL
    const path = route.routeConfig?.path || '';
    const nextUrl = path ? `${url}/${path}` : url;

    // Añadir breadcrumb si tiene label
    if (label) {
      breadcrumbs.push({
        label,
        url: nextUrl || '/'
      });
    }

    // Procesar rutas hijas
    if (route.children.length) {
      for (const child of route.children) {
        this.buildBreadcrumbs(child, nextUrl, breadcrumbs);
      }
    }

    return breadcrumbs;
  }

  /**
   * Obtener breadcrumbs actuales
   */
  getBreadcrumbs(): Breadcrumb[] {
    return this.breadcrumbsSubject.value;
  }
}
