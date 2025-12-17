import { CanDeactivateFn } from '@angular/router';
import { FormGroup } from '@angular/forms';

/**
 * Interfaz para componentes con formularios reactivos
 */
export interface FormComponent {
  form?: FormGroup;
  profileForm?: FormGroup;
  productForm?: FormGroup;
}

/**
 * Guard para prevenir pérdida de datos en formularios con cambios sin guardar
 * Muestra un confirm() si el formulario tiene cambios pendientes
 */
export const pendingChangesGuard: CanDeactivateFn<FormComponent> = (component) => {
  // Buscar el form group en el componente (puede tener distintos nombres)
  const form = component.form || component.profileForm || component.productForm;

  if (form && form.dirty) {
    return confirm('Hay cambios sin guardar. ¿Seguro que quieres salir?');
  }

  return true;
};
