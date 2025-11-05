import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formatErrors',
})
export class FormatErrorsPipe implements PipeTransform {
  transform(errors: ValidationErrors): string {
    if (errors) {
      const keys = Object.keys(errors);
      return 'errors: {' + keys.map((k) => `${k}: ${errors[k]}`).join(', ') + '}';
    }
    return 'none';
  }
}
