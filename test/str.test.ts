import { str } from '../src/type-checker';

describe('`str` contract', () => {
    it('`str(x)` returns `x` when it is a string', () => {
        expect(str('foo')).toBe('foo');
        expect(str('bar')).toBe('bar');
    });

    it('`str(x)` throws TypeError if `x` is not a string', () => {
        expect(() => str(9 as any)).toThrowError(TypeError);
        expect(() => str({} as any)).toThrowError(TypeError);
        expect(() => str(false as any)).toThrowError(TypeError);
        expect(() => str(undefined as any)).toThrowError(TypeError);
    });
});
