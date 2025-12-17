import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Button } from '../../components/shared/button/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink, Button],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFoundComponent {
  suggestions = [
    { label: 'Inicio', route: '/home', icon: '🏠' },
    { label: 'Productos', route: '/productos', icon: '🛍️' },
    { label: 'Acerca de', route: '/about', icon: 'ℹ️' },
    { label: 'Usuario', route: '/usuario', icon: '👤' }
  ];
}
