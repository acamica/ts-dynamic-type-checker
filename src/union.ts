import { IContract } from "./contract";


export function union <A> (a: IContract<A>): IContract<A>;
export function union <A, B> (a: IContract<A>, b: IContract<B>): IContract<A | B>;
export function union <A, B, C> (a: IContract<A>, b: IContract<B>, c: IContract<C>): IContract<A | B | C>;
export function union <A, B, C, D> (a: IContract<A>, b: IContract<B>, c: IContract<C>, D: IContract<D>): IContract<A | B | C | D>;
export function union <A, B, C, D, E> (a: IContract<A>, b: IContract<B>, c: IContract<C>, D: IContract<D>, e: IContract<E>): IContract<A | B | C | D | E>;
export function union <A, B, C, D, E, F> (a: IContract<A>, b: IContract<B>, c: IContract<C>, D: IContract<D>, e: IContract<E>, f: IContract<F>): IContract<A | B | C | D | E | F>;
export function union <A, B, C, D, E, F, G> (a: IContract<A>, b: IContract<B>, c: IContract<C>, D: IContract<D>, e: IContract<E>, f: IContract<F>, g: IContract<G>): IContract<A | B | C | D | E | F | G>;
export function union <A, B, C, D, E, F, G, H> (a: IContract<A>, b: IContract<B>, c: IContract<C>, D: IContract<D>, e: IContract<E>, f: IContract<F>, g: IContract<G>, h: IContract<H>): IContract<A | B | C | D | E | F | G | H>;
export function union <A, B, C, D, E, F, G, H, I> (a: IContract<A>, b: IContract<B>, c: IContract<C>, D: IContract<D>, e: IContract<E>, f: IContract<F>, g: IContract<G>, h: IContract<H>, i: IContract<I>): IContract<A | B | C | D | E | F | G | H | I>;
export function union <A, B, C, D, E, F, G, H, I, J> (a: IContract<A>, b: IContract<B>, c: IContract<C>, D: IContract<D>, e: IContract<E>, f: IContract<F>, g: IContract<G>, h: IContract<H>, i: IContract<I>, j: IContract<J>): IContract<A | B | C | D | E | F | G | H | I | J>;

export function union (...contracts: IContract<any>[]): IContract<any> {
    const getContractErrors = (value: any) =>
        contracts.map(aContract => {
            try {
                aContract(value);
            }
            catch (err) {
                return err.toString();
            }
        });

    return (value: any) => {
        const match = contracts.reduce((match, aContract) => {
            try {
                aContract(value);
                return true;
            }
            catch (err) {
                if (err instanceof TypeError) {
                    return match || false;
                }
                else {
                    throw err;
                }
            }
        }, false);

        if (!match) {
            throw new TypeError(`Expected value to match to any of the contracts, but it didn't: ${getContractErrors(value).join('\n')}`);
        }
        return value;
    };
}
