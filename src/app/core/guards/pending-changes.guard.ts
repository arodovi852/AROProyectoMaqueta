import { CanDeactivateFn } from '@angular/router';
import { FormGroup } from '@angular/forms';

/**
 * Interface for components with forms (PHASE 4 - Task 4)
 */
export interface FormComponent {
  form: FormGroup;
}

/**
 * Guard for pending changes (PHASE 4 - Task 4)
 * 
 * Prevents navigation if there are unsaved changes in a form.
 * Shows a confirmation dialog to the user.
 */
export const pendingChangesGuard: CanDeactivateFn<FormComponent> =
  (component, currentRoute, currentState, nextState) => {
    if (component.form?.dirty) {
      return confirm('There are unsaved changes. Do you want to leave anyway?');
    }
    return true;
  };
