import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Alert Component
 * 
 * Reusable alert to display messages to the user.
 * Types: info, success, warning, error
 */
@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.scss'
})
export class Alert {
  /**
   * Tipo de alerta
   */
  @Input() type: 'info' | 'success' | 'warning' | 'error' = 'info';

  /**
   * Título de la alerta (opcional)
   */
  @Input() title?: string;

  /**
   * Si la alerta se puede cerrar
   */
  @Input() dismissible = true;

  /**
   * Si la alerta está visible
   */
  @Input() visible = true;

  /**
   * Evento cuando se cierra la alerta
   */
  @Output() closed = new EventEmitter<void>();

  /**
   * Genera las clases CSS de la alerta
   */
  get alertClasses(): string {
    return `alert alert--${this.type}`;
  }

  /**
   * Maneja el cierre de la alerta
   */
  onClose(): void {
    this.visible = false;
    this.closed.emit();
  }
}
