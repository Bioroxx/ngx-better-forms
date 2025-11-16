import { CoreTestSuite, Errors, TestForm } from '@ngx-better-forms/better-forms/core/testing';
import {
  ConditionsOptions,
  InternalRangeCondition,
  InternalValuesCondition,
} from '@ngx-better-forms/better-forms/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormControlCondition } from '../lib/adapter';
import { BetterValidation } from '../lib/validation';
import { BetterDisable } from '../lib/disable';

class ReactiveTestForm implements TestForm {
  formBuilder = new FormBuilder();
  form;
  preparedConditions: FormControlCondition[] = [];

  constructor() {
    this.form = this.formBuilder.group({
      control1: new FormControl<number | null>(null),
      control2: new FormControl<string | null>(null),
      control3: new FormControl<object | null>(null),
      targetControl: new FormControl<string>(''),
    });
  }

  setControl1Value(value: number | null): void {
    this.form.controls.control1.setValue(value);
  }
  setControl2Value(value: string | null): void {
    this.form.controls.control2.setValue(value);
  }
  setControl3Value(value: object): void {
    this.form.controls.control3.setValue(value);
  }

  addControl1Condition<T extends number>(condition: InternalValuesCondition<T> | InternalRangeCondition<T>): void {
    this.preparedConditions.push({
      ...condition,
      controlPath: 'control1',
    });
  }
  addControl2Condition<T extends string>(condition: InternalValuesCondition<T>): void {
    this.preparedConditions.push({
      ...condition,
      controlPath: 'control2',
    });
  }
  addControl3Condition<T extends number>(condition: InternalValuesCondition<T>): void {
    this.preparedConditions.push({
      ...condition,
      controlPath: 'control3',
    });
  }

  applyConditionalRequiredValidator(options?: ConditionsOptions): void {
    this.form.addValidators(
      BetterValidation.conditionalValidators({
        targetControlPath: 'targetControl',
        targetValidators: [Validators.required],
        conditions: this.preparedConditions,
        options,
      }),
    );
    this.form.updateValueAndValidity();
  }

  applyConditionalDisable(options?: ConditionsOptions): void {
    this.form.addValidators(
      BetterDisable.conditionalDisable({
        targetControlPath: 'targetControl',
        conditions: this.preparedConditions,
        options,
      }),
    );
  }

  getTargetControlErrors(): Errors {
    const errors = this.form.controls.targetControl.errors;
    if (errors === null) {
      return { required: false };
    } else {
      return { required: true };
    }
  }
}

export function runCoreTests() {
  const testSuite = new CoreTestSuite(() => new ReactiveTestForm());
  testSuite.runTests();
}
