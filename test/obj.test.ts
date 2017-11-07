import { obj } from '../src/type-checker';

describe('`obj` contract', () => {
    it('`obj(x)` returns `x` when it is a object', () => {
        const obj1 = {};
        const obj2 = { foo: 'bar', baz: 2 };
        expect(obj(obj1)).toBe(obj1);
        expect(obj(obj2)).toBe(obj2);
    });

    it('`obj(x)` throws TypeError if `x` is not a object', () => {
        expect(() => obj(9 as any)).toThrowError(TypeError);
        expect(() => obj('foo' as any)).toThrowError(TypeError);
        expect(() => obj(false as any)).toThrowError(TypeError);
        expect(() => obj(undefined as any)).toThrowError(TypeError);
    });
});
