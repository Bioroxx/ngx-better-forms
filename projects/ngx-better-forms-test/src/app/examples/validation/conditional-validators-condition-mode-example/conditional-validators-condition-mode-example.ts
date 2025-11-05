// @documented
import { Component, inject } from '@angular/core';
import { ExampleCard } from '../../../core/component/example-card/example-card';
import { FormatErrorsPipe } from '../../../core/pipe/format-errors-pipe';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { BetterValidation } from '../../../../../../ngx-better-forms/src/lib/ngx-better-forms-validation';
import { Documented } from '../../../core/interface/documented';
import { ConditionMode } from '../../../../../../ngx-better-forms/src/lib/ngx-better-forms-core';

@Component({
  selector: 'app-conditional-validators-condition-mode-example',
  imports: [ExampleCard, FormatErrorsPipe, FormsModule, InputText, Message, ReactiveFormsModule],
  templateUrl: './conditional-validators-condition-mode-example.html',
})
export class ConditionalValidatorsConditionModeExample implements Documented {
  title = 'Condition Mode';
  fileName = 'conditional-validators-condition-mode-example';

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
              testValues: ['', 'a'],
              mode: ConditionMode.NOT_INCLUDES, // default is: ConditionMode.INCLUDES
            },
          ],
        }),
      ],
    },
  );
  // @doc-end
}
