import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Button } from '../button/button';
import { trigger, transition, style, animate } from '@angular/animations';

/**
 * Notification Component
 * 
 * Centered notification modal with message and confirmation button.
 * Used to display success or info messages that require confirmation.
 */
@Component({
  selector: 'app-notification',
  imports: [Button],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ])
  ]
})
export class Notification {
  /**
   * Título del mensaje de notificación
   */
  @Input() title = '';

  /**
   * Texto del botón (por defecto "OK")
   */
  @Input() buttonText = 'OK';

  /**
   * Si la notificación está visible
   */
  @Input() visible = true;

  /**
   * Evento cuando se confirma/cierra la notificación
   */
  @Output() confirmed = new EventEmitter<void>();

  /**
   * Maneja el click en el botón
   */
  onConfirm(): void {
    this.confirmed.emit();
  }
}
