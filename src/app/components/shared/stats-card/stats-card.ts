import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Stats Card Component
 * 
 * Displays user viewing statistics (Watched, Saved, Average)
 */
@Component({
  selector: 'app-stats-card',
  imports: [CommonModule],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.scss',
})
export class StatsCard {
  @Input() watched: number = 0;
  @Input() saved: number = 0;
  @Input() average: number = 0;
}
