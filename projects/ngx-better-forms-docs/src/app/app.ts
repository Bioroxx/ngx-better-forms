import { AfterViewInit, Component, ElementRef, signal, ViewChild } from '@angular/core';
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
import { NgClass } from '@angular/common';

export interface DocumentationSection {
  sectionId: string;
  sectionTitle: string;
  docExamples: DocumentedComponent[];
}

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, DocExample, NgClass],
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
          id: 'conditional-validators-condition-mode-example',
          title: 'Condition Mode',
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
          id: 'conditional-disable-basic-example',
          title: 'Basic',
          component: ConditionalDisableBasicExample,
        },
        {
          id: 'conditional-disable-reset-example',
          title: 'Reset',
          component: ConditionalDisableResetExample,
        },
        {
          id: 'conditional-disable-callback-example',
          title: 'Callback',
          component: ConditionalDisableCallbackExample,
        },
      ],
    }
  ];

  activeSectionId = signal('');

  ngAfterViewInit() {
    this.activeSectionId.set(this.documentation[0].sectionId);

    const container = this.scrollContainer.nativeElement;
    const options = {
      root: container,
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeSectionId.set(entry.target.id);
        }
      });
    }, options);

    this.documentation
      .flatMap((d) => d.docExamples)
      .forEach((doc) => {
        const el = document.getElementById(doc.id);
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
