import { AbstractControl } from '@angular/forms';

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

export function isFormControlCondition(condition: AbstractCondition): condition is FormControlCondition {
  return 'formControlName' in condition;
}

export type Condition = FormControlCondition;

function evaluateCondition(control: AbstractControl, condition: Condition): boolean {
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

export function evaluateConditions(control: AbstractControl, conditions: Condition[], mode: ConditionsMode) {
  const conditionResults = conditions.map((c) => evaluateCondition(control, c));

  let evaluationResult = false;

  switch (mode) {
    case ConditionsMode.ALL_TRUE:
      evaluationResult = conditionResults.every((c) => c);
      break;
    case ConditionsMode.SOME_TRUE:
      evaluationResult = conditionResults.some((c) => c);
      break;
    case ConditionsMode.NON_TRUE:
      evaluationResult = !conditionResults.some((c) => c);
  }
  return evaluationResult;
}
