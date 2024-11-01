# JavaScript Essentials: Part 7

This is the 7th part of this JavaScript Series (as a part of the whole) and in this part, we will look at how to break down our projects into small pieces so they are manageable. We will create some sort of separation of concerns, making our project appealing and easy to navigate. In all things there is a beautiful part and of course the ugly part. So, don't overdo it.

As mentioned earlier, our focus here is to break some part of our project into a separate file, export it then import it into our "main app". There are at the moment two ways to do this in JavaScript. Using the commonjs approach and also the ES6's modular approach. They are all great and we will look at both.

## CommonJs

The import and export with commonjs is the default when not specified. That is how we could do, `const readline = require("readline");`. _readline_ is a built-in package. We can use this approach on the third party or modules written in our project.

- Import with commonjs is done with `const someVarNameForTheModule = require("modNameOrPath");`.
- We export by doing, `module.exports = thingToExportOrStructuredObjectToExport`.

### Project

Let's kick off with a project to perform some math. We will create functions to add and subtract. Just these two.

- Create a project folder, _cmodule_, `cd && mkdir cmodule && cd cmodule`
- Initial the node project by doing, `npm init -y`
- You can choose to add, `"type": "commonjs"` to the _package.json_ file.

```json
{
  "name": "cmodule",
  "version": "1.0.0",
  "main": "index.js",
  "type": "commonjs",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

- Create two files, _lib.js_ and _main.js_, `touch lib.js main.js`
- Implement the body for the add in the _lib.js_

```js
function add(x, y) {
  // return the sum of x and y
}
```

- Now that we have the functions implemented, we have to export them to be used for the best project in the world in our _main.js_. To export, we use `module.exports = functionName`. In our case, we do `module.exports = add`.

```js
 ...
 module.exports = add
```

- Here the entirety of _lib.js_ is just the add function. We exported _lib.js_ as the `add` function. So we can import it as, `const someName = require("./lib");`
- In the _main.js_, we will import the _lib.js_ file and make use of `add` function.

```js
const lib = require("./lib");
// we did, "./lib" because main.js and lib.js are in the same folder.

console.log(lib(1, 2));
```

- Let's add the subtraction function

```js
function sub(x, y) {
  // returns the difference x and y
}
```

> You are supposed to implement these functions yourself 🙂

- The question is, how do we export `sub`? Try it and access it inside _main.js_
- Know that, when we do, `module.exports = X`, `X` is exported as a whole module so when we import `const moduleName = require("moduleName");`, we directly get access to `X`. So we can not export another value with this same approach.
- In a case such as this, we can export both `add` and `sub` by exporting them as a group (object).

```js
 ...
 module.exports = { add, sub}
```

- Now when we import in _main.js_ we can do

```js
const lib = require("./lib");

console.log(lib.add(1, 2));
console.log(lib.sub(1, 2));
```

> the _lib_ module is exported as an object so we can do, `moduleName.add` and `moduleName.sub`.

- We can also import by doing, `const {add, sub} = require("./lib");`

```js
const { add, sub } = require("./lib");

console.log(add(1, 2));
console.log(sub(1, 2));
```

- There is another way to do multiple exports

```js
exports.add = function add(x, y) {
  // return the sum of x and y
};

exports.sub = function sub(x, y) {
  // return the difference of x and y
};
```

Or

```js
exports.add = function (x, y) {
  // return the sum of x and y
};

