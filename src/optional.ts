import { IContract } from './contract';

export const optional = <T> (contract: IContract<T>): IContract<T | undefined> =>
(target?: T) => {
    if (typeof target === 'undefined') {
        return undefined;            
    }
    return contract(target);
};

