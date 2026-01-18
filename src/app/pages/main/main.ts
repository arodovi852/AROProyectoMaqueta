import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Card } from '../../components/shared/card/card';
import { Button } from '../../components/shared/button/button';
import { SeriesService, Series } from '../../services/series.service';
import { ToastService } from '../../services/toast.service';

/**
 * Interface para los datos de las tarjetas de series
 */
interface SeriesCard {
  id: number;
  imageSrc: string;
  imageAlt: string;
  hoverTitle: string;
}

/**
 * Página Main (FASE 4 - Tarea 2, FASE 5 - Tarea 5)
 * 
 * Página principal de la aplicación con hero section y grid de series.
 * Similar a plataformas de seguimiento de series como Trakt o Letterboxd.
 * 
 * Implementa:
 * - Navegación programática con Router
 * - Estados de carga y error
 * - Integración con SeriesService
 */
@Component({
  selector: 'app-main',
  imports: [CommonModule, Card, Button],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main implements OnInit {
  private router = inject(Router);
  private seriesService = inject(SeriesService);
  private toast = inject(ToastService);

  // Estados
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  seriesFromApi = signal<Series[]>([]);
  /**
   * Series populares de la semana
   */
  popularSeries: SeriesCard[] = [
    {
      id: 1,
      imageSrc: '/assets/Images_For_Card_1.jpg',
      imageAlt: 'Twin Peaks',
      hoverTitle: 'Twin Peaks'
    },
    {
      id: 2,
      imageSrc: '/assets/Images_For_Card_2.jpg',
      imageAlt: 'Stranger Things',
      hoverTitle: 'Stranger Things'
    },
    {
      id: 3,
      imageSrc: '/assets/Image_For_Card_3.jpg',
      imageAlt: 'Alien: Earth',
      hoverTitle: 'Alien: Earth'
    },
    {
      id: 4,
      imageSrc: '/assets/Image_For_Card_4.jpg',
      imageAlt: 'The Haunting of Hill House',
      hoverTitle: 'The Haunting of Hill House'
    },
    {
      id: 5,
      imageSrc: '/assets/Image_For_Card_5.jpg',
      imageAlt: 'The Walking Dead',
      hoverTitle: 'The Walking Dead'
    },
    {
      id: 6,
      imageSrc: '/assets/Image_For_Card_6.jpg',
      imageAlt: 'Breaking Bad',
      hoverTitle: 'Breaking Bad'
    }
  ];

  /**
   * Próximos estrenos
   */
  futureReleases: SeriesCard[] = [
    {
      id: 7,
      imageSrc: '/assets/Images_For_Card_7.png',
      imageAlt: 'It: Welcome to Derry',
      hoverTitle: 'It: Welcome to Derry'
    },
    {
      id: 8,
      imageSrc: '/assets/Images_For_Card_8.png',
      imageAlt: 'Buffy the Vampire Slayer',
      hoverTitle: 'Buffy the Vampire Slayer'
    },
    {
      id: 9,
      imageSrc: '/assets/Images_For_Card_9.jpg',
      imageAlt: 'Black Mirror',
      hoverTitle: 'Black Mirror'
    },
    {
      id: 10,
      imageSrc: '/assets/Images_For_Card_10.jpg',
      imageAlt: 'The Creep Tapes',
      hoverTitle: 'The Creep Tapes'
    },
    {
      id: 11,
      imageSrc: '/assets/Images_For_Card_11.jpg',
      imageAlt: 'Smiling Friends',
      hoverTitle: 'Smiling Friends'
    },
    {
      id: 12,
      imageSrc: '/assets/Images_For_Card_12.jpg',
      imageAlt: "JoJo's Bizarre Adventure",
      hoverTitle: "JoJo's Bizarre Adventure"
    }
  ];

  ngOnInit(): void {
    this.loadSeriesFromApi();
  }

  /**
   * Carga series desde el servicio (FASE 5 - Tarea 5)
   */
  loadSeriesFromApi(): void {
    this.loading.set(true);
    this.error.set(null);

    this.seriesService.getAllSeries().subscribe({
      next: (series) => {
        this.seriesFromApi.set(series);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set('Error loading series');
        this.toast.error('Could not load series');
      }
    });
  }

  /**
   * Navegación programática a detalle de serie (FASE 4 - Tarea 2)
   */
  navigateToSeries(id: number): void {
    this.router.navigate(['/series', id]);
  }

  /**
   * Navegación programática con query params (FASE 4 - Tarea 2)
   */
  searchSeries(query: string): void {
    this.router.navigate(['/searchresult'], {
      queryParams: { q: query }
    });
  }

  /**
   * Manejador del click en "Get started" (FASE 4 - Tarea 2)
   */
  onGetStarted(): void {
    // Navegación programática al perfil/registro
    this.router.navigate(['/profile']);
  }

  /**
   * Manejador del click en "See more" (FASE 4 - Tarea 2)
   */
  onSeeMore(section: string): void {
    this.router.navigate(['/lists'], {
      queryParams: { section },
      fragment: section
    });
  }
}
