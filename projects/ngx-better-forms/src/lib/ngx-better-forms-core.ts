import { AbstractControl } from '@angular/forms';

export enum ConditionMode {
  INCLUDES,
  NOT_INCLUDES,
}

export enum ConditionsMode {
  NONE_MATCH,
  SOME_MATCH,
  ALL_MATCH,
}

const DEFAULT_CONDITION_MODE = ConditionMode.INCLUDES;

interface AbstractCondition {
  propertyPath?: string;
  mode?: ConditionMode;
}

interface AbstractFormControlCondition extends AbstractCondition {
  controlPath: string;
}

function isAbstractFormControlCondition(condition: AbstractCondition): boolean {
  return 'controlPath' in condition;
}

export interface FormControlValuesCondition extends AbstractFormControlCondition {
  testValues: unknown[];
}

export function isFormControlValuesCondition(condition: AbstractCondition): condition is FormControlValuesCondition {
  return isAbstractFormControlCondition(condition) && 'testValues' in condition;
}

export interface FormControlRangeCondition extends AbstractFormControlCondition {
  testRangeMinInclusive: number;
  testRangeMaxInclusive: number;
}

export function isFormControlRangeCondition(condition: AbstractCondition): condition is FormControlRangeCondition {
  return (
    isAbstractFormControlCondition(condition) &&
    'testRangeMinInclusive' in condition &&
    'testRangeMaxInclusive' in condition
  );
}

export type Condition = FormControlValuesCondition | FormControlRangeCondition;

export function evaluateCondition(control: AbstractControl, condition: Condition): boolean {
  let isIncluded = false;

  if (isFormControlValuesCondition(condition)) {
    const formControl = control.get(condition.controlPath);

    if (formControl === null) {
      return false;
    }
    const value = get(formControl.value, condition.propertyPath);
    isIncluded = condition.testValues.includes(value);
  } else if (isFormControlRangeCondition(condition)) {
    const formControl = control.get(condition.controlPath);

    if (formControl === null) {
      return false;
    }
    const value = get(formControl.value, condition.propertyPath);

    if (typeof value !== 'number') {
      isIncluded = false;
    } else {
      isIncluded = condition.testRangeMinInclusive <= value && value <= condition.testRangeMaxInclusive;
    }
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
    case ConditionsMode.ALL_MATCH:
      return conditionResults.every((c) => c);
    case ConditionsMode.SOME_MATCH:
      return conditionResults.some((c) => c);
    case ConditionsMode.NONE_MATCH:
      return !conditionResults.some((c) => c);
  }
}

export function get(obj: unknown, propertyPath?: string) {
  if (!propertyPath) {
    return obj;
  }

  const propertyPathSegments = propertyPath.split('.');

  for (const propertyPathSegment of propertyPathSegments) {
    if (obj !== null && typeof obj === 'object' && propertyPathSegment in obj) {
      obj = (obj as Record<string, unknown>)[propertyPathSegment];
    } else {
      return undefined;
    }
  }
  return obj;
}
