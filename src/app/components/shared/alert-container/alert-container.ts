import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardAlert } from '../card-alert/card-alert';
import { AlertService } from '../../../services/alert.service';

/**
 * AlertContainer Component
 * 
 * Global container that renders CardAlert popups.
 * Should be placed in the app root component.
 */
@Component({
  selector: 'app-alert-container',
  standalone: true,
  imports: [CommonModule, CardAlert],
  template: `
    @if (alertService.currentAlert(); as alert) {
      <app-card-alert
        [message]="alert.message"
        [title]="alert.title"
        [variant]="alert.variant || 'default'"
        [confirmText]="alert.confirmText || 'OK'"
        [cancelText]="alert.cancelText"
        [showCloseButton]="alert.showCloseButton || false"
        (confirm)="alertService.onConfirm()"
        (cancel)="alertService.onCancel()"
        (closed)="alertService.close()"
      />
    }
  `
})
export class AlertContainer {
  alertService = inject(AlertService);
}
