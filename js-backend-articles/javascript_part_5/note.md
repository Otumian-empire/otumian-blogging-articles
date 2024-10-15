# JavaScript Essentials: Part 5

Previously in [JavaScript Essentials: Part 4](https://dev.to/otumianempire/javascript-essentials-part-4-2ne6), We discussed `if` and `else` statements, `for` and `while` loops. In this part we will look at:

- Functions
- Callbacks, promises, async & await
- Next big thing

## Comments

Comments are great and we are now going to talk about. It is so late that you should know what a comment is. Anyway, a comment in our program is not executed. A comment is meant to document our code. There are three ways to add comments in Javascript. We have the inline, multiline and JsDoc.

**In-line**

```js
// this is a number
const numberOfBirds = 3;

// the above comment is useless since the initial value assigned to the variable
// is physically a number and the variable name also has number in it
// so use comments wisely by using proper naming
```

**Multiline**

```js
/* 
Everything in here is or will be ignored

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


*/

const emptyString = "";
```

**JsDoc**

```js
/**
 * This is a multiline comment
 *
 * But used for documentations
 */
```

> comments can be placed anywhere however be careful it is after (or at the end) of a line of code or below or above it.

## Semi-colon

In javascript, semi-colon, `;`, is not required however, it helps sometimes. There are tools that helps you with it. Semi-colon indicates the end of a statement. Good.

## Indentation

Indentations is used to arrange code for clarity and ease reading. The tab key (on the keyboard) is used in indenting. Indentations are sometimes "tabs" or "spaces". The space is usually 2 or 4. If you are using [vscode](https://code.visualstudio.com/download), you don't really have to worry.

## Examples

There were some exercises from [JavaScript Essentials: Part 4](https://dev.to/otumianempire/javascript-essentials-part-4-2ne6) which included but not limited to "fizzbuzz", password and email validation, etc. If you were to have followed my pseudocode, you'd run into some issues. I will provide a snippet that considers the order.

**fizzbuzz for a single number**

```js
const givenNumber = 3;

if (givenNumber % 3 === 0 && givenNumber % 5 === 0) {
  console.log("fizzbuzz");
} else if (givenNumber % 3 === 0) {
  console.log("fizz");
} else if (givenNumber % 5 === 0) {
  console.log("buzz");
}
```

**fizzbuzz for an array**

```js
const numbers = [3, 6, 10, 15];

for (const givenNumber of numbers) {
  if (givenNumber % 3 === 0 && givenNumber % 5 === 0) {
    console.log("fizzbuzz");
  } else if (givenNumber % 3 === 0) {
    console.log("fizz");
  } else if (givenNumber % 5 === 0) {
    console.log("buzz");
  }
}
```

**password validation**

```js
const veryWeakPassword = "PrQ1V_";
// const veryWeakPassword = "rtfy67Fg";
// const veryWeakPassword = "OlJgRc__1qwPVa";
console.log(`Password validation for "${veryWeakPassword}"`);

// - be six characters
if (veryWeakPassword.length !== 6) {
  console.log(
    `- Password must have 6 characters => "${veryWeakPassword}" has '${veryWeakPassword.length}' characters`
  );
}
// - start with uppercase p, 'P'
else if (!veryWeakPassword.startsWith("P")) {
  console.log(
    `- Password must start with 'P' => it is ${veryWeakPassword.startsWith(
      "P"
    )} that "${veryWeakPassword}" starts with 'P'`
  );
}
// - end with underscore
else if (!veryWeakPassword.endsWith("_")) {
  console.log(
    `- Password must end with '_' => it is ${veryWeakPassword.endsWith(
      "_"
    )} that "${veryWeakPassword}" ends with '_'`
  );
}
// - have uppercase q, 'Q'
else if (!veryWeakPassword.includes("Q")) {
  console.log(
    `- Password must have uppercase q, 'Q' => it is ${veryWeakPassword.includes(
      "Q"
    )} that "${veryWeakPassword}" has 'Q'`
  );
}
// - have lowercase r, 'r'
else if (!veryWeakPassword.includes("r")) {
  console.log(
    `- Password must have lowercase r, 'r' => it is ${veryWeakPassword.includes(
      "r"
    )} that "${veryWeakPassword}" has 'r'`
  );
}
// - have its fifth character as uppercase v, 'V'
// fifth character with have index = fifth position - 1 = 4
// const fifthCharacter = veryWeakPassword[4]
else if (veryWeakPassword.charAt(4) !== "V") {
  console.log(
    `- Password must have its fifth character as uppercase v, 'V' => "${veryWeakPassword}" has its 5th character as '${veryWeakPassword.charAt(
      4
    )}'`
  );
} else {
  console.log(`${veryWeakPassword} is a valid password`);
}
```

Some other solutions would be using nested `if` and `else`.

```js
// password validation
const veryWeakPassword = "PrQ1V_";
// const veryWeakPassword = "rtfy67Fg";
// const veryWeakPassword = "OlJgRc__1qwPVa";
console.log(`Password validation for "${veryWeakPassword}"`);

