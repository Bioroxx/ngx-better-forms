import { applyWhen, FieldPath, PathKind, Schema } from '@angular/forms/signals';
import { ConditionsMode, evaluateConditionResults, evaluateInternalCondition } from '@ngx-better-forms/core';
import { FieldPathCondition } from './adapter';

export function conditionalSchema<TValue, TForm>(params: {
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
      const results = params.conditions.map((c) => evaluateInternalCondition(ctx.valueOf(c.fieldPath), c));
      return evaluateConditionResults(results, params.options?.mode);
    },
    params.schema,
  );
}
