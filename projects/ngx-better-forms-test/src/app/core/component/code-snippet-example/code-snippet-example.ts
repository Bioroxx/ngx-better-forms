import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { SnippetService } from '../../../service/snippet.service';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-code-snippet-example',
  imports: [],
  templateUrl: './code-snippet-example.html',
})
export class CodeSnippetExample implements AfterViewInit {
  @ViewChild('pre') pre?: ElementRef;
  @ViewChild('code') code?: ElementRef<HTMLElement>;

  @Input()
  type!: 'HTML' | 'TS';

  @Input()
  exampleName!: string;

  private readonly exampleService = inject(SnippetService);

  ngAfterViewInit() {
    if (this.type === 'HTML') {
      this.exampleService
        .getHTMLSnippet(this.exampleName)
        .subscribe((snippet) => this.setCodeAndHighlight(snippet));
    } else if (this.type === 'TS') {
      this.exampleService
        .getTSSnippet(this.exampleName)
        .subscribe((snippet) => this.setCodeAndHighlight(snippet));
    }
  }

  setCodeAndHighlight(snippet: string) {
    if (this.code) {
      const el = this.code.nativeElement;
      el.innerHTML = this.escapeHtml(snippet);
      setTimeout(() => {
        if (this.pre) {
          Prism.highlightElement(this.pre.nativeElement);
        }
      }, 100);
    }
  }

  escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
