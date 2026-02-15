import { Component, ElementRef, ViewChild, Renderer2, HostListener, signal, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Button } from '../../../components/shared/button/button';
import { ThemeToggle } from '../../../components/shared/theme-toggle/theme-toggle';
import { AuthModal } from '../../shared/auth-modal/auth-modal';
import { CardProfile } from '../../shared/card-profile/card-profile';
import { AuthService, AuthUser } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { BreadcrumbService, Breadcrumb } from '../../../services/breadcrumb.service';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

/**
 * Header Component
 * 
 * Main application header with responsive hamburger menu.
 * Log In and Lists buttons are in the hamburger menu for mobile.
 * Uses DOM manipulation with ViewChild and Renderer2 as per Client Phase 1 requirements.
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
   * Breadcrumbs for navigation
   */
  breadcrumbs = signal<Breadcrumb[]>([]);
  /**
   * Reference to the mobile menu toggle button
   * Client Phase 1: Using @ViewChild for DOM manipulation
   */
  @ViewChild('toggleBtn', { read: ElementRef }) toggleBtn?: ElementRef<HTMLButtonElement>;

  /**
   * Menu state: open or closed
   */
  isMenuOpen = false;

  /**
   * Authentication modal state - using global signal from AuthService
   */
  get showAuthModal() {
    return this.authService.showLoginModal;
  }

  /**
   * Current authenticated user
   */
  currentUser = signal<AuthUser | null>(null);

  /**
   * Search text with FormControl for debounce
   * PHASE 6: Real-time search with debounce
   */
  searchControl = new FormControl('');
  searchQuery = '';

  private subscription: Subscription | null = null;
  private searchSubscription: Subscription | null = null;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.currentUser$.subscribe(
      user => this.currentUser.set(user)
    );
    
    // Subscribe to breadcrumb changes
    this.breadcrumbService.breadcrumbs$.subscribe(
      crumbs => this.breadcrumbs.set(crumbs)
    );

    // PHASE 6: Search with 300ms debounce
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
   * Mobile menu toggle
   * Client Phase 1: DOM manipulation with Renderer2
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    
    const toggleButton = this.elementRef.nativeElement.querySelector('.header__toggle');
    
    if (toggleButton) {
      // Update aria-expanded for accessibility
      this.renderer.setAttribute(
        toggleButton,
        'aria-expanded',
        this.isMenuOpen.toString()
      );

      // Update descriptive aria-label
      const label = this.isMenuOpen 
        ? 'Close navigation menu' 
        : 'Open navigation menu';
      this.renderer.setAttribute(toggleButton, 'aria-label', label);
    }
  }

  /**
   * Close menu when clicking a link
   * Client Phase 1: Event handling
   */
  closeMenu(): void {
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
  }

  /**
   * Close menu when pressing Escape
   * Client Phase 1: Using @HostListener for keyboard events
   */
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
  }

  /**
   * Close menu when switching to desktop
   * Client Phase 1: Responsive event handling
   */
  @HostListener('window:resize')
  onResize(): void {
    const isDesktop = window.innerWidth >= 1024; // lg breakpoint
    if (isDesktop && this.isMenuOpen) {
      this.toggleMenu();
    }
  }

  /**
   * Close menu when clicking outside
   * Client Phase 1: @HostListener for document clicks
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isMenuOpen) return;

    const target = event.target as HTMLElement;
    const headerElement = this.elementRef.nativeElement;
    
    // Check if click was outside the header
    if (!headerElement.contains(target)) {
      this.toggleMenu();
    }
  }

  /**
   * Open authentication modal
   */
  openAuthModal(): void {
    this.authService.showLoginModal.set(true);
    this.closeMenu();
  }

  /**
   * Close authentication modal
   */
  closeAuthModal(): void {
    this.authService.showLoginModal.set(false);
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    this.authService.logout();
    this.closeMenu();
    this.router.navigate(['/']);
    await this.alertService.info('Session closed');
  }

  /**
   * Update search query (keep for compatibility)
   */
  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
  }

  /**
   * Execute automatic search with debounce
   * PHASE 6: Real-time search
   */
  private performSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/searchresult'], { 
        queryParams: { q: this.searchQuery } 
      });
    }
  }

  /**
   * Navigate to Lists page
   */
  navigateToLists(): void {
    this.router.navigate(['/lists']);
  }

  /**
   * Execute search and navigate to results (manual submit)
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