// - be six characters
if (veryWeakPassword.length === 6) {
  if (veryWeakPassword.startsWith("P")) {
    if (veryWeakPassword.endsWith("_")) {
      if (veryWeakPassword.includes("Q")) {
        if (veryWeakPassword.includes("r")) {
          if (veryWeakPassword.charAt(4) === "V") {
            console.log(`${veryWeakPassword} is a valid password`);
          } else {
            console.log(
              `- Password must have its fifth character as uppercase v, 'V' => "${veryWeakPassword}" has its 5th character as '${veryWeakPassword.charAt(
                4
              )}'`
            );
          }
        } else {
          console.log(
            `- Password must have lowercase r, 'r' => it is ${veryWeakPassword.includes(
              "r"
            )} that "${veryWeakPassword}" has 'r'`
          );
        }
      } else {
        console.log(
          `- Password must have uppercase q, 'Q' => it is ${veryWeakPassword.includes(
            "Q"
          )} that "${veryWeakPassword}" has 'Q'`
        );
      }
    } else {
      console.log(
        `- Password must end with '_' => it is ${veryWeakPassword.endsWith(
          "_"
        )} that "${veryWeakPassword}" ends with '_'`
      );
    }
  } else {
    console.log(
      `- Password must start with 'P' => it is ${veryWeakPassword.startsWith(
        "P"
      )} that "${veryWeakPassword}" starts with 'P'`
    );
  }
} else {
  console.log(
    `- Password must have 6 characters => "${veryWeakPassword}" has '${veryWeakPassword.length}' characters`
  );
}
```

What do you think about the two snippets? Practically the second snippet, even though it works, it is not that great.

## Functions

A function a piece of code that can be reused. Usually a function does a specific thing. One thing. It can be anything.

Let's look at the general form (structure) of a function in JavaScript

```js
function functionName(/* parameters */) {
  // do something
}
```

- `function` is a keyword and it is required when creating a function. `for` keyword is needed when you want to use a `for` loop.
- `functionName` is supposed to be the name given to the function. Idea of naming a variable applies to function.
- `/* parameters */` refers to the data that you want to pass to the function.
- `// do something` is the action or computation we desired to be performed. Functions usually return data after some processing is done. There are times it doesn't. It just updates some data and done.
- `{ // do something }` is the functions body or block

We can have a function that prints "hello world"

```js
// function to print "hello world"
function printHelloWorld() {
  console.log("Hello world");
}
```

We did ourselves the favour to name our function with a name that describes what the function does.

Now, when we have a function, we have to "call" it for it to be executed. To call a function, you need the function's name followed by `(` and `)`. If the function takes a _parameter_, then you'd pass the _argument_ in the `(` and `)`. In our case for the "hello world" function, we have to do, `printHelloWorld();`.

```js
printHelloWorld();

// the output of this function will be on the console/terminal
```

Let's move in a little direction that will broaden our arsenal and make creating functions fun. Consider this function that adds two numbers then prints a texting telling you what happened.

```js
function add() {
  const x = 3;
  const y = 20;

  const sum = x + y;

  console.log(`${x} + ${y} = ${sum}`);
}

add(); // 3 + 20 = 23
```

Is this giving you ideas? We can write our "fizzbuzz" and validations using functions. We can be soo stingy and delicate that we'd write each validation requirement as a function. It happens. Just don't over do it.

