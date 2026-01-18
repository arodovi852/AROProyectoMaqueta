import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';
import { CloseButton } from '../close-button/close-button';

/**
 * Componente de Modal Interactivo
 * Modal que se puede cerrar con ESC, click fuera, o botón de cierre
 */
@Component({
  selector: 'app-interactive-modal',
  templateUrl: './interactive-modal.html',
  styleUrl: './interactive-modal.scss',
  standalone: true,
  imports: [CommonModule, Button, CloseButton]
})
export class InteractiveModal {
  isOpen = false;
  modalTitle = 'Modal de Demostración';
  modalContent = 'Este modal se puede cerrar con ESC, haciendo click fuera, o con el botón de cierre.';

  constructor(private elementRef: ElementRef) {}

  // Abrir modal
  openModal() {
    this.isOpen = true;
  }

  // Cerrar modal
  closeModal() {
    this.isOpen = false;
  }

  // Listener para la tecla ESC
  @HostListener('document:keydown.escape')
  onEscapePressed() {
    if (this.isOpen) {
      this.closeModal();
    }
  }

  // Cerrar al hacer click en el overlay (fuera del modal)
  onOverlayClick(event: MouseEvent) {
    this.closeModal();
  }

  // Prevenir el cierre cuando se hace click dentro del modal
  onModalClick(event: MouseEvent) {
    event.stopPropagation();
  }

  // Diferentes tipos de modales para demostración
  openSuccessModal() {
    this.modalTitle = '✅ Éxito';
    this.modalContent = 'La operación se completó correctamente.';
    this.openModal();
  }

  openWarningModal() {
    this.modalTitle = '⚠️ Advertencia';
    this.modalContent = 'Ten cuidado con esta acción.';
    this.openModal();
  }

  openInfoModal() {
    this.modalTitle = 'ℹ️ Información';
    this.modalContent = 'Aquí tienes información importante.';
    this.openModal();
  }

  openErrorModal() {
    this.modalTitle = '❌ Error';
    this.modalContent = 'Ocurrió un error al procesar la solicitud.';
    this.openModal();
  }
}
