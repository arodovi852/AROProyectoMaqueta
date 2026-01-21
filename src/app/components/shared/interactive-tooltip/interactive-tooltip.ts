import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';

/**
 * Interactive Tooltip Component
 * Tooltips that display on mouseenter/mouseleave
 */
@Component({
  selector: 'app-interactive-tooltip',
  templateUrl: './interactive-tooltip.html',
  styleUrl: './interactive-tooltip.scss',
  standalone: true,
  imports: [CommonModule, Button]
})
export class InteractiveTooltip {
  // Individual tooltips state
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

  // Show tooltip
  showTooltip(key: string) {
    this.tooltips[key] = true;
  }

  // Hide tooltip
  hideTooltip(key: string) {
    this.tooltips[key] = false;
  }

  // Toggle tooltip (para click)
  toggleTooltip(key: string) {
    this.tooltips[key] = !this.tooltips[key];
  }
}
