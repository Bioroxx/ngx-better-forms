import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ConditionsMode } from '@ngx-better-forms/better-forms/core';
import { BetterValidation } from '../lib/validation';

export function runConditionalValidatorTests() {
  describe('Conditional Validators', () => {
    let formBuilder: FormBuilder;
    let form: FormGroup;

    beforeEach(() => {
      formBuilder = new FormBuilder();
      form = formBuilder.group({
        conditionControl1: new FormControl<number | null>(null),
        conditionControl2: new FormControl<string>(''),
        conditionControl3: new FormControl<object | null>(null),
        targetControl: new FormControl<string>(''),
      });
    });

    describe('Single Condition', () => {
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
      describe('Callback', () => {
        it('should call callback when validators are added', () => {
          expect(targetControl().value).toEqual('');
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
        it('should call callback when validators are removed', () => {
          expect(targetControl().value).toEqual('');
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
}
