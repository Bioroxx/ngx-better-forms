// @documented
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BetterValidation } from '@ngx-better-forms/better-forms/reactive';

import { FormatErrorsPipe } from '../../../../core/pipe/format-errors-pipe';
import { Documented } from '../../../../core/interface/documented';
import { ExampleCard } from '../../../../core/component/example-card/example-card';

@Component({
  selector: 'app-conditional-validators-basic-example',
  imports: [ReactiveFormsModule, FormatErrorsPipe, ExampleCard],
  templateUrl: './conditional-validators-basic-example.html',
})
export class ConditionalValidatorsBasicExample extends Documented {
  private readonly formBuilder = inject(FormBuilder);

  // @doc-start
  formGroup = this.formBuilder.group(
    {
      field1: new FormControl<string>(''),
      target: new FormControl<string>(''),
    },
    {
      validators: [
        BetterValidation.conditionalValidators({
          targetControlPath: 'target',
          targetValidators: [Validators.required],
          conditions: [
            {
              controlPath: 'field1',
              testValues: ['a', 'b'],
            },
          ],
        }),
      ],
    },
  );
  // @doc-end
}
