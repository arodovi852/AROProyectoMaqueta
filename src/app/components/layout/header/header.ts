import { Component, ElementRef, ViewChild, Renderer2, HostListener, signal, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Button } from '../../../components/shared/button/button';
import { ThemeToggle } from '../../../components/shared/theme-toggle/theme-toggle';
import { AuthModal } from '../../shared/auth-modal/auth-modal';
import { CardProfile } from '../../shared/card-profile/card-profile';
import { AuthService, AuthUser } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';
import { BreadcrumbService, Breadcrumb } from '../../../services/breadcrumb.service';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

/**
 * Componente Header
 * 
 * Header principal de la aplicación con menú hamburguesa responsive.
 * Los botones Log In y Lists están en el menú hamburguesa para mobile.
 * Usa manipulación DOM con ViewChild y Renderer2 según requisitos Cliente Fase 1.
 */
@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, Button, ThemeToggle, AuthModal, CardProfile, ReactiveFormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header implements OnInit, OnDestroy {
  /**
   * Breadcrumbs para navegación
   */
  breadcrumbs = signal<Breadcrumb[]>([]);
  /**
   * Referencia al botón toggle del menú móvil
   * Cliente Fase 1: Uso de @ViewChild para manipulación DOM
   */
  @ViewChild('toggleBtn', { read: ElementRef }) toggleBtn?: ElementRef<HTMLButtonElement>;

  /**
   * Estado del menú: abierto o cerrado
   */
  isMenuOpen = false;

  /**
   * Estado del modal de autenticación
   */
  showAuthModal = signal(false);

  /**
   * Usuario actual autenticado
   */
  currentUser = signal<AuthUser | null>(null);

  /**
   * Texto de búsqueda con FormControl para debounce
   * FASE 6: Búsqueda en tiempo real con debounce
   */
  searchControl = new FormControl('');
  searchQuery = '';

  private subscription: Subscription | null = null;
  private searchSubscription: Subscription | null = null;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.currentUser$.subscribe(
      user => this.currentUser.set(user)
    );
    
    // Suscribirse a cambios de breadcrumbs
    this.breadcrumbService.breadcrumbs$.subscribe(
      crumbs => this.breadcrumbs.set(crumbs)
    );

    // FASE 6: Búsqueda con debounce de 300ms
    this.searchSubscription = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.searchQuery = value || '';
      if (this.searchQuery.length >= 2) {
        this.performSearch();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  /**
   * Toggle del menú móvil
   * Cliente Fase 1: Manipulación DOM con Renderer2
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    
    const toggleButton = this.elementRef.nativeElement.querySelector('.header__toggle');
    
    if (toggleButton) {
      // Actualizar aria-expanded para accesibilidad
      this.renderer.setAttribute(
        toggleButton,
        'aria-expanded',
        this.isMenuOpen.toString()
      );

      // Actualizar aria-label descriptivo
      const label = this.isMenuOpen 
        ? 'Cerrar menú de navegación' 
        : 'Abrir menú de navegación';
      this.renderer.setAttribute(toggleButton, 'aria-label', label);
    }
  }

  /**
   * Cerrar menú al hacer clic en un enlace
   * Cliente Fase 1: Event handling
   */
  closeMenu(): void {
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
  }

  /**
   * Cerrar menú al presionar Escape
   * Cliente Fase 1: Uso de @HostListener para eventos de teclado
   */
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
  }

  /**
   * Cerrar menú al cambiar a desktop
   * Cliente Fase 1: Responsive event handling
   */
  @HostListener('window:resize')
  onResize(): void {
    const isDesktop = window.innerWidth >= 1024; // lg breakpoint
    if (isDesktop && this.isMenuOpen) {
      this.toggleMenu();
    }
  }

  /**
   * Cerrar menú al hacer click fuera
   * Cliente Fase 1: @HostListener para clicks en el documento
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isMenuOpen) return;

    const target = event.target as HTMLElement;
    const headerElement = this.elementRef.nativeElement;
    
    // Verificar si el click fue fuera del header
    if (!headerElement.contains(target)) {
      this.toggleMenu();
    }
  }

  /**
   * Abrir modal de autenticación
   */
  openAuthModal(): void {
    this.showAuthModal.set(true);
    this.closeMenu();
  }

  /**
   * Cerrar modal de autenticación
   */
  closeAuthModal(): void {
    this.showAuthModal.set(false);
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    this.authService.logout();
    this.toastService.info('Sesión cerrada');
    this.closeMenu();
  }

  /**
   * Actualizar query de búsqueda (mantener para compatibilidad)
   */
  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
  }

  /**
   * Ejecutar búsqueda automática con debounce
   * FASE 6: Búsqueda en tiempo real
   */
  private performSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/searchresult'], { 
        queryParams: { q: this.searchQuery } 
      });
    }
  }

  /**
   * Ejecutar búsqueda y navegar a resultados (submit manual)
   */
  onSearch(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate(['/searchresult'], { 
      queryParams: { q: this.searchQuery } 
    });
  }
}
