import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatBar } from '../stat-bar/stat-bar';

/**
 * Card Stat Review Component
 * 
 * Card that displays average series statistics with bars,
 * allows giving a star rating (supports half-stars) and saving for watch later.
 */
@Component({
  selector: 'app-card-stat-review',
  imports: [CommonModule, StatBar],
  templateUrl: './card-stat-review.html',
  styleUrl: './card-stat-review.scss',
})
export class CardStatReview {
  @Input() statsBars: number[] = [30, 45, 55, 70, 80, 90, 95, 85, 75, 60];
  @Input() rating: number = 0;
  @Input() isWatchLater: boolean = false;
  @Input() buttonText: string = 'Watch later';
  
  @Output() ratingChange = new EventEmitter<number>();
  @Output() watchLaterToggle = new EventEmitter<boolean>();

  // For hover preview
  hoverRating: number = 0;

  get stars(): number[] {
    return [1, 2, 3, 4, 5];
  }

  /**
   * Handle click on star - determines half or full based on click position
   */
  onStarClick(event: MouseEvent, star: number): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    
    // Calculate rating: half star = star - 0.5, full star = star
    this.rating = isHalf ? star - 0.5 : star;
    this.ratingChange.emit(this.rating);
    this.hoverRating = 0;
  }

  /**
   * Handle mouse move over star - shows preview
   */
  onStarMouseMove(event: MouseEvent, star: number): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    
    this.hoverRating = isHalf ? star - 0.5 : star;
  }

  /**
   * Reset hover preview on mouse leave
   */
  onStarMouseLeave(): void {
    this.hoverRating = 0;
  }

  /**
   * Get fill percentage for a star based on current rating/hover
   */
  getStarFill(star: number): number {
    const activeRating = this.hoverRating > 0 ? this.hoverRating : this.rating;
    
    if (activeRating >= star) {
      return 100; // Full star
    } else if (activeRating >= star - 0.5) {
      return 50; // Half star
    }
    return 0; // Empty star
  }

  /**
   * Check if star is being previewed (for styling)
   */
  isStarHovered(star: number): boolean {
    return this.hoverRating > 0 && this.hoverRating >= star - 0.5;
  }

  toggleWatchLater(): void {
    this.isWatchLater = !this.isWatchLater;
    this.watchLaterToggle.emit(this.isWatchLater);
  }
}
