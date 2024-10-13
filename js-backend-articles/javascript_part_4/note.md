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
|          |                     |          |

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
|          |                           |           |

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
|          |                          |         |

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

`!` is a logical operator which we will discuss shortly. `!` means not or negation. So, `!=` or `!==` is `not equal to` or `not strictly equal to` respectively. They are the negations. So in the case that a condition is supposed to be `true`, it becomes `false` and `false` when `true`. You can say that the `!`, _not_ operator flips (negates) the truthfulness of a condition.

**Logical Operators**

| Operator | Description | Example  |
| :------: | :---------: | :------: |
|    &&    | Logical and |  a && b  |
|   \|\|   | Logical or  | a \|\| b |
|    !     | Logical not |    !a    |
|          |             |          |

The Logical _not_ as mentioned above negates a truth value.

|   a   |   !a   | result |
| :---: | :----: | :----: |
| true  | !true  | false  |
| false | !false |  true  |
|       |        |        |

The logical _and_ evaluates to `true` when both values are `true` else `false`.

|   a   |   b   | a && b |
| :---: | :---: | :----: |
| true  | true  |  true  |
| true  | false | false  |
| false | true  | false  |
| false | false | false  |
|       |       |        |

The logical _or_ evaluates to `true` when at least one of the values is `true`.

|   a   |   b   | a \|\| b |
| :---: | :---: | :------: |
| true  | true  |   true   |
| true  | false |   true   |
| false | true  |   true   |
| false | false |  false   |
|       |       |          |

**Unary Operators**

These are operators that works on one value.

| Operator | Description | Example  |
| :------: | :---------: | :------: |
|    +     | Unary plus  |    +a    |
|    -     | Unary minus |    -a    |
|    ++    |  Increment  |   a++    |
|    --    |  Decrement  |   a--    |
|  typeof  |   Type of   | typeof a |
|          |             |          |

`++` and `--` are are the increment and decrement operators. They operator on the value and assign the result to the same variable.

```js
// when game starts, set the life and power to the default
let attackPower = 0;
let playerLife = 5;
console.log({ playerLife, attackPower });
// { playerLife: 5, attackPower: 0 }

// when player picks bullet, increase attack power
attackPower++;
// same as attackPower += 1
console.log({ attackPower });
// { attackPower: 1 }

// when player gets shot, decrease life
playerLife--;
// same as playerLife -= 1
console.log({ playerLife });
// { playerLife: 4 }
```

## JavaScript Operator Precedence

Computations with the operators are done in a certain. This is known as operator precedence.

- _Parentheses ()_ - Evaluate expressions inside parentheses first.
- _Exponentiation \*\*_ - Right-to-left.
- _Unary +, -, !, ++, --, typeof_ - Right-to-left.
- _Multiplication \*, /, %_ - Left-to-right.
- _Addition +, -_ - Left-to-right.
- _Relational <, >, <=, >=_ - Left-to-right.
- Equality ==, !=, ===, !== - Left-to-right.
- _Logical AND &&_ - Left-to-right.
- _Logical OR ||_ - Left-to-right.
- _Conditional ?:_ - Right-to-left.
- _Assignment =, +=, -=, \*=, /=, %= , ..._ - Right-to-left.

## Control structures (if statements, loops)

Control structures are contracts used to alter the flow of data. They can changes how the data flows, either to repeat some action for determined number of times or perform some actions based on some conditions.

### If and else statement

The `if` and `else` statement takes the form

```js
if (/* some condition */) {
  // do some thing if the condition mentioned is true
} else {
  // do some thing else when the condition doesn't hold
}
```

The "some condition" referred to in the above is a boolean (conditional) expression. This or these expressions would evaluate to a truth value. When the resultant value is `true`, the body of `if` block is executed. If not, then the body of the `else` is executed. The body (block) is found within the `{` and `}`.

> `if` and `else` can not be used as variable names.

Consider snippet below:

```js
let pay = 30;
const RATE = 0.05;
const didOverTime = true;

// if employee did overtime
if (didOverTime) {
  pay = pay + pay * RATE;
}

console.log(`Total take home: ${pay}`);
```

The pay is increase by some rate when the employee did an overtime. What happens if the `didOverTime` is `false`? Try it out. Set the `didOverTime` to `false`.

Now, we can choose to do something else when the employee didn't do over time. We can be the wicked employer and make profit by reducing their pay. We can do this by addition some code to the `else` block.

```js
let pay = 30;
const RATE = 0.05;
const didOverTime = true;

// if employee did overtime
if (didOverTime) {
  pay = pay + pay * RATE;
} else {
  pay = pay - pay * RATE;
}

console.log(`Total take home: ${pay}`);
```

We can rewrite this snippet is a simple way, improving it.

```js
let pay = 30;
const RATE = 0.05;
const didOverTime = true;

let payChange = pay * RATE;

if (didOverTime) {
  pay += payChange;
} else {
  pay -= payChange;
}

console.log(`Total take home: ${pay}`);
```

