import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard para proteger rutas que requieren autenticación
 * Redirige a /home si el usuario no está logueado
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isAuthenticated();

  if (!isLoggedIn) {
    console.log('🔒 authGuard: Usuario no autenticado, redirigiendo a /home');
    router.navigate(['/home'], {
      queryParams: { returnUrl: state.url, authRequired: 'true' }
    });
    return false;
  }

  console.log('✅ authGuard: Usuario autenticado, permitiendo acceso');
  return true;
};
