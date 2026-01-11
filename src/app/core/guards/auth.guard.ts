import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/**
 * Guard de autenticación (FASE 4 - Tarea 4)
 * 
 * Protege rutas que requieren autenticación.
 * Si el usuario no está autenticado, redirige a la página principal
 * con un parámetro de retorno.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  // Redirige a home con la URL de retorno
  return router.createUrlTree(['/'], {
    queryParams: { returnUrl: state.url }
  });
};
