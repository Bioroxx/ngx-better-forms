// @documented
import { Component, inject } from '@angular/core';
import { ExampleCard } from '../../../core/component/example-card/example-card';
import { InputText } from 'primeng/inputtext';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Documented } from '../../../core/interface/documented';
import { BetterDisable } from '../../../../../../ngx-better-forms/src/lib/ngx-better-forms-disable';

@Component({
  selector: 'app-conditional-disable-basic-example',
  imports: [ExampleCard, InputText, ReactiveFormsModule],
  templateUrl: './conditional-disable-basic-example.html',
})
export class ConditionalDisableBasicExample implements Documented {
  title = 'Basic';
  fileName = 'conditional-disable-basic-example';

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
        }),
      ],
    },
  );
  // @doc-end
}
