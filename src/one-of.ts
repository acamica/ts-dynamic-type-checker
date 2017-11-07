import { IContract } from './contract';
import { memberOf } from './utils';

export type ILiteral  = string | number | boolean;

export function oneOf (): IContract<never>;

export function oneOf <
A extends ILiteral
>(v1: A): IContract<A>;

export function oneOf <
A extends ILiteral,
B extends ILiteral
>(v1: A, v2: B): IContract<A | B>;

export function oneOf <
A extends ILiteral,
B extends ILiteral,
C extends ILiteral
>(v1: A, v2: B, v3: C): IContract<A | B | C>;

export function oneOf <
A extends ILiteral,
B extends ILiteral,
C extends ILiteral,
D extends ILiteral
>(v1: A, v2: B, v3: C, v4: D): IContract<A | B | C | D>;

export function oneOf <
A extends ILiteral,
B extends ILiteral,
C extends ILiteral,
D extends ILiteral,
E extends ILiteral
>(v1: A, v2: B, v3: C,v4: D, v5: E): IContract<A | B | C | D | E>;

export function oneOf <
A extends ILiteral,
B extends ILiteral,
C extends ILiteral,
D extends ILiteral,
E extends ILiteral,
F extends ILiteral
>(v1: A, v2: B, v3: C,v4: D, v5: E, v6: F): IContract<A | B | C | D | E | F>;

export function oneOf <
A extends ILiteral,
B extends ILiteral,
C extends ILiteral,
D extends ILiteral,
E extends ILiteral,
F extends ILiteral,
G extends ILiteral
>(v1: A, v2: B, v3: C,v4: D, v5: E, v6: F, v7: G): IContract<A | B | C | D | E | F | G>;

export function oneOf <
A extends ILiteral,
B extends ILiteral,
C extends ILiteral,
D extends ILiteral,
E extends ILiteral,
F extends ILiteral,
G extends ILiteral,
H extends ILiteral
>(v1: A, v2: B, v3: C,v4: D, v5: E, v6: F, v7: G, v8: H): IContract<A | B | C | D | E | F | G | H>;

export function oneOf <
A extends ILiteral,
B extends ILiteral,
C extends ILiteral,
D extends ILiteral,
E extends ILiteral,
F extends ILiteral,
G extends ILiteral,
H extends ILiteral,
I extends ILiteral
>(v1: A, v2: B, v3: C,v4: D, v5: E, v6: F, v7: G, v8: H, v9: I): IContract<A | B | C | D | E | F | G | H | I>;

export function oneOf <
A extends ILiteral,
B extends ILiteral,
C extends ILiteral,
D extends ILiteral,
E extends ILiteral,
F extends ILiteral,
G extends ILiteral,
H extends ILiteral,
I extends ILiteral,
J extends ILiteral
>(v1: A, v2: B, v3: C,v4: D, v5: E, v6: F, v7: G, v8: H, v9: I, v10: J): IContract<A | B | C | D | E | F | G | H | I | J>;

export function oneOf <T extends ILiteral> (...validValues: T[]): IContract<T>;

export function oneOf (...validValues: any[]) {
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

