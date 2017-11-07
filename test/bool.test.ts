import { bool } from '../src/type-checker';

describe('`bool` contract', () => {
    it('`bool(x)` returns `x` when it is a string', () => {
        expect(bool(false)).toBe(false);
        expect(bool(true)).toBe(true);
    });

    it('`bool(x)` throws TypeError if `x` is not a boolean', () => {
        expect(() => bool(9 as any)).toThrowError(TypeError);
        expect(() => bool({} as any)).toThrowError(TypeError);
        expect(() => bool('foo' as any)).toThrowError(TypeError);
        expect(() => bool(undefined as any)).toThrowError(TypeError);
    });
});
