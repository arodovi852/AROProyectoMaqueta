import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormInput } from '../form-input/form-input';
import { FormTextarea } from '../form-textarea/form-textarea';
import { FormSelect, SelectOption } from '../form-select/form-select';
import { FormCheckbox } from '../form-checkbox/form-checkbox';

/**
 * Contact Form Component
 * 
 * Complete contact form with validations using ReactiveFormsModule.
 * Implements all reusable form components.
 */
@Component({
  selector: 'app-contact-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormInput,
    FormTextarea,
    FormSelect,
    FormCheckbox
  ],
  templateUrl: './nombre-form.html',
  styleUrl: './nombre-form.scss',
})
export class NombreForm implements OnInit {
  /**
   * Contact form FormGroup
   */
  contactForm!: FormGroup;

  /**
   * Indicates if the form has been submitted
   */
  submitted: boolean = false;

  /**
   * Indicates if the form is being submitted
   */
  isSubmitting: boolean = false;

  /**
   * Options for subject select
   */
  subjectOptions: SelectOption[] = [
    { value: 'info', label: 'General Information' },
    { value: 'sales', label: 'Sales Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Business Opportunity' },
    { value: 'other', label: 'Other' }
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Initialize form with validations
   */
  private initializeForm(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      privacy: [false, Validators.requiredTrue],
      newsletter: [false]
    });
  }

  /**
   * Verifica si un campo es inválido y ha sido tocado
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }

  /**
   * Obtiene el mensaje de error apropiado para un campo
   */
  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    
    if (!field || !field.errors) {
      return '';
    }

    if (field.errors['required']) {
      return 'This field is required';
    }

    if (field.errors['email']) {
      return 'Please enter a valid email';
    }

    if (field.errors['minlength']) {
      const minLength = field.errors['minlength'].requiredLength;
      return `Must have at least ${minLength} characters`;
    }

    if (field.errors['maxlength']) {
      const maxLength = field.errors['maxlength'].requiredLength;
      return `Cannot exceed ${maxLength} characters`;
    }

    return 'Invalid field';
  }

  /**
   * Handles form submission
   */
  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      // Mark all fields as touched to show errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    // Simulate submission (in production, service call would go here)
    console.log('Form data:', this.contactForm.value);

    // Simulate network delay
    setTimeout(() => {
      this.isSubmitting = false;
      console.log('Form submitted successfully');
      
      // In a real case, you would reset the form here
      // this.onReset();
    }, 2000);
  }

  /**
   * Reset form
   */
  onReset(): void {
    this.contactForm.reset();
    this.submitted = false;
    this.isSubmitting = false;
  }
}
