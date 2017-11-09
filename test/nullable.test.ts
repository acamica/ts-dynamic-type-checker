import { nullable, str, num } from '../src/type-checker';

describe('`nullable` contract builder', () => {
    it('`nullable(contract)(x)` returns `null` when it is null', () => {
        expect(nullable(str)(null)).toBe(null);
    });

    it('`nullable(contract)(x)` returns `x` when it matches with `contract`', () => {
        expect(nullable(str)('Hello world')).toBe('Hello world');
        expect(nullable(num)(6590)).toBe(6590);
    });

    it('`nullable(x)` throws TypeError if `x` is not null and doesn\'t match with `contract`', () => {
      expect(() => nullable(str)(9 as any)).toThrowError(TypeError);
      expect(() => nullable(str)({} as any)).toThrowError(TypeError);
      expect(() => nullable(str)(false as any)).toThrowError(TypeError);
      expect(() => nullable(num)('9' as any)).toThrowError(TypeError);
      expect(() => nullable(num)({} as any)).toThrowError(TypeError);
      expect(() => nullable(num)(false as any)).toThrowError(TypeError);
  });
});
