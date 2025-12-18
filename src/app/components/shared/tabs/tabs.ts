import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Interfaz para definir una pestaña
 */
export interface Tab {
  id: string;
  label: string;
  content?: string;
}

/**
 * Componente Tabs
 * 
 * Sistema de pestañas con cambio de contenido.
 * Implementa requisitos de Cliente Fase 1:
 * - Event binding con (click)
 * - Clases condicionales con [class]
 * - Sistema de estado activeTab
 */
@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
})
export class Tabs {
  /**
   * Array de pestañas a mostrar
   */
  @Input() tabs: Tab[] = [];

  /**
   * ID de la pestaña activa por defecto
   */
  @Input() activeTabId?: string;

  /**
   * Evento emitido al cambiar de pestaña
   */
  @Output() tabChange = new EventEmitter<string>();

  /**
   * ID de la pestaña actualmente activa
   */
  activeTab = '';

  ngOnInit(): void {
    // Establecer pestaña activa inicial
    if (this.activeTabId) {
      this.activeTab = this.activeTabId;
    } else if (this.tabs.length > 0) {
      this.activeTab = this.tabs[0].id;
    }
  }

  /**
   * Selecciona una pestaña
   * Cliente Fase 1: Event handling
   */
  selectTab(tabId: string, event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
    }
    
    this.activeTab = tabId;
    this.tabChange.emit(tabId);
  }

  /**
   * Navegación con teclado entre pestañas
   * Cliente Fase 1: Eventos de teclado
   */
  onKeyDown(event: KeyboardEvent, currentIndex: number): void {
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : this.tabs.length - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        newIndex = currentIndex < this.tabs.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = this.tabs.length - 1;
        break;
      default:
        return;
    }

    this.selectTab(this.tabs[newIndex].id);
    
    // Enfocar el nuevo tab
    const tabButton = document.querySelector(`[data-tab-id="${this.tabs[newIndex].id}"]`) as HTMLElement;
    if (tabButton) {
      tabButton.focus();
    }
  }

  /**
   * Verifica si una pestaña está activa
   */
  isActive(tabId: string): boolean {
    return this.activeTab === tabId;
  }
}
