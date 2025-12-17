import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss'
})
export class UserLayoutComponent {
  navItems = [
    { label: 'Perfil', route: '/usuario/perfil', icon: '👤' },
    { label: 'Pedidos', route: '/usuario/pedidos', icon: '📦' }
  ];
}
