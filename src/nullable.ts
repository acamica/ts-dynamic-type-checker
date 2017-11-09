import { IContract } from './contract';

export const nullable = <T> (contract: IContract<T>): IContract<T | null> =>
(target: T | null) => {
    if (target === null) {
        return null;
    }
    return contract(target);
};
