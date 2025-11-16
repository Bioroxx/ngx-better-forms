import { Type } from '@angular/core';

export class Documented {
  id = '';
  title = '';
}

export interface DocumentedComponent {
  id: string;
  title: string;
  component: Type<Documented>;
}
