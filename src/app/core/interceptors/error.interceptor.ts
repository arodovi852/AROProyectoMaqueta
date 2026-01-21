import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../services/toast.service';

/**
 * HTTP Error Interceptor (PHASE 5 - Task 6)
 * 
 * Handles HTTP errors globally and shows notifications.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message: string;

      switch (error.status) {
        case 0:
          message = 'Connection error. Please check your internet connection.';
          break;
        case 400:
          message = 'Bad request. Please check the data sent.';
          break;
        case 401:
          message = 'Unauthorized. Please log in.';
          // Could redirect to login here
          break;
        case 403:
          message = 'Access denied. You do not have permission for this action.';
          break;
        case 404:
          message = 'Resource not found.';
          break;
        case 500:
          message = 'Server error. Please try again later.';
          break;
        default:
          message = `Unexpected error (${error.status})`;
      }

      toast.error(message);
      console.error('HTTP Error:', error);

      return throwError(() => error);
    })
  );
};
