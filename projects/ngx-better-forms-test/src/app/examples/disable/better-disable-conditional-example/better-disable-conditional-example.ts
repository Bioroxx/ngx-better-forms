// @documented
import { Component, inject } from '@angular/core';
import { ExampleCard } from '../../../core/component/example-card/example-card';
import { InputText } from 'primeng/inputtext';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ConditionMode } from '../../../../../../ngx-better-forms/src/lib/ngx-better-forms-core';
import { Documented } from '../../../core/interface/documented';
import { BetterDisable } from '../../../../../../ngx-better-forms/src/lib/ngx-better-forms-disable';

@Component({
  selector: 'app-better-disable-conditional-example',
  imports: [ExampleCard, InputText, ReactiveFormsModule],
  templateUrl: './better-disable-conditional-example.html',
})
export class BetterDisableConditionalExample implements Documented {
  title = 'Conditional Disabling';
  fileName = 'better-disable-conditional-example';

  private readonly formBuilder = inject(FormBuilder);

  // @doc-start
  formGroup = this.formBuilder.group(
    {
      field1: new FormControl<string>(''),
      field2: new FormControl<string>(''),
    },
    {
      validators: [
        BetterDisable.conditionalDisable({
          targetControlName: 'field2',
          conditions: [
            {
              formControlName: 'field1',
              test: ['a', 'b'],
              mode: ConditionMode.INCLUDES,
            },
          ],
          options: {
            reset: true,
          },
        }),
      ],
    },
  );
  // @doc-end
}
