import { IContract } from './contract';
import { obj } from './obj';

export type IMapOfContracts<T> = {
    [P in keyof T]: IContract<T[P]>;
};

export const objOf = <T> (contractsMap: IMapOfContracts<T>): IContract<T> => {
    contractsMap = obj(contractsMap);

    return (target: T) => {
        for (const aContractKey in contractsMap) {
            const aContract = contractsMap[aContractKey];
            const prop = target[aContractKey];
            try {
                aContract(prop);                    
            } catch (e) {
                if (!(e instanceof TypeError)) {
                    throw e;
                }
                throw new TypeError(`[${aContractKey}]: ${e.message}`);
            }
        }

        return target;
    };
};
