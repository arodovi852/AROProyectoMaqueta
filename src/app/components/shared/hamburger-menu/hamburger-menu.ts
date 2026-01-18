import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente de menú hamburguesa
 * Implementa toggle con cierre al hacer click fuera
 */
@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.html',
  styleUrl: './hamburger-menu.scss',
  standalone: true,
  imports: [CommonModule]
})
export class HamburgerMenu {
  isOpen = false;

  constructor(private elementRef: ElementRef) {}

  // Toggle del menú
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  // Cerrar menú
  closeMenu() {
    this.isOpen = false;
  }

  // Listener para clicks en el document
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Si el menú está abierto y el click fue fuera del componente, cerrar
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  // Prevenir el cierre cuando se hace click dentro del menú
  onMenuClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