exports.sub = function (x, y) {
  // return the difference of x and y
};
```

- `exports.alias = someThing` and `exports.someThing= someThing` or also works like `modules.exports = { someThing }`. I'd usually choose the `exports.alias = someThing` because, the `module.exports = { ... }` could extra lines.

## ES Module

The import and export with the ES module style is not the default currently and as such must be specified explicitly by setting the _type_ property to _"module"_ in the _package.json_ file. In this case, we would be able to do, `import readline from "readline";` instead of `const readline = require("readline");`. We replaced the `const` with `import`, the `=` and `require` with `from`.

- ES module import is done with `import someVarNameForTheModule from  "modNameOrPath";`.
- We export by doing, `export default thingToExportOrStructuredObjectToExport` or `export thingToExportOrStructuredObjectToExport`.

### Project

We will build a similar project using the ES module style of import and export. We will create functions to add and subtract just as we did previously. So you can copy and paste this time.

- Create a project folder, _emodule_: `cd && mkdir emodule && cd emodule`
- Initial the node project: `npm init -y`
- Add, `"type": "module"` to the _package.json_ file.

```json
{
  "name": "emodule",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

- Create two files, _lib.js_ and _main.js_: `touch lib.js main.js`
- Implement the body for the add in the _lib.js_

```js
function add(x, y) {
  // return the sum of x and y
}
```

- Now that we have the `add` function implemented, we have to export it to be used for the best project in the world in our _main.js_. To export, we can use `export default functionName`. In our case, we do `export default add`.

```js
 ...
 export default add
```

- We could have also done

```js
 export default function add(...) { ... }
```

- Here the entirety of _lib.js_ is just the add function. We exported _lib.js_ as the `add` function. So we can import it as, `import someName from "./lib";`
- In the _main.js_, we will import the _lib.js_ file and make use of `add` function.

```js
import lib from "./lib";
// we did, "./lib" because main.js and lib.js are in the same folder.

console.log(lib(1, 2));
```

- Let's add the subtraction function

```js
function sub(x, y) {
  // returns the difference x and y
}
```

- The question is, how do we export `sub`?
- In a case such as this, we can export both `add` and `sub` by exporting them as a group (object).

```js
 ...
 export default { add, sub }
```

- Now when we import in _main.js_ we can do

```js
import lib from "./lib.js";

console.log(lib.add(1, 2));
console.log(lib.sub(1, 2));
```

- We can also import by doing, `import {add, sub} from "./lib";`

```js
import { add, sub } from "./lib";

console.log(add(1, 2));
console.log(sub(1, 2));
```

- There is another way to do multiple exports

```js
export function add(x, y) {
  // return the sum of x and y
}

export function sub(x, y) {
  // return the difference of x and y
}
```

Or

```js
export const add = function (x, y) {
  // return the sum of x and y
};

export const sub = function (x, y) {
  // return the difference of x and y
};
```

- With this sort of approach, it is either, we bundle the whole exports as one import or access individual imports one by one

```js
import * as lib from "./lib.js";

console.log(lib.add(1, 2));
console.log(lib.sub(1, 2));
```

OR

```js
import { add, sub } from "./lib.js";

console.log(lib.add(1, 2));
console.log(lib.sub(1, 2));
```

## Summary

To use commonjs or es module import and export style is relative. commonjs comes with no configurations, so one would ask why not use it as is? `module.exports = someObject` is the same as `export default someObject`. We can import with `const someObject = require("pathToModule");` and `import someObject from "pathToModule";`. I like said, whichever you choose is okay.

These are some rules that I try to stick to when I am developing my backend projects:

- I avoid default export or module exports as much as possible and use the individual object export
- If I have a controller, I use a default/module export with exporting any other thing from that same file. So whenever I use `module.exports` or `export default`, I don't do any other export from the same file
- I either use an object to group my constants and default export it or do individual exports.

Can you guess what is next? Well, we'd start doing some backend magics.

## Side project

If it challenges you, rewrite the mastermind program using multiple files. While on the topic I will challenge you. Complete this project. Either rewrite it for it to work or do whatever you have got to do to make it work.

```js
/**
 * Simple User Authentication Logic
 *
 * Concepts Covered:
 * -> Variables
 * -> functions
 * -> conditionals
 *
 * Description
 * -> Create a login system where users can sign up with an email and password, and then attempt to log in.
 * -> Store user data in memory (using an array or object), and compare the entered credentials with the stored ones during login.
 *
 * Challenge
 * -> Implement password validation with the following rules. Password must:
 *  - not be null or empty, hence, required
 *  - be at least six characters
 *  - must have at least one of the special characters: !, @, $, _, -
 *  - have at least one uppercase
 *  - have at least one lowercase
 *  - have at least one number
 * -> Implement email validation with the following rules. Email must:
 *  - not be null or empty, hence, required
 *  - not exceed 256 characters in length
 *  - not contain prohibited characters (spaces, quotes, parentheses, brackets, comma, semicolon, colon, exclamation)
 *  - have a valid syntax (local part + "@" + domain + "." + tld)
 *  - not have 'email' in it
 *  - Local Part (Username):
 *      - Maximum length: 64 characters
 *  - Domain:
 *      - Maximum length: 253 characters
 *  - TLD (Top-Level Domain):
 *      - Must be one of the recognized TLDs (e.g., .com, .org, .net, etc.)
 *      - Maximum length: 6 characters
 */

const readline = require("readline");
const crypto = require("node:crypto");

// users will an object with the key as the email because we intend to make the email unique
// another approach is to generate some random string for the key (the key must be unique)
// so that in the USERS object we can have { keys: {email, password}, ...}
// another approach is to use an array where we'd have [{email, password}, ...]
// try both approaches and let us know what is best
const USERS = {};

// expected actions are either login or signup
const AUTH_ACTIONS = {
  LOGIN: "login",
  SIGNUP: "signup",
};

// We are expecting that the user input will indicate what action to be performed
// and the data to be used.
// Eg: [action] [email] [password]
async function getUserInput(question) {
  const ReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return await new Promise((resolve) => {
    ReadLine.question(question, (answer) => {
      resolve(answer);
      ReadLine.close();
    });
  });
}

// We expect the user to enter-> [action] [email] [password]
function isValidInputFormat(input = "") {
  return input.split(" ").length === 3;
}

// This function should return an object with the property, action, email and password
// We could also have done, { action, data: { email, password } }
function destructureInput(input = "") {
  const [action, email, password] = input.split(" ");
  return {
    action,
    email,
    password,
  };
}

function isValidationAction(action = "") {
  return action && Object.values(AUTH_ACTIONS).includes(action);
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// usually, password validators will return a boolean, whether the password is valid or not
// however, we should consider adding an error message too
function isValidPassword(password = "") {
  // not be null or empty, hence, required
  if (!password || password === "") {
    return {
      isValid: false,
      message: "Password is required",
    };
  }

  // TODO: Complete the body

  // at this point, we've met all the rules we've set however there are some values
  // that will pass through because of the approach we took
  return {
    isValid: true,
    message: "",
  };
}

function isValidEmail(email = "") {
  //  - not be null or empty, hence, required
  if (!email || email === "") {
    return {
      isValid: false,
      message: "Email is required",
    };
  }

  // TODO: Complete the body

  return {
    isValid: true,
    message: "",
  };
}

// will return undefine or the user object
function findUserByEmail(email) {
  return USERS[email];
}

// hashes the password using sha256, we could use something better
// usually something like bcrypt, argon, etc
function hashPassword(password) {
  return crypto.hash("sha256", password);
}

function isValidHash(password, passwordHash) {
  return hashPassword(password) === passwordHash;
}

// When signing up, we have to make sure that the email doesn't exist
// The email and password are valid
// Then generate a key that hasn't been used and create an object
// and assign an object of the credentials as a value
// Log that signup is successful and log the key and email of the user
function signUpLogic({ email, password }) {
  const user = findUserByEmail(email);
  if (user) {
    return {
      success: false,
      message: "User with such email already exists",
    };
  }

  const passwordHash = hashPassword(password);

  USERS[email] = { email, password: passwordHash };

  return {
    success: true,
    message: "User created successfully, you can now login",
  };
}

// When logging in, we have to make sure that the email exists
// We have to validate the email and password
// Opinion here: I learned from one of the devs that there is no need to
// validate data that you are not going to write to the DB
// What do you think
function loginLogic({ email, password }) {
  const user = findUserByEmail(email);
  if (!user) {
    // here the message could just be invalid credentials
    return {
      success: false,
      message: "User with not found",
    };
  }

  if (!isValidHash(password, user.password)) {
    return {
      success: false,
      message: "Invalid credentials",
    };
  }

  return {
    success: true,
    message: `${user.email} has logged in`,
  };
}

async function App() {
  console.clear();
  console.log("Running authentication app");

  const userInput = await getUserInput("\n$ ");

  if (["help", "h", "about"].includes(userInput)) {
    console.log(
      "About: Simple User Authentication Logic" +
        "\n- Expected format->[action] [email] [password]" +
        "\n\t[action] can be 'signup' or 'login' followed by email and password" +
        "\n" +
        "\n- Expected format->[action]" +
        "\n\t[action] can be 'exit', 'quit', 'list', 'l, 'about', 'help', or 'h'" +
        "\n\t\t- [exit|quit]: exits or quits the program" +
        "\n\t\t- [list|l]: list the user emails available" +
        "\n\t\t- [about|help|h]: displays the about page"
    );
    return;
  }

  if (["list", "l"].includes(userInput)) {
    console.clear();
    console.log("Users\n-----");
    for (const user of Object.values(USERS)) {
      console.log(`${user.email}`);
    }
    return;
  }

  if (["exit", "quit", "\n"].includes(userInput)) {
    console.clear();
    console.log("Application ended");
    process.exit();
  }

  if (!isValidInputFormat(userInput)) {
    console.log(
      "FormatError: Invalid date format. Expected format->[action] [email] [password]"
    );
    return;
  }

  const { action, email, password } = destructureInput(userInput);

  if (!isValidationAction(action)) {
    console.log("FormatError: Invalid action. Expected->login|signup");
    return;
  }

  const emailValidation = isValidEmail(email);
  if (!emailValidation.isValid) {
    console.log(emailValidation.message);
    return;
  }

  const passwordValidation = isValidPassword(password);
  if (!passwordValidation.isValid) {
    // It is not a good idea to trust what API (message) you are using, especially if the
    // message is from a vendor (a 3rd party and the error messages aren't predefined)
    // Usually, I'd just say invalid credentials or throw some error that the client can catch
    // and knowing the error type, they'd be certain of what to do based on the rules
    // the client has set (just print everything out, all the rules regarding a valid password)
    // And most vendors will just return true or false but in our case, we'd add a message
    console.log(passwordValidation.message);
    return;
  }

  // had we several actions, we could use the switch instead
  if (action === AUTH_ACTIONS.LOGIN) {
    // console.log("We are doing a login");
    const { success, message } = loginLogic({ email, password });
    if (!success) {
      console.log(message);
      return;
    }

    console.log(message);
  } else if (action === AUTH_ACTIONS.SIGNUP) {
    // console.log("We are doing a signup");
    const { success, message } = signUpLogic({ email, password });
    if (!success) {
      console.log(message);
      return;
    }

    console.log(message);
  } else {
    console.log(
      `FormatError: Action must be one of ${Object.values(AUTH_ACTIONS)}`
    );
  }
}

(async () => {
  while (true) {
    // Run the App function
    await App();
    await sleep(5000);
  }
})();
```
