import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConditionalValidatorsBasicExample } from './examples/reactive-forms/validation/conditional-validators-basic-example/conditional-validators-basic-example';
import { ConditionalDisableBasicExample } from './examples/reactive-forms/disable/conditional-disable-basic-example/conditional-disable-basic-example';
import { ConditionalValidatorsMarkasdirtyExample } from './examples/reactive-forms/validation/conditional-validators-markasdirty-example/conditional-validators-markasdirty-example';
import { ConditionalDisableResetExample } from './examples/reactive-forms/disable/conditional-disable-reset-example/conditional-disable-reset-example';
import { ConditionalValidatorsMultipleConditionsExample } from './examples/reactive-forms/validation/conditional-validators-multiple-conditions-example/conditional-validators-multiple-conditions-example';
import { ConditionalDisableCallbackExample } from './examples/reactive-forms/disable/conditional-disable-callback-example/conditional-disable-callback-example';
import { ConditionalValidatorsCallbackExample } from './examples/reactive-forms/validation/conditional-validators-callback-example/conditional-validators-callback-example';
import { ConditionalValidatorsConditionModeExample } from './examples/reactive-forms/validation/conditional-validators-condition-mode-example/conditional-validators-condition-mode-example';
import { ConditionalValidatorsPropertyPathExample } from './examples/reactive-forms/validation/conditional-validators-property-path-example/conditional-validators-property-path-example';
import { SignalFormsConditionalValidatorsBasicExample } from './examples/signal-forms/validation/signal-forms-conditional-validators-basic-example/signal-forms-conditional-validators-basic-example';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    ConditionalValidatorsBasicExample,
    ConditionalDisableBasicExample,
    ConditionalValidatorsMarkasdirtyExample,
    ConditionalDisableResetExample,
    ConditionalValidatorsMultipleConditionsExample,
    ConditionalDisableCallbackExample,
    ConditionalValidatorsCallbackExample,
    ConditionalValidatorsConditionModeExample,
    ConditionalValidatorsPropertyPathExample,
    SignalFormsConditionalValidatorsBasicExample,
  ],
  templateUrl: './app.html',
})
export class App {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  items = [
    {
      label: 'Ngx Better Forms',
      icon: 'pi pi-home',
    },
    {
      label: 'Documentation',
      icon: 'pi pi-star',
    },
  ];

  scrollTo(sectionId: string): void {
    const container = this.scrollContainer.nativeElement;
    const element = container.querySelector(`#${sectionId}`);
    if (element) {
      // Smooth scroll within the content container
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
