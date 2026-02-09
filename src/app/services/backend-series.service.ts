import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Series, SeriesListResponse, CreateSeriesDto, UpdateSeriesDto } from './series.service';

/**
 * Backend Series Service
 * 
 * Connects to the Spring Boot backend API for series operations.
 * This service can be used as an alternative to the mock-based SeriesService.
 * 
 * Usage: Change environment.useBackend to true to use this service.
 */
@Injectable({ providedIn: 'root' })
export class BackendSeriesService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  // Loading state
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  /**
   * GET: Get all series from backend
   */
  getAllSeries(): Observable<Series[]> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<Series[]>(`${this.apiUrl}/series`).pipe(
      map(series => {
        this.loading.set(false);
        return series;
      }),
      catchError(error => {
        this.loading.set(false);
        this.error.set('Error loading series from backend');
        return throwError(() => error);
      })
    );
  }

  /**
   * GET: Get series by ID from backend
   */
  getSeriesById(id: string): Observable<Series> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<Series>(`${this.apiUrl}/series/${id}`).pipe(
      map(series => {
        this.loading.set(false);
        return series;
      }),
      catchError(error => {
        this.loading.set(false);
        this.error.set('Series not found');
        return throwError(() => error);
      })
    );
  }

  /**
   * GET: Get series with filters and pagination from backend
   */
  getSeriesFiltered(
    page: number = 1, 
    pageSize: number = 10, 
    search?: string, 
    genre?: string
  ): Observable<SeriesListResponse> {
    this.loading.set(true);

    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (search) {
      params = params.set('search', search);
    }
    if (genre) {
      params = params.set('genre', genre);
    }

    return this.http.get<SeriesListResponse>(`${this.apiUrl}/series/paginated`, { params }).pipe(
      map(response => {
        this.loading.set(false);
        return response;
      }),
      catchError(error => {
        this.loading.set(false);
        this.error.set('Error loading series');
        return throwError(() => error);
      })
    );
  }

  /**
   * GET: Search series by query
   */
  searchSeries(query: string): Observable<Series[]> {
    this.loading.set(true);

    const params = new HttpParams().set('query', query);

    return this.http.get<Series[]>(`${this.apiUrl}/series/search`, { params }).pipe(
      map(series => {
        this.loading.set(false);
        return series;
      }),
      catchError(error => {
        this.loading.set(false);
        this.error.set('Error searching series');
        return throwError(() => error);
      })
    );
  }

  /**
   * GET: Get all available genres
   */
  getAllGenres(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/series/genres`);
  }

  /**
   * POST: Create new series on backend
   */
  create(dto: CreateSeriesDto): Observable<Series> {
    this.loading.set(true);

    return this.http.post<Series>(`${this.apiUrl}/series`, dto).pipe(
      map(series => {
        this.loading.set(false);
        return series;
      }),
      catchError(error => {
        this.loading.set(false);
        this.error.set('Error creating series');
        return throwError(() => error);
      })
    );
  }

  /**
   * PUT: Update series on backend
   */
  update(id: string, dto: UpdateSeriesDto): Observable<Series> {
    this.loading.set(true);

    return this.http.put<Series>(`${this.apiUrl}/series/${id}`, dto).pipe(
      map(series => {
        this.loading.set(false);
        return series;
      }),
      catchError(error => {
        this.loading.set(false);
        this.error.set('Error updating series');
        return throwError(() => error);
      })
    );
  }

  /**
   * DELETE: Delete series on backend
   */
  delete(id: string): Observable<void> {
    this.loading.set(true);

    return this.http.delete<void>(`${this.apiUrl}/series/${id}`).pipe(
      map(() => {
        this.loading.set(false);
      }),
      catchError(error => {
        this.loading.set(false);
        this.error.set('Error deleting series');
        return throwError(() => error);
      })
    );
  }

  /**
   * Check API health
   */
  checkHealth(): Observable<{ status: string; service: string }> {
    return this.http.get<{ status: string; service: string }>(`${this.apiUrl}/health`);
  }
}
