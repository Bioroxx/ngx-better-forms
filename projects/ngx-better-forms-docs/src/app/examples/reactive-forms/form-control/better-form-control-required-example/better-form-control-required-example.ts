// @documented
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BetterFormControl, BetterValidation } from '@ngx-better-forms/better-forms';
import { FormatErrorsPipe } from '../../../../core/pipe/format-errors-pipe';
import { Documented } from '../../../../core/interface/documented';
import { ExampleCard } from '../../../../core/component/example-card/example-card';

@Component({
  selector: 'app-better-form-control-required-example',
  imports: [ReactiveFormsModule, FormatErrorsPipe, ExampleCard],
  templateUrl: './better-form-control-required-example.html',
})
export class BetterFormControlRequiredExample extends Documented {
  private readonly formBuilder = inject(FormBuilder);

  // @doc-start
  formGroup = this.formBuilder.group(
    {
      field1: new FormControl<string>(''),
      target: new BetterFormControl<string>(''),
    },
    {
      validators: [
        BetterValidation.conditionalValidators({
          targetControlPath: 'target',
          targetValidators: [Validators.required],
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

  get targetControl(): BetterFormControl<string> {
    return this.formGroup.controls.target as BetterFormControl<string>;
  }
}
