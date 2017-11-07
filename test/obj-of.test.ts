import { objOfTests } from './obj-of.utils';
import { objOf } from '../src/type-checker';
import { str } from '../src/str';
import { num } from '../src/num';

describe('`objOf` contract builder', () => {
    objOfTests(objOf, 'objOf');
});
