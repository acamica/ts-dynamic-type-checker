import { optional, str } from '../src/type-checker';

describe('`optional` contract builder', () => {
    it('`optional(contract)(x)` returns `x` when it is a undefined', () => {
        expect(optional(str)(undefined)).toBe(undefined);
    });
    it('`optional(contract)(x)` returns `x` when it matches with `contract`', () => {
        expect(optional(str)('Hello world')).toBe('Hello world');
    });

    it('`undef(x)` throws TypeError if `x` is not a undefined and doesn\'t match with `contract`', () => {
        expect(() => optional(str)(9 as any)).toThrowError(TypeError);
        expect(() => optional(str)({} as any)).toThrowError(TypeError);
        expect(() => optional(str)(false as any)).toThrowError(TypeError);
    });
});
