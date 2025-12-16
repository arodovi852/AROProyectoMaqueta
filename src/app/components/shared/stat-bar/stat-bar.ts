import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-bar',
  imports: [],
  templateUrl: './stat-bar.html',
  styleUrl: './stat-bar.scss',
})
export class StatBar {
  @Input() value = 50; // Valor de 0 a 100
}
