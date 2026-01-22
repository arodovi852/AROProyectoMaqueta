import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SeriesService, Series } from '../../services/series.service';
import { ToastService } from '../../services/toast.service';
import { Card } from '../../components/shared/card/card';

/**
 * SearchResult Page (PHASE 4 - Task 2, PHASE 5 - Task 4)
 * 
 * Displays series search results in horizontal card layout.
 * Uses Card component for image with hover effect.
 * Clicking navigates to /series/:id.
 */
@Component({
  selector: 'app-search-result',
  imports: [CommonModule, Card],
  templateUrl: './search-result.html',
  styleUrl: './search-result.scss',
})
export class SearchResult implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seriesService = inject(SeriesService);
  private toast = inject(ToastService);

  // Estados
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  
  // Query de búsqueda
  searchQuery = signal<string>('');
  
  // Paginación
  currentPage = signal<number>(1);
  totalResults = signal<number>(0);
  pageSize = 10;

  // Resultados de búsqueda
  searchResults = signal<{
    id: string;
    title: string;
    description: string;
    image: string;
  }[]>([]);

  // Resultados de ejemplo (fallback) - Matching series.service.ts data
  defaultResults = [
    {
      id: '4',
      title: 'The Haunting of Hill House',
      description: 'A family confronted with traumatic memories of a haunted house.',
      image: '/assets/Image_For_Card_4.jpg'
    },
    {
      id: '1',
      title: 'Twin Peaks',
      description: 'An FBI agent investigates the mysterious death of a homecoming queen in a small town.',
      image: '/assets/Images_For_Card_1.jpg'
    },
    {
      id: '6',
      title: 'Breaking Bad',
      description: 'A chemistry teacher becomes a methamphetamine manufacturer.',
      image: '/assets/Image_For_Card_6.jpg'
    },
    {
      id: '2',
      title: 'Stranger Things',
      description: 'A group of friends discover supernatural phenomena in their small town.',
      image: '/assets/Images_For_Card_2.jpg'
    }
  ];

  ngOnInit(): void {
    // Subscribe to query params changes (PHASE 4 - Task 2)
    this.route.queryParams.subscribe(params => {
      const query = params['q'] || '';
      const page = parseInt(params['page'] || '1', 10);
      
      this.searchQuery.set(query);
      this.currentPage.set(page);
      
      if (query) {
        this.performSearch(query, page);
      } else {
        this.searchResults.set(this.defaultResults);
        this.totalResults.set(this.defaultResults.length);
      }
    });
  }

  /**
   * Realizar búsqueda con el servicio (FASE 5 - Tarea 4)
   */
  private performSearch(query: string, page: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.seriesService.getSeriesFiltered(page, this.pageSize, query).subscribe({
      next: (response) => {
        this.searchResults.set(response.items.map(s => ({
          id: s.id,
          title: s.title,
          description: s.description,
          image: s.imageUrl
        })));
        this.totalResults.set(response.total);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set('Search error');
        this.searchResults.set(this.defaultResults);
        this.toast.error('Could not get search results');
      }
    });
  }

  /**
   * Navegar a una página de resultados (FASE 4 - Tarea 2)
   */
  goToPage(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }

  /**
   * Navegar al detalle de una serie (FASE 4 - Tarea 2)
   */
  viewSeries(id: string): void {
    this.router.navigate(['/series', id]);
  }
}
