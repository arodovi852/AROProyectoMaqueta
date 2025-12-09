import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

/**
 * Componente Alert
 * 
 * Alerta reutilizable para mostrar mensajes al usuario.
 * Tipos: info, success, warning, error
 */
@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-0.5rem)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-0.5rem)' }))
      ])
    ])
  ]
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
    this.closed.emit();
  }
}
