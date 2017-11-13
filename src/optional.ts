import { IContract } from './contract';
import { union } from './union';
import { undef } from './undef';

export const optional = <T> (contract: IContract<T>): (x?: T) => T | undefined =>
    union(contract, undef);
