import { applyWhen, PathKind, Schema, SchemaPath } from '@angular/forms/signals';
import {
  ConditionsOptions,
  evaluateConditionResults,
  evaluateInternalCondition,
} from '@ngx-better-forms/better-forms/core';
import { FieldPathCondition } from './adapter';

export function conditionalSchema<TValue, TForm>(params: {
  root: SchemaPath<TForm, 1, PathKind.Root>;
  schema: Schema<TForm>;
  conditions: FieldPathCondition<unknown>[];
  options?: ConditionsOptions;
}): void {
  applyWhen(
    params.root,
    (ctx) => {
      const results = params.conditions.map((c) => evaluateInternalCondition(ctx.valueOf(c.fieldPath), c));
      return evaluateConditionResults(results, params.options?.mode);
    },
    params.schema,
  );
}
