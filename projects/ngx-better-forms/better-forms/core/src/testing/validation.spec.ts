import { ConditionMode, ConditionsOptions, InternalRangeCondition, InternalValuesCondition } from '../lib/core';
import { ConditionsMode } from '@ngx-better-forms/better-forms/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

export interface TestForm {
  setControl1Value(value: number | null): void;
  setControl2Value(value: string | null): void;
  setControl3Value(value: object | null): void;

  addControl1Condition<T extends number>(condition: InternalValuesCondition<T> | InternalRangeCondition<T>): void;
  addControl2Condition<T extends string>(condition: InternalValuesCondition<T>): void;
  addControl3Condition<T extends number>(condition: InternalValuesCondition<T>): void;

  applyConditionalRequiredValidator(options?: ConditionsOptions): void;
  applyConditionalDisable(options?: ConditionsOptions): void;

  getTargetControlErrors(): Errors;
}

export interface DisableOptions {
  mode?: ConditionsMode;
  reset: boolean;
  disableCallback: () => void;
  enableCallback: () => void;
}

export interface Errors {
  required: boolean;
}

export class CoreTestSuite {
  newForm: () => TestForm;
  form!: TestForm;

  constructor(newForm: () => TestForm) {
    this.newForm = newForm;
  }

  hasRequiredError(): boolean {
    return this.form.getTargetControlErrors().required;
  }

  runTests(): void {
    beforeEach(waitForAsync(() => {
      TestBed.runInInjectionContext(() => {
        this.form = this.newForm();
        expect(this.hasRequiredError()).toBeFalse();
      });
    }));

    describe('Single Condition', () => {
      describe('Default Options', () => {
        it('should add validators to target control when condition control value is included in test values', () => {
          this.form.addControl1Condition({
            testValues: [1, 2, 3],
          });
          this.form.applyConditionalRequiredValidator();
          expect(this.hasRequiredError()).toBeFalse();
          this.form.setControl1Value(2);
          expect(this.hasRequiredError()).toBeTrue();
        });

        it('should add validators to target control when condition control value is inside test range', () => {
          this.form.addControl1Condition({
            testRangeMinInclusive: 1,
            testRangeMaxInclusive: 3,
          });
          this.form.applyConditionalRequiredValidator();
          expect(this.hasRequiredError()).toBeFalse();
          this.form.setControl1Value(2);
          expect(this.hasRequiredError()).toBeTrue();
        });
      });
      describe('ConditionMode.NOT_INCLUDES', () => {
        it('should add validators to target control when condition control value is not included in test values', () => {
          this.form.addControl1Condition({
            testValues: [1, 2, 3],
            mode: ConditionMode.NOT_INCLUDES,
          });
          this.form.applyConditionalRequiredValidator();
          expect(this.hasRequiredError()).toBeTrue();
          this.form.setControl1Value(2);
          expect(this.hasRequiredError()).toBeFalse();
        });
        it('should add validators to target control when condition control value is not inside test range', () => {
          this.form.addControl1Condition({
            testRangeMinInclusive: 1,
            testRangeMaxInclusive: 2,
            mode: ConditionMode.NOT_INCLUDES,
          });
          this.form.applyConditionalRequiredValidator();
          expect(this.hasRequiredError()).toBeTrue();
          this.form.setControl1Value(0);
          expect(this.hasRequiredError()).toBeTrue();
          this.form.setControl1Value(1);
          expect(this.hasRequiredError()).toBeFalse();
        });
      });
      describe('PropertyPath', () => {
        it('should add validators to target control when condition control value is property of object value', () => {
          this.form.addControl3Condition({
            propertyPath: 'value',
            testValues: [1],
          });
          this.form.applyConditionalRequiredValidator();
          expect(this.hasRequiredError()).toBeFalse();
          this.form.setControl3Value({ value: 1 });
          expect(this.hasRequiredError()).toBeTrue();
        });
      });
    });
    describe('Two Conditions', () => {
        describe('Default Options', () => {
          it('should add validators to target control when all conditions match', () => {
            this.form.addControl1Condition({
              testRangeMinInclusive: 1,
              testRangeMaxInclusive: 3,
            });
            this.form.addControl2Condition({
              testValues: ['x'],
            });
            this.form.applyConditionalRequiredValidator();
            expect(this.hasRequiredError()).toBeFalse();
            this.form.setControl1Value(2);
            expect(this.hasRequiredError()).toBeFalse();
            this.form.setControl2Value('x');
            expect(this.hasRequiredError()).toBeTrue();
          });
          it('should not add validators to target control when only one condition matches', () => {
            this.form.addControl1Condition({
              testRangeMinInclusive: 1,
              testRangeMaxInclusive: 3,
            });
            this.form.addControl2Condition({
              testValues: ['x'],
            });
            this.form.applyConditionalRequiredValidator();
            expect(this.hasRequiredError()).toBeFalse();
            this.form.setControl1Value(2);
            expect(this.hasRequiredError()).toBeFalse();
          });
        });
        describe('ConditionsMode.SOME_MATCH', () => {
          it('should add validators to target control when all conditions match', () => {
            this.form.addControl1Condition({
              testRangeMinInclusive: 1,
              testRangeMaxInclusive: 3,
            });
            this.form.addControl2Condition({
              testValues: ['x'],
            });
            this.form.applyConditionalRequiredValidator({ mode: ConditionsMode.SOME_MATCH });
            expect(this.hasRequiredError()).toBeFalse();
            this.form.setControl1Value(2);
            this.form.setControl2Value('x');
            expect(this.hasRequiredError()).toBeTrue();
          });
          it('should add validators to target control when at least one condition matches', () => {
            this.form.addControl1Condition({
              testRangeMinInclusive: 1,
              testRangeMaxInclusive: 3,
            });
            this.form.addControl2Condition({
              testValues: ['x'],
            });
            this.form.applyConditionalRequiredValidator({ mode: ConditionsMode.SOME_MATCH });
            expect(this.hasRequiredError()).toBeFalse();
            this.form.setControl1Value(2);
            expect(this.hasRequiredError()).toBeTrue();
            this.form.setControl1Value(null);
            expect(this.hasRequiredError()).toBeFalse();
            this.form.setControl2Value('x');
            expect(this.hasRequiredError()).toBeTrue();
          });
        });
        describe('ConditionsMode.NONE_MATCH', () => {
          it('should add validators to target control when no conditions match', () => {
            this.form.addControl1Condition({
              testRangeMinInclusive: 1,
              testRangeMaxInclusive: 3,
            });
            this.form.addControl2Condition({
              testValues: ['x'],
            });
            this.form.applyConditionalRequiredValidator({ mode: ConditionsMode.NONE_MATCH });
            expect(this.hasRequiredError()).toBeTrue();
            this.form.setControl1Value(2);
            expect(this.hasRequiredError()).toBeFalse();
            this.form.setControl1Value(5);
            expect(this.hasRequiredError()).toBeTrue();
            this.form.setControl2Value('x');
            expect(this.hasRequiredError()).toBeFalse();
            this.form.setControl2Value('');
            expect(this.hasRequiredError()).toBeTrue();
          });
        });
      });
  }
}
