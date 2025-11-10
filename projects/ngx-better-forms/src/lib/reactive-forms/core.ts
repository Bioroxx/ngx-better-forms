import { AbstractControl } from '@angular/forms';
import { ConditionMode, ConditionsMode } from '../core';
import {
  evaluateConditionResults,
  evaluateInternalCondition,
  get,
  InternalRangeCondition,
  InternalValuesCondition,
} from '../internal';

interface AbstractFormControlCondition {
  controlPath: string;
  propertyPath?: string;
  mode?: ConditionMode;
}

export type FormControlValuesCondition = AbstractFormControlCondition & InternalValuesCondition<any>;
export type FormControlRangeCondition = AbstractFormControlCondition & InternalRangeCondition<number>;
export type FormControlCondition = FormControlValuesCondition | FormControlRangeCondition;

function isAbstractFormControlCondition(condition: AbstractFormControlCondition): boolean {
  return 'controlPath' in condition;
}

export function isFormControlValuesCondition(
  condition: AbstractFormControlCondition,
): condition is FormControlValuesCondition {
  return isAbstractFormControlCondition(condition) && 'testValues' in condition;
}

export function isFormControlRangeCondition(
  condition: AbstractFormControlCondition,
): condition is FormControlRangeCondition {
  return (
    isAbstractFormControlCondition(condition) &&
    'testRangeMinInclusive' in condition &&
    'testRangeMaxInclusive' in condition
  );
}

export function evaluateFormControlCondition(control: AbstractControl, condition: FormControlCondition): boolean {
  const formControl = control.get(condition.controlPath);

  if (formControl === null) {
    return false;
  }
  const value = get(formControl.value, condition.propertyPath);
  return evaluateInternalCondition(value, condition);
}

export function evaluateConditions(control: AbstractControl, conditions: FormControlCondition[], mode: ConditionsMode) {
  const conditionResults = conditions.map((c) => evaluateFormControlCondition(control, c));
  return evaluateConditionResults(conditionResults, mode);
}
