export const nil = (x: null) => {
    if (x !== null) {
        throw new TypeError(
            `null expected, but ${typeof x} was found (with value "${x}").`
        );
    }
    return x;
};
