import { IContract } from './type-checker';

export const regExp: IContract<RegExp> = (x) => {
    if (!(x instanceof RegExp)) {
        throw new TypeError(
            `A regular expression was expected, but ${typeof x} was found (with value "${x}").`
        );
    }
    return x;
};
