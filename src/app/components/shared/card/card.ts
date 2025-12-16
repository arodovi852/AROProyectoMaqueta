import { Component, Input } from '@angular/core';

/**
 * Componente Card
 * 
 * Tarjeta reutilizable para mostrar contenido estructurado.
 * Soporta variantes: --horizontal, --elevated, --bordered, --compact, --interactive
 */
@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  /**
   * URL de la imagen de la tarjeta
   */
  @Input() imageSrc?: string;

  /**
   * Texto alternativo de la imagen
   */
  @Input() imageAlt = '';

  /**
   * Título de la tarjeta
   */
  @Input() title?: string;

  /**
   * Texto del logo que aparece en la imagen
   */
  @Input() logoText?: string;

  /**
   * Título que aparece en hover
   */
  @Input() hoverTitle?: string;

  /**
   * Variante de estilo de la tarjeta
   */
  @Input() variant: 'default' | 'horizontal' | 'elevated' | 'bordered' | 'compact' | 'interactive' | 'media' = 'default';

  /**
   * Si la tarjeta tiene footer
   */
  @Input() hasFooter = false;

  /**
   * Genera las clases CSS de la tarjeta
   */
  get cardClasses(): string {
    const classes = ['card'];

    if (this.variant !== 'default') {
      classes.push(`card--${this.variant}`);
    }

    return classes.join(' ');
  }
}
