import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Componente Form Checkbox
 * 
 * Checkbox reutilizable con estilos personalizados y accesibilidad.
 * Implementa ControlValueAccessor para integración con Angular Forms.
 */
@Component({
  selector: 'app-form-checkbox',
  imports: [CommonModule],
  templateUrl: './form-checkbox.html',
  styleUrl: './form-checkbox.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormCheckbox),
      multi: true
    }
  ]
})
export class FormCheckbox implements ControlValueAccessor {
  /**
   * ID único para el checkbox
   */
  @Input() checkboxId: string = `form-checkbox-${Math.random().toString(36).substr(2, 9)}`;

  /**
   * Nombre del checkbox para formularios
   */
  @Input() name: string = '';

  /**
   * Texto del label
   */
  @Input() label: string = '';

  /**
   * Indica si el campo es requerido
   */
  @Input() required: boolean = false;

  /**
   * Indica si el checkbox está deshabilitado
   */
  @Input() disabled: boolean = false;

  /**
   * Texto de ayuda que aparece debajo del checkbox
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
  @Output() valueChange = new EventEmitter<boolean>();

  /**
   * Evento que emite cuando el checkbox pierde el foco
   */
  @Output() blurEvent = new EventEmitter<void>();

  /**
   * Evento que emite cuando el checkbox obtiene el foco
   */
  @Output() focusEvent = new EventEmitter<void>();

  /**
   * Estado interno del checkbox (checked/unchecked)
   */
  checked: boolean = false;

  /**
   * Indica si el checkbox ha sido tocado (blur)
   */
  touched: boolean = false;

  /**
   * IDs para aria-describedby
   */
  get helpTextId(): string {
    return `${this.checkboxId}-help`;
  }

  get errorId(): string {
    return `${this.checkboxId}-error`;
  }

  get ariaDescribedBy(): string | null {
    const ids = [];
    if (this.helpText && !this.showError) ids.push(this.helpTextId);
    if (this.showError && this.errorMessage) ids.push(this.errorId);
    return ids.length > 0 ? ids.join(' ') : null;
  }

  // ControlValueAccessor implementation
  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  writeValue(value: boolean): void {
    this.checked = value || false;
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
   * Maneja el evento change del checkbox
   */
  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.onChange(this.checked);
    this.valueChange.emit(this.checked);
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
