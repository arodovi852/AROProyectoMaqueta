import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente Card Profile
 * 
 * Tarjeta de perfil de usuario sin editar.
 * Incluye un avatar estilizado con efecto hover de rotación y escala.
 */
@Component({
  selector: 'app-card-profile',
  imports: [CommonModule],
  templateUrl: './card-profile.html',
  styleUrl: './card-profile.scss',
})
export class CardProfile {
  @Input() username: string = 'User';
  @Input() size: 'sm' | 'md' | 'lg' = 'lg';
}
