// @documented
import { Component, inject } from '@angular/core';
import { ExampleCard } from '../../../core/component/example-card/example-card';
import { FormatErrorsPipe } from '../../../core/pipe/format-errors-pipe';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BetterValidation } from '../../../../../../ngx-better-forms/src/lib/ngx-better-forms-validation';
import { Documented } from '../../../core/interface/documented';
import { InputNumber } from 'primeng/inputnumber';

@Component({
  selector: 'app-conditional-validators-multiple-conditions-example',
  imports: [ExampleCard, FormatErrorsPipe, InputText, Message, ReactiveFormsModule, InputNumber],
  templateUrl: './conditional-validators-multiple-conditions-example.html',
})
export class ConditionalValidatorsMultipleConditionsExample implements Documented {
  title = 'Multiple Conditions';
  fileName = 'conditional-validators-multiple-conditions-example';

  private readonly formBuilder = inject(FormBuilder);

  // @doc-start
  formGroup = this.formBuilder.group(
    {
      field1: new FormControl<string>(''),
      field2: new FormControl<number | undefined>(undefined),
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
            {
              formControlName: 'field2',
              testRangeMinInclusive: 1,
              testRangeMaxInclusive: 100,
            },
          ],
        }),
      ],
    },
  );
  // @doc-end
}
