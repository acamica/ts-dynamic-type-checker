import { index } from '../src/type-checker';

describe('`index` contract', () => {
    it('`index(x)` returns `x` when it is an index', () => {
        const obj1 = {};
        const obj2 = { foo: 'bar', baz: 2 };
        expect(index(obj1)).toBe(obj1);
        expect(index(obj2)).toBe(obj2);
    });

    it('`index(x)` throws TypeError if `x` is not an index', () => {
        expect(() => index(9 as any)).toThrowError(TypeError);
        expect(() => index('foo' as any)).toThrowError(TypeError);
        expect(() => index(false as any)).toThrowError(TypeError);
        expect(() => index(undefined as any)).toThrowError(TypeError);
    });
});
