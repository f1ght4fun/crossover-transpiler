import { FTransformPipe } from './ftransform.pipe';

describe('TruncatePipe', () => {
  let pipe: FTransformPipe;

  beforeEach(() => {
    pipe = new FTransformPipe();
  });

  describe('Functions', () => {
    describe('transform', () => {
      it('create an instance', () => {
        expect(pipe).toBeTruthy();
      });

      it('Transform function should return correct value when array undefined', () => {
        expect(pipe.transform(undefined, obj => obj)).toEqual([]);
      });

      it('Transform function should return correct value when array empty', () => {
        expect(pipe.transform([], obj => obj)).toEqual([]);
      });

      it('Transform function should return correct value when array has elements but they do not have required prop', () => {
        expect(
          pipe.transform<Partial<{ key: number; value: string }>, Partial<{ key: number; val: string }>>(
            [
              { key: 1, value: 'banana' },
              { key: 2, value: 'banana' }
            ],
            obj => ({ key: obj.key, val: obj.value })
          )
        ).toEqual([
          { key: 1, val: 'banana' },
          { key: 2, val: 'banana' }
        ]);
      });
    });
  });
});
