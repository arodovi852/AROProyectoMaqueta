import { Component, Output, EventEmitter } from '@angular/core';

/**
 * Close Button Component
 * 
 * Circular close button with X icon
 */
@Component({
  selector: 'app-close-button',
  imports: [],
  templateUrl: './close-button.html',
  styleUrl: './close-button.scss',
})
export class CloseButton {
  /**
   * Evento que se emite cuando se hace clic en el botón
   */
  @Output() closeClick = new EventEmitter<void>();

  /**
   * Maneja el clic en el botón
   */
  onClick(): void {
    this.closeClick.emit();
  }
}
