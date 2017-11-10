export const never = (x: never) => {
    throw new TypeError(
        `This value shouldn't exist, but it does and is a ${typeof x} with value "${x}".`
    );
};