Now, consider the add function. What if we want to add different numbers, what do we do? We can create another function that. We can also alter the values directly. Right? Yeah. You will be marvelled by what we can accomplish with functions.

First of all, if we want to add difference numbers we can change the numbers

```js
function add() {
  const x = 10;
  const y = 2;

  const sum = x + y;

  console.log(`${x} + ${y} = ${sum}`);
}

add(); // 10 + 2 = 12
```

Okay, let's alter the function to add 6 and 100 rather. Now we have to alter the function. There is a solution to this and it is to introduce parameters (data via variables). Then we'd pass those data as arguments.

Let's analyze our `add` function. The add function operates on `x` and `y` and operands. We can pass different values to `x` and `y` by passing `x` and `y` as parameters.

```js
function add(x, y) {
  // const x = 3;
  // const y = 20;

  const sum = x + y;

  console.log(`${x} + ${y} = ${sum}`);
}

add(3, 30);
add(10, 2);
add(6, 100);
// 3 + 30 = 33
// 10 + 2 = 12
// 6 + 100 = 106
```

Instead of having the value of `x` and `y` as internal values in `add`, we pass them. Now the difference between parameters and arguments is that, parameters are passed when creating (defining) the function. Argument are the values passed when calling the function. So in `function add(x, y)`, `x` and `y` are parameters (we can say place holders, representing the data to be passed to the function). In `add(3, 30);`, `3` and `30` are passed as arguments (the actual values to be processed). Note that the order of the argument and parameters must match else we'd be in a serious debt.

You think it is enough to take on the big guns? Well, I think you can. You just have to be calm and know what you are doing. I will provide some snippets.

```js
function passwordValidation(password) {
  // write the password validation program here
}

passwordValidation("HillBilly676");
passwordValidation("Nixton009");
passwordValidation("PrQ1V_");
```

Do the same for the "fizzbuzz". Wrap a function around the snippet. You don't have to comment out the variables been used. Look at what data needs to passed to the function (input).

> We can pass as many parameters to a function. However I'd encourage your to set some limits. There are some professionals who say about three is enough. Some say about fewer than five. Ypu have to be smart about it. For now, let's say that whenever the number of parameters exceeds three, we would use an array or an object. Yeah. We can pass an array or an object as an argument.

```js
// interest = (principal * rate * time) / 100
function calculateInterest(principal, rate, time) {
  const interest = (principal * rate * time) / 100;

  console.log(
    `The interest on \$${principal} for ${time} years at a rate of ${rate}% is \$${interest}`
  );
}

calculateInterest(2000, 0.05, 3);
// The interest on $2000 for 3 years at a rate of 0.05% is $3
calculateInterest(1000, 0.25, 6);
// The interest on $1000 for 6 years at a rate of 0.25% is $15
```

Write a function the calculates the average of an array of numbers by completing this functions.

```js
function printAverage(arrayOfNumbers) {
  // implement your logic here... Your output should match that after the function call
}

printAverage([1, 2, 3, 4, 5]);
// The average of 1,2,3,4,5 of size 5 is 3
printAverage([9, 8, 0, 6]);
// The average of 9,8,0,6 of size 4 is 5.75
```

At this point it should be clear that functions can take arguments. Practically, our functions will return a value or something value after a computation is done. The computed value is returned from the function. A function that return a value is of the form:

```js
function functionName(/* parameters */) {
  // do something
  // return someValue
}
```

- `// return someValue` is the only new thing here. `return` is a keyword.
- `someValue` is the value returned from the function. And it could be anything to nothing, a void function. Don't sweat it. We will modify some of these functions we have written so before so things will be simpler.

Remember the `add` function? Instead logging the value inside the function, we will return it and assign that value to a variable then reuse the value later.

```js
function add(x, y) {
  const sum = x + y;

  // usually, we an just do, return x + y and that will also work
  return sum;
}

console.log(`${3} + ${30} = ${add(3, 30)}`);
// 3 + 30 = 33
console.log(`${10} + ${2} = ${add(10, 2)}`);
// 10 + 2 = 12
console.log(`${6} + ${100} = ${add(6, 100)}`);
// 6 + 100 = 106
```

