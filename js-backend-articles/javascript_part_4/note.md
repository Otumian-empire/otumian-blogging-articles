# JavaScript Essentials: Part 4

Previously in [JavaScript Essentials: Part 3](https://dev.to/otumianempire/javascript-essentials-part-3-5cc0), we discussed quite a lot about objects and arrays and their methods for data manipulations. In this part, we will look at:

## Destructuring

We can destructure an array and an object. The idea of destructuring has something to do with "breaking down" a value into various parts. It has to do with assignments.

Let's consider an array. We know the first item in the array is at index `0`. When we want to assign the first element in the array to a variable, usually we'd do, `variable = array[0]`.

**Example**

```js
const numbers = [1, 2, 3];

const [firstElement, secondElement, thirdElement] = number;

console.log(firstElement);
console.log(secondElement);
console.log(thirdElement);
```

We positioned the variables in the same manner as the values in the array. So in a way, it is as if we are creating an array. The above would have been:

```js
const numbers = [1, 2, 3];

const firstElement = numbers[0],
  secondElement = numbers[1],
  thirdElement = numbers[2];

// the variables could have had their own `const` keyword on different lines

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

We can extract the first and last names only.

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

Rest in JavaScript is the same as destructuring an array or object. In the array example, how would you extract the first element and not bother about the "rest"? We could use indexing. True. Then what about getting the rest of the data and not the first?

```js
const numbers = [1, 2, 3];

// destructure the first and the rest of the elements
const [firstElement, ...theRestOfTheElements] = numbers;

console.log(firstElement);
// 1
console.log(theRestOfTheElements);
// [ 2, 3 ]
```

We can do the same for an object.

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

Let's try this out. I want you to play with it and let me know what you think. Create an array variable and assign some values to it. Create another array and assign it to the previous array variable. Modify one of the values in the first array. Print out both arrays. What did you notice? Try the process with two objects. You really have to try it out else, you won't know first-hand what I am talking about and how devastating it could be.

```js
// we have the original array
const firstArray = [1, 3];

// we assign a reference (not a copy of the original to another)
const secondArray = firstArray;

// we update the first element in the original array
firstArray[0] = 5;

// log the content of both arrays
console.log({ firstArray, secondArray });
// { firstArray: [ 5, 3 ], secondArray: [ 5, 3 ] }

// we have to copy the original and assign the value to the
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

Arithmetic operators are binary operators. This means they operate on two values.

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

> `=` is different from `==` and `===`. The single equal to sign (symbol) is the assignment operator. It is used when "putting" values into a variable.

```js
// it will be in your best interest to stick to === instead of ==
const strTwo = "2";
const intTwo = 2;

// is "2" the same as 2???
// the answer is yes and no
// javascript is javascript
// yes because the values (look) are the same... they are all 'two'
// however, strictly speaking, the two values are of different types
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

The logical _and_ evaluates to `true` when both values are `true` or else `false`.

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

These are operators that work on one value.

| Operator | Description | Example  |
| :------: | :---------: | :------: |
|    +     | Unary plus  |    +a    |
|    -     | Unary minus |    -a    |
|    ++    |  Increment  |   a++    |
|    --    |  Decrement  |   a--    |
|  typeof  |   Type of   | typeof a |
|          |             |          |

`++` and `--` are the increment and decrement operators. They operate on the value and assign the result to the same variable.

```js
// when the game starts, set the life and power to the default
let attackPower = 0;
let playerLife = 5;
console.log({ playerLife, attackPower });
// { playerLife: 5, attackPower: 0 }

// when the player picks a bullet, increase the attack power
attackPower++;
// same as attackPower += 1
console.log({ attackPower });
// { attackPower: 1 }

// when the player gets shot, decrease the player's life
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

Control structures are contracts used to alter the flow of data. They can change how the data flows, either to repeat some action for a determined number of times or perform some actions based on some conditions.

### If and else statement

The `if` and `else` statement takes the form.

```js
if (/* some condition */) {
  // do some thing if the condition mentioned is true
} else {
  // do some thing else when the condition doesn't hold
}
```

The "some condition" referred to above is a boolean (conditional) expression. This or these expressions would evaluate to a truth value. When the resultant value is `true`, the body of the `if` block is executed. If not, then the body of the `else` is executed. The body (block) is found within the `{` and `}`.

> `if` and `else` can not be used as variable names.

Consider the snippet below:

```js
let pay = 30;
const RATE = 0.05;
const didOverTime = true;

// if the employee did overtime
if (didOverTime) {
  pay = pay + pay * RATE;
}

console.log(`Total take home: ${pay}`);
```

The pay is increased by some rate when the employee does overtime. What happens if the `didOverTime` is `false`? Try it out. Set the `didOverTime` to `false`.

Now, we can choose to do something else when the employee doesn't do overtime. We can be the wicked employer and make a profit by reducing their pay. We can do this by adding some code to the `else` block.

```js
let pay = 30;
const RATE = 0.05;
const didOverTime = true;

// if the employee did overtime
if (didOverTime) {
  pay = pay + pay * RATE;
} else {
  pay = pay - pay * RATE;
}

console.log(`Total take home: ${pay}`);
```

We can rewrite this snippet in a simple way, improving it.

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

> It is not compulsory to always add the else block. You can smartly write your program so that you will not need to add an `else` block. Know that there are cases that this works well and there are cases that it doesn't. You need to be calculative here.

Let's look at the `FizzBuzz` program. So, the _fizz buzz_ is a program that say:

- "fizz" when a value is a multiple of 3
- "buzz" when a value is a multiple of 5
- "fizzbuzz" when a value is a multiple of 3 and 5

The idea here is to demonstrate that we can change the `if` and `else` statements to have the `else if` statement.

In this program, we would use these operators `===` and `%`. `===` is to check if the values are equal to and `%` for the remainder.

This is a pseudocode.

```txt
if the given number is a multiple of 3
 print "fizz"
else if the given number is a multiple of 5
 print "buzz"
else if the given number is a multiple of 3 and 5
 print "fizzbuzz"
```

Try it. Write the fizzbuzz program using the hints left in the above pseudocode. Try your solution with the given value as, 3, 6, 10, 15. You'd have a problem. Most certainly. The solution is to rearrange the if statements. I hope this helps you resolve the problem.

> It is helpful to think in pseudocode when you are having a hard time grasping how to implement a solution. Pseudocode is more a less how you are thinking about the approach to the solution rather than the code to solve the problem. It is like writing down what you are thinking about when brainstorming.

### Nested if and else statements

Well, everything is feasible. We can nest an `if` and `else` statements in another if and else statement. It is fun and not fun sometimes.

```txt
if (condition 1 is true) {
 if (condition 2 and condition 3 are true) {
 do something
 } else {
 do something
 }
} else {
 do something
}

```

Be creative and create a nested nested `if` and `else` statements. Frankly, I am not fun of nesting the `if` and `else` statements. So I find another way to do it. We will discuss short-circuiting in the future.

### Ternary operator

The ternary operator is a one-line `if` and `else` statement. It is devoid of complex logic that would span more than a line. We will modify the two `if` and `else` statements above. With the ternary operator, we reduce the `if` and `else` block to an inline expression.

```md
variable = condition ? true body : false body;
```

The `condition` is a boolean expression. _true body_ is what happens when the condition resolves to `true` and the _false body_, when `false`.

```js
let pay = 30;
const RATE = 0.05;
const didOverTime = true;

// if (didOverTime) {
//   pay = pay + pay * RATE;
// } else {
//   pay = pay - pay * RATE;
// }

// using ternary
pay = didOverTime ? pay + pay * RATE : pay - pay * RATE;
// this reads as, if didOverTime, pay = pay + pay * RATE, else pay = pay - pay * RATE
console.log(`Total take home: ${pay}`);
// Total take home: 31.5
```

Use the ternary operator for the second example.

> It is cool to be smart in programming but there are times that smartness can be dangerous not just to you but also to the company and team. So be smart and wise. The fact that it is feasible doesn't mean doing it.

### Switch statement

There is another conditional statement known as the switch statement. Usually, it is preferred a chain of `if` and `else` statements. The basic form of a switch statement is:

```txt
switch someValue {
 case someValue is thisValueA:
 do something
 break;
 case someValue is thisValueB:
 do something
 break;
 ...
 default:
 do something by default if none of these values matches the someValue
}
```

> The `...` means a bunch of other cases.

The above is the same as:

```txt
if (someValue is thisValueA) {
 do something
} else if (someValue is thisValueB) {
 do something
}
...
else {
 do something by default if none of these values matches the someValue
}
```

> `...` is a bunch of `else if` statements. And it is for this reason that we'd use a switch in place of `if` and `else` statements.

Here is an example of a switch statement

```js
const day = "Friday";

switch (day) {
  case "Monday":
    console.log("Today is Monday");
    break;
  case "Tuesday":
    console.log("Today is Tuesday");
    break;
  case "Wednesday":
    console.log("Today is Wednesday");
    break;
  default:
    console.log("Unknown day");
}
```

What do you think is the output? Rewrite the above `switch` statement program, using `if` and `else`.

> The `break` keyword jumps (moves) the execution (data) flow out of the switch statement. What happens when you don't put a break? Try it out.

> `switch`, `case` and `break` are Javascript keywords so don't use them as variable names.

### For loop

It is usually the case that we replay our favourite song over and over again. We put the song in a loop. The song is repeatedly played. This same idea applies to loops in programming. One of the looping contrast in JavaScript is the `for` loop. `for` is a keyword so don't use it as a variable. At this point, when you hear something is a keyword, it means don't use it as a variable name.

The fundamental reason to use a looping statement is to execute some logic repeatedly. This can be a finite number of times or based on a condition. For loop is usually used when the number of repetitions needed is known (finite).

We can use the loops to:

- go over (iterate) an array or a string. Eg: find the number of characters in a string array
- execute some logic for some known number of times. Eg: console log "Hello world" 10 times

We would be looking at three kinds of for loops here.

- Traditional for loop which is of the form

```js
for (init; condition; step) {
  // some logic
}
```

- `init` tells you where the loop starts
- `condition` is a boolean expression that indicates when the loop should be terminated (stopped). The body of the loop gets executed as far as the condition holds
- `step` indicates how the looping condition is influenced. Sometimes it is an increment and at times it's a decrement.

**Example**

```js
// console log numbers between 0 and 10
for (let loopingNumber = 0; loopingNumber <= 10; loopingNumber++) {
  console.log(loopingNumber);
}
```

- For this example that we have for the for loop and in the header of the for loop, we set the initial value of the `loopingNumber` to `0`.
- Then the _condition_ is that, as far as the `loopingNumber` is less than or equal to `10`, execute the body of the for loop.
- The `loopingNumber` is then incremented as the next _step_ in this case. `loopingNumber++` is the same as `loopingNumber += 1` or `loopingNumber = loopingNumber + 1`.
- So as far as the `loopingNumber` is less than 10, the condition holds and the `console.log(loopingNumber);` is executed.

> Usually in the _condition_ part, the comparison operators are used there. What happens when we use `<` instead of `<=`? Try it out. Be curious.

**Example**

```js
// let's loop through the array and print out the number of characters in it
const daysOfTheWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

for (let index = 0; index < daysOfTheWeek.length; index += 1) {
  console.log(
    `${daysOfTheWeek[index]} at index ${index} has ${daysOfTheWeek[index].length} characters`
  );
}
// Monday at index 0 has 6 characters
// Tuesday at index 1 has 7 characters
// Wednesday at index 2 has 9 characters
// Thursday at index 3 has 8 characters
// Friday at index 4 has 6 characters
// Saturday at index 5 has 8 characters
// Sunday at index 6 has 6 characters
```

- Since we wanted to start from the first element in the array, we set the `index` variable to `0` knowing that array indexing starts at `0` in Javascript
- We can alter the initial value of `index` to start from another element.
- In the _condition_, we check if the `index` is less than the array size, `daysOfTheWeek.length`

- For-In Loop is of the form

```js
for (variable in object) {
  // some logic
}
```

The _for in_ loop is used on arrays (anything that can be iterated) and objects. The variable, in the case of an array-like value, is the index and for an object is the key.

Let's rewrite the above `for` loop, using `for in` loop.

```js
const daysOfTheWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

for (const index in daysOfTheWeek) {
  console.log(
    `${daysOfTheWeek[index]} at index ${index} has ${daysOfTheWeek[index].length} characters`
  );
}
// Monday at index 0 has 6 characters
// Tuesday at index 1 has 7 characters
// Wednesday at index 2 has 9 characters
// Thursday at index 3 has 8 characters
// Friday at index 4 has 6 characters
// Saturday at index 5 has 8 characters
// Sunday at index 6 has 6 characters
```

Let's implement one for an object.

```js
const profile = {
  firstName: "John",
  lastName: "Doe",
  job: "Debugger",
  isBald: false,
  numberOfPets: 3,
};

for (const key in profile) {
  console.log(`${key} points to, ${profile[key]}`);
}
// firstName points to, John
// lastName points to, Doe
// job points to, Debugger
// isBald points to, false
// numberOfPets points to, 3
```

- For-Of Loop is of the form

```js
for (variable of collection) {
  // some logic
}
```

The _for of_ loop is used on collections, iterables, like an array, strings, etc. The variable, in this case, points to the element itself.

Let's rewrite the above `for` loop, using `for of` loop.

```js
for (const element of daysOfTheWeek) {
  console.log(
    `${element} at index ${daysOfTheWeek.indexOf(element)} has ${
      element.length
    } characters`
  );
}
// Monday at index 0 has 6 characters
// Tuesday at index 1 has 7 characters
// Wednesday at index 2 has 9 characters
// Thursday at index 3 has 8 characters
// Friday at index 4 has 6 characters
// Saturday at index 5 has 8 characters
// Sunday at index 6 has 6 characters
```

This will not work on an object because an object is not an iterable. If you want to do this on an object, you'd have to manipulate it. `Object.keys(yourObject)` or `Object.values(yourObject)` to get the keys or values as an array.

For the last example of loops, let's look into the past. One of the validation rules for an email was to have a single '@' sign. So we'd write a program that counts the number of '@' signs in an email. The idea will be the same for a list of emails so I will go with the list of emails and also use that as an opportunity to use nested for loops.

**Example**

```js
const emailList = [
  "johndoes@email.com",
  "pancake@email@ny.com",
  "tenya123@@email@ny.com",
];

const AT_SIGN = "@";

const validation = {};

for (const email of emailList) {
  let numberOfAtSigns = 0;

  for (const character of email) {
    if (character === AT_SIGN) {
      numberOfAtSigns++;
    }
  }

  validation[email] = numberOfAtSigns;
}

console.log(validation);
// {
//     'johndoes@email.com': 1,
//     'pancake@email@ny.com': 2,
//     'tenya123@@email@ny.com': 3
// }
```

Does this need an explanation? What do you think it does? If something is new, it the nested for loops. Look at this new example. There are several ways to write this. So try the others you can think of.

```js
const emailList = [
  "johndoes@email.com",
  "pancake@email@ny.com",
  "tenya123@@email@ny.com",
];

const AT_SIGN = "@";

const validation = emailList.map((email) => {
  const emailPartsLength = email.split(AT_SIGN).length;
  const numberOfAtSigns = emailPartsLength > 1 ? emailPartsLength - 1 : 0;

  // we can replace the above two lines with
  // const numberOfAtSigns = email.split("").filter(character => character === AT_SIGN).length
  // why didn't we split at '@'

  return { [email]: numberOfAtSigns };
});

console.log(validation);
// [
//     { 'johndoes@email.com': 1 },
//     { 'pancake@email@ny.com': 2 },
//     { 'tenya123@@email@ny.com': 3 }
// ]
```

There a keywords known as `break` and `continue` used in for loops. So let's say based on some conditions, you want to stop the for loop at some point. Use the `break`. If you want to skip the computation on a certain element or based on some condition, you can use `continue`. The `continue` skips the current iteration and goes to the next. You can experiment with it.

### While loop

The while loop is like the for loop. However, it is used when the repetition is infinite or the termination of the loop is conditional. In general, a while loop is in the form:

```js
while (condition) {
  // do something as far as the condition is true
}
```

Let's do this for a loop using a while loop.

```js
// console log numbers between 0 and 10
for (let loopingNumber = 0; loopingNumber <= 10; loopingNumber++) {
  console.log(loopingNumber);
}
```

while loop version

```js
let loopingNumber = 0;

while (loopingNumber <= 10) {
  console.log(loopingNumber);
  loopingNumber++;
}
```

Here, the _init_ part is moved outside the header of the header and the _step_ is moved inside the body of the while loop. What remains is the condition. So as far as the condition holds, the `console.log(loopingNumber);` is executed and the looping number is incremented.

**Example**

Let's write a fizz buzz program using a while loop. In this case, we want the first "fizzbuzz" value which will be 15, a multiple of 3 and 5.

```js
let number = 1;

// as far as the number is not a fizzbuzz
while (!(number % 3 === 0 && number % 5 === 0)) {
  number++;
}

// the loop breaks when find a number that is a fizzbuzz

console.log(`The first fizzbuzz is ${number}`);
// The first fizzbuzz is 15
```

## Conclusion

So far we have updated our knowledge and arsenal. We can control the following execution using conditionals and loops. We can now write some huge programs efficiently. We will look into the password and email validation in the next part. Try writing your own validations based on what we have done so far.

We have more on javascript to discuss such as:

- Functions
- Callbacks, promises, async & await
- Next big thing
