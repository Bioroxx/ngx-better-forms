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

const DEFAULT_CONDITION_MODE = ConditionMode.INCLUDES;

interface AbstractCondition {
  mode?: ConditionMode;
}

interface AbstractFormControlCondition extends AbstractCondition {
  formControlName: string;
}

export interface FormControlValuesCondition extends AbstractFormControlCondition {
  testValues: unknown[];
}

export function isFormControlValuesCondition(condition: AbstractCondition): condition is FormControlValuesCondition {
  return 'formControlName' in condition && 'testValues' in condition;
}

export interface FormControlRangeCondition extends AbstractFormControlCondition {
  testRangeMinInclusive: number;
  testRangeMaxInclusive: number;
}

export function isFormControlRangeCondition(condition: AbstractCondition): condition is FormControlRangeCondition {
  return 'formControlName' in condition && 'testRangeMinInclusive' in condition && 'testRangeMaxInclusive' in condition;
}

export type Condition = FormControlValuesCondition | FormControlRangeCondition;

function evaluateCondition(control: AbstractControl, condition: Condition): boolean {
  let isIncluded = false;

  if (isFormControlValuesCondition(condition)) {
    const formControl = control.get(condition.formControlName);

    if (formControl === null) {
      return false;
    }

    const value = formControl.value;
    isIncluded = condition.testValues.includes(value);
  } else if (isFormControlRangeCondition(condition)) {
    const formControl = control.get(condition.formControlName);

    if (formControl === null) {
      return false;
    }

    const value = formControl.value;

    isIncluded = condition.testRangeMinInclusive <= value && value <= condition.testRangeMaxInclusive;
  }

  condition.mode = condition.mode ?? DEFAULT_CONDITION_MODE;

  if (condition.mode === ConditionMode.INCLUDES && isIncluded) {
    return true;
  }

  if (condition.mode === ConditionMode.NOT_INCLUDES && !isIncluded) {
    return true;
  }

  return false;
}

export function evaluateConditions(control: AbstractControl, conditions: Condition[], mode: ConditionsMode) {
  const conditionResults = conditions.map((c) => evaluateCondition(control, c));

  switch (mode) {
    case ConditionsMode.ALL_TRUE:
      return conditionResults.every((c) => c);
    case ConditionsMode.SOME_TRUE:
      return conditionResults.some((c) => c);
    case ConditionsMode.NON_TRUE:
      return !conditionResults.some((c) => c);
  }
}
