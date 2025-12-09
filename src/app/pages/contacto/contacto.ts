import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  imports: [],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss',
})
export class Contacto {
  onSubmit(): void {
    console.log('Formulario enviado');
    alert('¡Gracias por contactarnos! Te responderemos pronto.');
  }
}
