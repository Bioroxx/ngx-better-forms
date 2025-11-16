export enum ConditionMode {
  INCLUDES,
  NOT_INCLUDES,
}

export enum ConditionsMode {
  NONE_MATCH,
  SOME_MATCH,
  ALL_MATCH,
}

export const DEFAULT_CONDITION_MODE = ConditionMode.INCLUDES;
export const DEFAULT_CONDITIONS_MODE = ConditionsMode.ALL_MATCH;

export interface ConditionsOptions {
  mode?: ConditionsMode;
}

export interface InternalCondition {
  propertyPath?: string;
  mode?: ConditionMode;
}

export interface InternalValuesCondition<T = unknown> extends InternalCondition {
  testValues: T[];
}

export interface InternalRangeCondition<T extends number = number> extends InternalCondition {
  testRangeMinInclusive: T;
  testRangeMaxInclusive: T;
}

export function isInternalValuesCondition(condition: InternalCondition): condition is InternalValuesCondition {
  return 'testValues' in condition;
}

export function isInternalRangeCondition(condition: InternalCondition): condition is InternalRangeCondition {
  return 'testRangeMinInclusive' in condition && 'testRangeMaxInclusive' in condition;
}

export function evaluateInternalCondition(value: unknown, condition: InternalCondition) {
  if (isInternalValuesCondition(condition)) {
    return evaluateInternalValuesCondition(get(value, condition.propertyPath), condition);
  }
  if (isInternalRangeCondition(condition)) {
    return evaluateInternalRangeCondition(get(value, condition.propertyPath) as number, condition);
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

function applyMode(includes: boolean, mode?: ConditionMode): boolean {
  mode ??= DEFAULT_CONDITION_MODE;
  if (mode === ConditionMode.INCLUDES && includes) {
    return true;
  }
  return mode === ConditionMode.NOT_INCLUDES && !includes;
}

export function evaluateConditionResults(conditionResults: boolean[], mode?: ConditionsMode): boolean {
  mode ??= DEFAULT_CONDITIONS_MODE;

  switch (mode) {
    case ConditionsMode.ALL_MATCH:
      return conditionResults.every((c) => c);
    case ConditionsMode.SOME_MATCH:
      return conditionResults.some((c) => c);
    case ConditionsMode.NONE_MATCH:
      return !conditionResults.some((c) => c);
  }
}

export function get(obj: unknown, propertyPath?: string): unknown {
  if (propertyPath === undefined) {
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
