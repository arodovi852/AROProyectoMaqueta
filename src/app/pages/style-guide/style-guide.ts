import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Form components
import { FormInput } from '../../components/shared/form-input/form-input';
import { FormTextarea } from '../../components/shared/form-textarea/form-textarea';
import { FormSelect } from '../../components/shared/form-select/form-select';
import { FormCheckbox } from '../../components/shared/form-checkbox/form-checkbox';

// Buttons
import { Button } from '../../components/shared/button/button';
import { CloseButton } from '../../components/shared/close-button/close-button';

// Cards and containers
import { Card } from '../../components/shared/card/card';

// Notifications and alerts
import { Alert } from '../../components/shared/alert/alert';

@Component({
  selector: 'app-style-guide',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    // Form components
    FormInput,
    FormTextarea,
    FormSelect,
    FormCheckbox,
    // Buttons
    Button,
    CloseButton,
    // Cards
    Card,
    // Notifications
    Alert,
  ],
  templateUrl: './style-guide.html',
  styleUrl: './style-guide.css',
})
export class StyleGuide {
  // Options for selects
  selectOptions = [
    { value: 'espana', label: 'Spain' },
    { value: 'mexico', label: 'Mexico' },
    { value: 'argentina', label: 'Argentina' },
  ];
}
