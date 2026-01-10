import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../components/shared/card/card';
import { CardStatReview } from '../../components/shared/card-stat-review/card-stat-review';
import { CardReview } from '../../components/shared/card-review/card-review';

/**
 * Página Series Info
 * 
 * Página de información detallada de una serie con:
 * - Card de la serie
 * - Descripción
 * - CardStatReview para valorar
 * - Reviews de usuarios
 */
@Component({
  selector: 'app-series-info',
  imports: [CommonModule, Card, CardStatReview, CardReview],
  templateUrl: './series-info.html',
  styleUrl: './series-info.scss',
})
export class SeriesInfo {
  // Información de la serie
  series = {
    title: 'Twin Peaks',
    imageSrc: '/assets/Images_For_Card_1.jpg',
    description: 'In 1989, a local logger discovers a naked corpse wrapped in plastic on the bank of a river outside the town of Twin Peaks. When police arrive, the body is identified as high school senior and homecoming queen Laura Palmer.'
  };

  // Estadísticas para CardStatReview
  statsBars = [25, 35, 50, 65, 80, 95, 90, 75, 55, 40];
  seriesRating = 0;
  isWatchLater = false;

  // Reviews
  reviews = [
    {
      username: 'User1',
      rating: 3,
      reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elit massa, dignissim quis accumsan eu, aliquet sit amet ipsum. Nullam eget nulla pretium, lobortis turpis at, consectetur sapien. Duis quis congue tellus.'
    },
    {
      username: 'User2',
      rating: 3,
      reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elit massa, dignissim quis accumsan eu, aliquet sit amet ipsum. Nullam eget nulla pretium, lobortis turpis at, consectetur sapien. Duis quis congue tellus.'
    },
    {
      username: 'User3',
      rating: 3,
      reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elit massa, dignissim quis accumsan eu, aliquet sit amet ipsum. Nullam eget nulla pretium, lobortis turpis at, consectetur sapien. Duis quis congue tellus.'
    }
  ];

  onRatingChange(rating: number): void {
    this.seriesRating = rating;
    console.log('Rating changed:', rating);
  }

  onWatchLaterToggle(isWatchLater: boolean): void {
    this.isWatchLater = isWatchLater;
    console.log('Watch later:', isWatchLater);
  }
}
