import { IContract } from './contract';
import { memberOf } from './utils';
export const oneOf = <T extends string | number | boolean> (...validValues: T[]): IContract<T> => {
    return (x: any) => {
        if (!memberOf(x, validValues)) {
            throw new TypeError(
                `Expected one of: [${validValues
                    .map(x => `"${x.toString()}"`)
                    .join(', ')}], but the value "${x}" was found.`
            );
        }
        return x;
    };
}
