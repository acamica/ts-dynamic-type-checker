# TS dynamic type checker
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

TypeScript library that permorms dynamic type checking. It's useful for cases where you can't use TypeScript's static type checking (like reading a JSON object from a file or receiving data from a request).

## Installation

```bash
npm install --save ts-dynamic-type-checker
```

## Usage

The basic concept behind the library is the one of "**_contract_**". A **_contract_** is like an _identity function_ but it throws an error if the parameter is not what is expected.

For example, the `str` expects its parameter to be a `string` and will behave just like the _identity function_ if it is. But if it receives any other type, it will throw a `TypeError`:

```typescript
import { str } from 'ts-dynamic-type-checker';

str('Hello world'); // <- Returns 'Hello world'
str(8); // <- Throws a TypeError
```

Of course, you can make some more complex checks:

```typescript
import { isFruit } from 'ts-dynamic-type-checker';

const isFruit = oneOf('apple', 'banana', 'strawberry', 'orange');

// Some code where you get the variable `someFruit`...
// ...
// ...

someFruit = isFruit(someFruit); // <- Will throw a TypeError if `someFruit` has any other value than 'apple', 'banana', 'strawberry' or 'orange'
```

It's important to notice that while `str` is a **contract** itself, `oneOf` is not. `oneOf` is a function that _returns_ a **contract**. You can think of it like a _contract builder_.

There are some other functions that help you build contracts. For instance, there is `arrOf`:

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

## Features

- Inferes typings.
- Very lightweight (under 4kb without minifying).
- Expressive errors.

## API

### Types

- **`IContract`**: `<T> (x: T) -> T`: the interface is the one of the _identity function_. It throws a `TypeError` if the parameter doesn't match the expected types.
- **`IMapOfContracts`**: `<T> { P in keyof T]: IContract<T[P]> | IMapOfContracts<T[P]>; }`: It is an object that describes the _shape_ of the object you want to validate. It is used with the `objOf` function.

In the following functions specification, we will refer to functions of the form `<T> (x: T) ->` as `IContract<T>`. For instance, `IContract<boolean>` is equivalent to `(x: boolean) -> boolean`.

### Functions

- **`bool`**: `IContract<boolean>`: a `contract` that validates that the parameter is a `boolean`. It returns the parameter if it happens to be a `boolean` or throws a `TypeError` if not.
- **`num`**: `IContract<number>`: a `contract` that validates that the parameter is a `number`. It returns the parameter if it happens to be a `number` or throws a `TypeError` if not.
- **`str`**: `IContract<string>`: a `contract` that validates that the parameter is a `string`. It returns the parameter if it happens to be a `string` or throws a `TypeError` if not.
- **`undef`**: `IContract<undefined>`: a `contract` that validates that the parameter is a `undefined`. It returns the parameter if it happens to be `undefined` or throws a `TypeError` if not.
- **`arr`**: `<T> IContract<T[]>`: a `contract` that validates that the parameter is an `array` (checks with `Array.isArray` function). It returns the parameter if it happens to be an `array` or throws a `TypeError` if not.
- **`obj`**: `<T extends object> IContract<T>`: a `contract` that validates that the parameter is an `object`. It returns the parameter if it happens to be an `object` or throws a `TypeError` if not.
- **`oneOf`**: `(...string[]) -> IContract<string>`: it is used to validate _`unum` values_. You specify the valid values and it returns a `contract` that will check against them.
- **`arrOf`**: `<T> (IContract<T>) -> IContract<T[]>`: It takes a `contract` "_`C`_" as a parameter and returns another `contract` that expects an `array` of _elements_ that match _`C`_.
- **`objOf`**: `<T> (IMapOfContracts<T>) -> IContract<T>`: takes an _object_ that describes the _shape_ of the `objects` you want to validate and returns a `contract` with that validation. The `IMapOfContracts` object has `contracts` or `IMapOfContracts` as _values_.

## Credits

Made from the [`typescript-library-starter`](https://github.com/alexjoverm/typescript-library-starter).

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars1.githubusercontent.com/u/1573956?v=4" width="100px;"/><br /><sub><b>Gonzalo Gluzman</b></sub>](https://github.com/dggluz)<br />[💻](https://github.com/acamica/ts-dynamic-type-checker/commits?author=dggluz "Code") [📖](https://github.com/acamica/ts-dynamic-type-checker/commits?author=dggluz "Documentation") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!