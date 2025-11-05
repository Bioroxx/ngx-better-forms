import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnippetService {
  private readonly httpClient = inject(HttpClient);

  getHTMLSnippet(name: string): Observable<string> {
    const path = `./code-examples/${name}.html.txt`;
    return this.httpClient.get(path, { responseType: 'text' });
  }

  getTSSnippet(name: string): Observable<string> {
    const path = `./code-examples/${name}.ts.txt`;
    return this.httpClient.get(path, { responseType: 'text' });
  }
}
