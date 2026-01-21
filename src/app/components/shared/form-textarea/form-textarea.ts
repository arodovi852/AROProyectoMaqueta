import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Form Textarea Component
 * 
 * Reusable textarea with validation, character counter and accessibility.
 * Implements ControlValueAccessor for Angular Forms integration.
 */
@Component({
  selector: 'app-form-textarea',
  imports: [CommonModule],
  templateUrl: './form-textarea.html',
  styleUrl: './form-textarea.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTextarea),
      multi: true
    }
  ]
})
export class FormTextarea implements ControlValueAccessor {
  /**
   * ID único para el textarea
   */
  @Input() textareaId: string = `form-textarea-${Math.random().toString(36).substr(2, 9)}`;

  /**
   * Nombre del textarea para formularios
   */
  @Input() name: string = '';

  /**
   * Texto del label
   */
  @Input() label: string = '';

  /**
   * Placeholder del textarea
   */
  @Input() placeholder: string = '';

  /**
   * Número de filas visibles
   */
  @Input() rows: number = 4;

  /**
   * Máximo número de caracteres permitidos
   */
  @Input() maxLength: number | null = null;

  /**
   * Mostrar contador de caracteres
   */
  @Input() showCharacterCount: boolean = false;

  /**
   * Indica si el campo es requerido
   */
  @Input() required: boolean = false;

  /**
   * Indica si el textarea está deshabilitado
   */
  @Input() disabled: boolean = false;

  /**
   * Texto de ayuda que aparece debajo del textarea
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
   * Evento que emite cuando el textarea pierde el foco
   */
  @Output() blurEvent = new EventEmitter<void>();

  /**
   * Evento que emite cuando el textarea obtiene el foco
   */
  @Output() focusEvent = new EventEmitter<void>();

  /**
   * Valor interno del textarea
   */
  value: string = '';

  /**
   * Indica si el textarea ha sido tocado (blur)
   */
  touched: boolean = false;

  /**
   * Longitud actual del texto
   */
  get currentLength(): number {
    return this.value.length;
  }

  /**
   * Indica si está cerca del límite (90%)
   */
  get isNearLimit(): boolean {
    if (!this.maxLength) return false;
    return this.currentLength >= this.maxLength * 0.9 && this.currentLength < this.maxLength;
  }

  /**
   * Indica si excede el límite
   */
  get isOverLimit(): boolean {
    if (!this.maxLength) return false;
    return this.currentLength >= this.maxLength;
  }

  /**
   * IDs para aria-describedby
   */
  get helpTextId(): string {
    return `${this.textareaId}-help`;
  }

  get errorId(): string {
    return `${this.textareaId}-error`;
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
    const target = event.target as HTMLTextAreaElement;
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
