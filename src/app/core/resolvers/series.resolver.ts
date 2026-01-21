import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { SeriesService, Series } from '../../services/series.service';
import { catchError, of } from 'rxjs';

/**
 * Interface for resolver state (PHASE 4 - Task 5)
 */
export interface SeriesResolved {
  loading: boolean;
  error: string | null;
  data: Series | null;
}

/**
 * Resolver to preload series data (PHASE 4 - Task 5)
 * 
 * Loads series data before activating the route.
 * Handles errors and redirections.
 */
export const seriesResolver: ResolveFn<Series | null> = (route, state) => {
  const service = inject(SeriesService);
  const router = inject(Router);
  const id = route.paramMap.get('id')!;

  return service.getSeriesById(id).pipe(
    catchError(error => {
      console.error('Error loading series:', error);
      router.navigate(['/main'], {
        state: { error: 'Could not load series' }
      });
      return of(null);
    })
  );
};

/**
 * Resolver for series list (PHASE 4 - Task 5)
 */
export const seriesListResolver: ResolveFn<Series[]> = (route, state) => {
  const service = inject(SeriesService);

  return service.getAllSeries().pipe(
    catchError(error => {
      console.error('Error loading series list:', error);
      return of([]);
    })
  );
};
