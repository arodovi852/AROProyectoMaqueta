import { Component } from '@angular/core';
import { FormInput } from '../../components/shared/form-input/form-input';
import { CloseButton } from '../../components/shared/close-button/close-button';
import { Button } from '../../components/shared/button/button';
import { Card } from '../../components/shared/card/card';
import { Alert } from '../../components/shared/alert/alert';
import { FormCheckbox } from '../../components/shared/form-checkbox/form-checkbox';
import { FormRadioGroup } from '../../components/shared/form-radio-group/form-radio-group';
import { FormSelect } from '../../components/shared/form-select/form-select';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';
import { Notification } from '../../components/shared/notification/notification';

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
    FormRadioGroup,
    FormSelect,
    FormTextarea,
    Notification
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // Manejador para el botón de cierre
  onClose(): void {
    console.log('Botón de cierre clicado');
  }
}
