import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from '../../components/shared/modal/modal';
import { Tabs, Tab } from '../../components/shared/tabs/tabs';
import { Tooltip } from '../../components/shared/tooltip/tooltip';
import { Button } from '../../components/shared/button/button';
import { DomExample } from '../../components/shared/dom-example/dom-example';

/**
 * Interactive components demo page
 * Client Phase 1 - Task 3: Functional interactive components
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
  // Modal states
  isModalOpen = false;
  isSecondModalOpen = false;
  isConfirmModalOpen = false;

  // Example tabs - Product
  productTabs: Tab[] = [
    {
      id: 'detalles',
      label: 'Details',
      content: 'This is the content of the details tab. Here you can add detailed information about the product or service. Tabs allow organizing content clearly and accessibly.'
    },
    {
      id: 'especificaciones',
      label: 'Specifications',
      content: 'Technical specifications: Height: 10cm, Width: 20cm, Weight: 500g, Material: ABS Plastic. Compatible with international standards.'
    },
    {
      id: 'reviews',
      label: 'Reviews',
      content: 'Average rating: 4.5/5 stars. Users highlight the quality and durability of the product. "Excellent purchase" - Verified User.'
    },
    {
      id: 'envio',
      label: 'Shipping',
      content: 'Free shipping on orders over €50. Delivery in 24-48h. Store pickup available.'
    }
  ];

  // Example tabs - Documentation
  docTabs: Tab[] = [
    {
      id: 'viewchild',
      label: 'ViewChild',
      content: '@ViewChild allows accessing DOM elements from the component. It is used with ElementRef to get direct references.'
    },
    {
      id: 'renderer2',
      label: 'Renderer2',
      content: 'Renderer2 is the safe way to manipulate the DOM in Angular. Compatible with SSR and prevents XSS vulnerabilities.'
    },
    {
      id: 'eventos',
      label: 'Events',
      content: 'Angular supports all native DOM events: click, keydown, mouseenter, focus, blur, etc. With syntax (eventName)="handler($event)".'
    }
  ];

  // Counter for demonstration
  clickCount = 0;
  lastEventType = 'none';

  // Handles tab change
  onTabChange(tabId: string): void {
    console.log('Selected tab:', tabId);
    this.lastEventType = `Tab changed to: ${tabId}`;
  }

  // Opens the main modal
  openModal(): void {
    this.isModalOpen = true;
    this.lastEventType = 'Modal opened';
  }

  // Closes the main modal
  closeModal(): void {
    this.isModalOpen = false;
    this.lastEventType = 'Modal closed';
  }

  // Confirms action in main modal
  confirmModal(): void {
    console.log('Modal confirmed');
    this.lastEventType = 'Modal confirmed';
    this.closeModal();
  }

  // Opens the second modal
  openSecondModal(): void {
    this.isSecondModalOpen = true;
    this.lastEventType = 'Second modal opened';
  }

  // Closes the second modal
  closeSecondModal(): void {
    this.isSecondModalOpen = false;
    this.lastEventType = 'Second modal closed';
  }

  // Opens confirmation modal
  openConfirmModal(): void {
    this.isConfirmModalOpen = true;
    this.lastEventType = 'Confirmation modal opened';
  }

  // Closes confirmation modal
  closeConfirmModal(): void {
    this.isConfirmModalOpen = false;
    this.lastEventType = 'Confirmation modal closed';
  }

  // Confirms the dangerous action
  confirmDangerousAction(): void {
    console.log('Dangerous action confirmed');
    this.lastEventType = 'Dangerous action confirmed';
    this.closeConfirmModal();
  }

  // Increments counter
  incrementCounter(): void {
    this.clickCount++;
    this.lastEventType = `Click #${this.clickCount}`;
  }

  // Handles keyboard events
  onKeyEvent(event: KeyboardEvent, type: string): void {
    this.lastEventType = `${type}: ${event.key}`;
    console.log(`Keyboard event: ${event.key}`);
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
