import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Button } from '../button/button';

/**
 * Componente de demostración del sistema de eventos
 * Muestra event binding, eventos de teclado, mouse, focus y blur
 */
@Component({
  selector: 'app-event-demo',
  templateUrl: './event-demo.html',
  styleUrl: './event-demo.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, Button]
})
export class EventDemo {
  // Estado para los eventos
  clickCount = 0;
  lastKey = '';
  mousePosition = { x: 0, y: 0 };
  isFocused = false;
  eventLog: string[] = [];
  isMouseInside = false;
  doubleClickCount = 0;
  inputValue = '';

  // Click simple
  onClick(event: Event | MouseEvent) {
    this.clickCount++;
    const mouseEvent = event as MouseEvent;
    this.addToLog(`Click en botón (${mouseEvent.clientX || 0}, ${mouseEvent.clientY || 0})`);
  }

  // Doble click
  onDoubleClick(event: Event | MouseEvent) {
    this.doubleClickCount++;
    this.addToLog(`Doble click detectado`);
  }

  // Eventos de teclado
  onKeyDown(event: KeyboardEvent) {
    this.lastKey = event.key;
    this.addToLog(`Tecla presionada: ${event.key}`);
  }

  onKeyUp(event: KeyboardEvent) {
    this.addToLog(`Tecla liberada: ${event.key}`);
  }

  // Evento especial: Enter
  onEnterPressed() {
    this.addToLog(`¡Enter presionado! Valor: "${this.inputValue}"`);
  }

  // Eventos de mouse
  onMouseMove(event: MouseEvent) {
    this.mousePosition = {
      x: event.clientX,
      y: event.clientY
    };
  }

  onMouseEnter() {
    this.isMouseInside = true;
    this.addToLog('Mouse entró en el área');
  }

  onMouseLeave() {
    this.isMouseInside = false;
    this.addToLog('Mouse salió del área');
  }

  // Eventos de focus
  onFocus(event: FocusEvent) {
    this.isFocused = true;
    this.addToLog('Input recibió foco');
  }

  onBlur(event: FocusEvent) {
    this.isFocused = false;
    this.addToLog('Input perdió foco');
  }

  // Prevenir comportamiento por defecto
  onSubmit(event: Event) {
    event.preventDefault();
    this.addToLog('Formulario enviado (sin recarga)');
  }

  // Detener propagación
  onInnerClick(event: MouseEvent) {
    event.stopPropagation();
    this.addToLog('Click interno (propagación detenida)');
  }

  onOuterClick() {
    this.addToLog('Click externo (no debería aparecer si haces click dentro)');
  }

  // Helper para agregar eventos al log
  private addToLog(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift(`[${timestamp}] ${message}`);
    
    // Mantener solo los últimos 10 eventos
    if (this.eventLog.length > 10) {
      this.eventLog.pop();
    }
  }

  // Limpiar log
  clearLog() {
    this.eventLog = [];
  }

  // Resetear todo
  resetAll() {
    this.clickCount = 0;
    this.lastKey = '';
    this.doubleClickCount = 0;
    this.inputValue = '';
    this.eventLog = [];
    this.addToLog('Todo reseteado');
  }
}
