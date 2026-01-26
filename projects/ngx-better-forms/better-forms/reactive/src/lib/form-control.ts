import {
  AsyncValidatorFn,
  FormControl,
  FormControlOptions,
  FormControlState,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { signal } from '@angular/core';

export class BetterFormControl<T> extends FormControl<T | null> {
  isRequired = signal<boolean>(false);

  constructor(
    value: FormControlState<T> | T,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | FormControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    super(value, validatorOrOpts, asyncValidator);

    if (!validatorOrOpts) {
      return;
    }

    if (isFormControlOptions(validatorOrOpts)) {
      this.isRequired.set(containsRequiredValidator(validatorOrOpts.validators));
    } else {
      this.isRequired.set(containsRequiredValidator(validatorOrOpts));
    }
  }

  override setValidators(validators: ValidatorFn | ValidatorFn[] | null) {
    super.setValidators(validators);
    this.isRequired.set(containsRequiredValidator(validators));
  }

  override addValidators(validators: ValidatorFn | ValidatorFn[]) {
    super.addValidators(validators);
    this.isRequired.set(containsRequiredValidator(validators));
  }

  override removeValidators(validators: ValidatorFn | ValidatorFn[]) {
    super.removeValidators(validators);
    this.isRequired.set(!containsRequiredValidator(validators));
  }

  override clearValidators() {
    super.clearValidators();
    this.isRequired.set(false);
  }
}

function containsRequiredValidator(
  validators: ValidatorFn | ValidatorFn[] | FormControlOptions | null | undefined,
): boolean {
  if (!validators) {
    return false;
  }

  if (isValidatorFn(validators)) {
    return validators === Validators.required;
  }

  if (Array.isArray(validators)) {
    return validators.some((it) => it === Validators.required);
  }

  return false;
}

function isValidatorFn(x: unknown): x is ValidatorFn {
  return typeof x === 'function';
}

function isFormControlOptions(
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | FormControlOptions | null,
): validatorOrOpts is FormControlOptions {
  return validatorOrOpts != null && !Array.isArray(validatorOrOpts) && typeof validatorOrOpts === 'object';
}
