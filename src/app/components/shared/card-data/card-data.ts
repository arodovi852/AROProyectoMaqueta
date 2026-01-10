import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente Card Data
 * 
 * Tarjeta que muestra estadísticas del usuario:
 * - Series vistas (Watched)
 * - Series guardadas (Saved)
 * - Promedio de puntuación (Average)
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
