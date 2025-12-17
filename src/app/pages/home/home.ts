import { Component } from '@angular/core';
import { FormInput } from '../../components/shared/form-input/form-input';
import { CloseButton } from '../../components/shared/close-button/close-button';
import { Button } from '../../components/shared/button/button';
import { Card } from '../../components/shared/card/card';
import { Alert } from '../../components/shared/alert/alert';
import { FormCheckbox } from '../../components/shared/form-checkbox/form-checkbox';
import { FormSelect } from '../../components/shared/form-select/form-select';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';
import { LoginForm } from '../../components/shared/login-form/login-form';
import { RegisterForm } from '../../components/shared/register-form/register-form';

// Componentes Fase 1
import { ThemeSwitcher } from '../../components/shared/theme-switcher/theme-switcher';
import { DomManipulation } from '../../components/shared/dom-manipulation/dom-manipulation';
import { EventDemo } from '../../components/shared/event-demo/event-demo';
import { HamburgerMenu } from '../../components/shared/hamburger-menu/hamburger-menu';
import { InteractiveModal } from '../../components/shared/interactive-modal/interactive-modal';
import { InteractiveTabs } from '../../components/shared/interactive-tabs/interactive-tabs';
import { InteractiveTooltip } from '../../components/shared/interactive-tooltip/interactive-tooltip';

// Componentes Fase 2
import { SiblingSender } from '../../components/shared/sibling-sender/sibling-sender';
import { SiblingReceiver } from '../../components/shared/sibling-receiver/sibling-receiver';
import { LoadingDemo } from '../../components/shared/loading-demo/loading-demo';

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
    LoginForm,
    RegisterForm,
    // Fase 1
    ThemeSwitcher,
    DomManipulation,
    EventDemo,
    HamburgerMenu,
    InteractiveModal,
    InteractiveTabs,
    InteractiveTooltip,
    // Fase 2
    SiblingSender,
    SiblingReceiver,
    LoadingDemo
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // Control de visibilidad de la notificación
  showNotification = false;

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
