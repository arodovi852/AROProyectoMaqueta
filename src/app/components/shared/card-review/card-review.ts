import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardProfile } from '../card-profile/card-profile';

/**
 * Card Review Component
 * 
 * User review card with integrated CardProfile,
 * rating stars and review text.
 * Includes hover effect that lightens the colors.
 * Clicking navigates to the user's profile page.
 */
@Component({
  selector: 'app-card-review',
  imports: [CommonModule, CardProfile],
  templateUrl: './card-review.html',
  styleUrl: './card-review.scss',
})
export class CardReview {
  private router = inject(Router);

  @Input() username: string = 'User1';
  @Input() rating: number = 3;
  @Input() reviewText: string = '';
  @Input() clickable: boolean = true;

  get stars(): number[] {
    return Array(5).fill(0).map((_, i) => i < this.rating ? 1 : 0);
  }

  /**
   * Navigate to user profile when card is clicked
   */
  onCardClick(): void {
    if (this.clickable && this.username) {
      // Convert username to lowercase for URL (User1 -> user1)
      const userId = this.username.toLowerCase();
      this.router.navigate(['/profile', userId]);
    }
  }

  /**
   * Handle keyboard navigation
   */
  onKeydown(event: KeyboardEvent): void {
    if (this.clickable && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.onCardClick();
    }
  }
}
