import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', active: true },
    { id: 2, name: 'María García', email: 'maria@example.com', active: true },
    { id: 3, name: 'Carlos López', email: 'carlos@example.com', active: false },
    { id: 4, name: 'Ana Martínez', email: 'ana@example.com', active: true },
  ];

  getUsers(): Observable<User[]> {
    return of(this.users).pipe(
      delay(1500),
      map(users => users.filter(u => u.active)),
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<User | undefined> {
    return of(this.users.find(u => u.id === id)).pipe(
      delay(800),
      catchError(this.handleError)
    );
  }

  saveUser(user: User): Observable<User> {
    return of(user).pipe(
      delay(2000),
      map(u => {
        const index = this.users.findIndex(existing => existing.id === u.id);
        if (index >= 0) {
          this.users[index] = u;
        } else {
          this.users.push({ ...u, id: this.users.length + 1 });
        }
        return u;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: any): Observable<never> {
    return throwError(() => new Error('Error cargando usuarios'));
  }
}
