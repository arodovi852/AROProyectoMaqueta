import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, delay, map, catchError } from 'rxjs';
import { ApiService } from '../core/services/api.service';

/**
 * Series Interface (PHASE 5 - Task 3)
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
 * DTO for creating series
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
 * DTO for updating series
 */
export interface UpdateSeriesDto extends Partial<CreateSeriesDto> {}

/**
 * Paginated series response
 */
export interface SeriesListResponse {
  items: Series[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Series Service (PHASE 5 - Tasks 2, 3, 4, 5)
 * 
 * Implements complete CRUD operations for series.
 * Uses simulated data for demonstration.
 */
@Injectable({ providedIn: 'root' })
export class SeriesService {
  private http = inject(HttpClient);
  
  // Loading state
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Simulated series data
  private mockSeries: Series[] = [
    {
      id: '1',
      title: 'Twin Peaks',
      description: 'A mystery series about the investigation of Laura Palmer\'s death.',
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
      description: 'A group of friends discover supernatural phenomena in their small town.',
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
      description: 'Spin-off of the Alien franchise set on Earth.',
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
      description: 'A family confronted with traumatic memories of a haunted house.',
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
      description: 'Survivors fight to survive in a zombie apocalypse.',
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
      description: 'A chemistry teacher becomes a methamphetamine manufacturer.',
      year: 2008,
      rating: 4.9,
      imageUrl: '/assets/Image_For_Card_6.jpg',
      genre: ['Drama', 'Crime', 'Thriller'],
      seasons: 5,
      status: 'ended',
      createdAt: '2024-01-06T00:00:00Z'
    },
    {
      id: '7',
      title: 'It: Welcome to Derry',
      description: 'IT prequel set in the 60s, exploring the origins of terror in Derry.',
      year: 2025,
      rating: 0,
      imageUrl: '/assets/Images_For_Card_7.png',
      genre: ['Horror', 'Drama'],
      seasons: 1,
      status: 'upcoming',
      createdAt: '2024-01-07T00:00:00Z'
    },
    {
      id: '8',
      title: 'Buffy the Vampire Slayer',
      description: 'A young woman chosen to fight vampires, demons and dark forces.',
      year: 1997,
      rating: 4.6,
      imageUrl: '/assets/Images_For_Card_8.png',
      genre: ['Fantasy', 'Drama', 'Horror'],
      seasons: 7,
      status: 'ended',
      createdAt: '2024-01-08T00:00:00Z'
    },
    {
      id: '9',
      title: 'Black Mirror',
      description: 'Sci-fi anthology that explores the consequences of technology.',
      year: 2011,
      rating: 4.7,
      imageUrl: '/assets/Images_For_Card_9.jpg',
      genre: ['Sci-Fi', 'Drama', 'Thriller'],
      seasons: 6,
      status: 'ongoing',
      createdAt: '2024-01-09T00:00:00Z'
    },
    {
      id: '10',
      title: 'The Creep Tapes',
      description: 'Found footage horror series based on the Creep film franchise.',
      year: 2025,
      rating: 0,
      imageUrl: '/assets/Images_For_Card_10.jpg',
      genre: ['Horror', 'Found Footage'],
      seasons: 1,
      status: 'upcoming',
      createdAt: '2024-01-10T00:00:00Z'
    },
    {
      id: '11',
      title: 'Smiling Friends',
      description: 'Animated comedy about a small company dedicated to making people smile.',
      year: 2022,
      rating: 4.5,
      imageUrl: '/assets/Images_For_Card_11.jpg',
      genre: ['Animation', 'Comedy'],
      seasons: 2,
      status: 'ongoing',
      createdAt: '2024-01-11T00:00:00Z'
    },
    {
      id: '12',
      title: "JoJo's Bizarre Adventure",
      description: 'Saga multigeneracional de la familia Joestar enfrentando amenazas sobrenaturales.',
      year: 2012,
      rating: 4.8,
      imageUrl: '/assets/Images_For_Card_12.jpg',
      genre: ['Animation', 'Action', 'Adventure'],
      seasons: 6,
      status: 'ongoing',
      createdAt: '2024-01-12T00:00:00Z'
    }
  ];

  /**
   * GET: Get all series (PHASE 5 - Task 2)
   */
  getAllSeries(): Observable<Series[]> {
    this.loading.set(true);
    this.error.set(null);

    // Simulate an HTTP call with delay
    return of(this.mockSeries).pipe(
      delay(500),
      map(series => {
        this.loading.set(false);
        return series;
      }),
      catchError(error => {
        this.loading.set(false);
        this.error.set('Error loading series');
        throw error;
      })
    );
  }

  /**
   * GET: Get series by ID (PHASE 5 - Task 2)
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
          throw new Error('Series not found');
        }
        return s;
      }),
      catchError(error => {
        this.loading.set(false);
        this.error.set('Series not found');
        throw error;
      })
    );
  }

  /**
   * GET: Get series with filters and pagination (PHASE 5 - Task 4)
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

    // Apply genre filter
    if (genre) {
      filtered = filtered.filter(s => s.genre.includes(genre));
    }

    // Pagination
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
   * POST: Create new series (PHASE 5 - Task 2)
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
   * PUT: Update complete series (PHASE 5 - Task 2)
   */
  update(id: string, dto: UpdateSeriesDto): Observable<Series> {
    this.loading.set(true);

    const index = this.mockSeries.findIndex(s => s.id === id);
    
    return of(index).pipe(
      delay(400),
      map(idx => {
        if (idx === -1) {
          this.loading.set(false);
          throw new Error('Series not found');
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
   * DELETE: Delete series (PHASE 5 - Task 2)
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
