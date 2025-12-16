import { Component } from '@angular/core';
import { FormInput } from '../../components/shared/form-input/form-input';
import { CloseButton } from '../../components/shared/close-button/close-button';
import { Button } from '../../components/shared/button/button';
import { Card } from '../../components/shared/card/card';
import { Alert } from '../../components/shared/alert/alert';
import { FormCheckbox } from '../../components/shared/form-checkbox/form-checkbox';
import { FormSelect } from '../../components/shared/form-select/form-select';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';
import { Notification } from '../../components/shared/notification/notification';
import { LoginForm } from '../../components/shared/login-form/login-form';
import { RegisterForm } from '../../components/shared/register-form/register-form';

/**
 * Página Home
 * 
 * Página de demostración de componentes
 */
@Component({
  selector: 'app-home',
  imports: [
    FormInput,
    CloseButton,
    Button,
    Card,
    Alert,
    FormCheckbox,
    FormSelect,
    FormTextarea,
    Notification,
    LoginForm,
    RegisterForm
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // Manejador para el botón de cierre
  onClose(): void {
    console.log('Botón de cierre clicado');
  }

  // Manejadores para los formularios
  onLoginSubmit(data: any): void {
    console.log('Login submitted:', data);
  }

  onRegisterSubmit(data: any): void {
    console.log('Register submitted:', data);
  }

  onCreateAccountRequest(): void {
    console.log('Create account requested');
  }
}
