import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Interface para las imágenes de la lista
 */
interface CardListImage {
  src: string;
  alt: string;
}

/**
 * CardList Component
 * 
 * Displays a list of series with multiple stacked images in a fan layout.
 * On hover, the images expand showing all the cards.
 */
@Component({
  selector: 'app-card-list',
  imports: [CommonModule],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardList {
  /**
   * Título de la lista (ej: "Horror series")
   */
  @Input() title = '';

  /**
   * Array de imágenes para mostrar en el stack
   */
  @Input() images: CardListImage[] = [];

  /**
   * Número máximo de imágenes visibles en el stack (por defecto 4)
   */
  @Input() maxVisibleCards = 4;

  /**
   * Tamaño del componente: 'default' o 'small'
   */
  @Input() size: 'default' | 'small' = 'default';

  /**
   * Obtiene las imágenes a mostrar (limitadas por maxVisibleCards)
   */
  get visibleImages(): CardListImage[] {
    return this.images.slice(0, this.maxVisibleCards);
  }

  /**
   * Genera las clases CSS del componente
   */
  get listClasses(): string {
    const classes = ['card-list'];
    if (this.size === 'small') {
      classes.push('card-list--small');
    }
    return classes.join(' ');
  }
}
