import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ConditionsMode, ConditionsOptions } from '@ngx-better-forms/better-forms/core';
import { evaluateConditions, FormControlCondition } from './adapter';

export interface ConditionalDisableOptions extends ConditionsOptions {
  reset?: boolean;
  disableCallback?: () => void;
  enableCallback?: () => void;
}

export class BetterDisable {
  public static conditionalDisable(params: {
    targetControlPath: string;
    conditions: FormControlCondition[];
    options?: ConditionalDisableOptions;
  }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const targetControl = control.get(params.targetControlPath);

      if (!targetControl) {
        return control.errors;
      }

      const disable = evaluateConditions(control, params.conditions, params.options?.mode ?? ConditionsMode.ALL_MATCH);

      if (disable && targetControl.enabled) {
        targetControl.disable({ onlySelf: true });
        if (params.options?.reset) {
          targetControl.reset();
        }
        if (params.options?.disableCallback) {
          params.options.disableCallback();
        }
      } else if (!disable && targetControl.disabled) {
        targetControl.enable({ onlySelf: true });
        if (params.options?.enableCallback) {
          params.options.enableCallback();
        }
      }
      return control.errors;
    };
  }
}
