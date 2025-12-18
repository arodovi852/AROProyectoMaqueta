import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { map, switchMap, delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  private usedEmails = [
    'admin@example.com',
    'user@test.com',
    'contact@broadcast.com',
    'info@example.com'
  ];

  private usedUsernames = [
    'admin',
    'user',
    'test',
    'broadcast'
  ];

  /**
   * Simula una llamada API para verificar si el email ya está registrado
   * Retorna true si el email está disponible
   */
  checkEmailUnique(email: string, currentUserId?: string): Observable<boolean> {
    if (!email) return of(true);

    // Simula latencia de red (800ms)
    return of(email).pipe(
      delay(800),
      map(emailValue => {
        const isUsed = this.usedEmails.includes(emailValue.toLowerCase());
        return !isUsed;
      })
    );
  }

  /**
   * Simula una llamada API para verificar si el username está disponible
   * Retorna true si el username está disponible
   */
  checkUsernameAvailable(username: string): Observable<boolean> {
    if (!username || username.length < 3) return of(true);

    // Simula latencia de red (600ms)
    return of(username).pipe(
      delay(600),
      map(usernameValue => {
        const isUsed = this.usedUsernames.includes(usernameValue.toLowerCase());
        return !isUsed;
      })
    );
  }

  /**
   * Añade un email a la lista de emails usados (para testing)
   */
  registerEmail(email: string): void {
    if (!this.usedEmails.includes(email.toLowerCase())) {
      this.usedEmails.push(email.toLowerCase());
    }
  }

  /**
   * Añade un username a la lista de usernames usados (para testing)
   */
  registerUsername(username: string): void {
    if (!this.usedUsernames.includes(username.toLowerCase())) {
      this.usedUsernames.push(username.toLowerCase());
    }
  }
}
