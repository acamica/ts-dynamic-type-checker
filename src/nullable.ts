import { IContract } from './contract';
import { union } from './union';
import { nil } from './nil';

export const nullable = <T> (contract: IContract<T>) => union(contract, nil);
