import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'functionTransformPipe'
})
export class FTransformPipe implements PipeTransform {
  transform<T, R>(array: T[], func: (obj: T) => R): R[] {
    if (!array || array.length === 0) {
      return [];
    }

    return array.map(el => func(el));
  }
}
