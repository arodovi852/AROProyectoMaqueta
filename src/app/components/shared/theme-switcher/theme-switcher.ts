import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { Button } from '../button/button';

/**
 * Componente de Theme Switcher
 * Permite cambiar entre tema claro y oscuro con persistencia en localStorage
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

  // Inicializar tema al cargar
  private initializeTheme() {
    // Detectar preferencia del sistema
    this.systemPreference = this.detectSystemPreference();

    // Intentar cargar tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const savedAutoMode = localStorage.getItem('autoMode') === 'true';

    this.isAutoMode = savedAutoMode;

    if (savedTheme) {
      // Si hay tema guardado, usarlo
      this.currentTheme = savedTheme;
    } else if (this.isAutoMode || !savedTheme) {
      // Si está en modo auto o no hay tema guardado, usar preferencia del sistema
      this.currentTheme = this.systemPreference;
    }

    // Aplicar el tema
    this.applyTheme(this.currentTheme);

    // Escuchar cambios en la preferencia del sistema
    this.listenToSystemPreference();
  }

  // Detectar preferencia del sistema
  private detectSystemPreference(): 'light' | 'dark' {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  // Escuchar cambios en la preferencia del sistema
  private listenToSystemPreference() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Listener para cambios
      mediaQuery.addEventListener('change', (e) => {
        this.systemPreference = e.matches ? 'dark' : 'light';
        
        // Si está en modo auto, aplicar el nuevo tema
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
