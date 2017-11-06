import { objOf, str, num, bool } from '../src/type-checker';

/**
 * objOf typings
 */
describe('`objOf` contract', () => {
    const objContract = objOf({
        foo: str,
        bar: num
    });

    it('`objOf(ContractMap)(x)` returns `x` when it is `x` corresponds with ContractMap', () => {
        const obj = {
            foo: 'baz',
            bar: 5
        };
        expect(objContract(obj)).toEqual(obj);
    });

    it('`objOf(ContractMap)(x)` throws TypeError if `x` is not an object', () => {
        expect(() => objContract('d' as any)).toThrowError(TypeError);
    });

    it('`objOf(ContractMap)(x)` throws TypeError if x is missing a property', () => {
        expect(() =>
            objContract({
                foo: 'baz'
            } as any)
        ).toThrowError(TypeError);
    });

    it('`objOf(ContractMap)(x)` throws TypeError if x has extra properties', () => {
        expect(() =>
            objContract({
                foo: 'baz',
                bar: 3,
                baz: undefined
            } as any)
        ).toThrowError(TypeError);
    });

    it("`objOf(ContractMap)(x)` throws TypeError if any of x's properties does not respect its subcontract", () => {
        expect(() =>
            objContract({
                foo: 'baz',
                bar: 'this should not be a string'
            } as any)
        ).toThrowError(TypeError);
    });

    it('`objOf(ContractMap)(x)` throws error with useful information when failing because of subcontract', () => {
        // Contains prop name
        expect(() =>
            objContract({
                foo: 'baz',
                bar: 'hakuna matata'
            } as any)
        ).toThrowError('[bar]');

        // The following `expect`s check the `num` contract errors
        // Contains prop value
        expect(() =>
            objContract({
                foo: 'baz',
                bar: 'hakuna matata'
            } as any)
        ).toThrowError('hakuna matata');

        // Contains actual type
        expect(() =>
            objContract({
                foo: 'baz',
                bar: 'hakuna matata'
            } as any)
        ).toThrowError('string');

        // Contains expected type
        expect(() =>
            objContract({
                foo: 'baz',
                bar: 'hakuna matata'
            } as any)
        ).toThrowError('number');
    });

    it('`objOf(ContractMap)(x)` does not change thrown error if it is not TypeError', () => {
        const objContractThatThrowsOtherErrors = objOf({
            foo: str,
            bar: x => {
                throw SyntaxError('Just fooling around with errors');
            }
        });

        expect(() =>
            objContractThatThrowsOtherErrors({
                foo: 'baz',
                bar: 3
            } as any)
        ).toThrowError(SyntaxError);
    });

    describe('Nested `objOf` contracts', () => {
        const objContract = objOf({
            nested: {
                foo: str,
                bar: num
            },
            baz: bool
        });
    
        it('`objOf(ContractMap)(x)` returns `x` when it is `x` corresponds with ContractMap', () => {
            const obj = {
                nested: {
                    foo: 'baz',
                    bar: 5
                },
                baz: true
            };
            expect(objContract(obj)).toEqual(obj);
        });
    
        it('`objOf(ContractMap)(x)` throws TypeError if `x.nested` is not an object', () => {
            expect(() => objContract({
                nested: 'd',
                baz: true
            } as any)).toThrowError(TypeError);
        });
    
        it('`objOf(ContractMap)(x)` throws TypeError if `x.nested` is missing a property', () => {
            expect(() =>
                objContract({
                nested: {
                    foo: 'baz'
                },
                baz: false
            } as any)
            ).toThrowError(TypeError);
        });
    
        it('`objOf(ContractMap)(x)` throws TypeError if `x.nested` has extra properties', () => {
            expect(() =>
                objContract({
                    nested: {
                        foo: 'baz',
                        bar: 3,
                        baz: undefined
                    },
                    baz: true
                } as any)
            ).toThrowError(TypeError);
        });
    
        it("`objOf(ContractMap)(x)` throws TypeError if any of `x.nested`'s properties does not respect its subcontract", () => {
            expect(() =>
                objContract({
                    nested: {
                        foo: 'baz',
                        bar: 'this should not be a string'
                    },
                    baz: true
                } as any)
            ).toThrowError(TypeError);
        });
    
        it('`objOf(ContractMap)(x)` throws error with useful information when failing because of x.nested\'s subcontract', () => {
            // Contains prop name (nesting is reflected)
            expect(() =>
                objContract({
                    nested: {
                        foo: 'baz',
                        bar: 'hakuna matata'    
                    },
                    baz: true
                } as any)
            ).toThrowError('[nested]: [bar]:');
    
            // The following `expect`s check the `num` contract errors
            // Contains prop value
            expect(() =>
                objContract({
                    nested: {
                        foo: 'baz',
                        bar: 'hakuna matata'    
                    },
                    baz: true
                } as any)
            ).toThrowError('hakuna matata');
    
            // Contains actual type
            expect(() =>
                objContract({
                    nested: {
                        foo: 'baz',
                        bar: 'hakuna matata'    
                    },
                    baz: true
                } as any)
            ).toThrowError('string');
    
            // Contains expected type
            expect(() =>
                objContract({
                    nested: {
                        foo: 'baz',
                        bar: 'hakuna matata'    
                    },
                    baz: true
                } as any)
            ).toThrowError('number');
        });
    });
});
