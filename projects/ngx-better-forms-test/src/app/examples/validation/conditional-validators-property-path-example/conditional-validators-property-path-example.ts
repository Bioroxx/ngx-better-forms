// @documented
import { Component, inject } from '@angular/core';
import { Documented } from '../../../core/interface/documented';
import { ExampleCard } from '../../../core/component/example-card/example-card';
import { FormatErrorsPipe } from '../../../core/pipe/format-errors-pipe';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { BetterValidation } from '../../../../../../ngx-better-forms/src/lib/ngx-better-forms-validation';
import { Select } from 'primeng/select';

interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-conditional-validators-property-path-example',
  imports: [ExampleCard, FormatErrorsPipe, FormsModule, InputText, Message, ReactiveFormsModule, Select],
  templateUrl: './conditional-validators-property-path-example.html',
})
export class ConditionalValidatorsPropertyPathExample implements Documented {
  title = 'Property Path';
  fileName = 'conditional-validators-property-path-example';

  private readonly formBuilder = inject(FormBuilder);

  // @doc-start
  options: Array<Option> = [
    {
      value: 'none',
      label: 'No Validator',
    },
    {
      value: 'required',
      label: 'Validator.required',
    },
    {
      value: 'minLength',
      label: 'Validator.minLength(5)',
    },
  ];

  formGroup = this.formBuilder.group(
    {
      field1: new FormControl<Option | null>(null),
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
              propertyPath: 'value',
              testValues: ['required'],
            },
          ],
        }),
        BetterValidation.conditionalValidators({
          targetControlPath: 'target',
          targetValidators: [Validators.minLength(5)],
          conditions: [
            {
              controlPath: 'field1',
              propertyPath: 'value',
              testValues: ['minLength'],
            },
          ],
        }),
      ],
    },
  );
  // @doc-end
}
