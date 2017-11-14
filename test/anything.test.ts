import { anything } from '../src/type-checker';

describe('`anything` contract', () => {
    it('`anything(x)` returns `x` given any value', () => {
        expect(anything(false)).toBe(false);
        expect(anything(true)).toBe(true);
        expect(anything('Hello world')).toBe('Hello world');
        expect(anything(1234)).toBe(1234);
        expect(anything([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
        expect(anything({
            foo: 'foo',
            bar: 10
        })).toEqual({
            foo: 'foo',
            bar: 10
        });
        expect(anything(null)).toBe(null);
        expect(anything(undefined)).toBe(undefined);
    });
});
