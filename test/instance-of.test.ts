import { instanceOf } from '../src/type-checker';
// TODO
/**
 * arrOf typings
 */
describe('`instanceOf` contract builder', () => {
    class Foo {}

    class Bar {}

    const instanceOfFooContract = instanceOf(Foo);
    
    it('`instanceOf(Foo)(x)` returns `x` when `x` is an instance of Foo', () => {
        const foo = new Foo();
        expect(instanceOfFooContract(foo)).toEqual(foo);
    });

    it('`instanceOf(Foo)(x)` throws TypeError if `x` is not instance of Foo', () => {
        expect(() => instanceOfFooContract(new Bar() as any)).toThrowError(TypeError);
        expect(() => instanceOfFooContract('d' as any)).toThrowError(TypeError);
        expect(() => instanceOfFooContract(9 as any)).toThrowError(TypeError);
        expect(() => instanceOfFooContract([1, 2, 3] as any)).toThrowError(TypeError);
        expect(() => instanceOfFooContract({} as any)).toThrowError(TypeError);
        expect(() => instanceOfFooContract(undefined as any)).toThrowError(TypeError);
        expect(() => instanceOfFooContract(null as any)).toThrowError(TypeError);
    });
});
