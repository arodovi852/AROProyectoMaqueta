import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Componente Form Input
 * 
 * Input reutilizable con validación, estados de error y accesibilidad.
 * Implementa ControlValueAccessor para integración con Angular Forms.
 */
@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInput),
      multi: true
    }
  ]
})
export class FormInput implements ControlValueAccessor {
  /**
   * ID único para el input
   */
  @Input() inputId: string = `form-input-${Math.random().toString(36).substr(2, 9)}`;

  /**
   * Tipo de input (text, email, password, tel, url, number)
   */
  @Input() type: string = 'text';

  /**
   * Nombre del input para formularios
   */
  @Input() name: string = '';

  /**
   * Texto del label
   */
  @Input() label: string = '';

  /**
   * Placeholder del input
   */
  @Input() placeholder: string = '';

  /**
   * Indica si el campo es requerido
   */
  @Input() required: boolean = false;

  /**
   * Indica si el input está deshabilitado
   */
  @Input() disabled: boolean = false;

  /**
   * Texto de ayuda que aparece debajo del input
   */
  @Input() helpText: string = '';

  /**
   * Mensaje de error personalizado
   */
  @Input() errorMessage: string = '';

  /**
   * Indica si hay un error y debe mostrarse
   */
  @Input() showError: boolean = false;

  /**
   * Evento que emite cuando el valor cambia
   */
  @Output() valueChange = new EventEmitter<string>();

  /**
   * Evento que emite cuando el input pierde el foco
   */
  @Output() blurEvent = new EventEmitter<void>();

  /**
   * Evento que emite cuando el input obtiene el foco
   */
  @Output() focusEvent = new EventEmitter<void>();

  /**
   * Valor interno del input
   */
  value: string = '';

  /**
   * Indica si el input ha sido tocado (blur)
   */
  touched: boolean = false;

  /**
   * IDs para aria-describedby
   */
  get helpTextId(): string {
    return `${this.inputId}-help`;
  }

  get errorId(): string {
    return `${this.inputId}-error`;
  }

  get ariaDescribedBy(): string | null {
    const ids = [];
    if (this.helpText && !this.showError) ids.push(this.helpTextId);
    if (this.showError && this.errorMessage) ids.push(this.errorId);
    return ids.length > 0 ? ids.join(' ') : null;
  }

  // ControlValueAccessor implementation
  private onChange = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Maneja el evento input
   */
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  /**
   * Maneja el evento blur
   */
  onBlur(): void {
    this.touched = true;
    this.onTouched();
    this.blurEvent.emit();
  }

  /**
   * Maneja el evento focus
   */
  onFocus(): void {
    this.focusEvent.emit();
  }
}
