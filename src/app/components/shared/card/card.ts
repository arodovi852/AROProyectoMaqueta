import { Component, Input } from '@angular/core';
import { Star } from '../star/star';
import { StatBar } from '../stat-bar/stat-bar';
import { WatchLater } from '../watch-later/watch-later';
import { CommonModule } from '@angular/common';

/**
 * Componente Card
 * 
 * Tarjeta reutilizable para mostrar contenido estructurado.
 * Soporta variantes: --horizontal, --elevated, --bordered, --compact, --interactive, --media, --rating
 */
@Component({
  selector: 'app-card',
  imports: [Star, StatBar, WatchLater, CommonModule],
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
  @Input() variant: 'default' | 'horizontal' | 'elevated' | 'bordered' | 'compact' | 'interactive' | 'media' | 'rating' = 'default';

  /**
   * Si la tarjeta tiene footer
   */
  @Input() hasFooter = false;

  /**
   * Datos para las barras estadísticas (rating variant)
   */
  @Input() statBars: number[] = [];

  /**
   * Número total de estrellas (rating variant)
   */
  @Input() totalStars = 5;

  /**
   * Número de estrellas llenas (rating variant)
   */
  @Input() filledStars = 0;

  hoverStarIndex = -1;
  hoverStarFill = 0;

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

  onStarHover(index: number, fillValue: number): void {
    this.hoverStarIndex = index;
    this.hoverStarFill = fillValue;
  }

  getStarHoverFill(index: number): number {
    if (this.hoverStarIndex === -1) return 0;
    if (index < this.hoverStarIndex) return 1;
    if (index === this.hoverStarIndex) return this.hoverStarFill;
    return 0;
  }
}
