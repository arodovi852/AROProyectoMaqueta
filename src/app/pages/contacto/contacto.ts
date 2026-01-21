import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NombreForm } from '../../components/shared/nombre-form/nombre-form';
import { FormComponent } from '../../core/guards/pending-changes.guard';

/**
 * Contact Page (PHASE 4 - Task 4)
 * 
 * Page that displays contact information and the complete contact form.
 * Implements FormComponent for pending changes guard.
 */
@Component({
  selector: 'app-contacto',
  imports: [NombreForm],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss',
})
export class Contacto implements FormComponent, AfterViewInit {
  @ViewChild(NombreForm) contactFormComponent!: NombreForm;
  
  // FormGroup required by FormComponent for the guard
  form!: FormGroup;

  ngAfterViewInit() {
    // Assign the child component's form
    setTimeout(() => {
      if (this.contactFormComponent) {
        this.form = this.contactFormComponent.contactForm;
      }
    });
  }
}
