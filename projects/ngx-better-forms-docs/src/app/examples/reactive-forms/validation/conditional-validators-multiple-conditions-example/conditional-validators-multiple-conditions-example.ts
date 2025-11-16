// @documented
import { Component, inject } from '@angular/core';
import { ExampleCard } from '../../../../core/component/example-card/example-card';
import { FormatErrorsPipe } from '../../../../core/pipe/format-errors-pipe';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BetterValidation } from '@ngx-better-forms/better-forms/reactive';
import { Documented } from '../../../../core/interface/documented';

@Component({
  selector: 'app-conditional-validators-multiple-conditions-example',
  imports: [ExampleCard, FormatErrorsPipe, ReactiveFormsModule],
  templateUrl: './conditional-validators-multiple-conditions-example.html',
})
export class ConditionalValidatorsMultipleConditionsExample extends Documented {
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
          targetControlPath: 'target',
          targetValidators: [Validators.required],
          conditions: [
            {
              controlPath: 'field1',
              testValues: ['a'],
            },
            {
              controlPath: 'field2',
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
