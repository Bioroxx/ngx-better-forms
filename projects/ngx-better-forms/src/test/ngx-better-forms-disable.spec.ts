import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BetterDisable } from '../lib/ngx-better-forms-disable';

describe('BetterDisable.conditionalDisable', () => {
  let formBuilder: FormBuilder;
  let form: FormGroup;

  beforeEach(() => {
    formBuilder = new FormBuilder();
    form = formBuilder.group({
      conditionControl1: new FormControl<number | null>(null),
      targetControl: new FormControl<string>('', { nonNullable: true }),
    });
  });

  describe('Single Condition', () => {
    describe('Default Options', () => {
      it('should disable form when condition matches', () => {
        expect(targetControl().enabled).toBeTrue();
        form.addValidators(
          BetterDisable.conditionalDisable({
            targetControlPath: 'targetControl',
            conditions: [
              {
                controlPath: 'conditionControl1',
                testValues: [1],
              },
            ],
          }),
        );
        form.updateValueAndValidity();
        expect(targetControl().enabled).toBeTrue();
        conditionControl1().setValue(1);
        expect(targetControl().enabled).toBeFalse();
        expect(targetControl().disabled).toBeTrue();
      });
    });
    describe('Reset', () => {
      it('should reset target control when option is set and control is disabled', () => {
        expect(targetControl().enabled).toBeTrue();
        expect(targetControl().value).toEqual('');
        form.addValidators(
          BetterDisable.conditionalDisable({
            targetControlPath: 'targetControl',
            conditions: [
              {
                controlPath: 'conditionControl1',
                testValues: [1],
              },
            ],
            options: {
              reset: true,
            },
          }),
        );
        form.updateValueAndValidity();
        targetControl().setValue('x');
        expect(targetControl().value).toEqual('x');
        conditionControl1().setValue(1);
        expect(targetControl().value).toEqual('');
      });
      it('should not reset target control when option not set and control is disabled', () => {
        expect(targetControl().enabled).toBeTrue();
        expect(targetControl().value).toEqual('');
        form.addValidators(
          BetterDisable.conditionalDisable({
            targetControlPath: 'targetControl',
            conditions: [
              {
                controlPath: 'conditionControl1',
                testValues: [1],
              },
            ],
          }),
        );
        form.updateValueAndValidity();
        targetControl().setValue('x');
        expect(targetControl().value).toEqual('x');
        conditionControl1().setValue(1);
        expect(targetControl().value).toEqual('x');
      });
    });
    describe('Callback', () => {
      it('should call callback when target control is disabled', () => {
        expect(targetControl().enabled).toBeTrue();
        expect(targetControl().value).toEqual('');
        const mockCallback = jasmine.createSpy('mockCallback');
        form.addValidators(
          BetterDisable.conditionalDisable({
            targetControlPath: 'targetControl',
            conditions: [
              {
                controlPath: 'conditionControl1',
                testValues: [1],
              },
            ],
            options: {
              disableCallback: () => mockCallback(),
            },
          }),
        );
        form.updateValueAndValidity();
        expect(mockCallback).toHaveBeenCalledTimes(0);
        conditionControl1().setValue(1);
        expect(mockCallback).toHaveBeenCalledTimes(1);
      });
      it('should call callback when target control is enabled', () => {
        expect(targetControl().enabled).toBeTrue();
        expect(targetControl().value).toEqual('');
        const mockCallback = jasmine.createSpy('mockCallback');
        form.addValidators(
          BetterDisable.conditionalDisable({
            targetControlPath: 'targetControl',
            conditions: [
              {
                controlPath: 'conditionControl1',
                testValues: [1],
              },
            ],
            options: {
              enableCallback: () => mockCallback(),
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
      it('should silently keep form group validation errors when target control does not exist', () => {
        expect(targetControl().enabled).toBeTrue();
        form.addValidators(
          BetterDisable.conditionalDisable({
            targetControlPath: 'nonExistingTargetControl',
            conditions: [
              {
                controlPath: 'conditionControl1',
                testValues: [1],
              },
            ],
          }),
        );
        form.updateValueAndValidity();
        expect(targetControl().enabled).toBeTrue();
        form.setErrors({ required: true });
        form.updateValueAndValidity();
        expect(targetControl().enabled).toBeTrue();
        expect(form.errors).toBeTruthy();
      });
    });
  });

  function conditionControl1(): AbstractControl<number | null> {
    const field = form.get('conditionControl1');

    if (field === null) {
      throw new Error('conditionControl1() called before form is initialized!');
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
