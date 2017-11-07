import { IContract } from './contract';
import { arr } from './arr';

export const arrOf = <T>(contract: IContract<T>): IContract<T[]> => xs => {
    arr(xs);
    return [].map.call(xs, contract);
};
