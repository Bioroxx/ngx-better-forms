import { Component, ContentChild, Input, signal, TemplateRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CodeSnippet } from '../code-snippet/code-snippet';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-example-card',
  imports: [ReactiveFormsModule, CodeSnippet, NgTemplateOutlet, NgClass],
  templateUrl: './example-card.html',
})
export class ExampleCard {
  @ContentChild('description') descriptionTemplate!: TemplateRef<any>;

  @Input()
  id!: string;
  @Input()
  title!: string;

  htmlTabOpen = signal(false);
  tsTabOpen = signal(true);
}
