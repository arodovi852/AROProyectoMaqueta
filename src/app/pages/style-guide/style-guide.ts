import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Componentes de formulario
import { FormInput } from '../../components/shared/form-input/form-input';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';
import { FormSelect } from '../../components/shared/form-select/form-select';
import { FormCheckbox } from '../../components/shared/form-checkbox/form-checkbox';

// Botones
import { Button } from '../../components/shared/button/button';
import { CloseButton } from '../../components/shared/close-button/close-button';

// Tarjetas y contenedores
import { Card } from '../../components/shared/card/card';

// Notificaciones y alertas
import { Alert } from '../../components/shared/alert/alert';

@Component({
  selector: 'app-style-guide',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    // Componentes de formulario
    FormInput,
    FormTextarea,
    FormSelect,
    FormCheckbox,
    // Botones
    Button,
    CloseButton,
    // Tarjetas
    Card,
    // Notificaciones
    Alert,
  ],
  templateUrl: './style-guide.html',
  styleUrl: './style-guide.css',
})
export class StyleGuide {
  // Opciones para selects
  selectOptions = [
    { value: 'espana', label: 'España' },
    { value: 'mexico', label: 'México' },
    { value: 'argentina', label: 'Argentina' },
  ];
}
