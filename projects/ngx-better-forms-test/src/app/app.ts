import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConditionalValidatorsBasicExample } from './examples/validation/conditional-validators-basic-example/conditional-validators-basic-example';
import { ConditionalDisableBasicExample } from './examples/disable/conditional-disable-basic-example/conditional-disable-basic-example';
import { Menubar } from 'primeng/menubar';
import { ConditionalValidatorsMarkasdirtyExample } from './examples/validation/conditional-validators-markasdirty-example/conditional-validators-markasdirty-example';
import { ConditionalDisableResetExample } from './examples/disable/conditional-disable-reset-example/conditional-disable-reset-example';
import { ConditionalValidatorsMultipleConditionsExample } from './examples/validation/conditional-validators-multiple-conditions-example/conditional-validators-multiple-conditions-example';
import { ConditionalDisableCallbackExample } from './examples/disable/conditional-disable-callback-example/conditional-disable-callback-example';
import { ConditionalValidatorsCallbackExample } from './examples/validation/conditional-validators-callback-example/conditional-validators-callback-example';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    ConditionalValidatorsBasicExample,
    ConditionalDisableBasicExample,
    Menubar,
    ConditionalValidatorsMarkasdirtyExample,
    ConditionalDisableResetExample,
    ConditionalValidatorsMultipleConditionsExample,
    ConditionalDisableCallbackExample,
    ConditionalValidatorsCallbackExample,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
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
