import { Component, Input, HostListener, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Posición del tooltip
 */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Componente Tooltip
 * 
 * Tooltip que se muestra al hacer hover o focus.
 * Implementa requisitos de Cliente Fase 1:
 * - Eventos de mouse (mouseenter, mouseleave)
 * - Eventos de focus y blur
 * - Manipulación DOM con Renderer2
 * - Posicionamiento dinámico
 */
@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
})
export class Tooltip implements AfterViewInit {
  /**
   * Texto del tooltip
   */
  @Input() text = '';

  /**
   * Posición del tooltip
   */
  @Input() position: TooltipPosition = 'top';

  /**
   * Delay antes de mostrar (ms)
   */
  @Input() showDelay = 300;

  /**
   * Delay antes de ocultar (ms)
   */
  @Input() hideDelay = 100;

  /**
   * Controla si el tooltip está visible
   */
  showTooltip = false;

  /**
   * Timer para el delay de mostrar
   */
  private showTimer?: number;

  /**
   * Timer para el delay de ocultar
   */
  private hideTimer?: number;

  /**
   * Referencia al elemento tooltip
   * Cliente Fase 1: Uso de @ViewChild
   */
  @ViewChild('tooltipElement', { read: ElementRef }) tooltipElement?: ElementRef;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.updatePosition();
  }

  /**
   * Muestra el tooltip al pasar el mouse
   * Cliente Fase 1: Evento mouseenter
   */
  onMouseEnter(): void {
    this.clearTimers();
    this.showTimer = window.setTimeout(() => {
      this.showTooltip = true;
      setTimeout(() => this.updatePosition(), 0);
    }, this.showDelay);
  }

  /**
   * Oculta el tooltip al salir el mouse
   * Cliente Fase 1: Evento mouseleave
   */
  onMouseLeave(): void {
    this.clearTimers();
    this.hideTimer = window.setTimeout(() => {
      this.showTooltip = false;
    }, this.hideDelay);
  }

  /**
   * Muestra el tooltip al hacer focus
   * Cliente Fase 1: Evento focus
   */
  onFocus(): void {
    this.clearTimers();
    this.showTooltip = true;
    setTimeout(() => this.updatePosition(), 0);
  }

  /**
   * Oculta el tooltip al perder focus
   * Cliente Fase 1: Evento blur
   */
  onBlur(): void {
    this.clearTimers();
    this.showTooltip = false;
  }

  /**
   * Actualiza la posición del tooltip
   * Cliente Fase 1: Manipulación DOM con Renderer2
   */
  private updatePosition(): void {
    if (!this.showTooltip || !this.tooltipElement) return;

    const tooltip = this.tooltipElement.nativeElement;
    const trigger = this.elementRef.nativeElement.querySelector('.tooltip__trigger');
    
    if (!trigger) return;

    // Resetear transformación
    this.renderer.removeStyle(tooltip, 'transform');
    
    // Obtener dimensiones
    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    // Calcular posición según la configuración
    let top = 0;
    let left = 0;

    switch (this.position) {
      case 'top':
        top = -tooltipRect.height - 8;
        left = (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.height + 8;
        left = (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = (triggerRect.height - tooltipRect.height) / 2;
        left = -tooltipRect.width - 8;
        break;
      case 'right':
        top = (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.width + 8;
        break;
    }

    // Aplicar transformación
    this.renderer.setStyle(tooltip, 'transform', `translate(${left}px, ${top}px)`);
  }

  /**
   * Limpia los timers activos
   */
  private clearTimers(): void {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = undefined;
    }
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = undefined;
    }
  }

  /**
   * Limpieza al destruir el componente
   */
  ngOnDestroy(): void {
    this.clearTimers();
  }
}
