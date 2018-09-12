import { indexOf, str, num } from '../src/type-checker';

/**
 * indexOf typings
 */
describe('`indexOf` contract builder', () => {
    it('`indexOf(<string>)(x)` returns `x` when it is `x` a string index of strings', () => {
        const indexOfStringsContract = indexOf(str);
        const strIndex = {a : 'a', b : 'b', c : 'c'};
        expect(indexOfStringsContract(strIndex)).toEqual(strIndex);
    });

    it('`indexOf(<number>)(x)` returns `x` when it is `x` a string index of numbers', () => {
        const indexOfNumbersContract = indexOf(num);
        const numIndex = {a : 1, b : 2, c : 3};
        expect(indexOfNumbersContract(numIndex)).toEqual(numIndex);
    });

    it('`indexOf(<any>)(x)` throws TypeError if `x` is not an index', () => {
        const indexOfStringsContract = indexOf(str);
        expect(() => indexOfStringsContract('d' as any)).toThrowError(TypeError);
    });

    it('`indexOf(<any>)(x)` throws TypeError if `x` is an index of different type', () => {
        const indexOfStringsContract = indexOf(str);
        expect(() => indexOfStringsContract({a : 1, b : 2, c : 3} as any)).toThrowError(
            TypeError
        );
    });
});
