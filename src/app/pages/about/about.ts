import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Button } from '../../components/shared/button/button';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, Button],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent {
  features = [
    {
      icon: '🚀',
      title: 'Rutas Dinámicas',
      description: 'Sistema completo de navegación con Angular Router y parámetros dinámicos'
    },
    {
      icon: '🔒',
      title: 'Route Guards',
      description: 'Protección de rutas con authGuard y prevención de pérdida de datos con CanDeactivate'
    },
    {
      icon: '⚡',
      title: 'Lazy Loading',
      description: 'Carga perezosa de módulos con PreloadAllModules para optimizar el rendimiento'
    },
    {
      icon: '🎯',
      title: 'Resolvers',
      description: 'Precarga de datos antes de activar rutas con loading states integrados'
    },
    {
      icon: '🍞',
      title: 'Breadcrumbs',
      description: 'Sistema de navegación de migas de pan que se actualiza automáticamente'
    },
    {
      icon: '📱',
      title: 'Responsive',
      description: 'Diseño adaptativo que funciona perfectamente en cualquier dispositivo'
    }
  ];

  stats = [
    { value: '10+', label: 'Rutas Configuradas' },
    { value: '4', label: 'Guards Activos' },
    { value: '5', label: 'Resolvers' },
    { value: '100%', label: 'TypeScript' }
  ];
}
