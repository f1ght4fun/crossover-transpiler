import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dictionaryTransformPipe'
})
export class DictTransformPipe implements PipeTransform {
  transform<T>(array: T[], prop: string): Record<string, T> {
    if (!array || array.length === 0) {
      return {};
    }

    return array.reduce((dict, val, idx) => {
      if (!!val[prop]) {
        dict[val[prop]] = val;
      } else {
        dict[prop + '-' + idx] = val;
      }

      return dict;
    }, {});
  }
}
