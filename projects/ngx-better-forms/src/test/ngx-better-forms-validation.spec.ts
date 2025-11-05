import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BetterValidation } from '../lib/ngx-better-forms-validation';
import { ConditionMode, ConditionsMode } from '../lib/ngx-better-forms-core';

describe('BetterValidation.conditionalValidators', () => {
  let formBuilder: FormBuilder;
  let form: FormGroup;

  beforeEach(() => {
    formBuilder = new FormBuilder();
    form = formBuilder.group({
      conditionControl1: new FormControl<number | null>(null),
      conditionControl2: new FormControl<string>(''),
      conditionControl3: new FormControl<{ value: number } | null>(null),
      targetControl: new FormControl<string>(''),
    });
  });

  describe('Single Condition', () => {
    describe('Default Options', () => {
      it('should add validators to target control when condition control value is included in test values', () => {
        expect(hasRequiredError(targetControl())).toBeFalse();

        form.addValidators(
          BetterValidation.conditionalValidators({
            targetControlPath: 'targetControl',
            targetValidators: [Validators.required],
            conditions: [
              {
                controlPath: 'conditionControl1',
                testValues: [1, 2, 3],
              },
            ],
          }),
        );
        form.updateValueAndValidity();
        expect(hasRequiredError(targetControl())).toBeFalse();
        conditionControl1().setValue(2);
        expect(hasRequiredError(targetControl())).toBeTrue();
      });
      it('should add validators to target control when condition control value is inside test range', () => {
        expect(hasRequiredError(targetControl())).toBeFalse();

        form.addValidators(
          BetterValidation.conditionalValidators({
            targetControlPath: 'targetControl',
            targetValidators: [Validators.required],
            conditions: [
              {
                controlPath: 'conditionControl1',
                testRangeMinInclusive: 1,
                testRangeMaxInclusive: 3,
              },
            ],
          }),
        );
        form.updateValueAndValidity();
        expect(hasRequiredError(targetControl())).toBeFalse();
        conditionControl1().setValue(2);
        expect(hasRequiredError(targetControl())).toBeTrue();
      });
    });
    describe('conditions.mode: ConditionMode.NOT_INCLUDES', () => {
      it('should add validators to target control when condition control value is not included in test values', () => {
        expect(hasRequiredError(targetControl())).toBeFalse();

        form.addValidators(
          BetterValidation.conditionalValidators({
            targetControlPath: 'targetControl',
            targetValidators: [Validators.required],
            conditions: [
              {
                controlPath: 'conditionControl1',
                testValues: [1],
                mode: ConditionMode.NOT_INCLUDES,
              },
            ],
          }),
        );
        form.updateValueAndValidity();
        expect(hasRequiredError(targetControl())).toBeTrue();
        conditionControl1().setValue(1);
        expect(hasRequiredError(targetControl())).toBeFalse();
      });
      it('should add validators to target control when condition control value is not inside test range', () => {
        expect(hasRequiredError(targetControl())).toBeFalse();

        form.addValidators(
          BetterValidation.conditionalValidators({
            targetControlPath: 'targetControl',
            targetValidators: [Validators.required],
            conditions: [
              {
                controlPath: 'conditionControl1',
                testRangeMinInclusive: 1,
                testRangeMaxInclusive: 2,
                mode: ConditionMode.NOT_INCLUDES,
              },
            ],
          }),
        );
        form.updateValueAndValidity();
        expect(hasRequiredError(targetControl())).toBeTrue();
        conditionControl1().setValue(0);
        expect(hasRequiredError(targetControl())).toBeTrue();
        conditionControl1().setValue(1);
        expect(hasRequiredError(targetControl())).toBeFalse();
      });
    });
    describe('propertyPath defined', () => {
      it('should add validators to target control when condition control value is property of object value', () => {
        expect(hasRequiredError(targetControl())).toBeFalse();

        form.addValidators(
          BetterValidation.conditionalValidators({
            targetControlPath: 'targetControl',
            targetValidators: [Validators.required],
            conditions: [
              {
                controlPath: 'conditionControl3',
                propertyPath: 'value',
                testValues: [1],
              },
            ],
          }),
        );
        form.updateValueAndValidity();
        expect(hasRequiredError(targetControl())).toBeFalse();
        conditionControl3().setValue({ value: 1 });
        expect(hasRequiredError(targetControl())).toBeTrue();
      });
    });
    describe('Mark as Dirty', () => {
      it('should mark target control as dirty when option enabled and validators are applied', () => {
        expect(hasRequiredError(targetControl())).toBeFalse();

        form.addValidators(
          BetterValidation.conditionalValidators({
            targetControlPath: 'targetControl',
            targetValidators: [Validators.required],
            conditions: [
              {
                controlPath: 'conditionControl1',
                testValues: [1],
              },
            ],
            options: {
              markAsDirty: true,
            },
          }),
        );
        form.updateValueAndValidity();
        expect(targetControl().dirty).toBeFalse();
        conditionControl1().setValue(1);
        expect(targetControl().dirty).toBeTrue();
      });
      it('should not mark target control as dirty when option is not enabled and validators are applied', () => {
        expect(hasRequiredError(targetControl())).toBeFalse();

        form.addValidators(
          BetterValidation.conditionalValidators({
            targetControlPath: 'targetControl',
            targetValidators: [Validators.required],
            conditions: [
              {
                controlPath: 'conditionControl1',
                testValues: [1],
              },
            ],
          }),
        );
        form.updateValueAndValidity();
        expect(targetControl().dirty).toBeFalse();
        conditionControl1().setValue(1);
        expect(targetControl().dirty).toBeFalse();
      });
    });
    describe('Callbacks', () => {
      it('should call callback function once when validator is added', () => {
        expect(hasRequiredError(targetControl())).toBeFalse();
        const mockCallback = jasmine.createSpy('mockCallback');

        form.addValidators(
          BetterValidation.conditionalValidators({
            targetControlPath: 'targetControl',
            targetValidators: [Validators.required],
            conditions: [
              {
                controlPath: 'conditionControl1',
                testValues: [1],
              },
            ],
            options: {
              addValidatorsCallback: () => mockCallback(),
            },
          }),
        );
        form.updateValueAndValidity();
        expect(mockCallback).toHaveBeenCalledTimes(0);
        conditionControl1().setValue(1);
        expect(mockCallback).toHaveBeenCalledTimes(1);
      });
      it('should call callback function once when validator is removed', () => {
        expect(hasRequiredError(targetControl())).toBeFalse();
        const mockCallback = jasmine.createSpy('mockCallback');

        form.addValidators(
          BetterValidation.conditionalValidators({
            targetControlPath: 'targetControl',
            targetValidators: [Validators.required],
            conditions: [
              {
                controlPath: 'conditionControl1',
                testValues: [1],
              },
            ],
            options: {
              removeValidatorsCallback: () => mockCallback(),
            },
          }),
        );
        form.updateValueAndValidity();
        expect(mockCallback).toHaveBeenCalledTimes(0);
        conditionControl1().setValue(1);
        expect(mockCallback).toHaveBeenCalledTimes(0);
        conditionControl1().setValue(0);
        expect(mockCallback).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Two Conditions', () => {
    describe('Default Options', () => {
      it('should add validators to target control when all conditions match', () => {
        expect(hasRequiredError(targetControl())).toBeFalse();

        form.addValidators(
          BetterValidation.conditionalValidators({
            targetControlPath: 'targetControl',
            targetValidators: [Validators.required],
            conditions: [
              {
                controlPath: 'conditionControl1',
                testRangeMinInclusive: 1,
                testRangeMaxInclusive: 3,
              },
              {
                controlPath: 'conditionControl2',
                testValues: ['x'],
              },
            ],
          }),
        );
        form.updateValueAndValidity();
        expect(hasRequiredError(targetControl())).toBeFalse();
        conditionControl1().setValue(2);
        expect(hasRequiredError(targetControl())).toBeFalse();
        conditionControl2().setValue('x');
        expect(hasRequiredError(targetControl())).toBeTrue();
      });
      it('should not add validators to target control when only one condition matches', () => {
        expect(hasRequiredError(targetControl())).toBeFalse();

        form.addValidators(
          BetterValidation.conditionalValidators({
            targetControlPath: 'targetControl',
            targetValidators: [Validators.required],
            conditions: [
              {
                controlPath: 'conditionControl1',
                testRangeMinInclusive: 1,
                testRangeMaxInclusive: 3,
              },
              {
                controlPath: 'conditionControl2',
                testValues: ['x'],
              },
            ],
          }),
        );
        form.updateValueAndValidity();
        expect(hasRequiredError(targetControl())).toBeFalse();
        conditionControl1().setValue(2);
        expect(hasRequiredError(targetControl())).toBeFalse();
      });
    });
    describe('options.mode: ConditionsMode.SOME_MATCH', () => {
      it('should add validators to target control when all conditions match', () => {
        expect(hasRequiredError(targetControl())).toBeFalse();

        form.addValidators(
          BetterValidation.conditionalValidators({
            targetControlPath: 'targetControl',
            targetValidators: [Validators.required],
            conditions: [
              {
                controlPath: 'conditionControl1',
                testRangeMinInclusive: 1,
                testRangeMaxInclusive: 3,
              },
              {
                controlPath: 'conditionControl2',
                testValues: ['x'],
              },
            ],
            options: {
              mode: ConditionsMode.SOME_MATCH,
            },
          }),
        );
        form.updateValueAndValidity();
        expect(hasRequiredError(targetControl())).toBeFalse();
        conditionControl1().setValue(2);
        conditionControl2().setValue('x');
        expect(hasRequiredError(targetControl())).toBeTrue();
      });
      it('should add validators to target control when at least one condition matches', () => {
        expect(hasRequiredError(targetControl())).toBeFalse();

        form.addValidators(
          BetterValidation.conditionalValidators({
            targetControlPath: 'targetControl',
            targetValidators: [Validators.required],
            conditions: [
              {
                controlPath: 'conditionControl1',
                testRangeMinInclusive: 1,
                testRangeMaxInclusive: 3,
              },
              {
                controlPath: 'conditionControl2',
                testValues: ['x'],
              },
            ],
            options: {
              mode: ConditionsMode.SOME_MATCH,
            },
          }),
        );
        form.updateValueAndValidity();
        conditionControl1().setValue(2);
        expect(hasRequiredError(targetControl())).toBeTrue();
        conditionControl1().setValue(null);
        expect(hasRequiredError(targetControl())).toBeFalsy();
        conditionControl2().setValue('x');
        expect(hasRequiredError(targetControl())).toBeTrue();
      });
    });
    describe('options.mode: ConditionsMode.NONE_MATCH', () => {
      it('should add validators to target control when no conditions match', () => {
        expect(hasRequiredError(targetControl())).toBeFalse();

        form.addValidators(
          BetterValidation.conditionalValidators({
            targetControlPath: 'targetControl',
            targetValidators: [Validators.required],
            conditions: [
              {
                controlPath: 'conditionControl1',
                testRangeMinInclusive: 1,
                testRangeMaxInclusive: 3,
              },
              {
                controlPath: 'conditionControl2',
                testValues: ['x'],
              },
            ],
            options: {
              mode: ConditionsMode.NONE_MATCH,
            },
          }),
        );
        form.updateValueAndValidity();
        expect(hasRequiredError(targetControl())).toBeTrue();
        conditionControl1().setValue(2);
        expect(hasRequiredError(targetControl())).toBeFalse();
        conditionControl1().setValue(5);
        expect(hasRequiredError(targetControl())).toBeTrue();
        conditionControl2().setValue('x');
        expect(hasRequiredError(targetControl())).toBeFalse();
        conditionControl2().setValue('');
        expect(hasRequiredError(targetControl())).toBeTrue();
      });
    });
  });
  describe('Bad Configuration', () => {
    it('should evaluate conditions to false when condition control does not exist', () => {
      expect(hasRequiredError(targetControl())).toBeFalse();

      form.addValidators(
        BetterValidation.conditionalValidators({
          targetControlPath: 'targetControl',
          targetValidators: [Validators.required],
          conditions: [
            {
              controlPath: 'nonExistingConditionControl1',
              testValues: [1],
            },
            {
              controlPath: 'nonExistingConditionControl2',
              testRangeMinInclusive: 1,
              testRangeMaxInclusive: 2,
            },
          ],
          options: {
            mode: ConditionsMode.SOME_MATCH,
          },
        }),
      );
      form.updateValueAndValidity();
      expect(hasRequiredError(targetControl())).toBeFalse();
    });
    it('should silently keep form group validation errors when target control does not exist', () => {
      expect(hasRequiredError(targetControl())).toBeFalse();

      form.addValidators(
        BetterValidation.conditionalValidators({
          targetControlPath: 'nonExistingTargetControl',
          targetValidators: [Validators.required],
          conditions: [
            {
              controlPath: 'conditionControl1',
              testValues: [1],
            },
            {
              controlPath: 'conditionControl2',
              testValues: ['x'],
            },
          ],
          options: {
            mode: ConditionsMode.SOME_MATCH,
          },
        }),
      );
      form.updateValueAndValidity();
      expect(hasRequiredError(targetControl())).toBeFalse();
      expect(hasRequiredError(form)).toBeFalse();
      form.setErrors({ required: true });
      expect(hasRequiredError(form)).toBeTrue();
      form.updateValueAndValidity();
      expect(hasRequiredError(form)).toBeTrue();
    });
  });

  // Helpers
  function hasRequiredError(formControl: AbstractControl): boolean {
    let errors = formControl.errors as ValidationErrors | null;
    if (!errors) {
      return false;
    }
    return errors['required'] ?? false;
  }

  function conditionControl1(): AbstractControl<number | null> {
    const field = form.get('conditionControl1');

    if (field === null) {
      throw new Error('conditionControl1() called before form is initialized!');
    }
    return field;
  }

  function conditionControl2(): AbstractControl<string> {
    const field = form.get('conditionControl2');

    if (field === null) {
      throw new Error('conditionControl2() called before form is initialized!');
    }
    return field;
  }

  function conditionControl3(): AbstractControl<{ value: number }> {
    const field = form.get('conditionControl3');

    if (field === null) {
      throw new Error('conditionControl3() called before form is initialized!');
    }
    return field;
  }

  function targetControl(): AbstractControl<string> {
    const field = form.get('targetControl');

    if (field === null) {
      throw new Error('targetControl() called before form is initialized!');
    }
    return field;
  }
});
