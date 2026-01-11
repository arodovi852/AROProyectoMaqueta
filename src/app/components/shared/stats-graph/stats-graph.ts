import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente Stats Graph
 * 
 * Gráfico de barras verticales mostrando estadísticas
 */
@Component({
  selector: 'app-stats-graph',
  imports: [CommonModule],
  templateUrl: './stats-graph.html',
  styleUrl: './stats-graph.scss',
})
export class StatsGraph {
  @Input() title: string = 'Stats';
  @Input() bars: number[] = [60, 80, 40, 90, 70, 50, 85, 65];
}
