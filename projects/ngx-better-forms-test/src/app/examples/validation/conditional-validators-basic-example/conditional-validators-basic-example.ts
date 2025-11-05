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
  selector: 'app-conditional-validators-basic-example',
  imports: [InputText, ReactiveFormsModule, Message, FormatErrorsPipe, ExampleCard],
  templateUrl: './conditional-validators-basic-example.html',
})
export class ConditionalValidatorsBasicExample implements Documented {
  title = 'Basic';
  fileName = 'conditional-validators-basic-example';

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
          targetControlName: 'target',
          targetValidators: [Validators.required],
          conditions: [
            {
              formControlName: 'field1',
              testValues: ['a', 'b'],
              mode: ConditionMode.INCLUDES, // default
            },
          ],
        }),
      ],
    },
  );
  // @doc-end
}
