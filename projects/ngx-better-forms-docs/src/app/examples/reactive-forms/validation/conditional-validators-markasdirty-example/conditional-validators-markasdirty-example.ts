// @documented
import { Component, inject } from '@angular/core';
import { ExampleCard } from '../../../../core/component/example-card/example-card';
import { FormatErrorsPipe } from '../../../../core/pipe/format-errors-pipe';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BetterValidation } from '@ngx-better-forms/better-forms/reactive';
import { Documented } from '../../../../core/interface/documented';

@Component({
  selector: 'app-conditional-validators-markasdirty-example',
  imports: [ExampleCard, FormatErrorsPipe, ReactiveFormsModule],
  templateUrl: './conditional-validators-markasdirty-example.html',
})
export class ConditionalValidatorsMarkasdirtyExample extends Documented {
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
              testValues: ['a'],
            },
          ],
          options: {
            markAsDirty: true,
          },
        }),
      ],
    },
  );
  // @doc-end
}
