import { Component } from '@angular/core';

/**
 * Componente Footer
 * 
 * Footer principal de la aplicación con secciones de información,
 * enlaces, redes sociales y suscripción a newsletter.
 */
@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  /**
   * Año actual para el copyright
   */
  currentYear = new Date().getFullYear();

  /**
   * Maneja el envío del formulario de newsletter
   * Cliente Fase 1: Event handling
   */
  onNewsletterSubmit(event: Event): void {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
    const email = emailInput.value;

    // TODO: Integrar con servicio de newsletter (Cliente Fase 5)
    console.log('Newsletter subscription:', email);
    
    // Feedback visual temporal
    alert(`¡Gracias por suscribirte! Te enviaremos las novedades a ${email}`);
    
    // Limpiar formulario
    form.reset();
  }
}