We introduced a new variable, `payChange`, which holds the amount to be added or deducted from the employee's pay based on the state (value) of the `didOverTime`.

Let's look at the `FizzBuzz` program. So, the _fizz buzz_ is a program that say:

- "fizz" when a value is a multiple of 3
- "buzz" when a value is a multiple of 5
- "fizzbuzz" when a value is a multiple of 3 and 5

The idea here is to demonstrate the we can change the `if` and `else` statement to have the `else if` statement.

In this program, we would use these operators `===` and `%`. `===` is to check if the values are equal to and `%` for the remainder.

This is a pseudocode.

```md
if the given number is a multiple of 3, print "fizz"
else if the given number is a multiple of 5, print "buzz"
else if the given number is a multiple of 3 and 5, print "fizzbuzz"
```

Try it. Write the fizzbuzz program using the hints left in the above pseudocode. Try your solution with the given value as, 3, 6, 10, 15. You'd have a problem. Most certainly. The solution is to rearrange the if statements. I hope this helps you resolve the problem.

> It is helpful to think in pseudocode when you are having a hard time grasping how to implement a solution. Pseudocode, is more a less how you are thinking about the approach to the solution rather the code to solve the problem. It is like writing down what you are thinking about when brainstorming.

<!--  -->

In [JavaScript Essentials: Part 2](https://dev.to/otumianempire/javascript-essentials-part-2-3k6j), we discussed writing a password and email validation.

**Password rules**
Password must:

- be six characters
- start with uppercase p, 'P'
- end with an underscore
- have uppercase q, 'Q'
- have lowercase r, 'r'
- have its fifth character as uppercase v, 'V'

This is our old password validation

**Password validation**

```js
// password_verification.js
const veryWeakPassword = "qwerty12";
console.log(`Password validation for "${veryWeakPassword}"`);

// - be six characters
const passwordLength = veryWeakPassword.length;
console.log(
  `- Password must have 6 characters => "${veryWeakPassword}" has '${passwordLength}' characters`
);
// so it is a valid password based on our rules?

// - start with uppercase p, 'P'
const startsWithPee = veryWeakPassword.startsWith("P");
console.log(
  `- Password must start with 'P' => it is ${startsWithPee} that "${veryWeakPassword}" starts with 'P'`
);

// we can also check the first character, index 0.
const firstCharacter = veryWeakPassword[0];
console.log(
  `- Password must start with 'P' => "${veryWeakPassword}" starts with '${firstCharacter}'`
);

// - end with underscore
const endsWithUnderscore = veryWeakPassword.endsWith("_");
console.log(
  `- Password must end with '_' => it is ${endsWithUnderscore} that "${veryWeakPassword}" ends with '_'`
);

// from the index concept, the last character will be at index, length of string minus one
const lastCharacter = veryWeakPassword[veryWeakPassword.length - 1];
console.log(
  `- Password must start with 'P' => "${veryWeakPassword}" ends with '${lastCharacter}'`
);

// - have uppercase q, 'Q'
const hasUppercaseQue = veryWeakPassword.includes("Q");
console.log(
  `- Password must have uppercase q, 'Q' => it is ${hasUppercaseQue} that "${veryWeakPassword}" has 'Q'`
);

// we can use the index approach
const indexOfUppercaseQue = veryWeakPassword.indexOf("Q");
console.log(
  `- Password must have uppercase q, 'Q' => 'Q' is at index '${indexOfUppercaseQue}' of "${veryWeakPassword}"`
);
// we know that index -1 means, there 'Q' was not found

// - have lowercase r, 'r'
const hasLowercaseArr = veryWeakPassword.includes("r");
console.log(
  `- Password must have lowercase r, 'r' => it is ${hasLowercaseArr} that "${veryWeakPassword}" has 'r'`
);

// we can use the index approach too
const indexOfLowercaseArr = veryWeakPassword.indexOf("r");
console.log(
  `- Password must have lowercase r, 'r' => 'r' is at index '${indexOfLowercaseArr}' of "${veryWeakPassword}"`
);
// we know that index -1 means, there 'r' was not found

// - have its fifth character as uppercase v, 'V'
// fifth character with have index = fifth position - 1 = 4
// const fifthCharacter = veryWeakPassword[4]
const fifthCharacter = veryWeakPassword.charAt(4);
console.log(
  `- Password must have its fifth character as uppercase v, 'V' => "${veryWeakPassword}" has its 5th character as '${fifthCharacter}'`
);

// using the index approach, 'V' must have an index of 4 (same index logic as above)
const indexOfVee = veryWeakPassword.indexOf("V");
console.log(
  `- Password must have its fifth character as uppercase v, 'V' => 'V' is at index '${indexOfVee}' of "${veryWeakPassword}"`
);
```

<!-- | ?: | Conditional (ternary) | condition involving a and b ? a : b | -->

- Functions
- Callbacks, promises, async & await
- Next big thing
