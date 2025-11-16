// @documented
import { Component, inject } from '@angular/core';
import { ExampleCard } from '../../../../core/component/example-card/example-card';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { BetterDisable } from '@ngx-better-forms/better-forms/reactive';
import { Documented } from '../../../../core/interface/documented';

@Component({
  selector: 'app-conditional-disable-callback-example',
  imports: [ExampleCard, ReactiveFormsModule],
  templateUrl: './conditional-disable-callback-example.html',
})
export class ConditionalDisableCallbackExample extends Documented {
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
            enableCallback: () => alert('Target field enabled!'),
            disableCallback: () => alert('Target field disabled!'),
          },
        }),
      ],
    },
  );
  // @doc-end
}
