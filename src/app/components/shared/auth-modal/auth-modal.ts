import { Component, signal, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginForm } from '../login-form/login-form';
import { RegisterForm } from '../register-form/register-form';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';
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
    private alertService: AlertService
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

  async onLoginSubmit(data: { username: string; password: string }): Promise<void> {
    const result = this.authService.login(data.username, data.password);
    
    if (result.success) {
      this.onClose();
      await this.alertService.success(result.message);
    } else {
      await this.alertService.error(result.message);
    }
  }

  async onRegisterSubmit(data: { username: string; email: string; password: string; confirmPassword: string }): Promise<void> {
    const result = this.authService.register(data.username, data.email, data.password);
    
    if (result.success) {
      await this.alertService.success(result.message);
      // Cambiar a login después de registro exitoso
      this.showLogin.set(true);
    } else {
      await this.alertService.error(result.message);
    }
  }

  onCreateAccountRequest(): void {
    this.switchToRegister();
  }
}
