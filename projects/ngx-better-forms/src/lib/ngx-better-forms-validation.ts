import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Condition, ConditionsMode, evaluateConditions } from './ngx-better-forms-core';

export class BetterValidation {
  public static conditionalValidators(params: {
    targetControlName: string;
    targetValidators: ValidatorFn[];
    conditions: Condition[];
    mode?: ConditionsMode;
    options?: { markAsDirty: boolean };
  }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const targetControl = control.get(params.targetControlName);

      if (!targetControl) {
        return control.errors;
      }

      const applyValidators = evaluateConditions(control, params.conditions, params.mode ?? ConditionsMode.ALL_TRUE);

      if (applyValidators) {
        targetControl.addValidators(params.targetValidators);
        targetControl.updateValueAndValidity({ onlySelf: true });

        if (params.options?.markAsDirty) {
          targetControl.markAsDirty();
        }

        return targetControl.errors;
      } else {
        targetControl.removeValidators(params.targetValidators);
        targetControl.updateValueAndValidity({ onlySelf: true });
      }
      return control.errors;
    };
  }
}
