import { undef } from '../src/type-checker';

describe('`undef` contract', () => {
    it('`undef(x)` returns `x` when it is undefined', () => {
        expect(undef(undefined)).toBe(undefined);
    });

    it('`undef(x)` throws TypeError if `x` is not undefined', () => {
        expect(() => undef(9 as any)).toThrowError(TypeError);
        expect(() => undef({} as any)).toThrowError(TypeError);
        expect(() => undef('foo' as any)).toThrowError(TypeError);
        expect(() => undef(false as any)).toThrowError(TypeError);
    });
});
