# JavaScript Essentials: Part 4

Previously in [JavaScript Essentials: Part 3](https://dev.to/otumianempire/javascript-essentials-part-3-5cc0), we discussed quite a lot about objects and arrays and their methods for data manipulations. In this part, we will look at:

## Destructuring

We can destructure an array and an object. The idea of destructuring has something to do with "breaking down" a value into various parts. It has to do with assignments.

Let's consider an array. We know the first item in the array is at index `0` and so on. When we want to assign the first element in the array to a variable, usually we'd do, `variable = array[0]`.

**Example**

```js
const numbers = [1, 2, 3];

const [firstElement, secondElement, thirdElement] = number;

console.log(firstElement);
console.log(secondElement);
console.log(thirdElement);
```

We positioned the variables in the same manner as the values are in the array. So in a way, it is as if we are creating array. The above would have been:

```js
const numbers = [1, 2, 3];

const firstElement = numbers[0],
  secondElement = numbers[1],
  thirdElement = numbers[2];

// the variables could have had their on `const` keyword on different lines

console.log(firstElement);
console.log(secondElement);
console.log(thirdElement);
```

Now, let's consider an object. When we want a value from the object, we'd usually do, `variable = object.property`.

```js
// we want the first and last name

const firstName = profile.firstName;
const lastName = profile.lastName;

console.log(`Full name: ${firstName} ${lastName}`);
```

We can extract the first and last name only.

```js
const profile = {
  firstName: "John",
  lastName: "Doe",
  job: "Debugger",
  isBald: false,
  numberOfPets: 3,
};

const { firstName, lastName } = profile;

console.log(`Full name: ${firstName} ${lastName}`);
```

We provide an alias name for the property names specified in the object as `const { property: aliasName } = object`

```js
const { firstName: anotherVarForFirstName, lastName } = profile;

console.log(`Full name: ${anotherVarForFirstName} ${lastName}`);
```

## Rest

Rest in JavaScript is the same as destructuring an array or object. In the array example, how would you extract just the first element and not bother about the "rest"? We could use indexing. True. Then what about getting the rest of the data and not the first?

```js
const numbers = [1, 2, 3];

// destructure the first and the rest of the elements
const [firstElement, ...theRestOfTheElements] = numbers;

console.log(firstElement);
// 1
console.log(theRestOfTheElements);
// [ 2, 3 ]
```

We can do the same for an object

```js
const profile = {
  firstName: "John",
  lastName: "Doe",
  job: "Debugger",
  isBald: false,
  numberOfPets: 3,
};

const { firstName, ...restOfTheProperties } = profile;

console.log(firstName);
// John
console.log(restOfTheProperties);
// { lastName: 'Doe', job: 'Debugger', isBald: false, numberOfPets: 3 }
```

Know that when destructuring using the rest approach, the rest variable must be the last in the destructuring array.

## Spreading

Let's try this out. I want you to play with it and let me know what you think. Create an array variable and assign some values to it. Create another array and assign it the previous array variable. Modify one of the values in the first array. Print out both arrays. What did you notice? Try the process with two objects. You really have to try it out else, you won't know first-hand what I am talking about and how devastating it could be.

```js
// we have the original array
const firstArray = [1, 3];

// we assign a reference (not a copy of the original to another another)
const secondArray = firstArray;

// we update the first element in the original array
firstArray[0] = 5;

// log the content of both arrays
console.log({ firstArray, secondArray });
// { firstArray: [ 5, 3 ], secondArray: [ 5, 3 ] }

// we actually have to copy the original and assign the value to the
// new array or use spreading
const thirdArray = [...firstArray];

// alter the 2nd element in the original array
firstArray[1] = -1;

// log the content of all the arrays
console.log({ firstArray, secondArray, thirdArray });
// { firstArray: [ 5, -1 ], secondArray: [ 5, -1 ], thirdArray: [ 5, 3 ] }
```

Does, `...firstArray` look familiar? It is called spreading here and not rest. Well, it solves the "copying" issue with arrays. It can be used to combine several arrays or objects into one.

```js
const personal = {
  firstName: "John",
  lastName: "Doe",
};

const physical = {
  isBald: false,
  hasFatBelly: true,
};

const employment = {
  job: "Debugger",
  salary: 257000,
};

const emotional = {
  isHappy: true,
};

const profile = { ...personal, physical, employment, emotional };
```

## Operators

We discussed the mathematical operators previously in [JavaScript Essentials: Part 1](https://dev.to/otumianempire/javascript-essentials-part-1-39c1) under the _Calculator_ section. We will expand on that topic here.

**Arithmetic Operators**

Arithmetic operators are binary operators. This means they operator on two values.

| Operator |     Description     | Example  |
| :------: | :-----------------: | :------: |
|    +     |      Addition       |  a + b   |
|    -     |     Subtraction     |  a - b   |
|    \*    |   Multiplication    |  a \* b  |
|    /     |      Division       |  a / b   |
|    %     | Modulus (remainder) |  a % b   |
|   \*\*   |   Exponentiation    | a \*\* b |

```js
// adding numbers with the plus
console.log(3 + 3); // answer = 6
console.log(1 + 2 + 4); // answer = 7

// subtraction with dash
console.log(6 - 3); // answer = 3
console.log(-16 - 3); // answer = -19

// multiplication with asterisk
console.log(5 * 3); // answer = 15
console.log(30 * 15); // answer = 450

// division with forward slash
console.log(30 / 5); // answer = 6
console.log(12.25 / 0.5); // answer = 24.5

// modulo (is the remainder after division is done)
// with the percentage sign (%)
console.log(5 % 2); // answer = 1
console.log(2 % 5); // answer = 2

// exponent with two asterisks (**)
console.log(5 ** 2); // answer = 5 * 5 = 25
```

**Assignment Operators**

| Operator |        Description        |  Example  |
| :------: | :-----------------------: | :-------: |
|    =     |        Assignment         |   a = b   |
|    +=    |    Addition assignment    |  a += b   |
|    -=    |  Subtraction assignment   |  a -= b   |
|   \*=    | Multiplication assignment |  a \*= b  |
|    /=    |    Division assignment    |  a /= b   |
|    %=    |    Modulus assignment     |  a %= b   |
|  \*\*=   | Exponentiation assignment | a \*\*= b |

```js
// assignment
let a = 10;
let b = 4;
console.log({ a, b });

// addition assignment
// a += b is the same as a = a + b
a += b;
console.log({ a, b });

// subtraction assignment
// a -= b is the same as a = a - b
a -= b;
console.log({ a, b });

// try your the rest out
```

**Comparison Operators**
Comparison operators evaluate to a boolean.

| Operator |       Description        | Example |
| :------: | :----------------------: | :-----: |
|    ==    |         Equal to         | a == b  |
|    !=    |       Not equal to       | a != b  |
|   ===    |    Strictly equal to     | a === b |
|   !==    |  Strictly not equal to   | a !== b |
|    >     |       Greater than       |  a > b  |
|    <     |        Less than         |  a < b  |
|    >=    | Greater than or equal to | a >= b  |
|    <=    |  Less than or equal to   | a <= b  |

_comparison operators_

```js
const a = 10;
const b = 4;

// equal to
console.log(`${a} is Equal to ${b} is, ${a == b}`);
console.log(`${a} is Strictly Equal to is, ${b} ${a === b}`);
```

> `=` is different from `==` and `===`. The single equal to sign (symbol) is known as the assignment operator. It is used when "putting" values into a variable.

```js
// it will be in your best interest to stick to === instead of ==
const strTwo = "2";
const intTwo = 2;

// is "2" the same as 2???
// the answer is yes and no
// javascript is javascript
// yes because the value (look) are the same... they are all 'two'
// however, strictly speaking, they two values are of different types
// strTwo is a string and intTwo is a number so if we are going to compare them,
// we have to be strict

console.log(`'${strTwo}' is Equal to ${intTwo} is, ${strTwo == intTwo}`);
console.log(
  `'${strTwo}' is Strictly Equal to is, ${intTwo} ${strTwo === intTwo}`
);
// does this give you some funny ideas to check out??
```

_Logical Operators_

| Operator | Description | Example  |
| :------: | :---------: | :------: |
|    &&    | Logical and |  a && b  |
|   \|\|   | Logical or  | a \|\| b |
|    !     | Logical not |    !a    |

_Unary Operators_

| Operator |      Description      |               Example               |
| :------: | :-------------------: | :---------------------------------: |
|    +     |      Unary plus       |                 +a                  |
|    -     |      Unary minus      |                 -a                  |
|    ++    |       Increment       |                 a++                 |
|    --    |       Decrement       |                 a--                 |
|  typeof  |        Type of        |              typeof a               |
|    ?:    | Conditional (ternary) | condition involving a and b ? a : b |

- Control structures (if statements, loops)
- Functions
- Callbacks, promises, async & await
- Next big thing
