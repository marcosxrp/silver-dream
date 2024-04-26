// pipe to round down the products values to clean the template

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundDown',
  standalone: true
})
export class RoundDownPipe implements PipeTransform {

  transform(value: number): number {
    return Math.floor(value);
  }

}
