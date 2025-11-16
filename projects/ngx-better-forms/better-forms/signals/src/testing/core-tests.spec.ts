import { CoreTestSuite, DisableOptions, Errors, TestForm } from '@ngx-better-forms/better-forms/core/testing';
import {
  ConditionsOptions,
  InternalRangeCondition,
  InternalValuesCondition,
} from '@ngx-better-forms/better-forms/core';
import { signal } from '@angular/core';
import { disabled, FieldTree, form, required, schema } from '@angular/forms/signals';
import { FieldPathCondition } from '../lib/adapter';
import { conditionalSchema } from '../lib/conditionalSchema';
import { TestBed } from '@angular/core/testing';

interface SignalFormFields {
  control1: number | null;
  control2: string | null;
  control3: object | null;
  targetControl: string;
}

enum Field {
  CONTROL_1,
  CONTROL_2,
  CONTROL_3,
}

interface PreparedCondition extends FieldPathCondition<unknown> {
  field: Field;
}

class SignalTestForm implements TestForm {
  formFields = signal<SignalFormFields>({
    control1: null,
    control2: null,
    control3: null,
    targetControl: '',
  });

  signalForm?: FieldTree<SignalFormFields, string | number>;

  constructor() {}

  preparedConditions: PreparedCondition[] = [];

  setControl1Value(value: number | null): void {
    this.formFields.set({
      ...this.formFields(),
      control1: value,
    });
  }
  setControl2Value(value: string): void {
    this.formFields.set({
      ...this.formFields(),
      control2: value,
    });
  }
  setControl3Value(value: object | null): void {
    this.formFields.set({
      ...this.formFields(),
      control3: value,
    });
  }

  addControl1Condition<T extends number>(condition: InternalValuesCondition<T> | InternalRangeCondition<T>): void {
    const preparedCondition: PreparedCondition = {
      ...condition,
      //@ts-ignore
      fieldPath: null,
      field: Field.CONTROL_1,
    };
    this.preparedConditions.push(preparedCondition);
  }
  addControl2Condition<T extends string>(condition: InternalValuesCondition<T>): void {
    const preparedCondition: PreparedCondition = {
      ...condition,
      //@ts-ignore
      fieldPath: null,
      field: Field.CONTROL_2,
    };
    this.preparedConditions.push(preparedCondition);
  }
  addControl3Condition<T extends number>(condition: InternalValuesCondition<T>): void {
    const preparedCondition: PreparedCondition = {
      ...condition,
      //@ts-ignore
      fieldPath: null,
      field: Field.CONTROL_3,
    };
    this.preparedConditions.push(preparedCondition);
  }

  applyConditionalRequiredValidator(options?: ConditionsOptions): void {
    TestBed.runInInjectionContext(() => {
      this.signalForm = form(this.formFields, (path) => {
        conditionalSchema({
          root: path,
          schema: schema<SignalFormFields>((ctx) => {
            required(ctx.targetControl);
          }),
          conditions: this.preparedConditions.map((c) => {
            let f;
            if (c.field === Field.CONTROL_1) {
              f = path.control1;
            } else if (c.field === Field.CONTROL_2) {
              f = path.control2;
            } else {
              f = path.control3;
            }

            return {
              ...c,
              fieldPath: f,
            };
          }),
          options: options,
        });
      });
    });
  }
  applyConditionalDisable(options?: DisableOptions): void {
    TestBed.runInInjectionContext(() => {
      this.signalForm = form(this.formFields, (path) => {
        conditionalSchema({
          root: path,
          schema: schema<SignalFormFields>((ctx) => {
            disabled(ctx.targetControl);
          }),
          conditions: this.preparedConditions.map((c) => {
            let f;
            if (c.field === Field.CONTROL_1) {
              f = path.control1;
            } else if (c.field === Field.CONTROL_2) {
              f = path.control2;
            } else {
              f = path.control3;
            }

            return {
              ...c,
              fieldPath: f,
            };
          }),
          options,
        });
      });
    });
  }

  getTargetControlErrors(): Errors {
    if (!this.signalForm) {
      return { required: false };
    }

    const errors = this.signalForm.targetControl().errors();

    if (errors.length) {
      return { required: true };
    } else {
      return { required: false };
    }
  }
}

export function runCoreTests() {
  const testSuite = new CoreTestSuite(() => new SignalTestForm());
  testSuite.runTests();
}
