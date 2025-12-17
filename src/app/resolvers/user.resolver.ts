import { ResolveFn } from '@angular/router';
import { of, delay } from 'rxjs';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
}

/**
 * Resolver que precarga el perfil del usuario antes de activar la ruta
 * En una app real, esto consultaría una API
 */
export const userResolver: ResolveFn<UserProfile> = (route, state) => {
  console.log('🔄 userResolver: Cargando perfil del usuario...');
  
  // Datos de usuario simulados
  const mockUser: UserProfile = {
    name: 'Juan Pérez García',
    email: 'juan.perez@example.com',
    phone: '+34 612 345 678',
    address: 'Calle Mayor 123, 28013 Madrid',
    bio: 'Desarrollador full-stack apasionado por las tecnologías web modernas y el diseño de interfaces de usuario.'
  };

  // Simular delay de red
  return of(mockUser).pipe(delay(600));
};
