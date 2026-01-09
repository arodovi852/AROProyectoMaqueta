import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Página About
 * 
 * Información sobre la empresa/aplicación
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  teamMembers = [
    {
      name: 'Ana García',
      role: 'CEO & Fundadora',
      description: 'Líder visionaria con más de 15 años de experiencia en tecnología.'
    },
    {
      name: 'Carlos López',
      role: 'CTO',
      description: 'Experto en arquitectura de software y soluciones cloud.'
    },
    {
      name: 'María Rodríguez',
      role: 'Lead Developer',
      description: 'Especialista en Angular y desarrollo frontend moderno.'
    }
  ];

  companyStats = [
    { value: '500+', label: 'Clientes satisfechos' },
    { value: '10+', label: 'Años de experiencia' },
    { value: '99.9%', label: 'Uptime garantizado' },
    { value: '24/7', label: 'Soporte técnico' }
  ];
}
