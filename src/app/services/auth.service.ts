import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  public currentUser$: Observable<AuthUser | null> = this.currentUserSubject.asObservable();
  
  public isAuthenticated = signal<boolean>(false);
  private readonly USERS_KEY = 'app_users';
  private readonly CURRENT_USER_KEY = 'current_user';

  constructor() {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    const storedUser = localStorage.getItem(this.CURRENT_USER_KEY);
    if (storedUser) {
      const user = JSON.parse(storedUser) as AuthUser;
      this.currentUserSubject.next(user);
      this.isAuthenticated.set(true);
    }
  }

  private getUsers(): User[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  register(username: string, email: string, password: string): { success: boolean; message: string } {
    const users = this.getUsers();
    
    // Verificar si el usuario o email ya existen
    if (users.some(u => u.username === username)) {
      return { success: false, message: 'El nombre de usuario ya existe' };
    }
    
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'El email ya está registrado' };
    }

    // Crear nuevo usuario
    const newUser: User = {
      id: this.generateId(),
      username,
      email,
      password, // En producción, esto debería estar hasheado
      createdAt: new Date()
    };

    users.push(newUser);
    this.saveUsers(users);

    return { success: true, message: 'Usuario registrado correctamente' };
  }

  login(usernameOrEmail: string, password: string): { success: boolean; message: string } {
    const users = this.getUsers();
    
    const user = users.find(u => 
      (u.username === usernameOrEmail || u.email === usernameOrEmail) && 
      u.password === password
    );

    if (!user) {
      return { success: false, message: 'Usuario o contraseña incorrectos' };
    }

    // Guardar sesión
    const authUser: AuthUser = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(authUser));
    this.currentUserSubject.next(authUser);
    this.isAuthenticated.set(true);

    return { success: true, message: `Bienvenido ${user.username}!` };
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.currentUserSubject.next(null);
    this.isAuthenticated.set(false);
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}
