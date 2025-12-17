import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Button } from '../../../components/shared/button/button';
import { ToastService } from '../../../services/toast.service';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Button],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  editMode = false;
  user: UserProfile | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      bio: ['', Validators.maxLength(500)]
    });
  }

  ngOnInit(): void {
    // Leer datos del resolver
    this.route.data.subscribe(({ user }) => {
      if (user) {
        this.user = user;
        this.profileForm.patchValue(user);
      }
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    
    if (!this.editMode && this.user) {
      // Cancelar: restaurar valores originales
      this.profileForm.patchValue(this.user);
      this.profileForm.markAsPristine();
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.toastService.warning('Por favor, corrige los errores del formulario');
      return;
    }

    // Simular guardado
    this.user = this.profileForm.value;
    this.editMode = false;
    this.profileForm.markAsPristine();
    this.toastService.success('Perfil actualizado correctamente');
  }
}
