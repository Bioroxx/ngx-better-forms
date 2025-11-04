// @documented
import { Component, inject } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BetterValidation, ConditionMode } from '../../../../../../ngx-better-forms/src/public-api';
import { Message } from 'primeng/message';

import { FormatErrorsPipe } from '../../../core/pipe/format-errors-pipe';
import { Documented } from '../../../core/interface/documented';
import { ExampleCard } from '../../../core/component/example-card/example-card';

@Component({
  selector: 'app-better-validation-conditional-validators-example',
  imports: [InputText, ReactiveFormsModule, Message, FormatErrorsPipe, ExampleCard],
  templateUrl: './better-validation-conditional-validators-example.html',
})
export class BetterValidationConditionalValidatorsExample implements Documented {
  title = 'Conditional Validators';
  fileName = 'better-validation-conditional-validators-example';

  private readonly formBuilder = inject(FormBuilder);

  // @doc-start
  formGroup = this.formBuilder.group(
    {
      field1: new FormControl<string>(''),
      field2: new FormControl<string>(''),
    },
    {
      validators: [
        BetterValidation.conditionalValidators({
          targetControlName: 'field2',
          targetValidators: [Validators.required],
          conditions: [
            {
              formControlName: 'field1',
              test: ['a', 'b'],
              mode: ConditionMode.INCLUDES,
            },
          ],
          options: {
            markAsDirty: true,
          },
        }),
      ],
    },
  );
  // @doc-end
}
