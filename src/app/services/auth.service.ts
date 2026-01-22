import { Injectable, signal, inject, Injector } from '@angular/core';
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
  private injector = inject(Injector);
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  public currentUser$: Observable<AuthUser | null> = this.currentUserSubject.asObservable();
  
  public isAuthenticated = signal<boolean>(false);
  private readonly USERS_KEY = 'app_users';
  private readonly CURRENT_USER_KEY = 'current_user';

  // Callback to refresh user data after login/logout
  // This avoids circular dependency with UserService
  private onAuthChange: (() => void) | null = null;

  /**
   * Register a callback to be called when auth state changes
   * Used by UserService to refresh its data
   */
  registerAuthChangeCallback(callback: () => void): void {
    this.onAuthChange = callback;
  }

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
    
    // Check if username or email already exists
    if (users.some(u => u.username === username)) {
      return { success: false, message: 'Username already exists' };
    }
    
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'Email is already registered' };
    }

    // Create new user
    const newUser: User = {
      id: this.generateId(),
      username,
      email,
      password, // In production, this should be hashed
      createdAt: new Date()
    };

    users.push(newUser);
    this.saveUsers(users);

    return { success: true, message: 'User registered successfully' };
  }

  login(usernameOrEmail: string, password: string): { success: boolean; message: string } {
    const users = this.getUsers();
    
    const user = users.find(u => 
      (u.username === usernameOrEmail || u.email === usernameOrEmail) && 
      u.password === password
    );

    if (!user) {
      return { success: false, message: 'Incorrect username or password' };
    }

    // Save session
    const authUser: AuthUser = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(authUser));
    this.currentUserSubject.next(authUser);
    this.isAuthenticated.set(true);

    // Notify UserService to refresh data for this user
    if (this.onAuthChange) {
      this.onAuthChange();
    }

    return { success: true, message: `Welcome ${user.username}!` };
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.currentUserSubject.next(null);
    this.isAuthenticated.set(false);

    // Notify UserService to clear data
    if (this.onAuthChange) {
      this.onAuthChange();
    }
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}
