import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/**
 * Authentication Guard (PHASE 4 - Task 4)
 * 
 * Protects routes that require authentication.
 * If the user is not authenticated, redirects to the main page
 * with a return parameter.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  // Redirect to home with return URL
  return router.createUrlTree(['/'], {
    queryParams: { returnUrl: state.url }
  });
};
