import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente de Tabs Interactivo
 * Sistema de pestañas con activación por click
 */
@Component({
  selector: 'app-interactive-tabs',
  templateUrl: './interactive-tabs.html',
  styleUrl: './interactive-tabs.scss',
  standalone: true,
  imports: [CommonModule]
})
export class InteractiveTabs {
  activeTab: string = 'detalles';

  // Cambiar tab activo
  selectTab(tabName: string) {
    this.activeTab = tabName;
  }

  // Verificar si un tab está activo
  isActive(tabName: string): boolean {
    return this.activeTab === tabName;
  }
}
