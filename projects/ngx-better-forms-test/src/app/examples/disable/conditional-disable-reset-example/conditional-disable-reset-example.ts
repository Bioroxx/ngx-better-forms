// @documented
import { Component, inject } from '@angular/core';
import { Documented } from '../../../core/interface/documented';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { BetterDisable } from '../../../../../../ngx-better-forms/src/lib/ngx-better-forms-disable';
import { ExampleCard } from '../../../core/component/example-card/example-card';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-conditional-disable-reset-example',
  imports: [ExampleCard, ReactiveFormsModule, InputText],
  templateUrl: './conditional-disable-reset-example.html',
})
export class ConditionalDisableResetExample implements Documented {
  title = 'Reset';
  fileName = 'conditional-disable-reset-example';

  private readonly formBuilder = inject(FormBuilder);

  // @doc-start
  formGroup = this.formBuilder.group(
    {
      field1: new FormControl<string>(''),
      target: new FormControl<string>(''),
    },
    {
      validators: [
        BetterDisable.conditionalDisable({
          targetControlPath: 'target',
          conditions: [
            {
              controlPath: 'field1',
              testValues: ['a', 'b'],
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
