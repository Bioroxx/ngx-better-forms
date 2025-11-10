import { ConditionMode, ConditionsMode } from './core';

export const DEFAULT_CONDITION_MODE = ConditionMode.INCLUDES;
export const DEFAULT_CONDITIONS_MODE = ConditionsMode.ALL_MATCH;

export interface InternalCondition<T> {
  mode?: ConditionMode;
}

export interface InternalValuesCondition<T> extends InternalCondition<T> {
  testValues: T[];
}

export interface InternalRangeCondition<T extends number> extends InternalCondition<T> {
  testRangeMinInclusive: T;
  testRangeMaxInclusive: T;
}

function isInternalValuesCondition<T>(condition: InternalCondition<T>): condition is InternalValuesCondition<T> {
  return 'testValues' in condition;
}

function isInternalRangeCondition<T extends number>(
  condition: InternalCondition<T>,
): condition is InternalRangeCondition<T> {
  return 'testRangeMinInclusive' in condition && 'testRangeMaxInclusive' in condition;
}

export function evaluateInternalCondition<T>(value: T, condition: InternalCondition<T>) {
  if (isInternalValuesCondition(condition)) {
    return evaluateInternalValuesCondition(value, condition);
  }
  if (isInternalRangeCondition(condition)) {
    return evaluateInternalRangeCondition(value as number, condition);
  }
  return false;
}

export function evaluateInternalValuesCondition<T>(value: T, condition: InternalValuesCondition<T>): boolean {
  const isIncluded = condition.testValues.includes(value);
  return applyMode(isIncluded, condition.mode);
}

export function evaluateInternalRangeCondition<T extends number>(
  value: T,
  condition: InternalRangeCondition<T>,
): boolean {
  const isInRange = condition.testRangeMinInclusive <= value && value <= condition.testRangeMaxInclusive;
  return applyMode(isInRange, condition.mode);
}

function applyMode(includes: boolean, mode = DEFAULT_CONDITION_MODE): boolean {
  if (mode === ConditionMode.INCLUDES && includes) {
    return true;
  }
  return mode === ConditionMode.NOT_INCLUDES && !includes;
}

export function evaluateConditionResults(conditionResults: boolean[], mode = DEFAULT_CONDITIONS_MODE): boolean {
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
