import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * CardAlert Component
 * 
 * A popup-style alert card similar to auth modals.
 * Displays messages with optional title and action buttons.
 * 
 * Variants:
 * - success: Green theme for success messages
 * - error: Red theme for error messages
 * - warning: Orange theme for warnings
 * - info: Blue theme for information
 * - default: Purple theme matching app design
 */
@Component({
  selector: 'app-card-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-alert.html',
  styleUrl: './card-alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardAlert {
  /**
   * Alert message to display
   */
  @Input() message = '';

  /**
   * Optional title for the alert
   */
  @Input() title?: string;

  /**
   * Alert variant/type
   */
  @Input() variant: 'success' | 'error' | 'warning' | 'info' | 'default' = 'default';

  /**
   * Text for the primary action button
   */
  @Input() confirmText = 'OK';

  /**
   * Text for the secondary/cancel button (optional)
   */
  @Input() cancelText?: string;

  /**
   * Whether to show the close button
   */
  @Input() showCloseButton = false;

  /**
   * Event when confirm button is clicked
   */
  @Output() confirm = new EventEmitter<void>();

  /**
   * Event when cancel button is clicked
   */
  @Output() cancel = new EventEmitter<void>();

  /**
   * Event when the alert is closed
   */
  @Output() closed = new EventEmitter<void>();

  /**
   * Generate CSS classes based on variant
   */
  get cardClasses(): string {
    return `card-alert card-alert--${this.variant}`;
  }

  /**
   * Handle confirm button click
   */
  onConfirm(): void {
    this.confirm.emit();
    this.closed.emit();
  }

  /**
   * Handle cancel button click
   */
  onCancel(): void {
    this.cancel.emit();
    this.closed.emit();
  }

  /**
   * Handle close button click
   */
  onClose(): void {
    this.closed.emit();
  }

  /**
   * Handle overlay click (close modal)
   */
  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closed.emit();
    }
  }
}
