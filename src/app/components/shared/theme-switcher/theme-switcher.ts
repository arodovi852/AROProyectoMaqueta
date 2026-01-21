import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { Button } from '../button/button';

/**
 * Theme Switcher Component
 * Allows switching between light and dark theme with localStorage persistence
 */
@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.html',
  styleUrl: './theme-switcher.scss',
  standalone: true,
  imports: [CommonModule, Button]
})
export class ThemeSwitcher implements OnInit {
  currentTheme: 'light' | 'dark' = 'light';
  systemPreference: 'light' | 'dark' = 'light';
  isAutoMode: boolean = false;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.initializeTheme();
  }

  // Initialize theme on load
  private initializeTheme() {
    // Detect system preference
    this.systemPreference = this.detectSystemPreference();

    // Try to load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const savedAutoMode = localStorage.getItem('autoMode') === 'true';

    this.isAutoMode = savedAutoMode;

    if (savedTheme) {
      // If there is a saved theme, use it
      this.currentTheme = savedTheme;
    } else if (this.isAutoMode || !savedTheme) {
      // If in auto mode or no saved theme, use system preference
      this.currentTheme = this.systemPreference;
    }

    // Apply the theme
    this.applyTheme(this.currentTheme);

    // Escuchar cambios en la preferencia del sistema
    this.listenToSystemPreference();
  }

  // Detect system preference
  private detectSystemPreference(): 'light' | 'dark' {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  // Listen for system preference changes
  private listenToSystemPreference() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Listener for changes
      mediaQuery.addEventListener('change', (e) => {
        this.systemPreference = e.matches ? 'dark' : 'light';
        
        // If in auto mode, apply the new theme
        if (this.isAutoMode) {
          this.currentTheme = this.systemPreference;
          this.applyTheme(this.currentTheme);
        }
      });
    }
  }

  // Aplicar tema
  private applyTheme(theme: 'light' | 'dark') {
    const htmlElement = this.document.documentElement;

    // Usar clase dark-mode del proyecto
    if (theme === 'dark') {
      this.renderer.addClass(htmlElement, 'dark-mode');
    } else {
      this.renderer.removeClass(htmlElement, 'dark-mode');
    }

    // Guardar en localStorage
    localStorage.setItem('theme', theme);
  }

  // Toggle entre claro y oscuro
  toggleTheme() {
    this.isAutoMode = false;
    localStorage.setItem('autoMode', 'false');
    
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
  }

  // Establecer tema específico
  setTheme(theme: 'light' | 'dark') {
    this.isAutoMode = false;
    localStorage.setItem('autoMode', 'false');
    
    this.currentTheme = theme;
    this.applyTheme(theme);
  }

  // Activar modo automático
  setAutoMode() {
    this.isAutoMode = true;
    localStorage.setItem('autoMode', 'true');
    
    // Usar preferencia del sistema
    this.currentTheme = this.systemPreference;
    this.applyTheme(this.currentTheme);
  }
}
