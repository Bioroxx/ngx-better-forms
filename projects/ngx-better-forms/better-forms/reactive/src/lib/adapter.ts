import { AbstractControl } from '@angular/forms';
import {
  ConditionMode,
  ConditionsMode,
  evaluateConditionResults,
  evaluateInternalCondition,
  InternalRangeCondition,
  InternalValuesCondition,
} from '@ngx-better-forms/better-forms/core';

interface AbstractFormControlCondition {
  controlPath: string;
  mode?: ConditionMode;
}

export type FormControlValuesCondition = AbstractFormControlCondition & InternalValuesCondition;
export type FormControlRangeCondition = AbstractFormControlCondition & InternalRangeCondition;
export type FormControlCondition = FormControlValuesCondition | FormControlRangeCondition;

export function evaluateFormControlCondition(control: AbstractControl, condition: FormControlCondition): boolean {
  const formControl = control.get(condition.controlPath);
  if (formControl === null) {
    return false;
  }
  return evaluateInternalCondition(formControl.value, condition);
}

export function evaluateConditions(control: AbstractControl, conditions: FormControlCondition[], mode: ConditionsMode) {
  const conditionResults = conditions.map((c) => evaluateFormControlCondition(control, c));
  return evaluateConditionResults(conditionResults, mode);
}
