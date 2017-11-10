import { dummy } from '../src/type-checker';

describe('`dummy` contract', () => {
    it('`dummy(x)` returns `x` given any value', () => {
        expect(dummy(false)).toBe(false);
        expect(dummy(true)).toBe(true);
        expect(dummy('Hello world')).toBe('Hello world');
        expect(dummy(1234)).toBe(1234);
        expect(dummy([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
        expect(dummy({
            foo: 'foo',
            bar: 10
        })).toEqual({
            foo: 'foo',
            bar: 10
        });
        expect(dummy(null)).toBe(null);
        expect(dummy(undefined)).toBe(undefined);
    });
});
