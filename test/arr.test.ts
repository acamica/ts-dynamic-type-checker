import { arr } from '../src/type-checker';

describe('`arr` contract', () => {
    it('`arr(x)` returns `x` when it is an array', () => {
        const arr1 = [];
        const arr2 = [1, 2, 3];
        expect(arr(arr1)).toBe(arr1);
        expect(arr(arr2)).toBe(arr2);
    });

    it('`arr(x)` throws TypeError if `x` is not an array', () => {
        expect(() => arr(9 as any)).toThrowError(TypeError);
        expect(() => arr({} as any)).toThrowError(TypeError);
        expect(() => arr(false as any)).toThrowError(TypeError);
        expect(() => arr(undefined as any)).toThrowError(TypeError);
    });
});
