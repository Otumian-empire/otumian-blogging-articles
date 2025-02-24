# Error handling and Middlewares

-   Environmental variables
-   Middlewares
-   Validation Middleware
-   error handling: we are using jsonwebtokens too

In the previous excerpt, [Validation, Authentication and Authorization with Libraries][prev-article], we used Joi for request validation and JsonWebtoken to generate the auth tokens.

## Environmental variables

When we were generating the JWT for our auth token, we passed a secret. Usually, as recommended, the secret is passed as an environmental variable. An environmental variable is a configuration value (key-value) passed to or access from the OS. With this we can pass data to our api wihtout having to embed the configuaration value into the api (as a exposed literal).

Open yur console/terminal and enter, `node`. On the node REPL, enter, `process.env`. This is what I see:

```sh
Users-MacBook-Pro:expense-tracker-simple-api user$ node
Welcome to Node.js v22.12.0.
Type ".help" for more information.
> process.env
{
  NVM_INC: '/Users/user/.nvm/versions/node/v22.12.0/include/node',
  TERM_PROGRAM: 'vscode',
  NVM_CD_FLAGS: '',
  TERM: 'xterm-256color',
  SHELL: '/bin/bash',
  HOMEBREW_REPOSITORY: '/opt/homebrew',
  TMPDIR: '/var/folders/p8/60cwd37n1ds64r381rjkt8g80000gn/T/',
  TERM_PROGRAM_VERSION: '1.97.2',
  ORIGINAL_XDG_CURRENT_DESKTOP: 'undefined',
  MallocNanoZone: '0',
  NVM_DIR: '/Users/user/.nvm',
 ...
}
>
```

We can pass some configuration value to our node api by doing `KEY_1=VALUE_1 KEY_2=VALUE_2 node`. And literally, when we ran this command, we see that these new added key-values appear as part of are response this time

> NB: you have to exit node's REPL by `control + C`

```sh
Users-MacBook-Pro:expense-tracker-simple-api user$ KEY_1=VALUE_1 KEY_2=VALUE_2 node
Welcome to Node.js v22.12.0.
Type ".help" for more information.
> process.env
{
  KEY_1: 'VALUE_1',
  KEY_2: 'VALUE_2',
  NVM_INC: '/Users/user/.nvm/versions/node/v22.12.0/include/node',
  NVM_CD_FLAGS: '',
  TERM: 'xterm-256color',
  SHELL: '/bin/bash',
  HOMEBREW_REPOSITORY: '/opt/homebrew',
  TMPDIR: '/var/folders/p8/60cwd37n1ds64r381rjkt8g80000gn/T/',
  TERM_PROGRAM_VERSION: '1.97.2',
  ORIGINAL_XDG_CURRENT_DESKTOP: 'undefined',
  MallocNanoZone: '0',
  NVM_DIR: '/Users/user/.nvm',
  ...
}
>
```

You should see `KEY_1: 'VALUE_1'` and `KEY_2: 'VALUE_2'`.

> To see how this will work in our api, we can create a temporary file and print out the content of `process.env`

We can access the values passed using the key. So if we passed a secret, `SECRET="some secret" node temp_file.js` and we enter, `console.log(process.env.SECRET)`. We would see that the out put matches the the value passed.

```sh
SECRET="some secret" node temp_file.js
some secret
```

This approach becomes impractical as such we use a `.env` file. `env = environment`. Create a file at the root of your project and call it `.env`. Pass the all your key-value configs in there.

Before `nodejs 20`, we needed a library to help use access `.env` values. We will discuss it later. However for all versions above, all we have to do is pass the `--env-file` file and set its value to the path to the `.env` file path: `node --env-file=.env temp_file.js`

```sh
node --env-file=.env temp_file.js
some secret
```

If you are getting anything other than the actual values passed, we can resolved this with a library called [dotenv][dotenv]. You should know how to install packages in nodejs by now. The packages name is `dotenv`.

> `npm i dotenv`

In our file, we can add, `require("dotenv/config")`, at the top of your file. This time we just run, `node temp_file.js`

```js
require("dotenv").config();
// if the above doesn't work for you, try the approach below
// require("dotenv/config")

console.log(process.env.SECRET);
```

> If you are fimiliar with [git][git], make sure you create and pass the path to the `.env` file into `.gitignore`
> For you who is not familiar with git, git is a tool for managing your source code.
> `.env` holds import configuaration values and exposing them leads to a potential exploitation. Be careful but don't panic.

With information, it is upto you now to create a `.env` file and pass any configuration value and access it in the app as it should be.

> just to be safe, check if the value `undefined` and responsed appropriately - read about the [difference between null and ndefined][null-vs-undefined]

> Since we don't have to make our `.env` open, we create a `sample.env` file and pass the keys, only, so that developers can know what the `.env` file expects.

## Middlewares

We have discussed what a controller is. As a reminder, and perhaps if we haven't discussed it. A controller is function (method) that handles requests, It is of the forms:

```js
[async] function FunctionName(requestObject, responseObject) {
    // do something on the request
    // return a response
}
```

The point I want us to understand is that, controllers are request handlers.

Request handlers are usually is two forms:

-   Controllers
-   Middlewares

Briefly, a middleware is a request handler that seats between a route and a controller.

```js
router.method("/some route", middlewares, controller);
```

A middleware looks like:

```js
[async] function FunctionName(requestObject, responseObject, nextMiddleware) {
    // do something on the request
    // return a response if there is an error
    // else go the the next middleware
}
```

The only difference here is that it has a third parameter which is dubbed, `next`, most often. `next` here is a there next middleware in the pipeline (controller is a like a middleware).

A middleware has access to the request and response object and as such can intercept a request to alter (remove, add or update) the payload. In our `index.js` file, we have the following:

```js
// parse request body as json
app.use(express.json());

// register routers
app.use(userEndpoints);
app.use(expendituresEndpoints);
```

-   `app.use(express.json());` is a middleware that parses the request body into json
-   `app.use(userEndpoints);` that exposes the user endpoints to the main app
-   `app.use(expendituresEndpoints);` that exposes the expenditure endpoints to the main app

## Resources

<!--  -->

#

[prev-article]: https://dev.to/otumianempire/validation-authentication-and-authorization-with-libraries-ip3
[nodejs-how-to-read-environment-variables-from-nodejs]: https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs
[dotenv]: https://www.npmjs.com/package/dotenv
[git]: https://git-scm.com/
[null-vs-undefined]: https://stackoverflow.com/questions/5076944/what-is-the-difference-between-null-and-undefined-in-javascript
