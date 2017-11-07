import { num } from '../src/type-checker';

describe('`num` contract', () => {
    it('`num(x)` returns `x` when it is a number', () => {
        expect(num(3)).toBe(3);
        expect(num(-5)).toBe(-5);
    });

    it('`num(x)` throws TypeError if `x` is not a number', () => {
        expect(() => num('foo' as any)).toThrowError(TypeError);
        expect(() => num({} as any)).toThrowError(TypeError);
        expect(() => num(false as any)).toThrowError(TypeError);
        expect(() => num(undefined as any)).toThrowError(TypeError);
    });
});
