// @documented
import { Component, inject } from '@angular/core';
import { ExampleCard } from '../../../core/component/example-card/example-card';
import { FormatErrorsPipe } from '../../../core/pipe/format-errors-pipe';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BetterValidation } from '../../../../../../ngx-better-forms/src/lib/ngx-better-forms-validation';
import { Documented } from '../../../core/interface/documented';

@Component({
  selector: 'app-conditional-validators-callback-example',
  imports: [ExampleCard, FormatErrorsPipe, InputText, Message, ReactiveFormsModule],
  templateUrl: './conditional-validators-callback-example.html',
})
export class ConditionalValidatorsCallbackExample implements Documented {
  title = 'Callback';
  fileName = 'conditional-validators-callback-example';

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
              testValues: ['a'],
            },
          ],
          options: {
            addValidatorsCallback: () => alert('Validator added to target field!'),
            removeValidatorsCallback: () => alert('Validator removed from target field!'),
          },
        }),
      ],
    },
  );
  // @doc-end
}
