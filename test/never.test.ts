import { never } from '../src/type-checker';

describe('`never` contract', () => {
    it('`never(x)` throws TypeError everytime it\'s called', () => {
        expect(() => never(9 as never)).toThrowError(TypeError);
        expect(() => never({} as never)).toThrowError(TypeError);
        expect(() => never('foo' as never)).toThrowError(TypeError);
        expect(() => never(undefined as never)).toThrowError(TypeError);
        expect(() => never(false as never)).toThrowError(TypeError);
        expect(() => never(true as never)).toThrowError(TypeError);
        expect(() => never([1, 2, 3, 4] as never)).toThrowError(TypeError);
        expect(() => never({
            foo: 'foo',
            bar: 10
        } as never)).toThrowError(TypeError);
        expect(() => never(null as never)).toThrowError(TypeError);
    });
});
