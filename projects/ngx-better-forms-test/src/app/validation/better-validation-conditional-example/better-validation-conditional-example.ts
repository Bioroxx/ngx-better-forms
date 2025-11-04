// @documented
import { Component, inject } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { Panel } from 'primeng/panel';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BetterValidation, ConditionMode } from '../../../../../ngx-better-forms/src/public-api';
import { Divider } from 'primeng/divider';
import { Message } from 'primeng/message';

import { FormatErrorsPipe } from '../../core/pipe/format-errors-pipe';
import { CodeSnippetExample } from '../../core/component/code-snippet-example/code-snippet-example';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { Documented } from '../../core/interface/documented';

@Component({
  selector: 'app-better-validation-documentation',
  imports: [
    InputText,
    Panel,
    ReactiveFormsModule,
    Divider,
    Message,
    FormatErrorsPipe,
    CodeSnippetExample,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  ],
  templateUrl: './better-validation-conditional-example.html',
})
export class BetterValidationConditionalExample implements Documented {
  fileName = 'better-validation-conditional-example';

  private readonly formBuilder = inject(FormBuilder);

  // @doc-start
  formGroup = this.formBuilder.group(
    {
      field1: new FormControl<string>(''),
      field2: new FormControl<string>(''),
    },
    {
      validators: [
        BetterValidation.conditionalValidators({
          targetControlName: 'field2',
          targetValidators: [Validators.required],
          conditions: [
            {
              formControlName: 'field1',
              test: ['a', 'b'],
              mode: ConditionMode.INCLUDES,
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
