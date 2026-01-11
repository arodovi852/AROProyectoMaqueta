import { Component, Input, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from '../../components/shared/card/card';
import { CardStatReview } from '../../components/shared/card-stat-review/card-stat-review';
import { CardReview } from '../../components/shared/card-review/card-review';
import { Series, SeriesService } from '../../services/series.service';
import { ToastService } from '../../services/toast.service';

/**
 * Página Series Info (FASE 4 - Tareas 2, 5)
 * 
 * Página de información detallada de una serie con:
 * - Card de la serie
 * - Descripción
 * - CardStatReview para valorar
 * - Reviews de usuarios
 * 
 * Implementa:
 * - Lectura de parámetros de ruta (:id)
 * - Uso de resolver para precarga de datos
 * - Estados de carga y error
 */
@Component({
  selector: 'app-series-info',
  imports: [CommonModule, Card, CardStatReview, CardReview],
  templateUrl: './series-info.html',
  styleUrl: './series-info.scss',
})
export class SeriesInfo implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seriesService = inject(SeriesService);
  private toast = inject(ToastService);

  // Input desde el resolver o parámetro de ruta (FASE 4 - Tarea 2)
  @Input() id?: string;

  // Estados
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  
  // Información de la serie
  series = signal<{
    title: string;
    imageSrc: string;
    description: string;
    rating?: number;
    year?: number;
    status?: string;
    seasons?: number;
  }>({
    title: 'Twin Peaks',
    imageSrc: '/assets/Images_For_Card_1.jpg',
    description: 'In 1989, a local logger discovers a naked corpse wrapped in plastic on the bank of a river outside the town of Twin Peaks. When police arrive, the body is identified as high school senior and homecoming queen Laura Palmer.'
  });

  // Estadísticas para CardStatReview
  statsBars = [25, 35, 50, 65, 80, 95, 90, 75, 55, 40];
  seriesRating = 0;
  isWatchLater = false;

  // Reviews
  reviews = [
    {
      username: 'User1',
      rating: 3,
      reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elit massa, dignissim quis accumsan eu, aliquet sit amet ipsum.'
    },
    {
      username: 'User2',
      rating: 4,
      reviewText: 'Excelente serie, muy recomendada. La trama te atrapa desde el primer episodio.'
    },
    {
      username: 'User3',
      rating: 5,
      reviewText: 'Una obra maestra del cine televisivo. David Lynch en su máxima expresión.'
    }
  ];

  ngOnInit(): void {
    // Intentar obtener datos del resolver primero
    this.route.data.subscribe(({ series }) => {
      if (series) {
        this.updateSeriesData(series);
      } else if (this.id) {
        // Si no hay resolver, cargar por ID
        this.loadSeries(this.id);
      } else {
        // Obtener ID de los parámetros de ruta
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.loadSeries(id);
        }
      }
    });

    // Verificar si hay error en el estado de navegación
    const navigation = this.router.getCurrentNavigation();
    const errorMessage = navigation?.extras.state?.['error'];
    if (errorMessage) {
      this.error.set(errorMessage);
      this.toast.error(errorMessage);
    }
  }

  /**
   * Carga la serie por ID (FASE 5 - Tarea 5)
   */
  private loadSeries(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.seriesService.getSeriesById(id).subscribe({
      next: (series) => {
        this.updateSeriesData(series);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set('No se pudo cargar la serie');
        this.toast.error('Error al cargar la información de la serie');
      }
    });
  }

  /**
   * Actualiza los datos de la serie
   */
  private updateSeriesData(data: Series): void {
    this.series.set({
      title: data.title,
      imageSrc: data.imageUrl,
      description: data.description,
      rating: data.rating,
      year: data.year,
      status: data.status,
      seasons: data.seasons
    });
  }

  /**
   * Navegación programática - volver a la lista (FASE 4 - Tarea 2)
   */
  goBack(): void {
    this.router.navigate(['/main']);
  }

  onRatingChange(rating: number): void {
    this.seriesRating = rating;
    this.toast.success(`Has valorado con ${rating} estrellas`);
  }

  onWatchLaterToggle(isWatchLater: boolean): void {
    this.isWatchLater = isWatchLater;
    if (isWatchLater) {
      this.toast.info('Serie añadida a "Ver más tarde"');
    } else {
      this.toast.info('Serie eliminada de "Ver más tarde"');
    }
  }
}
