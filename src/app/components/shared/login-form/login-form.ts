import { Component, Output, EventEmitter } from '@angular/core';
import { FormInput } from '../form-input/form-input';
import { Button } from '../button/button';
import { CloseButton } from '../close-button/close-button';

/**
 * Login Form Component
 * 
 * Complete login form with semantic structure
 */
@Component({
  selector: 'app-login-form',
  imports: [FormInput, Button, CloseButton],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  /**
   * Evento que se emite cuando se cierra el formulario
   */
  @Output() closeForm = new EventEmitter<void>();

  /**
   * Evento que se emite cuando se envía el formulario
   */
  @Output() submitForm = new EventEmitter<{username: string, password: string}>();

  /**
   * Evento que se emite cuando se solicita crear cuenta
   */
  @Output() createAccount = new EventEmitter<void>();

  /**
   * Maneja el envío del formulario
   */
  onSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    this.submitForm.emit({
      username: formData.get('username') as string,
      password: formData.get('password') as string
    });
  }

  /**
   * Maneja el cierre del formulario
   */
  onClose(): void {
    this.closeForm.emit();
  }

  /**
   * Maneja la solicitud de crear cuenta
   */
  onCreateAccount(): void {
    this.createAccount.emit();
  }
}
