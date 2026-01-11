import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, delay, map, catchError } from 'rxjs';
import { ApiService } from '../core/services/api.service';

/**
 * Interface de Serie (FASE 5 - Tarea 3)
 */
export interface Series {
  id: string;
  title: string;
  description: string;
  year: number;
  rating: number;
  imageUrl: string;
  genre: string[];
  seasons: number;
  status: 'ongoing' | 'ended' | 'upcoming';
  createdAt: string;
  updatedAt?: string;
}

/**
 * DTO para crear serie
 */
export interface CreateSeriesDto {
  title: string;
  description: string;
  year: number;
  genre: string[];
  seasons: number;
  status: 'ongoing' | 'ended' | 'upcoming';
}

/**
 * DTO para actualizar serie
 */
export interface UpdateSeriesDto extends Partial<CreateSeriesDto> {}

/**
 * Respuesta paginada de series
 */
export interface SeriesListResponse {
  items: Series[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Servicio de Series (FASE 5 - Tareas 2, 3, 4, 5)
 * 
 * Implementa operaciones CRUD completas para series.
 * Usa datos simulados para demostración.
 */
@Injectable({ providedIn: 'root' })
export class SeriesService {
  private http = inject(HttpClient);
  
  // Estado de carga
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Datos simulados de series
  private mockSeries: Series[] = [
    {
      id: '1',
      title: 'Twin Peaks',
      description: 'Una serie de misterio sobre la investigación de la muerte de Laura Palmer.',
      year: 1990,
      rating: 4.5,
      imageUrl: '/assets/Images_For_Card_1.jpg',
      genre: ['Drama', 'Mystery', 'Horror'],
      seasons: 3,
      status: 'ended',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      title: 'Stranger Things',
      description: 'Un grupo de amigos descubre fenómenos sobrenaturales en su pequeño pueblo.',
      year: 2016,
      rating: 4.7,
      imageUrl: '/assets/Images_For_Card_2.jpg',
      genre: ['Drama', 'Fantasy', 'Horror'],
      seasons: 4,
      status: 'ongoing',
      createdAt: '2024-01-02T00:00:00Z'
    },
    {
      id: '3',
      title: 'Alien: Earth',
      description: 'Spin-off de la franquicia Alien ambientado en la Tierra.',
      year: 2025,
      rating: 0,
      imageUrl: '/assets/Image_For_Card_3.jpg',
      genre: ['Sci-Fi', 'Horror'],
      seasons: 1,
      status: 'upcoming',
      createdAt: '2024-01-03T00:00:00Z'
    },
    {
      id: '4',
      title: 'The Haunting of Hill House',
      description: 'Una familia enfrentada a recuerdos traumáticos de una casa encantada.',
      year: 2018,
      rating: 4.8,
      imageUrl: '/assets/Image_For_Card_4.jpg',
      genre: ['Drama', 'Horror', 'Thriller'],
      seasons: 1,
      status: 'ended',
      createdAt: '2024-01-04T00:00:00Z'
    },
    {
      id: '5',
      title: 'The Walking Dead',
      description: 'Supervivientes luchan por sobrevivir en un apocalipsis zombi.',
      year: 2010,
      rating: 4.2,
      imageUrl: '/assets/Image_For_Card_5.jpg',
      genre: ['Drama', 'Horror', 'Thriller'],
      seasons: 11,
      status: 'ended',
      createdAt: '2024-01-05T00:00:00Z'
    },
    {
      id: '6',
      title: 'Breaking Bad',
      description: 'Un profesor de química se convierte en fabricante de metanfetamina.',
      year: 2008,
      rating: 4.9,
      imageUrl: '/assets/Image_For_Card_6.jpg',
      genre: ['Drama', 'Crime', 'Thriller'],
      seasons: 5,
      status: 'ended',
      createdAt: '2024-01-06T00:00:00Z'
    }
  ];

  /**
   * GET: Obtener todas las series (FASE 5 - Tarea 2)
   */
  getAllSeries(): Observable<Series[]> {
    this.loading.set(true);
    this.error.set(null);

    // Simulamos una llamada HTTP con delay
    return of(this.mockSeries).pipe(
      delay(500),
      map(series => {
        this.loading.set(false);
        return series;
      }),
      catchError(error => {
        this.loading.set(false);
        this.error.set('Error al cargar las series');
        throw error;
      })
    );
  }

  /**
   * GET: Obtener serie por ID (FASE 5 - Tarea 2)
   */
  getSeriesById(id: string): Observable<Series> {
    this.loading.set(true);
    this.error.set(null);

    const series = this.mockSeries.find(s => s.id === id);
    
    return of(series).pipe(
      delay(300),
      map(s => {
        this.loading.set(false);
        if (!s) {
          throw new Error('Serie no encontrada');
        }
        return s;
      }),
      catchError(error => {
        this.loading.set(false);
        this.error.set('Serie no encontrada');
        throw error;
      })
    );
  }

  /**
   * GET: Obtener series con filtros y paginación (FASE 5 - Tarea 4)
   */
  getSeriesFiltered(page: number = 1, pageSize: number = 10, search?: string, genre?: string): Observable<SeriesListResponse> {
    this.loading.set(true);
    
    let filtered = [...this.mockSeries];

    // Aplicar filtro de búsqueda
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(searchLower) ||
        s.description.toLowerCase().includes(searchLower)
      );
    }

    // Aplicar filtro de género
    if (genre) {
      filtered = filtered.filter(s => s.genre.includes(genre));
    }

    // Paginación
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    return of({
      items,
      total: filtered.length,
      page,
      pageSize
    }).pipe(
      delay(400),
      map(response => {
        this.loading.set(false);
        return response;
      })
    );
  }

  /**
   * POST: Crear nueva serie (FASE 5 - Tarea 2)
   */
  create(dto: CreateSeriesDto): Observable<Series> {
    this.loading.set(true);

    const newSeries: Series = {
      id: String(this.mockSeries.length + 1),
      ...dto,
      rating: 0,
      imageUrl: '/assets/placeholder.jpg',
      createdAt: new Date().toISOString()
    };

    return of(newSeries).pipe(
      delay(500),
      map(series => {
        this.mockSeries.push(series);
        this.loading.set(false);
        return series;
      })
    );
  }

  /**
   * PUT: Actualizar serie completa (FASE 5 - Tarea 2)
   */
  update(id: string, dto: UpdateSeriesDto): Observable<Series> {
    this.loading.set(true);

    const index = this.mockSeries.findIndex(s => s.id === id);
    
    return of(index).pipe(
      delay(400),
      map(idx => {
        if (idx === -1) {
          this.loading.set(false);
          throw new Error('Serie no encontrada');
        }

        this.mockSeries[idx] = {
          ...this.mockSeries[idx],
          ...dto,
          updatedAt: new Date().toISOString()
        };

        this.loading.set(false);
        return this.mockSeries[idx];
      })
    );
  }

  /**
   * DELETE: Eliminar serie (FASE 5 - Tarea 2)
   */
  delete(id: string): Observable<void> {
    this.loading.set(true);

    const index = this.mockSeries.findIndex(s => s.id === id);

    return of(undefined).pipe(
      delay(400),
      map(() => {
        if (index !== -1) {
          this.mockSeries.splice(index, 1);
        }
        this.loading.set(false);
      })
    );
  }
}
