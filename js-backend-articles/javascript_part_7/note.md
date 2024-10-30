# JavaScript Essentials: Part 7

This is the 7th part of this JavaScript Series (as a part of the whole) and in this part we are going to look at how to break down our projects into small pieces so that they are manageable. We will group create a sort of separation of concerns, making our project appealing and easy to navigate. In all things there is a beautiful part and of course the ugly part. Don't over do it.

As mentioned earlier, our focus here is a to break some part of our project into a separate file, export it then import it into our "main app". There are at the moment two ways to do this in JavaScript. Using the commonJs approach and also the ES6's modular approach. They are all great and we will look at both.

## CommonJs

The import and export with commonjs is the default when not specified. That is how we were able to do, `const readline = require("readline");`. _readline_ is a builtin package. We can use this approach on third party or modules that we have written in out project.

- Import commonjs is done with `const someVarNameForTheModule = require("modNameOrPath");`.
- We export by doing, `module.exports = thingToExportOrStructuredObjectToExport`.

### Project

Let's kick off with a project to perform some math. We will create functions to add and subtract. Just these two.

- Create a project folder, _cmodule_, `cd && mkdir cmodule && cd cmodule`
- Initial the node project by doing, `npm init -y`
- Create two files, _lib.js_ and _main.js_, `touch lib.js main.js`
- Implement the body for the add in the _lib.js_

  ```js
  function add(x, y) {
    // return the sum of x and y
  }
  ```

- Now that we have the functions implemented, we have to export them to be used for the best project in the world in our _main.js_. To export, we user `module.exports = functionName`. In our case, we do `module.exports = add`.

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

  > the _lib_ module eas exported as an object so we can do, `moduleName.add` and `moduleName.sub`.

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
