import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Card Data Component
 * 
 * Card that displays user statistics:
 * - Watched series (Watched)
 * - Saved series (Saved)
 * - Average score (Average)
 */
@Component({
  selector: 'app-card-data',
  imports: [CommonModule],
  templateUrl: './card-data.html',
  styleUrl: './card-data.scss',
})
export class CardData {
  @Input() watched: number = 0;
  @Input() saved: number = 0;
  @Input() average: number = 0;
}
