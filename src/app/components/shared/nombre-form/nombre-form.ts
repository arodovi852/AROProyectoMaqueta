import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormInput } from '../form-input/form-input';
import { FormTextarea } from '../form-textarea/form-textarea';
import { FormSelect, SelectOption } from '../form-select/form-select';
import { FormCheckbox } from '../form-checkbox/form-checkbox';

/**
 * Componente Contact Form
 * 
 * Formulario de contacto completo con validaciones usando ReactiveFormsModule.
 * Implementa todos los componentes de formulario reutilizables.
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
   * FormGroup del formulario de contacto
   */
  contactForm!: FormGroup;

  /**
   * Indica si el formulario ha sido enviado
   */
  submitted: boolean = false;

  /**
   * Indica si el formulario se está enviando
   */
  isSubmitting: boolean = false;

  /**
   * Opciones para el select de asunto
   */
  subjectOptions: SelectOption[] = [
    { value: 'info', label: 'Información General' },
    { value: 'sales', label: 'Consulta Comercial' },
    { value: 'support', label: 'Soporte Técnico' },
    { value: 'partnership', label: 'Oportunidad de Negocio' },
    { value: 'other', label: 'Otro' }
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Inicializa el formulario con validaciones
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
      return 'Este campo es obligatorio';
    }

    if (field.errors['email']) {
      return 'Por favor, introduce un email válido';
    }

    if (field.errors['minlength']) {
      const minLength = field.errors['minlength'].requiredLength;
      return `Debe tener al menos ${minLength} caracteres`;
    }

    if (field.errors['maxlength']) {
      const maxLength = field.errors['maxlength'].requiredLength;
      return `No puede exceder ${maxLength} caracteres`;
    }

    return 'Campo inválido';
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    // Simular envío (en producción, aquí iría la llamada al servicio)
    console.log('Datos del formulario:', this.contactForm.value);

    // Simular delay de red
    setTimeout(() => {
      this.isSubmitting = false;
      console.log('Formulario enviado con éxito');
      
      // En un caso real, aquí resetearías el formulario
      // this.onReset();
    }, 2000);
  }

  /**
   * Resetea el formulario
   */
  onReset(): void {
    this.contactForm.reset();
    this.submitted = false;
    this.isSubmitting = false;
  }
}
