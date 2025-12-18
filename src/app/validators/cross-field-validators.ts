import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador que verifica que dos campos coincidan
 * Usado típicamente para confirmación de contraseña
 */
export function passwordMatch(controlName: string, matchControlName: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const control = group.get(controlName);
    const matchControl = group.get(matchControlName);

    if (!control || !matchControl) return null;
    if (matchControl.errors && !matchControl.errors['mismatch']) return null;

    if (control.value !== matchControl.value) {
      matchControl.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      matchControl.setErrors(null);
      return null;
    }
  };
}

/**
 * Validador que verifica un total mínimo basado en precio y cantidad
 */
export function totalMinimo(min: number): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const price = group.get('price')?.value || 0;
    const quantity = group.get('quantity')?.value || 0;
    const total = price * quantity;

    return total >= min ? null : { totalMinimo: { min, actual: total } };
  };
}

/**
 * Validador que requiere al menos uno de los campos especificados
 */
export function atLeastOneRequired(...fields: string[]): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const hasOne = fields.some(field => {
      const value = group.get(field)?.value;
      return value && value.toString().trim().length > 0;
    });
    
    return hasOne ? null : { atLeastOneRequired: { fields } };
  };
}

/**
 * Validador que verifica que una fecha final sea posterior a una fecha inicial
 */
export function dateRange(startDateField: string, endDateField: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const startDate = group.get(startDateField)?.value;
    const endDate = group.get(endDateField)?.value;

    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);

    return start < end ? null : { invalidDateRange: true };
  };
}
