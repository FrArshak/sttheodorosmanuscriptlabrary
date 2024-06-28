import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, maxLength: number): string {
    if (!value) {
      return '';
    }
    return value.length > maxLength ? value.substr(0, maxLength) + '...' : value;
  }
}
