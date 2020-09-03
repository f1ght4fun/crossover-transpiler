import { DictTransformPipe } from './dictionary.pipe';

describe('TruncatePipe', () => {
  let pipe: DictTransformPipe;

  beforeEach(() => {
    pipe = new DictTransformPipe();
  });

  describe('Functions', () => {
    describe('transform', () => {
      it('create an instance', () => {
        expect(pipe).toBeTruthy();
      });

      it('Transform function should return correct value when array undefined', () => {
        expect(pipe.transform<Partial<{ key: number; value: string }>>(undefined, 'agent_id')).toEqual({});
      });

      it('Transform function should return correct value when array empty', () => {
        expect(pipe.transform<Partial<{ key: number; value: string }>>([], 'agent_id')).toEqual({});
      });

      it('Transform function should return correct value when array has elements but they do not have required prop', () => {
        expect(
          pipe.transform<Partial<{ key: number; value: string }>>(
            [
              { key: 1, value: 'banana' },
              { key: 2, value: 'banana' }
            ],
            'agent_id'
          )
        ).toEqual({
          'agent_id-0': { key: 1, value: 'banana' },
          'agent_id-1': { key: 2, value: 'banana' }
        });
      });

      it('Transform function should return correct value when array has elements but they do not have required prop', () => {
        expect(
          pipe.transform<Partial<{ key: number; value: string }>>(
            [
              { key: 1, value: 'banana' },
              { key: 2, value: 'banana' }
            ],
            'key'
          )
        ).toEqual({
          1: { key: 1, value: 'banana' },
          2: { key: 2, value: 'banana' }
        });
      });
    });
  });
});
