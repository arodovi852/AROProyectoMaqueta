import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Button } from '../button/button';
import { FormInput } from '../form-input/form-input';
import { ToastService } from '../../../services/toast.service';
import { nif, telefono, codigoPostal } from '../../../validators/custom-validators';
import { atLeastOneRequired } from '../../../validators/cross-field-validators';

@Component({
  selector: 'app-contact-form-reactive',
  templateUrl: './contact-form-reactive.html',
  styleUrl: './contact-form-reactive.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Button, FormInput]
})
export class ContactFormReactive {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      nif: ['', [Validators.required, nif()]],
      email: ['', [Validators.email]],
      telefono: ['', [telefono()]],
      codigoPostal: ['', [codigoPostal()]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    }, {
      validators: atLeastOneRequired('email', 'telefono')
    });
  }

  get name() { return this.contactForm.get('name')!; }
  get nif() { return this.contactForm.get('nif')!; }
  get email() { return this.contactForm.get('email')!; }
  get telefono() { return this.contactForm.get('telefono')!; }
  get codigoPostal() { return this.contactForm.get('codigoPostal')!; }
  get message() { return this.contactForm.get('message')!; }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.toastService.warning('Please correct the form errors');
      return;
    }

    console.log('Contact form submitted:', this.contactForm.value);
    this.toastService.success('Contact message sent successfully');
    this.contactForm.reset();
  }

  onReset(): void {
    this.contactForm.reset();
    this.toastService.info('Form reset');
  }

  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return `${this.getFieldName(controlName)} is required`;
    if (control.errors['minlength']) {
      const minLength = control.errors['minlength'].requiredLength;
      return `Minimum ${minLength} characters`;
    }
    if (control.errors['email']) return 'Invalid email';
    if (control.errors['invalidNif']) return 'Invalid NIF (format: 12345678Z)';
    if (control.errors['invalidTelefono']) return 'Invalid phone (format: 6/7XXXXXXXX)';
    if (control.errors['invalidCP']) return 'Invalid postal code (5 digits)';

    return '';
  }

  getFieldName(controlName: string): string {
    const names: { [key: string]: string } = {
      name: 'Name',
      nif: 'NIF',
      email: 'Email',
      telefono: 'Phone',
      codigoPostal: 'Postal Code',
      message: 'Message'
    };
    return names[controlName] || controlName;
  }

  hasContactMethodError(): boolean {
    return this.contactForm.errors?.['atLeastOneRequired'] &&
           (this.email.touched || this.telefono.touched);
  }
}
