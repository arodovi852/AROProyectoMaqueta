import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../components/shared/card/card';
import { CardStatReview } from '../../components/shared/card-stat-review/card-stat-review';

/**
 * Página ListContent
 * 
 * Página que muestra el contenido de una lista con:
 * - Banner de imágenes
 * - Series de la lista (Cards)
 * - CardStatReview para guardar la lista
 */
@Component({
  selector: 'app-list-content',
  imports: [CommonModule, Card, CardStatReview],
  templateUrl: './list-content.html',
  styleUrl: './list-content.scss',
})
export class ListContent {
  // Información de la lista
  listName = 'List name';
  bannerImage = '/assets/Images_For_Card_1.jpg';

  // Series de la lista
  series = [
    { title: 'Stranger Things', imageSrc: '/assets/Images_For_Card_2.jpg' },
    { title: 'Twin Peaks', imageSrc: '/assets/Images_For_Card_1.jpg' },
    { title: 'Breaking Bad', imageSrc: '/assets/Image_For_Card_5.jpg' },
    { title: 'The Haunting of Hill House', imageSrc: '/assets/Image_For_Card_3.jpg' },
    { title: 'Stranger Things', imageSrc: '/assets/Images_For_Card_2.jpg' },
    { title: 'Twin Peaks', imageSrc: '/assets/Images_For_Card_1.jpg' },
    { title: 'Breaking Bad', imageSrc: '/assets/Image_For_Card_5.jpg' },
    { title: 'The Haunting of Hill House', imageSrc: '/assets/Image_For_Card_3.jpg' },
  ];

  // Estadísticas para CardStatReview
  statsBars = [25, 40, 55, 70, 85, 95, 90, 80, 65, 50];
  listRating = 0;
  isSaved = false;

  onRatingChange(rating: number): void {
    this.listRating = rating;
    console.log('List rating changed:', rating);
  }

  onSaveListToggle(isSaved: boolean): void {
    this.isSaved = isSaved;
    console.log('Save list:', isSaved);
  }
}
