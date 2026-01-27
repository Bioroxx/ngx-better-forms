import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BetterFormControl, BetterValidation } from '@ngx-better-forms/better-forms';

export function runFormControlTests() {
  describe('BetterFormControl', () => {
    let formBuilder: FormBuilder;
    let form: FormGroup;

    beforeEach(() => {
      formBuilder = new FormBuilder();
      form = formBuilder.group({
        conditionControl1: new FormControl<number | null>(null),
        targetControl: new BetterFormControl<string>('', { nonNullable: true }),
      });
    });

    describe('isRequired Validator', () => {
      it('should be false if no validatorOrOpts provided', () => {
        form = formBuilder.group({
          conditionControl1: new FormControl<number | null>(null),
          targetControl: new BetterFormControl<string>(''),
        });
        expect(targetControl().isRequired()).toBeFalse();
      });
      it('should have isRequired state true when validator is applied in constructor', () => {
        form = formBuilder.group({
          conditionControl1: new FormControl<number | null>(null),
          targetControl: new BetterFormControl<string>('', [Validators.required]),
        });
        form.updateValueAndValidity();
        expect(targetControl().isRequired()).toBeTrue();
      });
      it('should have isRequired state true when validator is applied in constructor as option', () => {
        form = formBuilder.group({
          conditionControl1: new FormControl<number | null>(null),
          targetControl: new BetterFormControl<string>('', { validators: Validators.required, nonNullable: true }),
        });
        form.updateValueAndValidity();
        expect(targetControl().isRequired()).toBeTrue();
      });
      it('should have correct isRequired state when conditionalValidators are applied', () => {
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
        expect(targetControl().isRequired()).toBeFalse();
        conditionControl1().setValue(1);
        expect(targetControl().enabled).toBeTrue();
        conditionControl1().setValue(10);
        expect(targetControl().disabled).toBeFalse();
      });
      it('should set isRequired state to false if validators are cleared', () => {
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
        expect(targetControl().isRequired()).toBeFalse();
        conditionControl1().setValue(1);
        expect(targetControl().enabled).toBeTrue();
        targetControl().clearValidators();
        expect(targetControl().disabled).toBeFalse();
      });
    });

    function conditionControl1(): AbstractControl<number | null> {
      const field = form.get('conditionControl1');

      if (field === null) {
        throw new Error('conditionControl1() called before form is initialized!');
      }
      return field;
    }

    function targetControl(): BetterFormControl<string> {
      const field = form.get('targetControl');

      if (field === null) {
        throw new Error('targetControl() called before form is initialized!');
      }
      return field as BetterFormControl<string>;
    }
  });
}
