import { date } from '../src/type-checker';

describe('`date` contract', () => {
    it('`date(x)` returns `x` when it is a date', () => {
        const today = new Date();
        expect(date(today)).toBe(today);
    });

    it('`date(x)` throws TypeError if `x` is not an instance of Date', () => {
        expect(() => date(9 as any)).toThrowError(TypeError);
        expect(() => date({} as any)).toThrowError(TypeError);
        expect(() => date('foo' as any)).toThrowError(TypeError);
        expect(() => date(new Date().getTime() as any)).toThrowError(TypeError);
        expect(() => date(undefined as any)).toThrowError(TypeError);
    });
});
