import { Injectable, signal } from '@angular/core';

export interface AlertConfig {
  message: string;
  title?: string;
  variant?: 'success' | 'error' | 'warning' | 'info' | 'default';
  confirmText?: string;
  cancelText?: string;
  showCloseButton?: boolean;
}

/**
 * AlertService
 * 
 * Service for managing popup alerts using CardAlert component.
 * Provides methods to show different types of alerts.
 */
@Injectable({ providedIn: 'root' })
export class AlertService {
  // Signal for current alert
  private _currentAlert = signal<AlertConfig | null>(null);
  
  // Expose as readonly
  currentAlert = this._currentAlert.asReadonly();

  // Callbacks for confirm/cancel actions
  private confirmCallback?: () => void;
  private cancelCallback?: () => void;

  /**
   * Show a generic alert
   */
  show(config: AlertConfig): Promise<boolean> {
    return new Promise((resolve) => {
      this._currentAlert.set({
        variant: 'default',
        confirmText: 'OK',
        showCloseButton: false,
        ...config
      });

      this.confirmCallback = () => resolve(true);
      this.cancelCallback = () => resolve(false);
    });
  }

  /**
   * Show a success alert
   */
  success(message: string, title?: string): Promise<boolean> {
    return this.show({
      message,
      title,
      variant: 'success',
      confirmText: 'OK'
    });
  }

  /**
   * Show an error alert
   */
  error(message: string, title?: string): Promise<boolean> {
    return this.show({
      message,
      title,
      variant: 'error',
      confirmText: 'OK'
    });
  }

  /**
   * Show a warning alert
   */
  warning(message: string, title?: string): Promise<boolean> {
    return this.show({
      message,
      title,
      variant: 'warning',
      confirmText: 'OK'
    });
  }

  /**
   * Show an info alert
   */
  info(message: string, title?: string): Promise<boolean> {
    return this.show({
      message,
      title,
      variant: 'info',
      confirmText: 'OK'
    });
  }

  /**
   * Show a confirmation dialog with confirm/cancel buttons
   */
  confirm(message: string, title?: string): Promise<boolean> {
    return this.show({
      message,
      title,
      variant: 'default',
      confirmText: 'Yes',
      cancelText: 'No'
    });
  }

  /**
   * Handle confirm action from CardAlert
   */
  onConfirm(): void {
    if (this.confirmCallback) {
      this.confirmCallback();
    }
    this.close();
  }

  /**
   * Handle cancel action from CardAlert
   */
  onCancel(): void {
    if (this.cancelCallback) {
      this.cancelCallback();
    }
    this.close();
  }

  /**
   * Close the current alert
   */
  close(): void {
    this._currentAlert.set(null);
    this.confirmCallback = undefined;
    this.cancelCallback = undefined;
  }
}
