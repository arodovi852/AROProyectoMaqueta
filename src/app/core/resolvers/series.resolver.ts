import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { SeriesService, Series } from '../../services/series.service';
import { catchError, of } from 'rxjs';

/**
 * Interface para el estado del resolver (FASE 4 - Tarea 5)
 */
export interface SeriesResolved {
  loading: boolean;
  error: string | null;
  data: Series | null;
}

/**
 * Resolver para precargar datos de serie (FASE 4 - Tarea 5)
 * 
 * Carga los datos de una serie antes de activar la ruta.
 * Maneja errores y redirecciones.
 */
export const seriesResolver: ResolveFn<Series | null> = (route, state) => {
  const service = inject(SeriesService);
  const router = inject(Router);
  const id = route.paramMap.get('id')!;

  return service.getSeriesById(id).pipe(
    catchError(error => {
      console.error('Error loading series:', error);
      router.navigate(['/main'], {
        state: { error: 'No se pudo cargar la serie' }
      });
      return of(null);
    })
  );
};

/**
 * Resolver para listado de series (FASE 4 - Tarea 5)
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
