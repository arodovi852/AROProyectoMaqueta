import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NombreForm } from '../../components/shared/nombre-form/nombre-form';
import { FormComponent } from '../../core/guards/pending-changes.guard';

/**
 * Página de Contacto (FASE 4 - Tarea 4)
 * 
 * Página que muestra información de contacto y el formulario de contacto completo.
 * Implementa FormComponent para el guard de cambios pendientes.
 */
@Component({
  selector: 'app-contacto',
  imports: [NombreForm],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss',
})
export class Contacto implements FormComponent, AfterViewInit {
  @ViewChild(NombreForm) contactFormComponent!: NombreForm;
  
  // FormGroup requerido por FormComponent para el guard
  form!: FormGroup;

  ngAfterViewInit() {
    // Asignar el formulario del componente hijo
    setTimeout(() => {
      if (this.contactFormComponent) {
        this.form = this.contactFormComponent.contactForm;
      }
    });
  }
}
