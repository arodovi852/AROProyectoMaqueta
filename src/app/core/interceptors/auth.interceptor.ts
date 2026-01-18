import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor de autenticación (FASE 5 - Tarea 6)
 * 
 * Añade el token de autenticación y headers comunes a todas las peticiones.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');

  let headers = req.headers
    .set('Content-Type', 'application/json')
    .set('X-App-Client', 'Angular-DWEC');

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const cloned = req.clone({ headers });
  return next(cloned);
};
