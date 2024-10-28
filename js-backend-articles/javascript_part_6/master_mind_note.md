# Mastermind in Javascript

In this section, we will implement a game called [Mastermind][wiki-play-mastermind] in JavaScript. This game development would cover a lot of the concepts that we have discussed so far. We will define functions, pass arguments to them, make use of variables, and make use of loops and if statements. We would briefly look at another concept around functions, known as IIFE, Immediately Invoked Function Expression. We will also look at how to take user input via the command line. At this point, it is just console applications.

> You can reference a similar implementation here, [Master mind in python][Master-mind-in-python]

[Mastermind][wiki-play-mastermind] is a simple board game that uses colours but We'd use numbers instead.

**Summary**: Behind a bar are four colours put up by one player. The other player can not see the first player's colours. The first player's colours are called the _code maker_ and the other player's colours are the _code breaker_. The code breaker has, inclusively, between 2 to 12 attempts at guessing the code makers'. The number of attempts must be even.

## Implementation

- Create a folder called _mastermind_ on your pc (or where you put your projects) and in _mastermind_, initialize a node project using `npm init -y` (on the command line). I am on a Linux machine so this is how I will set up my project.

  - Open my terminal, run, `cd` to move me to the user folder.
  - Then, `cd ~/projects`. `projects` is where I keep my projects.
  - Then `mkdir mastermind` and `cd mastermind` to create the _mastermind_ folder and change into that folder.
  - Initialize a node project with `npm init -y`. A _package.json_ file will be created.
  - Create _app.js_ with `touch app.js`.
  - Write `console.log("Mastermind")` into _app.js_ and run it with `node app.js`. I expect to see _Mastermind_ else I have an issue with my setup.

- The starting (entry) point of this game will be in _App_, a function. Let's create a function called _App_ and add `console.log("App")`. We can then call `App()` and execute the code with `node app.js`. I won't be telling you to run your code but it is something you should be doing as you code along. This is the current content of my `app.js` file.

```js
console.log("Mastermind");

function App() {
  console.log("App");
}

App();
```

- When the game starts

  - user enters the number of rounds they want to play and the value entered must be validated
  - user chooses whether to allow duplicates or not
  - somewhere the code maker is randomly generated
  - user has entered the code breaker
  - the code breaker is compared to the code maker and a hint is given if it doesn't match
  - in the process, we make the number of rounds
  - and to make this more game-like we put the whole _App_ into an infinite loop

- Let's implement a function to generate random numbers for the code make, thereby setting random values to the code maker.

- First, we need a way to generate random numbers. Not to interfere with the code in the _app.js_, let's create another file called _scratch_pad.js_ and in this file we experiment.
- JavaScript has a simple way to generate random numbers calling `Math.random()`. In the scratch pad, let's log 4 random numbers using a looping construct.

```js
for (let i = 0; i < 4; i++) {
  console.log(Math.random());
}
// 0.10037268097853191
// 0.20981624777230534
// 0.47828165742292583
// 0.8160883929470153
```

- what we want are integers (numbers like) `0, 1, 2, ..., 9` not decimals. We can multiply the value returned from the `Math.random()` by 10 and we would have `x.something` where `x` will now be in `1,2,3,...,9`. Remember these experiments are all done on the scratch pad. Give it a try.

- What we want is a number before the dot, the whole number part. We can write code to convert the number to a string and then split it by the "." and get the first element. However, there is a functionality for that called floor which we can use.

```js
for (let i = 0; i < 4; i++) {
  console.log(Math.floor(Math.random() * 10));
}
// 4
// 7
// 3
// 4
```

- The way this works is that, if we want to get random numbers between some number `min` and `max`, where `max` is greater than `min`, then we can do, `min + Math.floor(Math.random() * (max - min + 1))`. `min` is the minimum expected value and `max` is the maximum expected value. In our case, we have our minimum value to be `0` and maximum to be `9`.
- This is my snippet for generating the random number. I added parameters to the function because I don't want the function to have an internal state.

```js
function generateRandomNumbersBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

for (let i = 0; i < 4; i++) {
  console.log(generateRandomNumbersBetween(0, 9));
}
```

