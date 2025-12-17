import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Button } from '../button/button';
import { ToastService } from '../../../services/toast.service';
import { ValidationService } from '../../../services/validation.service';
import { passwordStrength, minAge } from '../../../validators/custom-validators';
import { passwordMatch } from '../../../validators/cross-field-validators';
import { uniqueEmail, usernameAvailable } from '../../../validators/async-validators';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Button]
})
export class ProfileForm {
  profileForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private validationService: ValidationService
  ) {
    this.profileForm = this.fb.group({
      username: ['', 
        [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
        [usernameAvailable(validationService)]
      ],
      email: ['',
        [Validators.required, Validators.email],
        [uniqueEmail(validationService)]
      ],
      birthDate: ['', [Validators.required, minAge(18)]],
      password: ['', [Validators.required, Validators.minLength(8), passwordStrength()]],
      confirmPassword: ['', Validators.required],
      bio: ['', Validators.maxLength(500)],
      newsletter: [false],
      terms: [false, Validators.requiredTrue]
    }, {
      validators: passwordMatch('password', 'confirmPassword'),
      updateOn: 'blur' // Validación al perder el foco
    });

    // Re-validar username y email en cada cambio (para async validators)
    this.profileForm.get('username')?.valueChanges.subscribe(() => {
      this.profileForm.get('username')?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    });

    this.profileForm.get('email')?.valueChanges.subscribe(() => {
      this.profileForm.get('email')?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  isFieldPending(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return field?.pending ?? false;
  }

  isFieldAsyncValid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field?.valid && !field?.pending && field?.dirty);
  }

  getPasswordStrengthErrors(): string[] {
    const errors = this.profileForm.get('password')?.errors?.['passwordStrength'];
    return errors ? errors.missing : [];
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.toastService.warning('Por favor, corrige los errores del formulario');
      return;
    }

    if (this.profileForm.pending) {
      this.toastService.info('Validando información...');
      return;
    }

    const formData = { ...this.profileForm.value };
    delete formData.confirmPassword; // No enviamos la confirmación
    
    console.log('Perfil creado:', formData);
    this.toastService.success('Perfil creado con éxito');
  }

  onReset(): void {
    this.profileForm.reset({
      newsletter: false,
      terms: false
    });
    this.showPassword = false;
    this.showConfirmPassword = false;
    this.toastService.info('Formulario reiniciado');
  }
}
