import { regExp } from '../src/type-checker';

describe('`regExp` contract', () => {
    it('`regExp(x)` returns `x` when it is a regular expression', () => {
        const regex1 = new RegExp('');
        const regex2 = /m/;
        expect(regExp(regex1)).toBe(regex1);
        expect(regExp(regex2)).toBe(regex2);
    });

    it('`regExp(x)` throws TypeError if `x` is not an instance of RegExp', () => {
        expect(() => regExp(9 as any)).toThrowError(TypeError);
        expect(() => regExp({} as any)).toThrowError(TypeError);
        expect(() => regExp('foo' as any)).toThrowError(TypeError);
        expect(() => regExp(new Date() as any)).toThrowError(TypeError);
        expect(() => regExp(undefined as any)).toThrowError(TypeError);
    });
});
