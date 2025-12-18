import { Component, signal, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginForm } from '../login-form/login-form';
import { RegisterForm } from '../register-form/register-form';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.html',
  styleUrl: './auth-modal.scss',
  standalone: true,
  imports: [CommonModule, LoginForm, RegisterForm]
})
export class AuthModal implements OnDestroy {
  @Output() close = new EventEmitter<void>();
  
  showLogin = signal(true);
  private subscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  switchToRegister(): void {
    this.showLogin.set(false);
  }

  switchToLogin(): void {
    this.showLogin.set(true);
  }

  onLoginSubmit(data: { username: string; password: string }): void {
    const result = this.authService.login(data.username, data.password);
    
    if (result.success) {
      this.toastService.success(result.message);
      this.onClose();
    } else {
      this.toastService.error(result.message);
    }
  }

  onRegisterSubmit(data: { username: string; email: string; password: string; confirmPassword: string }): void {
    const result = this.authService.register(data.username, data.email, data.password);
    
    if (result.success) {
      this.toastService.success(result.message);
      // Cambiar a login después de registro exitoso
      this.showLogin.set(true);
    } else {
      this.toastService.error(result.message);
    }
  }

  onCreateAccountRequest(): void {
    this.switchToRegister();
  }
}
