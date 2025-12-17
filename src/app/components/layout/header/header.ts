import { Component, ElementRef, ViewChild, Renderer2, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../../components/shared/button/button';
import { ThemeToggle } from '../../../components/shared/theme-toggle/theme-toggle';

/**
 * Componente Header
 * 
 * Header principal de la aplicación con menú hamburguesa responsive.
 * Los botones Log In y Lists están en el menú hamburguesa para mobile.
 * Usa manipulación DOM con ViewChild y Renderer2 según requisitos Cliente Fase 1.
 */
@Component({
  selector: 'app-header',
  imports: [RouterLink, Button, ThemeToggle],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  /**
   * Referencia al botón toggle del menú móvil
   * Cliente Fase 1: Uso de @ViewChild para manipulación DOM
   */
  @ViewChild('toggleBtn', { read: ElementRef }) toggleBtn?: ElementRef<HTMLButtonElement>;

  /**
   * Estado del menú: abierto o cerrado
   */
  isMenuOpen = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  /**
   * Toggle del menú móvil
   * Cliente Fase 1: Manipulación DOM con Renderer2
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    
    const toggleButton = this.elementRef.nativeElement.querySelector('.header__toggle');
    
    if (toggleButton) {
      // Actualizar aria-expanded para accesibilidad
      this.renderer.setAttribute(
        toggleButton,
        'aria-expanded',
        this.isMenuOpen.toString()
      );

      // Actualizar aria-label descriptivo
      const label = this.isMenuOpen 
        ? 'Cerrar menú de navegación' 
        : 'Abrir menú de navegación';
      this.renderer.setAttribute(toggleButton, 'aria-label', label);
    }
  }

  /**
   * Cerrar menú al hacer clic en un enlace
   * Cliente Fase 1: Event handling
   */
  closeMenu(): void {
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
  }

  /**
   * Cerrar menú al presionar Escape
   * Cliente Fase 1: Uso de @HostListener para eventos de teclado
   */
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
  }

  /**
   * Cerrar menú al cambiar a desktop
   * Cliente Fase 1: Responsive event handling
   */
  @HostListener('window:resize')
  onResize(): void {
    const isDesktop = window.innerWidth >= 1024; // lg breakpoint
    if (isDesktop && this.isMenuOpen) {
      this.toggleMenu();
    }
  }

  /**
   * Cerrar menú al hacer click fuera
   * Cliente Fase 1: @HostListener para clicks en el documento
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isMenuOpen) return;

    const target = event.target as HTMLElement;
    const headerElement = this.elementRef.nativeElement;
    
    // Verificar si el click fue fuera del header
    if (!headerElement.contains(target)) {
      this.toggleMenu();
    }
  }
}
