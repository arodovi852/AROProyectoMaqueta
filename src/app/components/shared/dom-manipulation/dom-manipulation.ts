import { Component, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Button } from '../button/button';

/**
 * Componente de demostración de manipulación del DOM
 * Muestra el uso de ViewChild, ElementRef y Renderer2
 */
@Component({
  selector: 'app-dom-manipulation',
  templateUrl: './dom-manipulation.html',
  styleUrl: './dom-manipulation.scss',
  standalone: true,
  imports: [Button]
})
export class DomManipulation implements AfterViewInit {
  @ViewChild('contentDiv', { static: false }) contentDiv!: ElementRef;
  @ViewChild('dynamicContainer', { static: false }) dynamicContainer!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    console.log('DOM Element:', this.contentDiv.nativeElement);
  }

  // Cambiar estilos dinámicamente
  changeStyles() {
    this.renderer.setStyle(this.contentDiv.nativeElement, 'color', '#e53e3e');
    this.renderer.setStyle(this.contentDiv.nativeElement, 'fontSize', '24px');
    this.renderer.setStyle(this.contentDiv.nativeElement, 'fontWeight', 'bold');
    this.renderer.setStyle(this.contentDiv.nativeElement, 'transition', 'all 0.3s ease');
  }

  // Cambiar contenido
  changeContent() {
    this.renderer.setProperty(this.contentDiv.nativeElement, 'innerText', '¡Texto modificado dinámicamente!');
  }

  // Resetear estilos y contenido
  resetElement() {
    this.renderer.removeStyle(this.contentDiv.nativeElement, 'color');
    this.renderer.removeStyle(this.contentDiv.nativeElement, 'fontSize');
    this.renderer.removeStyle(this.contentDiv.nativeElement, 'fontWeight');
    this.renderer.setProperty(this.contentDiv.nativeElement, 'innerText', 'Contenido inicial del DOM');
  }

  // Crear nuevo elemento
  createElement() {
    const newDiv = this.renderer.createElement('div');
    const text = this.renderer.createText(`Elemento creado a las ${new Date().toLocaleTimeString()}`);
    
    this.renderer.setStyle(newDiv, 'backgroundColor', '#e893cf');
    this.renderer.setStyle(newDiv, 'color', '#3d2a45');
    this.renderer.setStyle(newDiv, 'padding', '12px');
    this.renderer.setStyle(newDiv, 'marginTop', '8px');
    this.renderer.setStyle(newDiv, 'borderRadius', '1rem');
    this.renderer.setStyle(newDiv, 'border', '2px solid #3d2a45');
    this.renderer.setStyle(newDiv, 'animation', 'fadeIn 0.3s ease');
    this.renderer.setStyle(newDiv, 'fontFamily', '\'Do Hyeon\', sans-serif');
    
    this.renderer.appendChild(newDiv, text);
    this.renderer.appendChild(this.dynamicContainer.nativeElement, newDiv);
  }

  // Eliminar último elemento
  removeElement() {
    const lastChild = this.dynamicContainer.nativeElement.lastChild;
    if (lastChild) {
      this.renderer.removeChild(this.dynamicContainer.nativeElement, lastChild);
    }
  }

  // Limpiar todos los elementos
  clearAll() {
    while (this.dynamicContainer.nativeElement.firstChild) {
      this.renderer.removeChild(
        this.dynamicContainer.nativeElement, 
        this.dynamicContainer.nativeElement.firstChild
      );
    }
  }

  // Agregar clase CSS
  addCssClass() {
    this.renderer.addClass(this.contentDiv.nativeElement, 'highlighted');
  }

  // Remover clase CSS
  removeCssClass() {
    this.renderer.removeClass(this.contentDiv.nativeElement, 'highlighted');
  }
}
