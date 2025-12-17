import { Component, Input, Output, EventEmitter, HostListener, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente Modal
 * 
 * Modal reutilizable con cierre por ESC, click fuera y botón de cerrar.
 * Implementa requisitos de Cliente Fase 1:
 * - Manipulación DOM con ViewChild y Renderer2
 * - Event binding y @HostListener
 * - Prevención de comportamientos por defecto
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal implements AfterViewInit {
  /**
   * Controla la visibilidad del modal
   */
  @Input() isOpen = false;

  /**
   * Título del modal
   */
  @Input() title = '';

  /**
   * Evento emitido al cerrar el modal
   */
  @Output() close = new EventEmitter<void>();

  /**
   * Referencia al contenedor del modal
   * Cliente Fase 1: Uso de @ViewChild
   */
  @ViewChild('modalContainer', { read: ElementRef }) modalContainer?: ElementRef;

  /**
   * Referencia al contenido del modal
   * Cliente Fase 1: Uso de @ViewChild
   */
  @ViewChild('modalContent', { read: ElementRef }) modalContent?: ElementRef;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.updateFocusTrap();
  }

  /**
   * Actualiza el estado de accesibilidad después de cambios
   * Cliente Fase 1: Manipulación DOM con Renderer2
   */
  ngOnChanges(): void {
    this.updateFocusTrap();
  }

  /**
   * Cierra el modal con ESC
   * Cliente Fase 1: @HostListener para eventos de teclado
   */
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen) {
      this.closeModal();
    }
  }

  /**
   * Previene el scroll del body cuando el modal está abierto
   * Cliente Fase 1: Manipulación DOM
   */
  private updateFocusTrap(): void {
    if (this.isOpen && this.modalContainer) {
      // Bloquear scroll del body
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
      
      // Enfocar el modal para accesibilidad
      if (this.modalContent?.nativeElement) {
        this.renderer.setAttribute(this.modalContent.nativeElement, 'tabindex', '-1');
        setTimeout(() => this.modalContent?.nativeElement.focus(), 100);
      }
    } else {
      // Restaurar scroll
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }

  /**
   * Cierra el modal al hacer click en el backdrop
   * Cliente Fase 1: Event handling con stopPropagation
   */
  onBackdropClick(event: MouseEvent): void {
    // Solo cerrar si el click fue directamente en el backdrop
    if (event.target === event.currentTarget) {
      event.preventDefault();
      this.closeModal();
    }
  }

  /**
   * Previene que clicks en el contenido cierren el modal
   * Cliente Fase 1: Detener propagación de eventos
   */
  onContentClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  /**
   * Cierra el modal y emite evento
   */
  closeModal(): void {
    this.close.emit();
    this.updateFocusTrap();
  }
}
