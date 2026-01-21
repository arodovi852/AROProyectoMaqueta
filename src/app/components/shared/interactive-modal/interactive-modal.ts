import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';
import { CloseButton } from '../close-button/close-button';

/**
 * Interactive Modal Component
 * Modal that can be closed with ESC, click outside, or close button
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
  modalTitle = 'Demo Modal';
  modalContent = 'This modal can be closed with ESC, by clicking outside, or with the close button.';

  constructor(private elementRef: ElementRef) {}

  // Open modal
  openModal() {
    this.isOpen = true;
  }

  // Close modal
  closeModal() {
    this.isOpen = false;
  }

  // ESC key listener
  @HostListener('document:keydown.escape')
  onEscapePressed() {
    if (this.isOpen) {
      this.closeModal();
    }
  }

  // Close when clicking the overlay (outside the modal)
  onOverlayClick(event: MouseEvent) {
    this.closeModal();
  }

  // Prevent closing when clicking inside the modal
  onModalClick(event: MouseEvent) {
    event.stopPropagation();
  }

  // Different modal types for demonstration
  openSuccessModal() {
    this.modalTitle = '✅ Success';
    this.modalContent = 'The operation completed successfully.';
    this.openModal();
  }

  openWarningModal() {
    this.modalTitle = '⚠️ Warning';
    this.modalContent = 'Be careful with this action.';
    this.openModal();
  }

  openInfoModal() {
    this.modalTitle = 'ℹ️ Information';
    this.modalContent = 'Here is some important information.';
    this.openModal();
  }

  openErrorModal() {
    this.modalTitle = '❌ Error';
    this.modalContent = 'An error occurred while processing the request.';
    this.openModal();
  }
}
