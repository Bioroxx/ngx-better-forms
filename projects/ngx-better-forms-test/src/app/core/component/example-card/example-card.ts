import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { Divider } from 'primeng/divider';
import { Panel } from 'primeng/panel';
import { ReactiveFormsModule } from '@angular/forms';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { CodeSnippet } from '../code-snippet/code-snippet';
import { NgTemplateOutlet } from '@angular/common';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-example-card',
  imports: [
    Divider,
    Panel,
    ReactiveFormsModule,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    CodeSnippet,
    NgTemplateOutlet,
    Card,
  ],
  templateUrl: './example-card.html',
})
export class ExampleCard {
  @ContentChild('description') descriptionTemplate!: TemplateRef<any>;

  @Input()
  title!: string;
  @Input()
  exampleName!: string;
}
