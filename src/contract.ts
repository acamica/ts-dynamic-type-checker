type IType = 'string' | 'boolean' | 'object' | 'number' | 'undefined';

export type IContract <T> = (x: T) => T;

export const contract = <T>(type: IType): IContract<T> => x => {
    if (typeof x !== type) {
        throw new TypeError(
            `${type} expected, but ${typeof x} was found (with value "${x}").`
        );
    }
    return x;
};
