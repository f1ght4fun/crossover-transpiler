import { Injectable } from '@angular/core';
import { DictTransformPipe } from '../pipes/transform-pipes/dictionary.pipe';
import { FTransformPipe } from '../pipes/transform-pipes/ftransform.pipe';

@Injectable()
export class TransformService {
  constructor(private dPipe: DictTransformPipe, private fPipe: FTransformPipe) {}

  toDict = <T extends {}>(obj: T[], prop: string) => this.dPipe.transform(obj, prop);

  transform = <T extends {}, R extends {}>(obj: T[], func: (obj: T) => R) => this.fPipe.transform(obj, func);
}
