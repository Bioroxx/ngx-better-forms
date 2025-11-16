import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatErrors',
})
export class FormatErrorsPipe implements PipeTransform {
  transform(errors?: unknown): string {
    if (!errors || (Array.isArray(errors) && !errors.length)) {
      return '';
    }
    return 'errors: ' + JSON.stringify(errors);
  }
}
