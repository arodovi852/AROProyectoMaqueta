import { Component, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * DOM manipulation example component
 * Client Phase 1 - Task 1: Create and remove DOM elements programmatically
 * 
 * This component demonstrates:
 * - Dynamic element creation with Renderer2
 * - Modifying styles and properties
 * - Removing elements
 */
@Component({
  selector: 'app-dom-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dom-example.html',
  styleUrl: './dom-example.scss',
})
export class DomExample implements AfterViewInit {
  /**
   * Reference to container where elements will be created
   * Client Phase 1: Using @ViewChild with ElementRef
   */
  @ViewChild('contenedor', { static: false }) contenedor!: ElementRef;

  /**
   * Reference to an element to modify
   */
  @ViewChild('miDiv', { static: false }) miDiv?: ElementRef;

  /**
   * Created elements counter
   */
  elementCount = 0;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    console.log('Container accessible:', this.contenedor.nativeElement);
  }

  /**
   * Creates a new element dynamically
   * Client Phase 1: Create DOM elements programmatically
   */
  crearElemento(): void {
    this.elementCount++;

    // Create new div
    const nuevoDiv = this.renderer.createElement('div');
    
    // Set text content
    const texto = this.renderer.createText(`Element #${this.elementCount} created dynamically`);
    this.renderer.appendChild(nuevoDiv, texto);
    
    // Add CSS classes
    this.renderer.addClass(nuevoDiv, 'elemento-dinamico');
    
    // Set inline styles
    this.renderer.setStyle(nuevoDiv, 'backgroundColor', this.getRandomColor());
    this.renderer.setStyle(nuevoDiv, 'padding', '1rem');
    this.renderer.setStyle(nuevoDiv, 'marginBottom', '0.5rem');
    this.renderer.setStyle(nuevoDiv, 'borderRadius', '8px');
    this.renderer.setStyle(nuevoDiv, 'color', 'white');
    this.renderer.setStyle(nuevoDiv, 'fontWeight', '500');
    this.renderer.setStyle(nuevoDiv, 'animation', 'slideIn 0.3s ease');
    
    // Add attributes
    this.renderer.setAttribute(nuevoDiv, 'data-element-id', this.elementCount.toString());
    this.renderer.setAttribute(nuevoDiv, 'role', 'listitem');
    
    // Insert into container
    this.renderer.appendChild(this.contenedor.nativeElement, nuevoDiv);
  }

  /**
   * Removes the first child element
   * Client Phase 1: Remove DOM elements programmatically
   */
  eliminarPrimerElemento(): void {
    const primerHijo = this.contenedor.nativeElement.firstChild;
    if (primerHijo) {
      this.renderer.removeChild(this.contenedor.nativeElement, primerHijo);
    }
  }

  /**
   * Removes the last child element
   */
  eliminarUltimoElemento(): void {
    const ultimoHijo = this.contenedor.nativeElement.lastChild;
    if (ultimoHijo) {
      this.renderer.removeChild(this.contenedor.nativeElement, ultimoHijo);
    }
  }

  /**
   * Removes all elements
   */
  eliminarTodos(): void {
    while (this.contenedor.nativeElement.firstChild) {
      this.renderer.removeChild(
        this.contenedor.nativeElement,
        this.contenedor.nativeElement.firstChild
      );
    }
    this.elementCount = 0;
  }

  /**
   * Changes styles of the example div
   * Client Phase 1: Modify styles dynamically with Renderer2
   */
  cambiarEstilo(): void {
    if (this.miDiv) {
      this.renderer.setStyle(this.miDiv.nativeElement, 'color', this.getRandomColor());
      this.renderer.setStyle(this.miDiv.nativeElement, 'fontSize', this.getRandomSize());
      this.renderer.setStyle(this.miDiv.nativeElement, 'transform', `rotate(${Math.random() * 10 - 5}deg)`);
    }
  }

  /**
   * Changes properties of the example div
   * Client Phase 1: Modify properties with Renderer2
   */
  cambiarPropiedad(): void {
    if (this.miDiv) {
      const mensajes = [
        'Dynamically modified text',
        'Hello from Renderer2!',
        'DOM manipulation in Angular',
        'Client Phase 1 - Task 1'
      ];
      const mensaje = mensajes[Math.floor(Math.random() * mensajes.length)];
      this.renderer.setProperty(this.miDiv.nativeElement, 'innerText', mensaje);
    }
  }

  /**
   * Agrega una clase CSS
   */
  agregarClase(): void {
    if (this.miDiv) {
      this.renderer.addClass(this.miDiv.nativeElement, 'highlight');
    }
  }

  /**
   * Quita una clase CSS
   */
  quitarClase(): void {
    if (this.miDiv) {
      this.renderer.removeClass(this.miDiv.nativeElement, 'highlight');
    }
  }

  /**
   * Genera un color aleatorio
   */
  private getRandomColor(): string {
    const colors = [
      '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', 
      '#10b981', '#06b6d4', '#6366f1', '#f43f5e'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /**
   * Genera un tamaño de fuente aleatorio
   */
  private getRandomSize(): string {
    const sizes = ['16px', '18px', '20px', '24px', '28px'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  }
}