- At this point, we can now go back into our _app.js_ and add the function above to generate the random numbers for the code maker. Put it above the _App_ function.

- From the summary the number of colours used is 4. So we need to generate 4 numbers for the code maker. We also have to handle if duplicates are allowed. Back to the scratchpad.

- We have functions, `if` and `else` statements, the `for` and `while` loops, etc. These constructs all have a block or a body. Variables initialized in these blocks can be used within the block and not outside of it. This is known as the scope of a variable. So a variable can exist in the global scope, which means that that variable can be used or assessed everywhere. When we declare a variable in a block. The variable becomes internal or limited in that scope. Run this in the scratchpad.

```js
const HP = 100;

if (true) {
  console.log("IF BLOCK::", HP);
}

console.log("End::", HP);

// IF BLOCK:: 100
// End:: 100
```

- Now update this by initializing a variable,`x`, in the `if` statement, `console.log(x)` outside the `if` block and run your scratch pad. You should get an error similar to this.

```sh
 IF BLOCK:: 100
 /home/Projects/mastermind/scratch_pad.js:8
 console.log(x)
    ^

 ReferenceError: x is not defined
    at Object.<anonymous> (/home/Projects/mastermind/scratch_pad.js:8:13)
    at Module._compile (node:internal/modules/cjs/loader:1469:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1548:10)
    at Module.load (node:internal/modules/cjs/loader:1288:32)
    at Module._load (node:internal/modules/cjs/loader:1104:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:174:12)
    at node:internal/main/run_main_module:28:49

 Node.js v20.17.0
```

At this point I want to bring to your attention the idea about scopes.

- When generating the code maker, we want to know if duplicates are allowed and at this point, we know that the code maker is an array of numbers (or numeric strings). Let's start with the scratchpad. We want to implement a function that takes in a boolean argument indicating if duplicates are allowed. The function will add (push) four numbers into the code maker but before that, we have to check if duplicates are allowed and handle when not.

```js
// a global code maker that is accessible inside any other scope
let CODE_MAKER = [];

function generateRandomNumbersBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function generateCodeMaker(isDuplicatesAllowed = false) {
  let counter = 0;

  while (counter < 4) {
    let code = generateRandomNumbersBetween(0, 9);

    if (isDuplicatesAllowed) {
      CODE_MAKER.push(code);
      counter += 1;
    } else if (!CODE_MAKER.includes(code)) {
      CODE_MAKER.push(code);
      counter += 1;
    }
  }
}

console.log(CODE_MAKER);
generateCodeMaker(true);
console.log(CODE_MAKER);

// reset the code maker
CODE_MAKER = [];
generateCodeMaker(false);
console.log(CODE_MAKER);
// []
// [ 6, 6, 0, 9 ]
// [ 2, 5, 0, 8 ]
```

- we also have written our code in such a way that the code maker isn't accessed globally in the code maker function. So will return the code maker instead.

```js
// a global code maker that is accessible inside any other scope
let CODE_MAKER = [];

function generateRandomNumbersBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function generateCodeMaker(isDuplicatesAllowed = false) {
  let counter = 0;
  let codeMaker = [];

  while (counter < 4) {
    let code = generateRandomNumbersBetween(0, 9);

    if (isDuplicatesAllowed) {
      codeMaker.push(code);
      counter += 1;
    } else if (!codeMaker.includes(code)) {
      codeMaker.push(code);
      counter += 1;
    }
  }

  return codeMaker;
}

console.log(CODE_MAKER);
CODE_MAKER = generateCodeMaker(true);
console.log(CODE_MAKER);

CODE_MAKER = generateCodeMaker(false);
console.log(CODE_MAKER);

// []
// [ 6, 6, 0, 9 ]
// [ 2, 5, 0, 8 ]
```

- In _app.js_ we can now add the code maker function and a variable for the code make.
- Now back to the scratchpad. We want to take input from the user from the terminal. Javascript has a way to do that too. Try this snippet.

