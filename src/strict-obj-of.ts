import { objOf, IMapOfContracts } from './obj-of';
import { IContract } from './contract';
import { memberOf } from './utils';

const requireAll = <T> (contractsMap: IMapOfContracts<T>, contract: IContract<T>) => {
    const checkAllIncluded = (arrA: string[], arrB: string[]) =>
        arrA.map(anElement => {
            if (!memberOf(anElement, arrB)) {
                throw new TypeError(`Extra property "${anElement}"`);
            }
            return anElement;
        });

    return (target: T) => {
        const targetKeys = Object.keys(target);
        checkAllIncluded(targetKeys, Object.keys(contractsMap));
        return contract(target);
    };
};

export const strictObjOf = <T> (contractMap: IMapOfContracts<T>): IContract<T> =>
    requireAll(contractMap, objOf(contractMap));
