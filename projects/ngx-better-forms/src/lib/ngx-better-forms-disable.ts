import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Condition, ConditionsMode, evaluateConditions } from './ngx-better-forms-core';

export class BetterDisable {
  public static conditionalDisable(params: {
    targetControlName: string;
    conditions: Condition[];
    mode?: ConditionsMode;
    options?: { reset: boolean };
  }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const targetControl = control.get(params.targetControlName);

      if (!targetControl) {
        return control.errors;
      }

      const disable = evaluateConditions(control, params.conditions, params.mode ?? ConditionsMode.ALL_TRUE);

      if (disable) {
        targetControl.disable({ onlySelf: true });
        if (params.options?.reset) {
          targetControl.reset();
        }
      } else {
        targetControl.enable({ onlySelf: true });
      }
      return control.errors;
    };
  }
}