This is as simple as we can put it. Do the same for the the `calculateInterest` function.

> A function can return anything returnable.

## Arrow functions

An arrow function is another away to write a function. Usually I use arrow functions when I have a simple function that does a very minute "thing" or in array or string methods for looping. You can use it in place of the function declarations (named functions). We say, `function`, to indicate we want to create a function. Arrow functions have the same features as the declarative function.

Arrow functions are called so because of `=>`, the fat arrow operator. It is of the form, perhaps you've have seen before:

```js
const arrowFunctionName = (/* parameter list */) => /* some expression */
```

or

```js
const arrowFunctionName = (/* parameter list */) => {
  /* some huge logic */
};
```

Let's rewrite the `add` function using arrow function.

```js
const add = (x, y) => x + y;
```

`=>`, indicates a `return` of the value from the `x + y` express. So the `return` keyword is used implicitly. Again we can explicitly return a value from the function using the `return` keyword however, we have to add the functions block.

```js
const add = (x, y) => {
  // usually the body here would be longer
  return x + y;
};
```

The difference in the two is that in the second, we added a block, `{` and `}` and a `return` keyword that returns a value from the function. Again, you can choose to return a value or not.

## Passing functions as arguments

We can pass functions as arguments to other functions. Essentially, we treat functions as values. Let's consider this trivial example.

```js
const callback = (outFunction) => {
  console.log(`${outFunction.name} function was called`);
};

const login = (username, password, logger) => {
  console.log(`localhost://${username}:${password}@weird.com/login`);
  logger(login);
};

const clearAccount = (username, logger) => {
  console.log(`localhost://${username}@weird.com/clear`);
  logger(clearAccount);
};

login("johndoe", "password", callback);
clearAccount("johndoe", callback);
```

Another place we can do this with array methods or string methods. Consider this function

```js
const calculateSumOfNumbersInArray = (numericArray) =>
  numericArray.reduce((total, element) => total + element, 0);

const numArray = [1, 2, 3];
const total = calculateSumOfNumbersInArray(numArray);

console.log(`The total of the array, ${numArray} is ${total}`);
// The total of the array, 1,2,3 is 6
```

We can see that we can pullout the callback function, `(total, element) => total + element, 0`. In fact, it is the `total + element` we can replace.

```js
const calculateSumOfNumbersInArray = (numericArray, someFunction) =>
  numericArray.reduce((total, element) => someFunction(total, element), 0);

const add = (x, y) => x + y;

const numArray = [1, 2, 3];
const total = calculateSumOfNumbersInArray(numArray, add);

console.log(`The total of the array, ${numArray} is ${total}`);
// The total of the array, 1,2,3 is 6
```

You know we pass another function that takes 2 numbers argument and returns a number. We don't even have to create a function.

We have done some maths before but this time we will use functions to abstract the operators.

```js
const add = (x, y) => x + y;

const sub = (x, y) => x - y;

const mul = (x, y) => x * y;

const calculate = (firstOperand, secondOperand, operation) =>
  operation(firstOperand, secondOperand);

console.log(calculate(2, 3, add));
console.log(calculate(2, 3, sub));
console.log(calculate(2, 3, mul));
console.log(calculate(calculate(1, 2, add), calculate(3, 4, sub), mul));
```

The last parameter is called a default parameter and usually it is placed as
the last argument. This is something that you have to do if you are going to
use default values. This snippet is not that different than the previous
except the introduction of the default parameter which means for the third
argument, we can choose to pass a value for it or not.

```js
const performActionOnArray = (numericArray, someAction, initialValue = 0) => {
  return numericArray.reduce(
    (result, element) => someAction(result, element),
    initialValue
  );
};

const add = (x, y) => x + y;

const numArray = [1, 2, 3];
const total = performActionOnArray(numArray, add);

console.log(`The total of the array, ${numArray} is ${total}`);
// The total of the array, 1,2,3 is 6
```

In `const total = performActionOnArray(numArray, add);` we could have passed a function directly

```js
const total = performActionOnArray(
  numArray,
  (value1, value2) => value1 + value2
);
```
