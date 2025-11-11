import { applyWhen, FieldPath, PathKind, Schema } from '@angular/forms/signals';
import {
  ConditionMode,
  ConditionsMode,
  evaluateConditionResults,
  evaluateInternalCondition,
  InternalRangeCondition,
  InternalValuesCondition,
} from '@ngx-better-forms/ngx-better-forms-core';

export interface AbstractFieldPathCondition<TValue> {
  fieldPath: FieldPath<TValue>;
  propertyPath?: string;
  mode?: ConditionMode;
}

export type FieldPathValuesCondition<TValue> =
  AbstractFieldPathCondition<TValue> & InternalValuesCondition<TValue>;
export type FieldPathRangeCondition<TValue extends number> =
  AbstractFieldPathCondition<TValue> & InternalRangeCondition<TValue>;
export type FieldPathCondition<TValue> =
  | FieldPathValuesCondition<TValue>
  | (TValue extends number ? FieldPathRangeCondition<TValue> : never);

function isAbstractFieldPathCondition(
  condition: AbstractFieldPathCondition<unknown>
): boolean {
  return 'fieldPath' in condition;
}

export function isFieldPathValuesCondition<TValue>(
  condition: AbstractFieldPathCondition<TValue>
): condition is FieldPathValuesCondition<TValue> {
  return isAbstractFieldPathCondition(condition) && 'testValues' in condition;
}

export function isFieldPathRangeCondition<TValue extends number>(
  condition: AbstractFieldPathCondition<TValue>
): condition is FieldPathValuesCondition<TValue> {
  return isAbstractFieldPathCondition(condition) && 'testValues' in condition;
}

export function conditional<TValue, TForm>(params: {
  root: FieldPath<TForm, PathKind.Root>;
  schema: Schema<TForm>;
  conditions: FieldPathCondition<unknown>[];
  options?: {
    mode?: ConditionsMode;
  };
}): void {
  applyWhen(
    params.root,
    (ctx): boolean => {
      const results = params.conditions.map((c) =>
        evaluateInternalCondition(ctx.valueOf(c.fieldPath), c)
      );
      return evaluateConditionResults(results, params.options?.mode);
    },
    params.schema
  );
}
