import { runCoreTests } from './core-tests.spec';
import { runConditionalValidatorTests } from './validation.spec';
import { runConditionalDisableTests } from '@ngx-better-forms/better-forms/reactive/src/testing/disable.spec';
import { runFormControlTests } from '@ngx-better-forms/better-forms/reactive/src/testing/form-control.spec';

describe('Reactive Forms', () => {
  describe('Core Tests', () => {
    runCoreTests();
  });
  describe('Reactive Forms Specific', () => {
    runConditionalValidatorTests();
    runConditionalDisableTests();
    runFormControlTests();
  });
});
