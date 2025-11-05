import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formatErrors',
})
export class FormatErrorsPipe implements PipeTransform {
  transform(errors: ValidationErrors): string {
    return 'errors: ' + JSON.stringify(errors);
  }
}