```js
const readline = require("readline");

const readlineOInstance = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readlineOInstance.question("Enter code maker: ", (userInput) => {
  console.clear();
  console.log(`INPUT: ${userInput}`);
  readlineOInstance.close();
});
```

- There is no issue with this approach of taking user input. It is just that we have to use a callback function and there is no way to pass the entered input to the outer scope of the callback function of `readlineOInstance.question`.

- What are you thinking? Try it out in the "scratch pad". If you are thinking about declaring a variable in the outer scope of `readlineOInstance.question` the assigning the input entered to it, then it is a good approach but ... Still try it.

- Do you remember the concept of Promises? We can use promise here and resolve the input. However, we have to wrap the whole process in function. There are a few parts of the `readlineOInstance.question` has a header similar to `question(query: string, callback: (answer: string) => void`. The `query` is the query (or prompt) to the user and the `callback` is how we handle the input collection. Since we might reuse the same function somewhere later, we'd pass the query as an argument.

```js
const readline = require("readline");

async function getInput(query) {
  const readlineOInstance = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return await new Promise((resolve) => {
    readlineOInstance.question(query, (userInput) => {
      resolve(userInput);
      readlineOInstance.close();
    });
  });
}

(async () => {
  const userInput = await getInput("Enter code maker: ");
  console.clear();
  console.log(`INPUT: ${userInput}`);
})();
```

- Now we can add the `getInput` function to the _app.js_. Do not forget the import, `const readline = require("readline")`. The content of the _app.js_ should be similar to the snippet below.

```js
const readline = require("readline");

console.log("Mastermind");

let CODE_MAKER = [];

function generateRandomNumbersBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function generateCodeMaker(isDuplicatesAllowed = false) {
  let counter = 0;
  let codeMaker = [];

  while (counter < 4) {
    let code = generateRandomNumbersBetween(0, 9);

    if (isDuplicatesAllowed || !codeMaker.includes(code)) {
      codeMaker.push(code);
      counter += 1;
    }
  }

  return codeMaker;
}

async function getInput(query) {
  const readlineOInstance = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return await new Promise((resolve) => {
    readlineOInstance.question(query, (userInput) => {
      resolve(userInput);
      readlineOInstance.close();
    });
  });
}

function App() {
  console.log("App");
}

App();
```

- Now we ask the user to enter the number of rounds and if a duplicate is allowed. We know that the number of rounds must be even and between 2 to 12. We will implement a function to validate a value (number) to be even and between 2 and 12. It will return a boolean. A number is even when the number modulo 2 is zero. (ie. `number % 2 == 0`).

```js
function isValidRound(rounds) {
  return 2 <= rounds && rounds <= 12 && rounds % 2 == 0;
}
```

- In the body of the `App` function, we can ask for the inputs and validate them. We will continuously ask for the proper input for the number of rounds. For the duplicate values in the code, when the user enters anything other than the expected we'd assume that the user doesn't want duplicates. We will use a while loop and set the condition to be `true` and only `break` when the rounds are valid however using a `try` and a `catch` (for error handling), when the user enters an invalid value we log a message indicating that the value entered is invalid. Try it out.

```js
let rounds = 0;
let isDuplicateAllowed = false;

// The number of times to play must be even between 2 to 12 rounds
while (true) {
  try {
    const roundsInput = await getInput(
      "Enter number of rounds [must be even between 2 to 12]: "
    );

    // Number(some value) -> converts some value to a number
    // if possible else returns NaN. we could directly check
    // that 'rounds' is not NaN but any error will be caught
    // in the catch
    rounds = Number(roundsInput);

    if (isValidRound(rounds)) {
      break;
    }
  } catch (error) {
    console.log(INVALID_ROUNDS_PROMPT);
  }
}

// should there be duplicates
try {
  const duplicateInput = await getInput("Allow duplicates [1/0]: ");
  isDuplicateAllowed = Number(duplicateInput) === 1;
} catch (error) {
  isDuplicateAllowed = false;
}

console.log(
  `Number of rounds: (${rounds}) | Duplicate allowed: (${
    isDuplicateAllowed === 1 ? "Yes" : "No"
  })`
);
```

