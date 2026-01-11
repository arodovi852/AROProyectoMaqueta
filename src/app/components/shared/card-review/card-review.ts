import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProfile } from '../card-profile/card-profile';

/**
 * Componente Card Review
 * 
 * Tarjeta de reseña de usuario con CardProfile integrado,
 * estrellas de calificación y texto de reseña.
 * Incluye efecto hover que aclara los colores.
 */
@Component({
  selector: 'app-card-review',
  imports: [CommonModule, CardProfile],
  templateUrl: './card-review.html',
  styleUrl: './card-review.scss',
})
export class CardReview {
  @Input() username: string = 'User1';
  @Input() rating: number = 3;
  @Input() reviewText: string = '';

  get stars(): number[] {
    return Array(5).fill(0).map((_, i) => i < this.rating ? 1 : 0);
  }
}
