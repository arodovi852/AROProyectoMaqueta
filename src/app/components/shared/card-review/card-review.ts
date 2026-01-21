import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProfile } from '../card-profile/card-profile';

/**
 * Card Review Component
 * 
 * User review card with integrated CardProfile,
 * rating stars and review text.
 * Includes hover effect that lightens the colors.
 */
@Component({
  selector: 'app-card-review',
  imports: [CommonModule, CardProfile],
  templateUrl: './card-review.html',
  styleUrl: './card-review.scss',
})
export class CardReview {
  @Input() username: string = 'User1';
  @Input() rating: number = 3;
  @Input() reviewText: string = '';

  get stars(): number[] {
    return Array(5).fill(0).map((_, i) => i < this.rating ? 1 : 0);
  }
}