Run the `app.js` and interact with it. This is a similar output during the interaction.

```sh
 Mastermind
 App
 Enter number of rounds [must be even between 2 to 12]: 1
 Enter number of rounds [must be even between 2 to 12]: 5
 Enter number of rounds [must be even between 2 to 12]: 7
 Enter number of rounds [must be even between 2 to 12]: 100
 Enter number of rounds [must be even between 2 to 12]: 0
 Enter number of rounds [must be even between 2 to 12]: -2
 Enter number of rounds [must be even between 2 to 12]: 2
 Allow duplicates [1/0]: 1
 Number of rounds: (2) | Duplicate allowed: (Yes)
```

- We have taken the number of rounds and the value for duplication. Now we can generate the code maker. To do this we can call the `generateCodeMaker` function and pass the duplication option value to it (or leave it since it's by default false).

```js
console.clear();

CODE_MAKER = generateCodeMaker();

console.log(CODE_MAKER);
```

- Now we can ask the user for the code breaker and compare it to the code maker. The code breaker is also an array of numbers. We will also add a hint for the user to know how far they are from a particular code. So if the code for the code breaker is greater than the code of the code maker, we say more. We say equal when they are equal and else we say less when the code from the code breaker is less than the code of the code breaker. Let's head into the scratchpad.
- We will create a function that will take a numeric array of 4 elements and then compare the user's input (code breaker).

```js
const readline = require("readline");

// generated by the code maker function
let CODE_MAKER = [3, 6, 7, 0];

async function getInput(query) {
  const readlineOInstance = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return await new Promise((resolve) => {
    readlineOInstance.question(query, (userInput) => {
      resolve(userInput);
      readlineOInstance.close();
    });
  });
}

// new code

let HINTS = [0, 0, 0, 0];

async function compareCode(codeMaker) {
  // enter guess with spaces
  const input = await getInput("Enter code breaker with spaces: ");

  // we are converting the code breaker into numbers
  const codeBreaker = input.split(" ").map((value) => Number(value));

  // compare each code at the same index and provide a hint
  for (let codeIndex = 0; codeIndex < 4; codeIndex++) {
    if (codeBreaker[codeIndex] > codeMaker[codeIndex]) {
      HINTS[codeIndex] = 1;
    } else if (codeBreaker[codeIndex] === codeMaker[codeIndex]) {
      HINTS[codeIndex] = 0;
    } else {
      HINTS[codeIndex] = -1;
    }
  }
}

(async () => {
  console.log(`INITIAL Hint: ${HINTS}`);

  // await because of the input
  await compareCode(CODE_MAKER);

  console.log(`INITIAL Hint: ${HINTS}`);
})();
```

- We have a variable to handle the hints and a value for each code related to the code maker and breaker.
- We pass the code maker to the function to compare it against the input from the user.
- We update the hints to let the user know how to update the values in the code breaker
- Now we can add the `HINTS` and `compareCode` function to the _app.js_. It is a great time to run your _app.js_, above the `App` function.

- Now that we implemented a function to compare the code maker and the code breaker, we can now put this in a loop to account for the rounds (rounds = number of times to play the game). So if the number of rounds is 6, then the game would be played 6 times but we'd have to terminate the game when the user guesses all the codes correctly, that is when the values in the `HINTS` are all `0`s. So when we count the number of `0`s in `HINTS` and it is 4, we can terminate the game and say the user won.

```js
// code breaker guesses the code by the code maker
while (rounds > 0) {
  console.log(`Number of rounds left: ${rounds}`);
  await compareCode(CODE_MAKER);

  // because of the values that we used to hint to the user
  // we have to find some dicey way to break the program
  // when the user guesses the code (all hints go to 0)
  if (HINTS.filter((value) => 0 === value).length === 4) {
    break;
  }

  console.log(HINTS);

  rounds -= 1;
}
```

- The number of rounds is reduced and we'd know whether the user won or not if the number of rounds is not 0.

```js
if (rounds > 0) {
  console.log("You won... Congratulations...");
} else {
  console.log("You lost bitterly to a computer");
}
```

- Some outputs when you run the program

```sh
 Mastermind
 App
 Enter number of rounds [must be even between 2 to 12]: 6
 Allow duplicates [1/0]: 0
```

- When I hit enter

```sh
 Number of rounds left: 6
 Enter code breaker with spaces: 7 7 7 7
 [ 1, 1, 1, 1 ]
 Number of rounds left: 5
 Enter code breaker with spaces: 1 2 3 5
 [ -1, -1, 1, 1 ]
 Number of rounds left: 4
 Enter code breaker with spaces: 4 5 1 3
 [ -1, -1, 1, 1 ]
 Number of rounds left: 3
 Enter code breaker with spaces: 5 6 0 2
 [ 0, 0, 0, 1 ]
 Number of rounds left: 2
 Enter code breaker with spaces: 5 6 0 1
 You won... Congratulations...
```

- I guess we can enjoy our hard work so far. I have about 130 lines. How many do you have?

- This is the full code

```js
const readline = require("readline");

console.log("Mastermind");

let CODE_MAKER = [];
let HINTS = [0, 0, 0, 0];

function generateRandomNumbersBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function generateCodeMaker(isDuplicatesAllowed = false) {
  let counter = 0;
  let codeMaker = [];

  while (counter < 4) {
    let code = generateRandomNumbersBetween(0, 9);

    if (isDuplicatesAllowed || !codeMaker.includes(code)) {
      codeMaker.push(code);
      counter += 1;
    }
  }

  return codeMaker;
}

async function getInput(query) {
  const readlineOInstance = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return await new Promise((resolve) => {
    readlineOInstance.question(query, (userInput) => {
      resolve(userInput);
      readlineOInstance.close();
    });
  });
}

function isValidRound(rounds) {
  return 2 <= rounds && rounds <= 12 && rounds % 2 == 0;
}

async function compareCode(codeMaker) {
  // enter guess with spaces
  const input = await getInput("Enter code breaker with spaces: ");

  // we are converting the code breaker into numbers
  const codeBreaker = input.split(" ").map((value) => Number(value));

  // compare each code at the same index and provide a hint
  for (let codeIndex = 0; codeIndex < 4; codeIndex++) {
    if (codeBreaker[codeIndex] > codeMaker[codeIndex]) {
      HINTS[codeIndex] = 1;
    } else if (codeBreaker[codeIndex] === codeMaker[codeIndex]) {
      HINTS[codeIndex] = 0;
    } else {
      HINTS[codeIndex] = -1;
    }
  }
}

async function App() {
  console.log("App");

  let rounds = 0;
  let isDuplicateAllowed = 0;

  // The number of times to play must be even between 2 to 12 rounds
  while (true) {
    try {
      const roundsInput = await getInput(
        "Enter number of rounds [must be even between 2 to 12]: "
      );

      // Number(some value) -> converts some value to a number
      // if possible else returns NaN. we could directly check
      // that 'rounds' is not NaN but any error will be caught
      // in the catch
      rounds = Number(roundsInput);

      if (isValidRound(rounds)) {
        break;
      }
    } catch (error) {
      console.log(INVALID_ROUNDS_PROMPT);
    }
  }

  // should there be duplicates
  try {
    const duplicateInput = await getInput("Allow duplicates [1/0]: ");
    isDuplicateAllowed = Number(duplicateInput) === 1;
  } catch (error) {
    isDuplicateAllowed = false;
  }

  console.clear();

  CODE_MAKER = generateCodeMaker(isDuplicateAllowed);

  // code breaker guesses the code by the code maker
  while (rounds > 0) {
    console.log(`Number of rounds left: ${rounds}`);
    await compareCode(CODE_MAKER);

    // because of the values that we used to hint to the user
    // we have to find some dicey way to break the program
    // when the user guesses the code (all hints go to 0)
    if (HINTS.filter((value) => 0 === value).length === 4) {
      break;
    }

    console.log(HINTS);

    rounds -= 1;
  }

  if (rounds > 0) {
    console.log("You won... Congratulations...");
  } else {
    console.log("You lost bitterly to a computer");
  }
}

App();
```

## Is there room for improvement?

Even though this is a simple console/terminal/text-based app, there is more we can do about it.

- We can replace all constants such as strings and numbers.
- We could pull out (refactor) the code breaker input and splitting of it, out of the `compare code` and then pass the code breaker and code maker as arguments. We could even let the function return the hints rather than accessing the hints globally. We will create a new hints variable and return it. So `compareCode` will return hints assigned to the hints variable.

```js
async function compareCode(codeMaker) {
  // enter guess with spaces
  const input = await getInput("Enter code breaker with spaces: ");

  // we are converting the code breaker into numbers
  const codeBreaker = input.split(" ").map((value) => Number(value));

  // compare each code at the same index and provide a hint
  for (let codeIndex = 0; codeIndex < 4; codeIndex++) {
    if (codeBreaker[codeIndex] > codeMaker[codeIndex]) {
      HINTS[codeIndex] = 1;
    } else if (codeBreaker[codeIndex] === codeMaker[codeIndex]) {
      HINTS[codeIndex] = 0;
    } else {
      HINTS[codeIndex] = -1;
    }
  }
}
```

- we can also wrap the `console.clear()` into a function.
- we can let the program slow down before the next game
- we can pull out `HINTS.filter((value) => 0 === value).length === 4` as a function. The purpose of it is to check if the code breaker has guessed correctly the code maker.
- we can also do the same for declaring who won the game

```js
if (rounds > 0) {
  console.log("You won... Congratulations...");
} else {
  console.log("You lost bitterly to a computer");
}
```

- Put all functions that can stand alone into their own file, `functions.js` and export them. We can then refactor standalone functions that depend on a global variable and then pass that data as an argument to the function using a parameter.
- We can even have a separate file for

```js
(async () => {
  while (true) {
    // Run the App function
    await App();

    // Wait for a specified time before the next run
    await sleep(WAITING_TIME);

    // Clear the screen
    clearScreen();

    // Reset the game state for replay
    CODE_MAKER = [0, 0, 0, 0];
    HINTS = [0, 0, 0, 0];
  }
})();
```

## Conclusion

We have used all that we have learnt in this project and there is more. I mentioned that we could group some functions and export them. For this, we will discuss how to `import` and `export` in Javascript. I will provide another project that I think will be useful to you. This is the end of the mastermind game and I hope you will also do some refactoring since there are a lot of places that need to be refactored. Best of luck...

```js
const readline = require("readline");

let CODE_MAKER = [];
let HINTS = [0, 0, 0, 0];

// string constants
const ROUNDS_PROMPT = "Enter number of rounds (Even in [2, 12]) 🤗️: ";
const INVALID_ROUNDS_PROMPT =
  "Round must be an even number from 2 to 12 includes 😩️";
const DUPLICATE_PROMPT = "Duplicates allowed? (1/0) 🤤️: ";
const CODE_BREAKER_PROMPT = "Enter codes separated by space: ";
const WIN_PROMPT = "You won the rounds 👏️";
const LOSS_PROMPT = "You lost bitterly to a computer 😏️";

// int constants
const ZERO = 0;
const ONE = 1;

const NUMBER_CODE = 4;
const TERMINATING_VALUE = 0;

const MORE = 1;
const EQUAL = 0;
const LESS = -1;

const MIN_ROUNDS = 2;
const MAX_ROUNDS = 12;

const RAND_INT_MIN = 0;
const RAND_INT_MAX = 9;
const WAITING_TIME = 5000; // in milliseconds

function generateRandomNumbersBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function generateCodeMaker(isDuplicatesAllowed = false) {
  let counter = ZERO;
  let codeMaker = [];

  while (counter < NUMBER_CODE) {
    let code = generateRandomNumbersBetween(RAND_INT_MIN, RAND_INT_MAX);

    if (isDuplicatesAllowed || !codeMaker.includes(code)) {
      codeMaker.push(code);
      counter += ONE;
    }
  }

  return codeMaker;
}

async function getInput(query) {
  const readlineOInstance = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return await new Promise((resolve) => {
    readlineOInstance.question(query, (userInput) => {
      resolve(userInput);
      readlineOInstance.close();
    });
  });
}

function isValidRound(rounds) {
  return MIN_ROUNDS <= rounds && rounds <= MAX_ROUNDS && rounds % 2 == ZERO;
}

function compareCode(codeMaker, codeBreaker) {
  let hints = [0, 0, 0, 0];

  // compare each code at the same index and provide a hint
  for (let codeIndex = 0; codeIndex < NUMBER_CODE; codeIndex++) {
    if (codeBreaker[codeIndex] > codeMaker[codeIndex]) {
      hints[codeIndex] = MORE;
    } else if (codeBreaker[codeIndex] === codeMaker[codeIndex]) {
      hints[codeIndex] = EQUAL;
    } else {
      hints[codeIndex] = LESS;
    }
  }

  return hints;
}

function clearScreen() {
  console.clear();
}

function hasGuessedCodeMaker(hints) {
  return hints.filter((code) => ZERO === code).length === NUMBER_CODE;
}

function declareResult(rounds) {
  if (rounds > TERMINATING_VALUE) {
    console.log(WIN_PROMPT);
  } else {
    console.log(LOSS_PROMPT);
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// This is where the whole game is at
async function App() {
  let rounds = ZERO;
  let isDuplicateAllowed = false;

  // The number of times to play must be even between 2 to 12 rounds
  while (true) {
    try {
      const roundsInput = await getInput(ROUNDS_PROMPT);

      // Number(some value) -> converts some value to a number
      // if possible else returns NaN. we could directly check
      // that 'rounds' is not NaN but any error will be caught
      // in the catch
      rounds = Number(roundsInput);

      if (isValidRound(rounds)) {
        break;
      }
    } catch (error) {
      console.log(INVALID_ROUNDS_PROMPT);
    }
  }

  // should there be duplicates
  try {
    const duplicateInput = await getInput(DUPLICATE_PROMPT);
    isDuplicateAllowed = Number(duplicateInput) === ONE;
  } catch (error) {
    isDuplicateAllowed = false;
  }

  clearScreen();

  CODE_MAKER = generateCodeMaker(isDuplicateAllowed);

  // code breaker guesses the code by the code maker
  while (rounds > TERMINATING_VALUE) {
    console.log(`Number of rounds left: ${rounds}`);

    // enter guess with spaces
    const codeBreakerInput = await getInput(CODE_BREAKER_PROMPT);

    // we are converting the code breaker into numbers
    const codeBreaker = codeBreakerInput
      .split(" ")
      .map((value) => Number(value));

    HINTS = compareCode(CODE_MAKER, codeBreaker);

    // because of the values that we used to hint to the user
    // we have to find some dicey way to break the program
    // when the user guesses the code (all hints go to 0)
    if (hasGuessedCodeMaker(HINTS)) {
      break;
    }

    console.log(HINTS);

    rounds -= ONE;
  }

  declareResult(rounds);

  console.log(`CODE_MAKER: ${CODE_MAKER}`);
}

/**
 * Infinitely keeps playing the game.
 *
 * Runs the App function in an infinite loop, with a delay between each run.
 * Resets the game state after each run.
 */
(async () => {
  while (true) {
    // Run the App function
    await App();

    // Wait for a specified time before the next run
    await sleep(WAITING_TIME);

    // Clear the screen
    clearScreen();

    // Reset the game state for replay
    CODE_MAKER = [0, 0, 0, 0];
    HINTS = [0, 0, 0, 0];
  }
})();
```

## Sources

- [wiki-play-mastermind][wiki-play-mastermind]
- [wikipedia-mastermind][wikipedia-mastermind]
- [Master mind in python][Master-mind-in-python]

#

[wiki-play-mastermind]: https://www.wikihow.com/Play-Mastermind
[wikipedia-mastermind]: https://en.wikipedia.org/wiki/Mastermind_(board_game)
[Master-mind-in-python]: https://dev.to/otumianempire/mastermind-board-game-implementation-in-python-26le
