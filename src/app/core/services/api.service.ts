import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

/**
 * Generic paginated response (PHASE 5 - Task 2)
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Base API Service (PHASE 5 - Task 1)
 * 
 * Centralizes common HTTP operations and base URL.
 * All domain services delegate to this service.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  
  // Base API URL (simulated with JSONPlaceholder or local API)
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  /**
   * GET request genérico
   */
  get<T>(endpoint: string, options?: { params?: HttpParams; headers?: HttpHeaders }): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * POST request genérico
   */
  post<T>(endpoint: string, body: unknown, options?: { params?: HttpParams; headers?: HttpHeaders }): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * PUT request genérico (reemplazo completo)
   */
  put<T>(endpoint: string, body: unknown, options?: { params?: HttpParams; headers?: HttpHeaders }): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * PATCH request genérico (actualización parcial)
   */
  patch<T>(endpoint: string, body: unknown, options?: { params?: HttpParams; headers?: HttpHeaders }): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, body, options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * DELETE request genérico
   */
  delete<T>(endpoint: string, options?: { params?: HttpParams; headers?: HttpHeaders }): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, options).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Centralized error handling
   */
  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}
