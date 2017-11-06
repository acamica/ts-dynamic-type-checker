type IType = 'string' | 'boolean' | 'object' | 'number' | 'undefined';
type IThrowFn = (x: string) => never;

export type IContract <T> = (x: T) => T;

const contract = <T>(type: IType): IContract<T> => x => {
    if (typeof x !== type) {
        throw new TypeError(
            `${type} expected, but ${typeof x} was found (with value "${x}").`
        );
    }
    return x;
};

const memberOf = <T>(element: T, arr: T[]) => arr.indexOf(element) !== -1;

const checkAllIncluded = (arrA: string[], arrB: string[], throwFn: IThrowFn) =>
    arrA.map(anElement => {
        if (!memberOf(anElement, arrB)) {
            throwFn(anElement);
        }
        return anElement;
    });

export type IMapOfContracts<T> = {
    [P in keyof T]: IContract<T[P]> | IMapOfContracts<T[P]> ;
};
    
export type IObjOf = <T> (contract: IMapOfContracts<T>) => (target: T) => T;
export const objOf: IObjOf = (contractsMap) => {
    contractsMap = obj(contractsMap);
    const contractKeys = Object.keys(contractsMap);

    const throwExtraProp: IThrowFn = (propName: string) => {
        throw new TypeError(`Extra property "${propName}"`);
    };
    const throwMissingProp: IThrowFn = (propName: string) => {
        throw new TypeError(`Missing property "${propName}"`);
    };

    return (target) => {
        const targetKeys = Object.keys(target);
        checkAllIncluded(targetKeys, contractKeys, throwExtraProp);
        checkAllIncluded(contractKeys, targetKeys, throwMissingProp);

        for (const aContractKey in contractsMap) {
            const aContract = contractsMap[aContractKey];
            const prop = target[aContractKey];
            try {
                if (typeof aContract === 'function') {
                    aContract(prop);                    
                }
                else {
                    objOf(aContract)(prop);
                }
            } catch (e) {
                if (!(e instanceof TypeError)) {
                    throw e;
                }
                throw new TypeError(`[${aContractKey}]: ${e.message}`);
            }
        }

        return target;
    };
};

export const arr: IContract<any[]> = xs => {
    if (!Array.isArray(xs)) {
        throw new TypeError(
            `Array expected, but ${typeof xs} was found (with value "${xs}").`
        );
    }
    return xs;
};

export const arrOf = <T>(contract: IContract<T>): IContract<T[]> => xs => {
    arr(xs);
    return [].map.call(xs, contract);
};

// enum (we can't use 'enum' identifier since it's a reserved keyword)
export const oneOf = <T>(...validValues: T[]): IContract<T> => x => {
    if (!memberOf(x, validValues)) {
        throw new TypeError(
            `Expected one of: [${validValues
                .map(x => `"${x.toString()}"`)
                .join(', ')}], but the value "${x}" was found.`
        );
    }
    return x;
};

export const bool = contract<boolean>('boolean');
export const num = contract<number>('number');
export const str = contract<string>('string');
export const obj = contract<any>('object');
export const undef = contract<undefined>('undefined');
