import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { evaluateConditions, FormControlCondition } from './adapter';
import { ConditionsMode, ConditionsOptions } from '@ngx-better-forms/better-forms/core';

export interface ConditionalValidatorOptions extends ConditionsOptions {
  markAsDirty?: boolean;
  addValidatorsCallback?: () => void;
  removeValidatorsCallback?: () => void;
}

export class BetterValidation {
  public static conditionalValidators(params: {
    targetControlPath: string;
    targetValidators: ValidatorFn[];
    conditions: FormControlCondition[];
    options?: ConditionalValidatorOptions;
  }): ValidatorFn {
    let validatorAdded = false;

    return (control: AbstractControl): ValidationErrors | null => {
      const targetControl = control.get(params.targetControlPath);

      if (!targetControl) {
        return control.errors;
      }

      const addValidators = evaluateConditions(
        control,
        params.conditions,
        params.options?.mode ?? ConditionsMode.ALL_MATCH,
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
