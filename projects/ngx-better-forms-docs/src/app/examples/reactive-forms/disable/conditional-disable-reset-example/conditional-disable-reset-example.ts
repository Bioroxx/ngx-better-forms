// @documented
import { Component, inject } from '@angular/core';
import { Documented } from '../../../../core/interface/documented';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { BetterDisable } from '@ngx-better-forms/better-forms/reactive';
import { ExampleCard } from '../../../../core/component/example-card/example-card';

@Component({
  selector: 'app-conditional-disable-reset-example',
  imports: [ExampleCard, ReactiveFormsModule],
  templateUrl: './conditional-disable-reset-example.html',
})
export class ConditionalDisableResetExample extends Documented {
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
