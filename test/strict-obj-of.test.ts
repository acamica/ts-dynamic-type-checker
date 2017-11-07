import { objOfTests } from './obj-of.utils';
import { strictObjOf, num, str } from '../src/type-checker';

describe('`strictObjOf` contract builder', () => {
    objOfTests(strictObjOf, 'strictObjOf');

    it('`strictObjOf(ContractMap)(x)` throws TypeError if x has extra properties', () => {
        const objContract = strictObjOf({
            foo: str,
            bar: num
        });

        expect(() =>
            objContract({
                foo: 'baz',
                bar: 3,
                baz: undefined
            } as any)
        ).toThrowError(TypeError);
    });
});
