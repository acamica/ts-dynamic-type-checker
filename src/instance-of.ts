import { IContract } from './type-checker';

export type IConstructor <T> = {
    new(): T;
};

export const instanceOf = <T> (constructor: IConstructor<T>): IContract<T> => x => {
    if (!(x instanceof constructor)) {
        throw new TypeError(
            `An instance of ${constructor.name} was expected, but ${typeof x} was found (with value "${x}").`
        );
    }
    return x;
};
