import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ValidationService } from '../services/validation.service';

/**
 * Validador asíncrono para verificar email único
 */
export function uniqueEmail(validationService: ValidationService, currentUserId?: string): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) return of(null);

    // Debounce de 500ms antes de hacer la validación
    return timer(500).pipe(
      switchMap(() => validationService.checkEmailUnique(control.value, currentUserId)),
      map(isUnique => isUnique ? null : { emailTaken: true }),
      catchError(() => of(null))
    );
  };
}

/**
 * Validador asíncrono para verificar username disponible
 */
export function usernameAvailable(validationService: ValidationService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const username = control.value;
    if (!username || username.length < 3) return of(null);

    // Debounce de 300ms
    return timer(300).pipe(
      switchMap(() => validationService.checkUsernameAvailable(username)),
      map(isAvailable => isAvailable ? null : { usernameTaken: true }),
      catchError(() => of(null))
    );
  };
}
