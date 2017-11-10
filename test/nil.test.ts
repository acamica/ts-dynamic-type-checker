import { nil } from '../src/type-checker';

describe('`nil` contract', () => {
    it('`nil(x)` returns `x` when it is null', () => {
        expect(nil(null)).toBe(null);
    });

    it('`nil(x)` throws TypeError if `x` is not null', () => {
        expect(() => nil(9 as any)).toThrowError(TypeError);
        expect(() => nil({} as any)).toThrowError(TypeError);
        expect(() => nil('foo' as any)).toThrowError(TypeError);
        expect(() => nil(false as any)).toThrowError(TypeError);
        expect(() => nil(undefined as any)).toThrowError(TypeError);
    });
});
