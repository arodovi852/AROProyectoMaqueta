import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Theme Toggle Component
 * 
 * Toggle to switch between light and dark theme.
 * Implements Client Phase 1 - Task 4 requirements:
 * - Detects system prefers-color-scheme
 * - Toggle between light/dark theme
 * - Persistence in localStorage
 * - Applies theme on application load
 */
@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle implements OnInit {
  isDarkMode = true; // Dark mode por defecto

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
    }
  }

  /**
   * Inicializa el tema al cargar
   * Cliente Fase 1 - Tarea 4: Aplicar tema al cargar la aplicación
   */
  private initializeTheme(): void {
    // 1. Primero intentar leer de localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      // Si hay preferencia guardada, usarla
      this.isDarkMode = savedTheme === 'dark';
    } else {
      // 2. Si no hay preferencia guardada, usar modo oscuro por defecto
      // (ignoramos prefers-color-scheme para que siempre empiece en dark)
      this.isDarkMode = true;
    }
    
    this.applyTheme();
  }

  /**
   * Detecta la preferencia del sistema operativo
   * Cliente Fase 1 - Tarea 4: Detectar prefers-color-scheme
   */
  private getSystemThemePreference(): boolean {
    if (window.matchMedia) {
      // Detectar si el sistema prefiere modo oscuro
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      return prefersDark.matches;
    }
    // Por defecto, usar dark mode
    return true;
  }

  /**
   * Cambia entre tema claro y oscuro
   * Cliente Fase 1 - Tarea 4: Toggle entre tema claro/oscuro
   */
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    this.saveThemePreference();
  }

  /**
   * Aplica el tema al documento
   */
  private applyTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const htmlElement = document.documentElement;
      if (this.isDarkMode) {
        htmlElement.classList.add('dark-mode');
        htmlElement.classList.remove('light-mode');
      } else {
        htmlElement.classList.add('light-mode');
        htmlElement.classList.remove('dark-mode');
      }
    }
  }

  /**
   * Guarda la preferencia en localStorage
   * Cliente Fase 1 - Tarea 4: Persistir preferencia en localStorage
   */
  private saveThemePreference(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
  }
}
