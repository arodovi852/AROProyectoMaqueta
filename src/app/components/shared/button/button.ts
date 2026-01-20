import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

/**
 * Componente Button
 * 
 * Botón reutilizable con múltiples variantes de color, tamaño y estilo.
 * Soporta BEM con modificadores: --primary, --secondary, --outline, --ghost,
 * --danger, --success, --small, --large, --full, --icon
 */
@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  /**
   * Tipo de botón HTML
   */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Variante de color del botón
   */
  @Input() variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';

  /**
   * Tamaño del botón
   */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Si el botón debe ocupar todo el ancho
   */
  @Input() fullWidth = false;

  /**
   * Si el botón es solo un icono (sin texto)
   */
  @Input() iconOnly = false;

  /**
   * Estado deshabilitado
   */
  @Input() disabled = false;

  /**
   * Texto del botón (opcional, también puede usar ng-content)
   */
  @Input() text?: string;

  /**
   * Evento de click
   */
  @Output() onClick = new EventEmitter<Event>();

  /**
   * Genera las clases CSS del botón basadas en los inputs
   */
  get buttonClasses(): string {
    const classes = ['btn'];

    // Variante de color
    classes.push(`btn--${this.variant}`);

    // Tamaño
    if (this.size !== 'md') {
      classes.push(`btn--${this.size}`);
    }

    // Ancho completo
    if (this.fullWidth) {
      classes.push('btn--full');
    }

    // Solo icono
    if (this.iconOnly) {
      classes.push('btn--icon');
    }

    return classes.join(' ');
  }
}
