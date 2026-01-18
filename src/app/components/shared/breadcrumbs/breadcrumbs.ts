import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbService, Breadcrumb } from '../../../services/breadcrumb.service';

/**
 * Componente Breadcrumbs (FASE 4 - Tarea 6)
 * 
 * Muestra la navegación de migas de pan basada en la ruta actual.
 * Se actualiza automáticamente con cada navegación.
 */
@Component({
  selector: 'app-breadcrumbs',
  imports: [CommonModule, RouterLink],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.scss',
})
export class Breadcrumbs implements OnInit {
  private breadcrumbService = inject(BreadcrumbService);
  
  breadcrumbs = signal<Breadcrumb[]>([]);

  ngOnInit() {
    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs.set(breadcrumbs);
    });
  }
}

