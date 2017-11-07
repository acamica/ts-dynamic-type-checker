export const arr = <T> (xs: T[]) => {
    if (!Array.isArray(xs)) {
        throw new TypeError(
            `Array expected, but ${typeof xs} was found (with value "${xs}").`
        );
    }
    return xs;
};
