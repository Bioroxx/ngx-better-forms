// @documented
import { Component, signal } from '@angular/core';
import { ExampleCard } from '../../../../core/component/example-card/example-card';
import { Field, form, minLength, required, schema } from '@angular/forms/signals';
import { Documented } from '../../../../core/interface/documented';
import { FormatErrorsPipe } from '../../../../core/pipe/format-errors-pipe';
import { conditionalSchema } from '@ngx-better-forms/better-forms/signals';

export interface FormFields {
  field1: string;
  target: string;
}

@Component({
  selector: 'app-signal-forms-conditional-schema-basic-example',
  imports: [ExampleCard, Field, FormatErrorsPipe],
  templateUrl: './signal-forms-conditional-schema-basic-example.html',
})
export class SignalFormsConditionalSchemaBasicExample extends Documented {
  // @doc-start
  formFields = signal<FormFields>({
    field1: '',
    target: '',
  });

  signalForm = form(this.formFields, (path) => {
    conditionalSchema({
      root: path,
      schema: schema<FormFields>((ctx) => {
        required(ctx.target);
        minLength(ctx.target, 5);
      }),
      conditions: [
        {
          fieldPath: path.field1,
          testValues: ['a'],
        },
      ],
    });
  });
  // @doc-end

  debug() {
    console.log(this.signalForm.target().value());
  }
}
