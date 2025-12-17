import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador de contraseña fuerte
 * Requiere: mayúsculas, minúsculas, números, caracteres especiales y longitud mínima
 */
export function passwordStrength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const minLength = value.length >= 12;

    const errors: ValidationErrors = {};
    if (!hasUpper) errors['noUppercase'] = true;
    if (!hasLower) errors['noLowercase'] = true;
    if (!hasNumber) errors['noNumber'] = true;
    if (!hasSpecial) errors['noSpecial'] = true;
    if (!minLength) errors['minLength'] = true;

    return Object.keys(errors).length ? errors : null;
  };
}

/**
 * Validador de NIF español
 * Verifica formato y letra correcta
 */
export function nif(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    
    const nif = control.value.toUpperCase().trim();
    const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
    
    if (!nifRegex.test(nif)) {
      return { invalidNif: true };
    }

    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const position = parseInt(nif.substring(0, 8)) % 23;
    
    return letters[position] === nif[8] ? null : { invalidNif: true };
  };
}

/**
 * Validador de teléfono móvil español
 * Formato: 6/7 + 8 dígitos
 */
export function telefono(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    
    const phone = control.value.toString().trim();
    return /^[67][0-9]{8}$/.test(phone) ? null : { invalidTelefono: true };
  };
}

/**
 * Validador de código postal español
 * 5 dígitos
 */
export function codigoPostal(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    
    const cp = control.value.toString().trim();
    return /^\d{5}$/.test(cp) ? null : { invalidCP: true };
  };
}

/**
 * Validador de edad mínima basado en fecha de nacimiento
 */
export function minAge(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= minAge ? null : { minAge: { required: minAge, actual: age - 1 } };
    }

    return age >= minAge ? null : { minAge: { required: minAge, actual: age } };
  };
}
