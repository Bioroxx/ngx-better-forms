import { SchemaPath } from '@angular/forms/signals';
import { ConditionMode, InternalRangeCondition, InternalValuesCondition } from '@ngx-better-forms/better-forms/core';

export interface AbstractFieldPathCondition<TValue> {
  fieldPath: SchemaPath<TValue>;
  propertyPath?: string;
  mode?: ConditionMode;
}

export type FieldPathValuesCondition<TValue> = AbstractFieldPathCondition<TValue> & InternalValuesCondition<TValue>;
export type FieldPathRangeCondition<TValue extends number> = AbstractFieldPathCondition<TValue> &
  InternalRangeCondition<TValue>;
export type FieldPathCondition<TValue> =
  | FieldPathValuesCondition<TValue>
  | (TValue extends number ? FieldPathRangeCondition<TValue> : never);

function isAbstractFieldPathCondition(condition: AbstractFieldPathCondition<unknown>): boolean {
  return 'fieldPath' in condition;
}

export function isFieldPathValuesCondition<TValue>(
  condition: AbstractFieldPathCondition<TValue>,
): condition is FieldPathValuesCondition<TValue> {
  return isAbstractFieldPathCondition(condition) && 'testValues' in condition;
}

export function isFieldPathRangeCondition<TValue extends number>(
  condition: AbstractFieldPathCondition<TValue>,
): condition is FieldPathValuesCondition<TValue> {
  return isAbstractFieldPathCondition(condition) && 'testValues' in condition;
}
