import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export enum ConditionMode {
  INCLUDES,
  NOT_INCLUDES,
}

export enum ConditionsMode {
  NON_TRUE,
  SOME_TRUE,
  ALL_TRUE,
}

interface AbstractCondition {
  test: unknown[];
  mode: ConditionMode;
}

export interface FormControlCondition extends AbstractCondition {
  formControlName: string;
}

function isFormControlCondition(condition: AbstractCondition): condition is FormControlCondition {
  return 'formControlName' in condition;
}

export type Condition = FormControlCondition;

export class BetterValidation {
  public static conditionalValidators(params: {
    targetControlName: string;
    targetValidators: ValidatorFn[];
    conditions: Condition[];
    options?: { mode?: ConditionsMode; markAsDirty: boolean };
  }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const targetControl = control.get(params.targetControlName);

      if (!targetControl) {
        return null;
      }

      const conditionResults = params.conditions.map((c) => this.evaluateCondition(control, c));

      const conditionsMode = params.options?.mode ?? ConditionsMode.ALL_TRUE;

      let applyValidators = false;

      switch (conditionsMode) {
        case ConditionsMode.ALL_TRUE:
          applyValidators = conditionResults.every((c) => c);
          break;
        case ConditionsMode.SOME_TRUE:
          applyValidators = conditionResults.some((c) => c);
          break;
        case ConditionsMode.NON_TRUE:
          applyValidators = !conditionResults.some((c) => c);
      }

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
      return null;
    };
  }

  private static evaluateCondition(control: AbstractControl, condition: Condition): boolean {
    if (isFormControlCondition(condition)) {
      const formControl = control.get(condition.formControlName);

      if (formControl === null) {
        return false;
      }

      const value = formControl.value;
      const testIncludesValue = condition.test.includes(value);

      if (condition.mode === ConditionMode.NOT_INCLUDES && !testIncludesValue) {
        return true;
      }

      if (condition.mode === ConditionMode.INCLUDES && testIncludesValue) {
        return true;
      }
    }

    return false;
  }
}
