import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';
import { ToastService } from '../../../services/toast.service';
import { LoadingService } from '../../../services/loading.service';
import { UserService, User } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-loading-demo',
  templateUrl: './loading-demo.html',
  styleUrl: './loading-demo.scss',
  standalone: true,
  imports: [CommonModule, Button]
})
export class LoadingDemo implements OnInit, OnDestroy {
  users = signal<User[]>([]);
  isLoadingUsers = signal(false);
  isSaving = signal(false);
  selectedUser = signal<User | null>(null);
  private subscription: Subscription | null = null;

  constructor(
    private userService: UserService,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadUsers(): void {
    this.isLoadingUsers.set(true);
    this.loadingService.show();

    this.subscription = this.userService.getUsers()
      .pipe(finalize(() => {
        this.isLoadingUsers.set(false);
        this.loadingService.hide();
      }))
      .subscribe({
        next: (users) => {
          this.users.set(users);
          this.toastService.success(`${users.length} usuarios cargados correctamente`);
        },
        error: (error) => {
          this.toastService.error('Error al cargar usuarios');
          console.error(error);
        }
      });
  }

  selectUser(user: User): void {
    this.selectedUser.set(user);
    this.toastService.info(`Usuario seleccionado: ${user.name}`);
  }

  saveUser(): void {
    const user = this.selectedUser();
    if (!user) {
      this.toastService.warning('Selecciona un usuario primero');
      return;
    }

    this.isSaving.set(true);
    this.loadingService.show();

    this.userService.saveUser(user)
      .pipe(finalize(() => {
        this.isSaving.set(false);
        this.loadingService.hide();
      }))
      .subscribe({
        next: (savedUser) => {
          this.toastService.success(`Usuario ${savedUser.name} guardado correctamente`, 3000);
        },
        error: (error) => {
          this.toastService.error('Error al guardar usuario');
          console.error(error);
        }
      });
  }

  triggerError(): void {
    this.toastService.error('Este es un ejemplo de notificación de error', 6000);
  }

  triggerWarning(): void {
    this.toastService.warning('Advertencia: Esta acción no se puede deshacer', 5000);
  }
}
