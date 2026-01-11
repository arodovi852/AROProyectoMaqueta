import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

/**
 * Interceptor de logging (FASE 5 - Tarea 6)
 * 
 * Registra información sobre las peticiones HTTP para debugging.
 * Solo activo en desarrollo.
 */
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const started = Date.now();
  const isProduction = false; // Cambiar según environment

  if (isProduction) {
    return next(req);
  }

  console.log(`[HTTP] ${req.method} ${req.urlWithParams}`);

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          console.log(`[HTTP] ${req.method} ${req.urlWithParams} - ${event.status} (${elapsed}ms)`);
        }
      },
      error: (error) => {
        const elapsed = Date.now() - started;
        console.error(`[HTTP] ${req.method} ${req.urlWithParams} - ERROR (${elapsed}ms)`, error);
      }
    })
  );
};
