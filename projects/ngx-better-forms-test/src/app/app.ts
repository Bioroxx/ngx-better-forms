import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BetterValidationConditionalValidatorsExample } from './examples/validation/better-validation-conditional-example/better-validation-conditional-validators-example';
import { BetterDisableConditionalExample } from './examples/disable/better-disable-conditional-example/better-disable-conditional-example';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  imports: [
    ReactiveFormsModule,
    BetterValidationConditionalValidatorsExample,
    BetterDisableConditionalExample,
    Menubar,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
    },
    {
      label: 'Features',
      icon: 'pi pi-star',
    },
    {
      label: 'Projects',
      icon: 'pi pi-search',
      items: [
        {
          label: 'Components',
          icon: 'pi pi-bolt',
        },
        {
          label: 'Blocks',
          icon: 'pi pi-server',
        },
        {
          label: 'UI Kit',
          icon: 'pi pi-pencil',
        },
        {
          label: 'Templates',
          icon: 'pi pi-palette',
          items: [
            {
              label: 'Apollo',
              icon: 'pi pi-palette',
            },
            {
              label: 'Ultima',
              icon: 'pi pi-palette',
            },
          ],
        },
      ],
    },
    {
      label: 'Contact',
      icon: 'pi pi-envelope',
    },
  ];
}
