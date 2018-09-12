import {obj} from './obj';

// This is an alias of obj, all objects are technically string indexes at runtime
export const index = <T extends {[key : string] : any}>(x : T) : T => {
    return obj(x);
}