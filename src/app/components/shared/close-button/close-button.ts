import { Component, Output, EventEmitter } from '@angular/core';

/**
 * Componente Close Button
 * 
 * Botón circular de cierre con icono X
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
