import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Condition, ConditionsMode, evaluateConditions } from './ngx-better-forms-core';

export interface ConditionalValidatorOptions {
  mode?: ConditionsMode;
  markAsDirty?: boolean;
  addValidatorsCallback?: () => void;
  removeValidatorsCallback?: () => void;
}

export class BetterValidation {
  public static conditionalValidators(params: {
    targetControlName: string;
    targetValidators: ValidatorFn[];
    conditions: Condition[];
    options?: ConditionalValidatorOptions;
  }): ValidatorFn {
    let validatorAdded = false;

    return (control: AbstractControl): ValidationErrors | null => {
      const targetControl = control.get(params.targetControlName);

      if (!targetControl) {
        return control.errors;
      }

      const addValidators = evaluateConditions(
        control,
        params.conditions,
        params.options?.mode ?? ConditionsMode.ALL_TRUE,
      );

      if (addValidators && !validatorAdded) {
        targetControl.addValidators(params.targetValidators);
        targetControl.updateValueAndValidity({ onlySelf: true });

        if (params.options?.markAsDirty) {
          targetControl.markAsDirty();
        }

        if (params.options?.addValidatorsCallback) {
          params.options.addValidatorsCallback();
        }
        validatorAdded = true;
        return targetControl.errors;
      } else if (!addValidators && validatorAdded) {
        targetControl.removeValidators(params.targetValidators);
        targetControl.updateValueAndValidity({ onlySelf: true });

        if (params.options?.removeValidatorsCallback) {
          params.options.removeValidatorsCallback();
        }
        validatorAdded = false;
      }
      return control.errors;
    };
  }
}
