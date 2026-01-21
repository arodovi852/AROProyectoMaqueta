import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Authentication Interceptor (PHASE 5 - Task 6)
 * 
 * Adds authentication token and common headers to all requests.
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
