import { CanDeactivateFn } from '@angular/router';
import { FormGroup } from '@angular/forms';

/**
 * Interface para componentes con formularios (FASE 4 - Tarea 4)
 */
export interface FormComponent {
  form: FormGroup;
}

/**
 * Guard para cambios pendientes (FASE 4 - Tarea 4)
 * 
 * Previene la navegación si hay cambios sin guardar en un formulario.
 * Muestra un diálogo de confirmación al usuario.
 */
export const pendingChangesGuard: CanDeactivateFn<FormComponent> =
  (component, currentRoute, currentState, nextState) => {
    if (component.form?.dirty) {
      return confirm('Hay cambios sin guardar. ¿Desea salir igualmente?');
    }
    return true;
  };
