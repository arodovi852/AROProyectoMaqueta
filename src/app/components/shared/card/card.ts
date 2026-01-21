import { Component, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Star } from '../star/star';
import { StatBar } from '../stat-bar/stat-bar';
import { WatchLater } from '../watch-later/watch-later';
import { CommonModule } from '@angular/common';

/**
 * Card Component
 * 
 * Reusable card to display structured content.
 * Supports variants: --horizontal, --elevated, --bordered, --compact, --interactive, --media, --rating
 */
@Component({
  selector: 'app-card',
  imports: [Star, StatBar, WatchLater, CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  private router = inject(Router);

  /**
   * ID de la serie para navegación dinámica
   */
  @Input() seriesId?: string | number;

  /**
   * URL a la que navegar al hacer click (opcional)
   * Si no se proporciona, navega a /series/:seriesId o /series/1 por defecto
   */
  @Input() link?: string;

  /**
   * Si la card es clickeable (navega a series info)
   */
  @Input() clickable = true;

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
  clickedStarIndex = -1;
  clickedStarFill = 0;

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

  onStarClick(index: number, fillValue: number): void {
    this.clickedStarIndex = index;
    this.clickedStarFill = fillValue;
  }

  onCancelRating(): void {
    this.clickedStarIndex = -1;
    this.clickedStarFill = 0;
  }

  get showCancelButton(): boolean {
    return this.clickedStarIndex !== -1;
  }

  getStarHoverFill(index: number): number {
    // Si hay hover activo, el hover tiene prioridad
    if (this.hoverStarIndex !== -1) {
      if (index < this.hoverStarIndex) return 1;
      if (index === this.hoverStarIndex) return this.hoverStarFill;
      return 0;
    }
    
    // Si no hay hover pero hay click activo, mostrar el click
    if (this.clickedStarIndex !== -1) {
      if (index < this.clickedStarIndex) return 1;
      if (index === this.clickedStarIndex) return this.clickedStarFill;
      return 0;
    }
    
    return 0;
  }
  
  isStarClicked(index: number): boolean {
    if (this.clickedStarIndex === -1) return false;
    if (this.hoverStarIndex !== -1) return false; // No mostrar clicked si hay hover
    if (index < this.clickedStarIndex) return true;
    if (index === this.clickedStarIndex && this.clickedStarFill > 0) return true;
    return false;
  }
  
  isStarHovering(index: number): boolean {
    if (this.hoverStarIndex === -1) return false;
    if (index < this.hoverStarIndex) return true;
    if (index === this.hoverStarIndex) return true;
    return false;
  }

  /**
   * Navega a la página de detalle de serie
   */
  navigateToSeries(): void {
    if (this.clickable && this.variant !== 'rating') {
      if (this.link) {
        this.router.navigate([this.link]);
      } else if (this.seriesId) {
        this.router.navigate(['/series', this.seriesId]);
      } else {
        // Por defecto, Twin Peaks (id=1)
        this.router.navigate(['/series', '1']);
      }
    }
  }
}
