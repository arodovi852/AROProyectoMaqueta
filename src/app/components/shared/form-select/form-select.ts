import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Interface for select options
 */
export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Form Select Component
 * 
 * Reusable select/dropdown with validation and accessibility.
 * Implements ControlValueAccessor for Angular Forms integration.
 */
@Component({
  selector: 'app-form-select',
  imports: [CommonModule],
  templateUrl: './form-select.html',
  styleUrl: './form-select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormSelect),
      multi: true
    }
  ]
})
export class FormSelect implements ControlValueAccessor {
  /**
   * ID único para el select
   */
  @Input() selectId: string = `form-select-${Math.random().toString(36).substr(2, 9)}`;

  /**
   * Nombre del select para formularios
   */
  @Input() name: string = '';

  /**
   * Texto del label
   */
  @Input() label: string = '';

  /**
   * Placeholder del select
   */
  @Input() placeholder: string = 'Select an option';

  /**
   * Opciones del select
   */
  @Input() options: SelectOption[] = [];

  /**
   * Indica si el campo es requerido
   */
  @Input() required: boolean = false;

  /**
   * Indica si el select está deshabilitado
   */
  @Input() disabled: boolean = false;

  /**
   * Texto de ayuda que aparece debajo del select
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
   * Evento que emite cuando el select pierde el foco
   */
  @Output() blurEvent = new EventEmitter<void>();

  /**
   * Evento que emite cuando el select obtiene el foco
   */
  @Output() focusEvent = new EventEmitter<void>();

  /**
   * Valor interno del select
   */
  value: string = '';

  /**
   * Indica si el select ha sido tocado (blur)
   */
  touched: boolean = false;

  /**
   * IDs para aria-describedby
   */
  get helpTextId(): string {
    return `${this.selectId}-help`;
  }

  get errorId(): string {
    return `${this.selectId}-error`;
  }

  get ariaDescribedBy(): string | null {
    const ids = [];
    if (this.helpText && !this.showError) ids.push(this.helpTextId);
    if (this.showError && this.errorMessage) ids.push(this.errorId);
    return ids.length > 0 ? ids.join(' ') : null;
  }

  // ControlValueAccessor implementation
  private onChangeCallback = (value: string) => {};
  private onTouchedCallback = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Maneja el evento change
   */
  onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.onChangeCallback(this.value);
    this.valueChange.emit(this.value);
  }

  /**
   * Maneja el evento blur
   */
  onBlur(): void {
    this.touched = true;
    this.onTouchedCallback();
    this.blurEvent.emit();
  }

  /**
   * Maneja el evento focus
   */
  onFocus(): void {
    this.focusEvent.emit();
  }
}
