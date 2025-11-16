import { runCoreTests } from './core-tests.spec';
import { runConditionalValidatorTests } from './validation.spec';
import { runConditionalDisableTests } from '@ngx-better-forms/better-forms/reactive/src/testing/disable.spec';

describe('Reactive Forms', () => {
  describe('Core Tests', () => {
    runCoreTests();
  });
  describe('Entry-point specific', () => {
    runConditionalValidatorTests();
    runConditionalDisableTests();
  });
});
