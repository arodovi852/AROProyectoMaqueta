import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SeriesService, Series } from '../../services/series.service';
import { ToastService } from '../../services/toast.service';

/**
 * SearchResult Page (PHASE 4 - Task 2, PHASE 5 - Task 4)
 * 
 * Displays series search results.
 * Reads query params to filter results.
 */
@Component({
  selector: 'app-search-result',
  imports: [CommonModule, RouterLink],
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

  // Resultados de ejemplo (fallback)
  defaultResults = [
    {
      id: '1',
      title: 'The haunting of Hill House',
      description: "In the summer of '92, a family of seven move into Hill House to renovate the mansion in order to sell it and build their own house. However, they begin to experience increasing paranormal phenomena.",
      image: '/assets/Image_For_Card_3.jpg'
    },
    {
      id: '2',
      title: 'Twin Peaks',
      description: 'In 1989, a local logger discovers a naked corpse wrapped in plastic on the bank of a river outside the town of Twin Peaks.',
      image: '/assets/Images_For_Card_1.jpg'
    },
    {
      id: '3',
      title: 'Breaking Bad',
      description: 'Walter White is a struggling high school chemistry teacher who becomes a crime lord in the local methamphetamine drug trade.',
      image: '/assets/Image_For_Card_5.jpg'
    },
    {
      id: '4',
      title: 'Stranger Things',
      description: 'In 1983, a kid named Will gets mysteriously abducted and his loved ones begin an extensive search to find him.',
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
