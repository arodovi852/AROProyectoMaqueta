import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../services/toast.service';

/**
 * Interceptor de errores HTTP (FASE 5 - Tarea 6)
 * 
 * Maneja errores HTTP de forma global y muestra notificaciones.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message: string;

      switch (error.status) {
        case 0:
          message = 'Error de conexión. Verifica tu conexión a internet.';
          break;
        case 400:
          message = 'Solicitud incorrecta. Verifica los datos enviados.';
          break;
        case 401:
          message = 'No autorizado. Por favor, inicia sesión.';
          // Aquí podríamos redirigir al login
          break;
        case 403:
          message = 'Acceso denegado. No tienes permisos para esta acción.';
          break;
        case 404:
          message = 'Recurso no encontrado.';
          break;
        case 500:
          message = 'Error del servidor. Intenta más tarde.';
          break;
        default:
          message = `Error inesperado (${error.status})`;
      }

      toast.error(message);
      console.error('HTTP Error:', error);

      return throwError(() => error);
    })
  );
};
