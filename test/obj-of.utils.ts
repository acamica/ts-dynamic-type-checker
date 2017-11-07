import { str, num, bool } from '../src/type-checker';
import { IContract } from '../src/contract';
import { IMapOfContracts } from '../src/obj-of';

type IObjOfFn = <T> (contracts: IMapOfContracts<T>) => IContract<T>;

export const objOfTests = (objOfFn: IObjOfFn, objOfFnName: string) => {
    const objContract = objOfFn({
        foo: str,
        bar: num
    });

    it('`' + objOfFnName + '(ContractMap)(x)` returns `x` when it is `x` corresponds with ContractMap', () => {
        const obj = {
            foo: 'baz',
            bar: 5
        };
        expect(objContract(obj)).toEqual(obj);
    });

    it('`' + objOfFnName + '(ContractMap)(x)` throws TypeError if `x` is not an object', () => {
        expect(() => objContract('d' as any)).toThrowError(TypeError);
    });

    it('`' + objOfFnName + '(ContractMap)(x)` throws TypeError if x is missing a property', () => {
        expect(() =>
            objContract({
                foo: 'baz'
            } as any)
        ).toThrowError(TypeError);
    });

    it('`' + objOfFnName + '(ContractMap)(x)` throws TypeError if any of x\'s properties does not respect its subcontract', () => {
        expect(() =>
            objContract({
                foo: 'baz',
                bar: 'this should not be a string'
            } as any)
        ).toThrowError(TypeError);
    });

    it('`' + objOfFnName + '(ContractMap)(x)` throws error with useful information when failing because of subcontract', () => {
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

    it('`' + objOfFnName + '(ContractMap)(x)` does not change thrown error if it is not TypeError', () => {
        const objContractThatThrowsOtherErrors = objOfFn({
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
};
