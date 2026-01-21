import { Component, Output, EventEmitter } from '@angular/core';
import { FormInput } from '../form-input/form-input';
import { Button } from '../button/button';
import { CloseButton } from '../close-button/close-button';

/**
 * Register Form Component
 * 
 * Complete registration form with semantic structure
 */
@Component({
  selector: 'app-register-form',
  imports: [FormInput, Button, CloseButton],
  templateUrl: './register-form.html',
  styleUrl: './register-form.scss',
})
export class RegisterForm {
  /**
   * Evento que se emite cuando se cierra el formulario
   */
  @Output() closeForm = new EventEmitter<void>();

  /**
   * Evento que se emite cuando se envía el formulario
   */
  @Output() submitForm = new EventEmitter<{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>();

  /**
   * Maneja el envío del formulario
   */
  onSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    // Validación básica de contraseñas
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    this.submitForm.emit({
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: password,
      confirmPassword: confirmPassword
    });
  }

  /**
   * Maneja el cierre del formulario
   */
  onClose(): void {
    this.closeForm.emit();
  }
}
