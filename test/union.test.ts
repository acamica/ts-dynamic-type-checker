import { union, str, num } from '../src/type-checker';

describe('`union` contract builder', () => {
    const unionStrNum = union(str, num);
    it('`union(str, num)(x)` returns `x` when it is a string', () => {
        expect(unionStrNum('a')).toBe('a');
    });

    it('`union(str, num)(x)` returns `x` when it is a number', () => {
        expect(unionStrNum(3)).toBe(3);
    });

    it('`union(str, num)(x)` throws TypeError if `x` is not a number nor a string', () => {
        expect(() => unionStrNum(true as any)).toThrowError(TypeError);
    });

    it('`union(str, num)(x)` throws TypeError that should have a general message', () => {
        expect(() => unionStrNum(true as any)).toThrowError('Expected value to match to any of the contracts, but it didn\'t');
    });

    it('`union(str, num)(x)` throws TypeError that refers to actual type', () => {
        expect(() => unionStrNum(true as any)).toThrowError('boolean');
    });

    it('`union(str, num)(x)` throws TypeError that includes subcontract errors', () => {
        expect(() => unionStrNum(true as any)).toThrowError('string');
        expect(() => unionStrNum(true as any)).toThrowError('number');
    });

    it('`union(ContractMap)(x)` does not change thrown error if it is not a TypeError', () => {
        const unionThatThrowsSyntaxError = union(
            str,
            x => {
                throw SyntaxError('Just fooling around with errors');
            }
        );

        expect(() =>
            unionThatThrowsSyntaxError('hello' as any)
        ).toThrowError(SyntaxError);
    });
});
