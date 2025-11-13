import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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
import { DocumentedComponent } from './core/interface/documented';
import { DocExample } from './core/directives/doc-example.directive';
import { SignalFormsConditionalSchemaBasicExample } from './examples/signal-forms/validation/signal-forms-conditional-schema-basic-example/signal-forms-conditional-schema-basic-example';

export interface DocumentationSection {
  sectionId: string;
  sectionTitle: string;
  docExamples: DocumentedComponent[];
}

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, DocExample],
  templateUrl: './app.html',
})
export class App implements AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  documentation: DocumentationSection[] = [
    {
      sectionId: 'conditional-validators',
      sectionTitle: 'Conditional Validators',
      docExamples: [
        {
          id: 'conditional-validators-basic-example',
          title: 'Basic',
          component: ConditionalValidatorsBasicExample,
        },
        {
          id: 'conditional-validators-conditions-mode-example',
          title: 'Conditions Mode',
          component: ConditionalValidatorsConditionModeExample,
        },
        {
          id: 'conditional-validators-multiple-conditions-example',
          title: 'Multiple Conditions',
          component: ConditionalValidatorsMultipleConditionsExample,
        },
        {
          id: 'conditional-validators-property-path-example',
          title: 'Property Path',
          component: ConditionalValidatorsPropertyPathExample,
        },
        {
          id: 'conditional-validators-markasdirty-example',
          title: 'Mark As Dirty',
          component: ConditionalValidatorsMarkasdirtyExample,
        },
        {
          id: 'conditional-validators-callback-example',
          title: 'Callback',
          component: ConditionalValidatorsCallbackExample,
        },
      ],
    },
    {
      sectionId: 'conditional-disable',
      sectionTitle: 'Conditional Disable',
      docExamples: [
        {
          id: 'conditional-validators-basic-example',
          title: 'Basic',
          component: ConditionalDisableBasicExample,
        },
        {
          id: 'conditional-validators-reset-example',
          title: 'Reset',
          component: ConditionalDisableResetExample,
        },
        {
          id: 'conditional-validators-callback-example',
          title: 'Callback',
          component: ConditionalDisableCallbackExample,
        },
      ],
    },
    {
      sectionId: 'conditional-schema',
      sectionTitle: 'Conditional Schema',
      docExamples: [
        {
          id: 'signal-forms-conditional-schema-basic-example',
          title: 'Basic',
          component: SignalFormsConditionalSchemaBasicExample,
        },
      ],
    },
  ];

  sections = [
    { id: 'conditional-validators', title: 'Conditional Validators' },
    { id: 'conditional-disable', title: 'Conditional Disable' },
    { id: 'signal-forms-conditional-schema', title: 'Conditional Schema' },
  ];

  activeSection: string | null = null;

  ngAfterViewInit() {
    const container = this.scrollContainer.nativeElement;
    const options = {
      root: container,
      threshold: 0.1, // trigger when 30% visible
      //rootMargin: '-200px 0px 0px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.id;
          console.log('active section:', this.activeSection);
        }
      });
    }, options);

    this.sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) {
        observer.observe(el);
      }
    });
  }

  scrollTo(sectionId: string): void {
    const container = this.scrollContainer.nativeElement;
    const element = container.querySelector(`#${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
