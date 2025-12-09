import { Component } from '@angular/core';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  icon: string;
  color: string;
  features: string[];
}

@Component({
  selector: 'app-productos',
  imports: [],
  templateUrl: './productos.html',
  styleUrl: './productos.scss',
})
export class Productos {
  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Cloud Enterprise',
      descripcion: 'Plataforma completa en la nube para empresas modernas',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      color: 'var(--color-primary)',
      features: ['Escalabilidad automática', 'Alta disponibilidad', 'Backup automático']
    },
    {
      id: 2,
      nombre: 'Analytics Pro',
      descripcion: 'Análisis avanzado de datos en tiempo real',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
      color: 'var(--color-secondary)',
      features: ['Dashboards personalizables', 'Reportes automáticos', 'Integración con BI']
    },
    {
      id: 3,
      nombre: 'Security Shield',
      descripcion: 'Protección integral para tu infraestructura',
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
      color: 'var(--color-success)',
      features: ['Monitoreo 24/7', 'Detección de amenazas', 'Cumplimiento normativo']
    }
  ];
}
