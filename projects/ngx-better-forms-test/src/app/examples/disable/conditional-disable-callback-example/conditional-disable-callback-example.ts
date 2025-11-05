// @documented
import { Component, inject } from '@angular/core';
import { ExampleCard } from '../../../core/component/example-card/example-card';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { BetterDisable } from '../../../../../../ngx-better-forms/src/lib/ngx-better-forms-disable';
import { Documented } from '../../../core/interface/documented';

@Component({
  selector: 'app-conditional-disable-callback-example',
  imports: [ExampleCard, ReactiveFormsModule, InputText],
  templateUrl: './conditional-disable-callback-example.html',
})
export class ConditionalDisableCallbackExample implements Documented {
  title = 'Callbacks';
  fileName = 'conditional-disable-callback-example';

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
          targetControlName: 'target',
          conditions: [
            {
              formControlName: 'field1',
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
