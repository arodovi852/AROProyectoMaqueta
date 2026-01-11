import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente User Avatar
 * 
 * Avatar del usuario con nombre
 */
@Component({
  selector: 'app-user-avatar',
  imports: [CommonModule],
  templateUrl: './user-avatar.html',
  styleUrl: './user-avatar.scss',
})
export class UserAvatar {
  @Input() username: string = 'User';
  @Input() size: 'sm' | 'md' | 'lg' = 'lg';
}
