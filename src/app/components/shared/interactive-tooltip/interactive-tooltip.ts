import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';

/**
 * Componente de Tooltip Interactivo
 * Tooltips que se muestran con mouseenter/mouseleave
 */
@Component({
  selector: 'app-interactive-tooltip',
  templateUrl: './interactive-tooltip.html',
  styleUrl: './interactive-tooltip.scss',
  standalone: true,
  imports: [CommonModule, Button]
})
export class InteractiveTooltip {
  // Estado de tooltips individuales
  tooltips: { [key: string]: boolean } = {
    top: false,
    right: false,
    bottom: false,
    left: false,
    hover: false,
    info: false,
    warning: false,
    success: false
  };

  // Mostrar tooltip
  showTooltip(key: string) {
    this.tooltips[key] = true;
  }

  // Ocultar tooltip
  hideTooltip(key: string) {
    this.tooltips[key] = false;
  }

  // Toggle tooltip (para click)
  toggleTooltip(key: string) {
    this.tooltips[key] = !this.tooltips[key];
  }
}
