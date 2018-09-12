import {IContract} from './contract';
import {index} from './index';

export function indexOf<K>(base : IContract<K>) : IContract<{[key : string] : K}> {
    return <T extends {[key : string] : K}>(x : T) : T => {
        index(x);
        Object.values(x).forEach(v => base(v));
        return x;
    } 
}