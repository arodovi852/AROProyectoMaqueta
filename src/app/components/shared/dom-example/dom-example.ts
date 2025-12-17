import { Component, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente de ejemplo para demostración de manipulación del DOM
 * Cliente Fase 1 - Tarea 1: Crear y eliminar elementos del DOM programáticamente
 * 
 * Este componente demuestra:
 * - Creación dinámica de elementos con Renderer2
 * - Modificación de estilos y propiedades
 * - Eliminación de elementos
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
   * Referencia al contenedor donde se crearán elementos
   * Cliente Fase 1: Uso de @ViewChild con ElementRef
   */
  @ViewChild('contenedor', { static: false }) contenedor!: ElementRef;

  /**
   * Referencia a un elemento para modificar
   */
  @ViewChild('miDiv', { static: false }) miDiv?: ElementRef;

  /**
   * Contador de elementos creados
   */
  elementCount = 0;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    console.log('Contenedor accesible:', this.contenedor.nativeElement);
  }

  /**
   * Crea un nuevo elemento dinámicamente
   * Cliente Fase 1: Crear elementos del DOM programáticamente
   */
  crearElemento(): void {
    this.elementCount++;

    // Crear nuevo div
    const nuevoDiv = this.renderer.createElement('div');
    
    // Establecer contenido de texto
    const texto = this.renderer.createText(`Elemento #${this.elementCount} creado dinámicamente`);
    this.renderer.appendChild(nuevoDiv, texto);
    
    // Agregar clases CSS
    this.renderer.addClass(nuevoDiv, 'elemento-dinamico');
    
    // Establecer estilos inline
    this.renderer.setStyle(nuevoDiv, 'backgroundColor', this.getRandomColor());
    this.renderer.setStyle(nuevoDiv, 'padding', '1rem');
    this.renderer.setStyle(nuevoDiv, 'marginBottom', '0.5rem');
    this.renderer.setStyle(nuevoDiv, 'borderRadius', '8px');
    this.renderer.setStyle(nuevoDiv, 'color', 'white');
    this.renderer.setStyle(nuevoDiv, 'fontWeight', '500');
    this.renderer.setStyle(nuevoDiv, 'animation', 'slideIn 0.3s ease');
    
    // Agregar atributos
    this.renderer.setAttribute(nuevoDiv, 'data-element-id', this.elementCount.toString());
    this.renderer.setAttribute(nuevoDiv, 'role', 'listitem');
    
    // Insertar en el contenedor
    this.renderer.appendChild(this.contenedor.nativeElement, nuevoDiv);
  }

  /**
   * Elimina el primer elemento hijo
   * Cliente Fase 1: Eliminar elementos del DOM programáticamente
   */
  eliminarPrimerElemento(): void {
    const primerHijo = this.contenedor.nativeElement.firstChild;
    if (primerHijo) {
      this.renderer.removeChild(this.contenedor.nativeElement, primerHijo);
    }
  }

  /**
   * Elimina el último elemento hijo
   */
  eliminarUltimoElemento(): void {
    const ultimoHijo = this.contenedor.nativeElement.lastChild;
    if (ultimoHijo) {
      this.renderer.removeChild(this.contenedor.nativeElement, ultimoHijo);
    }
  }

  /**
   * Elimina todos los elementos
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
   * Cambia estilos del div de ejemplo
   * Cliente Fase 1: Modificar estilos dinámicamente con Renderer2
   */
  cambiarEstilo(): void {
    if (this.miDiv) {
      this.renderer.setStyle(this.miDiv.nativeElement, 'color', this.getRandomColor());
      this.renderer.setStyle(this.miDiv.nativeElement, 'fontSize', this.getRandomSize());
      this.renderer.setStyle(this.miDiv.nativeElement, 'transform', `rotate(${Math.random() * 10 - 5}deg)`);
    }
  }

  /**
   * Cambia propiedades del div de ejemplo
   * Cliente Fase 1: Modificar propiedades con Renderer2
   */
  cambiarPropiedad(): void {
    if (this.miDiv) {
      const mensajes = [
        'Texto modificado dinámicamente',
        '¡Hola desde Renderer2!',
        'Manipulación del DOM en Angular',
        'Cliente Fase 1 - Tarea 1'
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
