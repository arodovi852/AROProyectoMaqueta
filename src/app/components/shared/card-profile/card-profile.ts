import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Card Profile Component
 * 
 * Non-editable user profile card.
 * Includes a stylized avatar with rotation and scale hover effect.
 */
@Component({
  selector: 'app-card-profile',
  imports: [CommonModule],
  templateUrl: './card-profile.html',
  styleUrl: './card-profile.scss',
})
export class CardProfile {
  @Input() username: string = 'User';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'lg';
}
