# TS dynamic type checker
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)

**TypeScript library that permorms dynamic type checking.**

TypeScript is great. It warns you of static type errors and hence earns you lots of time and headaches. But your program probably have entrypoints (network requests, file readings, etc.) that can not be trusted completely.

For instance, supose you read some configuration from a JSON file:

```typescript
import { readFile } from 'fs';

interface IAwsConfig {
    // definitions...
};

readFile('./my-aws-config.json', { encoding: 'utf8' }, (err, awsConfigStr) => {
    if (err) {
        console.error(err);
        return;
    }
    const awsConfig: IAwsConfig = JSON.parse(awsConfigStr);
});
```

In this example, TypeScript can not prevent errors if the read JSON doesn't have an expected property. These are the cases, this library was created for.

## Features

- Inferes typings.
- Very lightweight (under 4kb without minifying).
- Expressive errors.
- Works clientside and serverside.

## Installation

```bash
npm install --save ts-dynamic-type-checker
```

## Usage

The basic concept behind the library is the one of "**_contract_**". A **_contract_** is an _identity function_ but it throws a `TypeError` if the parameter doesn't have the expected type.

For example if you pass a `string` to the `str` **contract**, it will return the same value, for other _types_ it will throw a `TypeError`:

```typescript
import { str } from 'ts-dynamic-type-checker';

str('Hello world'); // <- Returns 'Hello world'
str(8 as any); // <- Throws a TypeError
```

Check for specific values:

```typescript
import { oneOf } from 'ts-dynamic-type-checker';
import { createInterface } from 'readline';

const isFruit = oneOf('apple', 'banana', 'strawberry', 'orange');
type IFruit = 'apple' | 'banana' | 'strawberry' | 'orange';

const readLine = createInterface({
  input: process.stdin,
  output: process.stdout
});

const aFruit: IFruit = 'cheese'; // <-- static error. It will be warned by TypeScript itself.

readLine.question('Which is your favourite fruit? ', (someFruit) => {
    const favouriteFruit: IFruit = isFruit(someFruit); // <- Will throw a TypeError if `someFruit` has any other value than 'apple', 'banana', 'strawberry' or 'orange'. It's a potential dynamic error and TypeScript could not detect it.
});
```

It's important to notice that while `str` is a **contract** itself, `oneOf` is not. `oneOf` is a function that _returns_ a **contract**. You can think of it like a _contract builder_.

There are some other functions that help you build `contracts`. For instance, there is `arrOf`:

```typescript
import { arrOf, num, oneOf } from 'ts-dynamic-type-checker';

const onlyNumbers = arrOf(num);

onlyNumbers([1, 2, 3]); // <- Returns [1, 2, 3]
onlyNumbers(['Hello', 'world', 99]); // <- Throws a TypeError

const onlyHobbits = arrOf(oneOf('Frodo', 'Bilbo', 'Merry', 'Pippin', 'Sam', 'Gollum'));

onlyHobbits(['Bilbo', 'Sam']); // <- Returns the array
onlyHobbits(['Frodo', 'Pippin', 'Gandalf']); // <- Throws a TypeError
```

As you can see, `arrOf` takes a **contract** as parameter and returns another **contract**.

Last, but not least, the `objOf` function is perhaps the most usefull one:

```typescript
import { objOf, bool, str, num, arrOf } from 'ts-dynamic-type-checker';

const personValidator = objOf({
    name: str,
    age: num,
    profession: oneOf('student', 'employed', 'unemployed', 'retired'),
    address: {
        street: str,
        city: str,
        state: str,
        country: str
    },
    driving_license: bool
});

const peopleValidator = arrOf(personValidator);

// xhr function from any library you like
xhr('/URI/to/people')
    .then(peopleValidator)
    .then(people => /* The `people` variable is guaranteed to have the shape you have defined... */);
```

Notice that the `objOf` function takes an object that describes the _shape_ of the expected objects as a parameter. That object's properties are **contracts** or other objects (_nesting_).

### Type inference

It's important to mention that all the contracts are _typed_ and TypeScript with prevent errors if the parameters are incorrect and will inferere the output:

```typescript
import { str, num, objOf } from 'ts-dynamic-type-checker';

str(9); // TypeScript will error ("string expected").
const aNumber = num(9); // TypeScript will infere it's a number.

const fooBarContract = objOf({
    foo: str,
    bar: num
});

fooBarContract({
    baz: 'Hello'
}); // <- Typescript will error

const fooBar = fooBarContract({
    foo: 'Hello',
    bar: 100
}); // <- TypeScript will infer type {foo: string; bar: number;}
```

## API

### Built in `contract`s

| Function  | Type                              | Example                               | 
| --------- | --------------------------------- | ------------------------------------- |
| `bool`    | `IContract<boolean>`              | ```typescript bool(true); ```         |
| `num`     | `IContract<number>`               | ```typescript num(89); ```            |
| `str`     | `IContract<string>`               | ```typescript str('Hello world'); ``` |
| `undef`   | `IContract<undefined>`            | ```typescript undef(undefined); ```   |
| `arr`     | `<T> IContract<T[]>`              | ```typescript arr([1, 2, 3]); ```     |
| `obj`     | `<T extends object> IContract<T>` | ```typescript bool({foo: 'foo'}); ``` |

### `contract` _builders_

#### **`oneOf`**:

`(...string[]) -> IContract<string>`

It is used to validate _`unum` values_. You specify the valid values and it returns a `contract` that will check against them. Example:

```typescript
const osContract = oneOf('Linux', 'Mac OS', 'Windows', 'Other');
const os = osContract('Linux');
```

#### **`arrOf`**:

`<T> (IContract<T>) -> IContract<T[]>`

It takes a `contract` "_`C`_" as a parameter and returns another `contract` that expects an `array` of _elements_ that match _`C`_.

```typescript
const arrOfNumbersContract = arrOf(num);
const numbers = arrOfNumbersContract([1, 2, 3]);
```

#### **`objOf`**:

`<T> (IMapOfContracts<T>) -> IContract<T>`

Takes an _object_ that describes the _shape_ of the `objects` you want to validate and returns a `contract` with that validation. That _object_ has `contracts` or other similar _objects_ as _values_.

```typescript
const petContract = objOf(
    name: str,
    species: oneOf('dog', 'cat', 'golden fish', 'parrot', 'other'),
    age: number,
    gender: oneOf('male', 'female')
);
// <3
const oddy = petContract({
    name: 'Oddy',
    species: 'dog',
    age: 8,
    gender: 'female'
});
```

## Credits

Made from the [`typescript-library-starter`](https://github.com/alexjoverm/typescript-library-starter).

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars1.githubusercontent.com/u/1573956?v=4" width="100px;"/><br /><sub><b>Gonzalo Gluzman</b></sub>](https://github.com/dggluz)<br />[💻](https://github.com/acamica/ts-dynamic-type-checker/commits?author=dggluz "Code") [📖](https://github.com/acamica/ts-dynamic-type-checker/commits?author=dggluz "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/2634059?v=4" width="100px;"/><br /><sub><b>Hernan Rajchert</b></sub>](https://github.com/hrajchert)<br />[📖](https://github.com/acamica/ts-dynamic-type-checker/commits?author=hrajchert "Documentation") [💻](https://github.com/acamica/ts-dynamic-type-checker/commits?author=hrajchert "Code") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!