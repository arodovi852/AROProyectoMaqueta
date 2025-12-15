import { Component } from '@angular/core';
import { NombreForm } from '../../components/shared/nombre-form/nombre-form';

/**
 * Página de Contacto
 * 
 * Página que muestra información de contacto y el formulario de contacto completo.
 */
@Component({
  selector: 'app-contacto',
  imports: [NombreForm],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss',
})
export class Contacto {
  // La lógica del formulario está en el componente NombreForm (app-contact-form)
}
