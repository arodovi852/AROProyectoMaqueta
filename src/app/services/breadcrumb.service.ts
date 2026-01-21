import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Breadcrumb Interface (PHASE 4 - Task 6)
 */
export interface Breadcrumb {
  label: string;
  url: string;
}

/**
 * Breadcrumb Service (PHASE 4 - Task 6)
 * 
 * Generates dynamic breadcrumbs based on route configuration.
 * Updates automatically with each navigation.
 */
@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private router = inject(Router);
  
  private breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this.breadcrumbsSubject.asObservable();

  constructor() {
    // Listen to navigation changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const breadcrumbs = this.buildBreadcrumbs(this.router.routerState.snapshot.root);
      this.breadcrumbsSubject.next(breadcrumbs);
    });
  }

  /**
   * Builds breadcrumbs recursively from the root route
   */
  private buildBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    // Get the route title (from data.breadcrumb or title)
    const label = route.data['breadcrumb'] || route.title || '';
    
    // Build the URL
    const path = route.routeConfig?.path || '';
    const nextUrl = path ? `${url}/${path}` : url;

    // Add breadcrumb if it has a label
    if (label) {
      breadcrumbs.push({
        label,
        url: nextUrl || '/'
      });
    }

    // Process child routes
    if (route.children.length) {
      for (const child of route.children) {
        this.buildBreadcrumbs(child, nextUrl, breadcrumbs);
      }
    }

    return breadcrumbs;
  }

  /**
   * Get current breadcrumbs
   */
  getBreadcrumbs(): Breadcrumb[] {
    return this.breadcrumbsSubject.value;
  }
}
