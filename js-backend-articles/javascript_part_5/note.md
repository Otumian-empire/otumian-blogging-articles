# JavaScript Essentials: Part 5

Previously in [JavaScript Essentials: Part 4](https://dev.to/otumianempire/javascript-essentials-part-4-2ne6), We discussed `if` and `else` statements, `for` and `while` loops. In this part, we will look at:

- Functions
- Callbacks, promises, async & await
- Next big thing

## Comments

Comments are great and we are now going to talk about it. It is so late that you should know what a comment is. Anyway, a comment in our program is not executed. A comment is meant to document our code. There are three ways to add comments in Javascript. We have the inline, multiline and JsDoc.

**In-line**

```js
// this is a number
const numberOfBirds = 3;

// the above comment is useless since the initial value assigned to the variable
// is physically a number and the variable name also has a number in it
// so use comments wisely by using proper naming
```

**Multiline**

```js
/* 
Everything in here is or will be ignored.

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


*/

const emptyString = "";
```

**JsDoc**

```js
/**
 * This is a multiline comment
 *
 * But used for documentation
 */
```

> Comments can be placed anywhere; however, be careful when placing them after (or at the end) a line of code or below or above it.

## Semi-colon

In javascript, semi-colon, `;`, is not required however, it helps sometimes. There are tools that help you with it. A semi-colon indicates the end of a statement. Good.

## Indentation

Indentations are used to arrange code for clarity and ease of reading. The tab key (on the keyboard) is used in indenting. Indentations are sometimes "tabs" or "spaces". The space is usually 2 or 4. If you are using [vscode](https://code.visualstudio.com/download), you don't have to worry.

## Examples

There were some exercises from [JavaScript Essentials: Part 4](https://dev.to/otumianempire/javascript-essentials-part-4-2ne6) which included but were not limited to "fizzbuzz", password and email validation, etc. If you were to have followed my pseudocode, you'd run into some issues. I will provide a snippet that considers the order.

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

What do you think about the two snippets? Practically the second snippet, even though it works, is not that great.

## Functions

A function is a piece of code that can be reused. Usually, a function does a specific thing. One thing. It can be anything.

Let's look at the general form (structure) of a function in JavaScript.

```js
function functionName(/* parameters */) {
  // do something
}
```

- `function` is a keyword required when creating a function. The `for` keyword is needed when you want to use a `for` loop.
- `functionName` is supposed to be the name given to the function. The idea of naming a variable applies to a function.
- `/* parameters */` refers to the data you want to pass to the function.
- `// do something` is the action or computation we desire to be performed. Functions usually return data after some processing is done. There are times when it doesn't. It just updates some data and is done.
- `{ // do something }` is the functions body or block

We can have a function that prints "hello world"

```js
// function to print "hello world"
function printHelloWorld() {
  console.log("Hello world");
}
```

We did ourselves the favour to name our function with a name that describes what the function does.

Now, when we have a function, we have to "call" it for it to be executed. To call a function, you need the function's name followed by `(` and `)`. If the function takes a _parameter_, you'd pass the _argument_ in the `(` and `)`. In our case, for the "hello world" function, we have to do, `printHelloWorld();`.

```js
printHelloWorld();

// the output of this function will be on the console/terminal
```

Let's move in a little direction that will broaden our arsenal and make creating functions fun. Consider this function that adds two numbers and then prints a text telling you what happened.

```js
function add() {
  const x = 3;
  const y = 20;

  const sum = x + y;

  console.log(`${x} + ${y} = ${sum}`);
}

add(); // 3 + 20 = 23
```

Is this giving you ideas? We can write our "fizzbuzz" and validations using functions. We can be so stingy and delicate that we'd write each validation requirement as a function. It happens. Just don't overdo it.

Now, consider the add function. What if we want to add different numbers, what do we do? We can create another function that. We can also alter the values directly. Right? Yeah. You will be amazed by what we can accomplish with functions.

First of all, if we want to add different numbers we can change the numbers.

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

Instead of having the values of `x` and `y` as internal values in `add`, we pass them. Now the difference between parameters and arguments is that parameters are passed when creating (defining) the function. Arguments are the values passed when calling the function. So in `function add(x, y)`, `x` and `y` are parameters (we can say placeholders, representing the data to be passed to the function). In `add(3, 30);`, `3` and `30` are passed as arguments (the actual values to be processed). Note that the order of the argument and parameters must match else we'd be in serious debt.

Do you think it is enough to take on the big guns? Well, I think you can. You just have to be calm and know what you are doing. I will provide some snippets.

```js
function passwordValidation(password) {
  // write the password validation program here
}

passwordValidation("HillBilly676");
passwordValidation("Nixton009");
passwordValidation("PrQ1V_");
```

Do the same for the "fizzbuzz". Wrap a function around the snippet. You don't have to comment on the variables used. Look at what data needs to be passed to the function (input).

> We can pass as many parameters to a function. However, I'd encourage you to set some limits. There are some professionals who say about three is enough. Some say about fewer than five. You have to be smart about it. For now, let's say that whenever the number of parameters exceeds three, we would use an array or an object. Yeah. We can pass an array or an object as an argument.

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

Write a function that calculates the average of an array of numbers by completing this function.

```js
function printAverage(arrayOfNumbers) {
  // implement your logic here... Your output should match that after the function call.
}

printAverage([1, 2, 3, 4, 5]);
// The average of 1,2,3,4,5 of size 5 is 3
printAverage([9, 8, 0, 6]);
// The average of 9,8,0,6 of size 4 is 5.75
```

At this point, it should be clear that functions can take arguments. Practically, our functions will return a value or something value after a computation is done. The computed value is returned from the function. A function that returns a value is of the form:

```js
function functionName(/* parameters */) {
  // do something
  // return someValue
}
```

- `// return someValue` is the only new thing here. `return` is a keyword.
- `someValue` is the value returned from the function. And it could be anything to nothing, a void function. Don't sweat it. We will modify some of these functions we have written before so things will be simpler.

Remember the `add` function? Instead of logging the value inside the function, we will return it and assign that value to a variable then reuse the value later.

```js
function add(x, y) {
  const sum = x + y;

  // usually, we can just do, return x + y and that will also work
  return sum;
}

console.log(`${3} + ${30} = ${add(3, 30)}`);
// 3 + 30 = 33
console.log(`${10} + ${2} = ${add(10, 2)}`);
// 10 + 2 = 12
console.log(`${6} + ${100} = ${add(6, 100)}`);
// 6 + 100 = 106
```

This is as simple as we can put it. Do the same for the `calculateInterest` function.

> A function can return anything returnable.

## Arrow functions

An arrow function is another way to write a function. Usually, I use arrow functions when I have a simple function that does a very minute "thing" or in array or string methods for looping. You can use it in place of the function declarations (named functions). We say, `function`, to indicate we want to create a function. Arrow functions have the same features as the declarative function.

Arrow functions are called so because of `=>`, the fat arrow operator. It is of the form, perhaps you've seen before:

```js
const arrowFunctionName = (/* parameter list */) => /* some expression */
```

or

```js
const arrowFunctionName = (/* parameter list */) => {
  /* some huge logic */
};
```

Let's rewrite the `add` function using the arrow function.

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

The difference between the two is that in the second, we added a block, `{` and `}` and a `return` keyword that returns a value from the function. Again, you can choose to return a value or not.

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

Another place we can do this is with array methods or string methods. Consider this function

```js
const calculateSumOfNumbersInArray = (numericArray) =>
  numericArray.reduce((total, element) => total + element, 0);

const numArray = [1, 2, 3];
const total = calculateSumOfNumbersInArray(numArray);

console.log(`The total of the array, ${numArray} is ${total}`);
// The total of the array, 1,2,3 is 6
```

We can see that we can pull out the callback function, `(total, element) => total + element, 0`. In fact, it is the `total + element` we can replace.

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

The last parameter is called a default parameter and usually, it is placed as
the last argument. This is something that you have to do if you are going to
use default values. This snippet is not that different from the previous
one except for the introduction of the default parameter which means for the third
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

## Promise

Before anything, let's define some terms. Promises are important in our niche.

**Synchronous operation**: These are operations that are executed sequentially, from top to bottom, one after the other. For some operations _A1_ and _A2_, _A1_ has to be completed before _A2_ will be executed. This way, _A2_ will not be executed until _A1_. At a time one operation is executed. This drawback is called blocking.

```js
console.log("Hello there");
const someSyncFunction = () => {
  console.log("I am synchronous");
};
someSyncFunction();
console.log("Bye");
```

The output for the above is in a linear order as written above.

```txt
Hello there
I am synchronous
Bye
```

In short, the code we have written so far is all executed in a synchronous order and we can tell when one line will be executed.

**Asynchronous operations**: These are operations that are not executed sequentially. These operations run concurrently. These could be several operations running at the same time, practically, bit by bit. Since the success or execution of one operation is independent of the order and doesn't impede the execution of other lines, we call this behaviour non-blocking. We can not tell when an asynchronous line will be executed.

```js
console.log("Hello there");
setTimeout(() => {
  console.log("I am asynchronous");
}, 2000);
const someSyncFunction = () => {
  console.log("I am synchronous");
};
someSyncFunction();
console.log("Bye");
```

And this is the output.

```txt
Hello there
I am synchronous
Bye
I am asynchronous
```

Can you identify the async operation based on the output?

It is the `setTimeout` function. Let's say it runs in the background. It is non-blocking, so the last `console.log` was executed.

**Some Async Operations**

- Network requests (Eg: API calls)
- Database queries
- File I/O operations
- Javascript Web APIs (setTimeout, setInterval, fetch, etc)

A `Promise` provides a means for managing or handling asynchronous operations. It is a way of knowing the state an async operation is in, when it is executed, and whether it is "fulfilled" or it failed.

**Let's create a Promise**

A promise has the form:

```js
new Promise((resolve, reject) => {
    // an async operation is executed
    if (/* on completion resolve promise with a value */) {
        resolve(value);
 } else {
        /* on failure reject promise with an error */
        reject(error);
 }
});
```

`new` and `Promise` are keywords. `resolve` and `reject` are callback functions. We can replace them with other names. By conversion, we use `resolve` and `reject`.

**Handle a promise**

Promise has `then` method which provides the resolved value, `catch` method which provides the rejected error and there is the `finally` which is a way to clean up after the whole process. `finally` is optional though. Here is a simple example you can play with.

```js
console.log("Hello there");

const madeAPromise = new Promise((resolve, reject) => {
  // this could have been a database or API call
  const result = true;

  /* on completion resolve promise with a value */
  if (result) {
    resolve("🥦 is good for your health");
  } else {
    /* on failure reject promise with an error */
    reject("Well, 🙄, an error occurred");
  }
});

console.log("After the promise is created");

madeAPromise
  .then((value) => console.log({ value }))
  .catch((error) => console.log({ error }))
  .finally(() =>
    console.log("We have handled the async call, now we can all have pizza")
  );

console.log("Bye");
```

Look at the output and see how the code is executed. `console.log("Bye");` was not the last to be executed. We created our async operation using a promise and handled it using `then` and `catch`. If we are thinking of executing these operations in order, then we can or have to put the remaining logic inside the then block.

```js
madeAPromise
  .then((value) => {
    console.log({ value });
    console.log("Bye");
  })
  .catch((error) => console.log({ error }))
  .finally(() =>
    console.log("We have handled the async call, now we can all have pizza")
  );
```

What happened?

The issue with this approach to handling promises is that we tend to nest or chain this operation, the `then` block fattens and it is not that friendly. So let's look at `async` and `await`.

## async and await

In the normal flow of data, we don't want the async operation to run in the background. We want to listen to it and use its result to do something else (as we did in the `then` and `catch`).

Let's create an async operation and handle it using `async` and `await`.

We know how to create named functions and arrow functions.

```js
function functionName() {}

const functionName = () => {};
```

To make a function asynchronous, we use the `async` keyword.

```js
async function functionName() {}

const functionName = async () => {};
```

Now whatever operation goes into the block of the function and let's say in the async function we want to create, we would have to deal with another async operation, then we can use the `await`.

```js
async function functionName() {
  const responseFromAsyncOperation = await SomeAsyncOperation(someArguments);
}

const functionName = async () => {
  const responseFromAsyncOperation = await SomeAsyncOperation(someArguments);
};
```

The `await` tells javascript to "wait" and receive the resolved or fulfilled value from the promise.

```js
console.log("Hello there");

async function asyncFunction() {
  return new Promise((resolve, reject) => {
    // this could have been a database or API call
    const result = true;

    /* on completion resolve promise with a value */
    if (result) {
      resolve("🥦 is good for your health");
    } else {
      /* on failure reject promise with an error */
      reject("Well, 🙄, an error occurred");
    }
  });
}

console.log("After the promise is created");
const value = await asyncFunction();
console.log({ value });

console.log("Bye");
```

When we execute the above snippet we get an error similar to, `Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.`.

We can fix this issue easily. Run the command, `npm init -y`. Go into the `package.json` file and add the line, `"type": "module"`. The `package.json` should look like

```json
{
  "name": "javascript_part_5",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "type": "module"
}
```

Now, rerun the snippet and you should get an output similar to

```txt
Hello there
After the promise is created
{ value: '🥦 is good for your health' }
Bye
```

Now, let's say we want to handle the promise rejection error, in case there is no, we have to use the `try` and `catch` clause around the async call.

```js
console.log("Hello there");

async function asyncFunction() {
  return new Promise((resolve, reject) => {
    // this could have been a database or API call
    const result = true;

    /* on completion resolve promise with a value */
    if (result) {
      resolve("🥦 is good for your health");
    } else {
      /* on failure reject promise with an error */
      reject("Well, 🙄, an error occurred");
    }
  });
}

console.log("After the promise is created");
try {
  const value = await asyncFunction();
  console.log({ value });
} catch (error) {
  console.log({ error });
} finally {
  console.log("We have handled the async call, now we can all have pizza");
}

console.log("Bye");
```

There won't be any promise rejection because we set, `const result = true`. Set it to `false`. And our output should be similar to

```txt
Hello there
After the promise is created
{ error: 'Well, 🙄, an error occurred' }
We have handled the async call, now we can all have pizza
Bye
```

So the purpose of talking about promises and async and await is to let you know that we will be doing that a lot. Refer to the examples of asynchronous operations listed above.

> `async` and `await`, `try` and `catch` and `finally` are keywords.

## Conclusion

At this point where we have discussed functions and promises and how to handle them, I think we are about 50% equipped with the "knowledge" to manipulate data (flow). What is left is to become used to writing javascript code and be a competent javascript programmer. Get your hands dirty with JavaScript. That's the only way you will code a backend API and not feel restrained because you have the idea but don't know what to do.

Next is to write some code and solve some problems then actually start building APIs.

## Resource

These are materials that will be helpful in understanding Promises, async and await and event loop.

- [What the heck is the event loop anyway? | Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
- [Node.js animated: Event Loop](https://dev.to/nodedoctors/an-animated-guide-to-nodejs-event-loop-3g62)
- [JavaScript Visualized - Event Loop, Web APIs, (Micro)task Queue](https://www.youtube.com/watch?v=eiC58R16hb8)
- [JavaScript Promises In 10 Minutes](https://www.youtube.com/watch?v=DHvZLI7Db8E)
- [How JavaScript Promises Work – Tutorial for Beginners](https://www.freecodecamp.org/news/javascript-promise-object-explained/)

These are some exercises you'd like to try your hands on.

- [exercism - javascript](https://exercism.org/tracks/javascript)
- [jschallenger - javascript-basics](https://jschallenger.com/javascript-basics/variables)
- [codecademy - 10 javascript-code-challenges-for-beginners](https://www.codecademy.com/resources/blog/10-javascript-code-challenges-for-beginners/)
- [TheOdinProject-javascript-exercises](https://github.com/TheOdinProject/javascript-exercises)
- [codewars - javascript](https://www.codewars.com/kata/search/javascript?q=&r%5B%5D=-8&r%5B%5D=-7&r%5B%5D=-6&xids=played&order_by=rank_id%20asc)
- [RepublicServicesRepository-javascript-exercises](https://github.com/RepublicServicesRepository/javascript-exercises)
- [leonardomso - 33-js-concepts](https://github.com/leonardomso/33-js-concepts)
- This is a good read, [getify - You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS)
- [TheAlgorithms - Javascript](https://github.com/TheAlgorithms/Javascript)
- [denysdovhan - wtfjs](https://github.com/denysdovhan/wtfjs)
- [w3schools - js exercise](https://www.w3schools.com/js/exercise_js.asp)
