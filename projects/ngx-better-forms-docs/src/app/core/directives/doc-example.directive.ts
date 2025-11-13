import { Directive, Input, OnChanges, ViewContainerRef } from '@angular/core';
import { Documented, DocumentedComponent } from '../interface/documented';

@Directive({
  selector: '[documentedComponent]',
})
export class DocExample implements OnChanges {
  @Input('documentedComponent') documentedComponent!: DocumentedComponent;

  constructor(private ref: ViewContainerRef) {}

  ngOnChanges() {
    this.ref.clear();
    if (this.documentedComponent) {
      const component = this.ref.createComponent(this.documentedComponent.component);
      const instance = component.instance as Documented;
      instance.id = this.documentedComponent.id;
      instance.title = this.documentedComponent.title;
    }
  }
}
