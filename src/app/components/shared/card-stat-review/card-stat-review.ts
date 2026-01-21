import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatBar } from '../stat-bar/stat-bar';

/**
 * Card Stat Review Component
 * 
 * Card that displays average series statistics with bars,
 * allows giving a star rating and saving for watch later.
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

  get stars(): number[] {
    return [1, 2, 3, 4, 5];
  }

  onStarClick(star: number): void {
    this.rating = star;
    this.ratingChange.emit(this.rating);
  }

  toggleWatchLater(): void {
    this.isWatchLater = !this.isWatchLater;
    this.watchLaterToggle.emit(this.isWatchLater);
  }
}
