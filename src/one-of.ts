import { IContract } from './contract';
import { memberOf } from './utils';

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
