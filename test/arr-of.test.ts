import { arrOf, str, num } from '../src/type-checker';

/**
 * arrOf typings
 */
describe('`arrOf` contract', () => {
    it('`arrOf(<string>)(x)` returns `x` when it is `x` an array of strings', () => {
        const arrOfStringsContract = arrOf(str);
        const strArr = ['a', 'b', 'c'];
        expect(arrOfStringsContract(strArr)).toEqual(strArr);
    });

    it('`arrOf(<number>)(x)` returns `x` when it is `x` an array of numbers', () => {
        const arrOfNumbersContract = arrOf(num);
        const numArr = [1, 2, 3];
        expect(arrOfNumbersContract(numArr)).toEqual(numArr);
    });

    it('`arrOf(<any>)(x)` throws TypeError if `x` is not an array', () => {
        const arrOfStringsContract = arrOf(str);
        expect(() => arrOfStringsContract('d' as any)).toThrowError(TypeError);
    });

    it('`arrOf(<any>)(x)` throws TypeError if `x` is an array of different type', () => {
        const arrOfStringsContract = arrOf(str);
        expect(() => arrOfStringsContract([1, 2, 3] as any)).toThrowError(
            TypeError
        );
    });
});
