import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from '../../components/shared/modal/modal';
import { Tabs, Tab } from '../../components/shared/tabs/tabs';
import { Tooltip } from '../../components/shared/tooltip/tooltip';
import { Button } from '../../components/shared/button/button';
import { DomExample } from '../../components/shared/dom-example/dom-example';

/**
 * Página de demostración de componentes interactivos
 * Cliente Fase 1 - Tarea 3: Componentes interactivos funcionales
 */
@Component({
  selector: 'app-demo-components',
  standalone: true,
  imports: [
    CommonModule, 
    Modal, 
    Tabs, 
    Tooltip, 
    Button, 
    DomExample
  ],
  templateUrl: './demo-components.html',
  styleUrl: './demo-components.scss',
})
export class DemoComponents {
  // Estados de modales
  isModalOpen = false;
  isSecondModalOpen = false;
  isConfirmModalOpen = false;

  // Pestañas de ejemplo - Producto
  productTabs: Tab[] = [
    {
      id: 'detalles',
      label: 'Detalles',
      content: 'Este es el contenido de la pestaña de detalles. Aquí puedes agregar información detallada sobre el producto o servicio. Las pestañas permiten organizar contenido de forma clara y accesible.'
    },
    {
      id: 'especificaciones',
      label: 'Especificaciones',
      content: 'Especificaciones técnicas: Altura: 10cm, Ancho: 20cm, Peso: 500g, Material: Plástico ABS. Compatible con estándares internacionales.'
    },
    {
      id: 'reviews',
      label: 'Reviews',
      content: 'Calificación promedio: 4.5/5 estrellas. Los usuarios destacan la calidad y durabilidad del producto. "Excelente compra" - Usuario verificado.'
    },
    {
      id: 'envio',
      label: 'Envío',
      content: 'Envío gratuito en pedidos superiores a 50€. Entrega en 24-48h. Posibilidad de recogida en tienda.'
    }
  ];

  // Pestañas de ejemplo - Documentación
  docTabs: Tab[] = [
    {
      id: 'viewchild',
      label: 'ViewChild',
      content: '@ViewChild permite acceder a elementos del DOM desde el componente. Se utiliza con ElementRef para obtener referencias directas.'
    },
    {
      id: 'renderer2',
      label: 'Renderer2',
      content: 'Renderer2 es la forma segura de manipular el DOM en Angular. Compatible con SSR y previene vulnerabilidades XSS.'
    },
    {
      id: 'eventos',
      label: 'Eventos',
      content: 'Angular soporta todos los eventos nativos del DOM: click, keydown, mouseenter, focus, blur, etc. Con sintaxis (eventName)="handler($event)".'
    }
  ];

  // Contador para demostración
  clickCount = 0;
  lastEventType = 'ninguno';

  // Maneja el cambio de pestaña
  onTabChange(tabId: string): void {
    console.log('Pestaña seleccionada:', tabId);
    this.lastEventType = `Tab cambiado a: ${tabId}`;
  }

  // Abre el modal principal
  openModal(): void {
    this.isModalOpen = true;
    this.lastEventType = 'Modal abierto';
  }

  // Cierra el modal principal
  closeModal(): void {
    this.isModalOpen = false;
    this.lastEventType = 'Modal cerrado';
  }

  // Confirma acción del modal principal
  confirmModal(): void {
    console.log('Modal confirmado');
    this.lastEventType = 'Modal confirmado';
    this.closeModal();
  }

  // Abre el segundo modal
  openSecondModal(): void {
    this.isSecondModalOpen = true;
    this.lastEventType = 'Segundo modal abierto';
  }

  // Cierra el segundo modal
  closeSecondModal(): void {
    this.isSecondModalOpen = false;
    this.lastEventType = 'Segundo modal cerrado';
  }

  // Abre modal de confirmación
  openConfirmModal(): void {
    this.isConfirmModalOpen = true;
    this.lastEventType = 'Modal de confirmación abierto';
  }

  // Cierra modal de confirmación
  closeConfirmModal(): void {
    this.isConfirmModalOpen = false;
    this.lastEventType = 'Modal de confirmación cerrado';
  }

  // Confirma la acción peligrosa
  confirmDangerousAction(): void {
    console.log('Acción peligrosa confirmada');
    this.lastEventType = 'Acción peligrosa confirmada';
    this.closeConfirmModal();
  }

  // Incrementa contador
  incrementCounter(): void {
    this.clickCount++;
    this.lastEventType = `Click #${this.clickCount}`;
  }

  // Maneja eventos de teclado
  onKeyEvent(event: KeyboardEvent, type: string): void {
    this.lastEventType = `${type}: ${event.key}`;
    console.log(`Evento de teclado: ${event.key}`);
  }

  // Maneja eventos de mouse
  onMouseEvent(type: string): void {
    this.lastEventType = `Mouse: ${type}`;
  }

  // Maneja eventos de focus
  onFocusEvent(type: string): void {
    this.lastEventType = `Focus: ${type}`;
  }

  // Reset del contador y eventos
  resetDemo(): void {
    this.clickCount = 0;
    this.lastEventType = 'Demo reseteada';
  }
}
