import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Review Card Component
 * 
 * Displays a user review with avatar, name, rating and text
 */
@Component({
  selector: 'app-review-card',
  imports: [CommonModule],
  templateUrl: './review-card.html',
  styleUrl: './review-card.scss',
})
export class ReviewCard {
  @Input() username: string = '';
  @Input() rating: number = 0;
  @Input() reviewText: string = '';
  @Input() avatarColor: string = '#6b5b7a';

  get stars(): number[] {
    return Array(5).fill(0).map((_, i) => i < this.rating ? 1 : 0);
  }
}
