import { Component } from '@angular/core';

/**
 * Footer Component
 * 
 * Main application footer with information sections,
 * links, social networks and newsletter subscription.
 */
@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  /**
   * Current year for copyright
   */
  currentYear = new Date().getFullYear();

  /**
   * Handles newsletter form submission
   * Client Phase 1: Event handling
   */
  onNewsletterSubmit(event: Event): void {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
    const email = emailInput.value;

    // TODO: Integrate with newsletter service (Client Phase 5)
    console.log('Newsletter subscription:', email);
    
    // Temporary visual feedback
    alert(`Thanks for subscribing! We'll send you news to ${email}`);
    
    // Clear form
    form.reset();
  }
}
