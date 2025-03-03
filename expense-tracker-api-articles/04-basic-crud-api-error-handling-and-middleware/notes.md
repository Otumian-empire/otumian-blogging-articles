# Error handling and Middlewares

-   Environmental variables
-   Middlewares
-   Validation Middleware
-   Error Handling middleware

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

Let's create a middleware that logs the following about a request:

-   time
-   http method
-   and route the client visited

> Most of this information can be found on the request object. `req.method` and `req.originalUrl`.

```js
// add console logging middleware
app.use((req, res, next) => {
    const log = `${req.method} :: ${
        req.originalUrl
    } - ${new Date().toISOString()}`;

    console.log(log);

    return next();
});
```

Put this middleware after (or below) `app.use(express.json());`.

> One thing to know is that, middlewares are executed in the order they have been set.
> `app.use(express.json());` comes before any endpoint is hit, so data is parsed before it gets to that route.

With this in mind, we can now put the middleware above the registered routers (or routes), but below `app.use(express.json());`.

On protected routes, _routes that required jwt auth_, we can have a middleware that checks if the incoming request has a jwt token or not.

> If your are wondering what would happen or what to do when there is no jwt, then, you should return an appropriate message or error response. The response object, _res_, is at your exposure.

Apparently, none of the user routes requires jwt auth however, the expenditures does. Let's create another middleware that checks if a request jwt.

> check the `authorize` function on how to access the jwt

Have you seen this code snippet and how many have you seen? About five?

```js
const authReponse = authorize(req.headers.authorization);
if (!authReponse.isAuthorized) {
    return res.status(200).json({
        success: false,
        message: "Unathorized, please login",
    });
}
```

There could be more when we are more routes that will require jwt auth.

This time we are going to create a function for this middleware. Try your hands on it.

```js
/* checks the header of the incoming request if there is a jwt */
function hasJwt(req, res, next) {
    // implementation before calling next function
}
```

And create another middleware to actually do the authentication.

```js
/* authenticates and authorize user */
function isAuthorized(req, res, next) {
    // implement user authentication here
}
```

> Create a file called `middlewares.js` and name the first middleware for logging the request (details) as `logRequest`.

> `(req, res, next)` can have any names as far as the order (positions) of the parameters are respected.

Here is what I have or what your should look like:

```js
// middlewares.js;
const jwt = require("jsonwebtoken");

/* Logs the request method, route and the time the request was made */
function logRequest(req, res, next) {
    const log = `${req.method} :: ${
        req.originalUrl
    } - ${new Date().toISOString()}`;

    console.log(log);

    return next();
}

/* checks the header of the incoming request if there is a jwt */
function hasJwt(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(200).json({
            success: false,
            message: "Unathorized, No auth token found",
        });
    }

    return next();
}

function isAuthorized(req, res, next) {
    const authorization = req.headers.authorization;

    const JWT_SECRET = process.env.SECRET;
    if (!JWT_SECRET) {
        return res.status(200).json({
            success: false,
            message: "Something went wrong",
        });
    }

    const { userId, email } = jwt.verify(authorization, JWT_SECRET);

    // now we can fetch user with email and userId
    const isAuthenticUser = users.find(
        (user) => user.email === email && user.id === userId
    );

    if (!isAuthenticUser) {
        return res.status(200).json({
            success: false,
            message: "Unathorized, No user matched",
        });
    }

    req.user = { userId, email };

    return next();
}

module.exports = { logRequest, hasJwt, isAuthorized };
```

> `req.someProperty = someValue`, where `someProperty` doesn't overwrite some existing keys value.
> we send a message to the next request handler and access it in the same manner. In the life cycle of the request, the request object is shared through out.

Now we can update the `list expenditures` route to add the `hasJwt` and `isAuthorized`.

```js
// list expenditures
app.get("/expenditures", (req, res) => {
    // extra auth token from headers
    const authReponse = authorize(req.headers.authorization);
    if (!authReponse.isAuthorized) {
        return res.status(200).json({
            success: false,
            message: "Unathorized, please login",
        });
    }

    // parse the auth user id
    const { userId } = authReponse;

    // ====================
    // get the query string and check if it not a number or something
    // that can be a number else set a default filter value of 0
    let amountMoreThan = Number(req.query.amountMoreThan);
    if (isNaN(amountMoreThan) || amountMoreThan < 0) {
        amountMoreThan = 0;
    }

    return res.json({
        success: true,
        data: expenditures.filter(
            (row) => row.userId === userId && row.amount > amountMoreThan
        ),
    });
});
```

becomes

```js
// list expenditures
app.get("/expenditures", hasJwt, isAuthorized, (req, res) => {
    // parse the userId and email from the req.user
    const { userId /*,  email */ } = req.user;

    // ====================
    // get the query string and check if it not a number or something
    // that can be a number else set a default filter value of 0
    let amountMoreThan = Number(req.query.amountMoreThan);
    if (isNaN(amountMoreThan) || amountMoreThan < 0) {
        amountMoreThan = 0;
    }

    return res.json({
        success: true,
        data: expenditures.filter(
            (row) => row.userId === userId && row.amount > amountMoreThan
        ),
    });
});
```

THe point here is that we can add a middleware(s) between the route and request handler (controller).

Another exercise here is to do the same for the rest.

-   add ` hasJwt, isAuthorized,`
-   then remove

    ```js
    // extra auth token from headers
    const authReponse = authorize(req.headers.authorization);
    if (!authReponse.isAuthorized) {
        return res.status(200).json({
            success: false,
            message: "Unathorized, please login",
        });
    }
    ```

-   update

    ```js
    // parse the auth user id
    const { userId } = authReponse;
    ```

-   to

    ```js
    // parse the auth user id
    const { userId } = req.user;
    ```

> if you are wondering where `req.user` is from, then it is from (or was set in) `isAuthorized` middleware.

Try logging in, and you would see a log, `POST :: /users/login - 2025-03-02T14:23:59.310Z`. The date may differ but you should have a similar output.

Using the jwt obtained on the expenditures endpoints, logs the following:

-   `POST :: /expenditures - 2025-03-02T14:28:17.173Z`
-   `GET :: /expenditures - 2025-03-02T14:28:41.074Z`

At this point your expenditure routes should look more or less like

```js
router.get("/route", hasJwt, isAuthorized, (req, res) => {
    /*  */
});
```

> One thing you'd notice is that `hasJwt, isAuthorized,` is appearing on all the routes and we might as well put it at the root of our expenditures endpoint.
> For starters this is alright however since it is the same for all its the routes we can go ahead on put it on the root endpoint.
> Were there to be unique situations where the middleware will be an issue then we can decide to put or remove them on the affected route.

So we can either have it as,

```js
app.use(hasJwt, isAuthorized, expendituresEndpoints);
```

or

```js
router.get("/route", hasJwt, isAuthorized, (req, res) => {
    /* some expenditure request handling */
});
```

The former is more welcoming but any of them works.

We can update our index file to update our index file from

```js
// register routers
app.use(userEndpoints);
app.use(hasJwt, isAuthorized, expendituresEndpoints);
```

to

```js
// register routers
app.use("/users", userEndpoints);
app.use("/expenditures", hasJwt, isAuthorized, expendituresEndpoints);
```

and we will go into `userEndpoints` and `expendituresEndpoints` then remove the base endpoints (routes). `app.delete("/expenditures/:id",...)` becomes, `app.delete("/:id",...)`.

## Validation Middleware

We are already familiar with the concept of validation, be it, writing it ourselves or using a library such as [Joi][joi]. We also know that we can pass data to our api via the headers, query strings, request parameters and body. So here, we can tell where to expect the valisation to be to done (as in, take its data from).

Let's use signup for a case study.

```js
const { email, password } = req.body;

const validationResponse = authValidationSchema.validate({
    email,
    password,
});
if (validationResponse.error) {
    return res.status(200).json({
        success: false,
        message: validationResponse.error.message,
        // message: validationResponse.error.details[0].message,
    });
}
```

-   the data for the validation came from the body: `const { email, password } = req.body;`.
-   we call the `validate` method of a joi schema, `const validationResponse = authValidationSchema.validate({ ...})`
-   taking on some data

A normal middleware looks like:

```js
[async] function FunctionName(requestObject, responseObject, next) {
    // do something on the request
    // return a response
}
```

Which we should all know at this point. The point here is that we can pass data down to the middleware. We will create a function that returns request handler.

```js
function FunctionName(parameters) {
    return function (req, res, next) {
        /* do something */

        return next();
    };
}
```

In our case, the function parameters will be the validation schema of interest, followed by where we want to extract the data from (for the validation). Here request property can be: _body_, _params_, _query_ or _headers_.

> we can call this function any name you want, `validation, validationMiddleware, etc`

```js
/* validation middleware: takes schema and a request property*/
function validation(schema, requestProperty) {
    return function (req, res, next) {
        const validationResponse = schema.validate(req[requestProperty]);

        if (validationResponse.error) {
            return res.status(200).json({
                success: false,
                message: validationResponse.error.message,
                // message: validationResponse.error.details[0].message,
            });
        }

        return next();
    };
}
```

This should look familiar.

-   We take the validation `schema` and pass it as an argument and also provide where the data will be extracted from via `requestProperty`.
-   `req[requestProperty]`, if `requestProperty` was body will result to `req["body"]` which is `req.body`.

The _sign up_ route looks like `app.post("/signup", (req, res) => {...})`. With the new information we have now we will add the validation middleware pass the schema and update the controller to remove the validation (done in the controller so that the controller will just be used for the logic needed).

The `sign up` route should look like:

```js
app.post("/signup", validation(authValidationSchema, "body"), (req, res) => {
    /*  */
});
```

We can apply the same refactor to the _login_.

```js
app.post("/login", validation(authValidationSchema, "body"), (req, res) => {
    /*  */
});
```

As an exercise, refactor the expenditure routes to make use of the general validation middleware and passing the appropriate schema to it. We can even go the extra mile by also validating the the request parameters and string queries.

This how is how our endpoint are supposed to be looking like:

```js
/* /users */
app.post("/signup", validation(authValidationSchema, "body"), (req, res) => {
    /*  */
});

app.post("/login", validation(authValidationSchema, "body"), (req, res) => {
    /*  */
});

/* /expenditures*/
app.get("/", validation(expenditureQuerySchema, "query"), (req, res) => {
    /*  */
});

app.get("/:id", validation(IdValidationSchema, "params"), (req, res) => {
    /*  */
});

app.post("/", validation(createExpenseSchema, "body"), (req, res) => {
    /*  */
});

app.put(
    "/:id",
    validation(IdValidationSchema, "params"),
    validation(updateExpenseSchema, "body"),
    (req, res) => {
        /*  */
    }
);

app.delete("/:id", validation(IdValidationSchema, "params"), (req, res) => {
    /*  */
});
```

## Error Handling middleware

I hope maybe, you have noticed, that we have been getting this kind of errors:

-   `TokenExpiredError: jwt expired`
-   `JsonWebTokenError: invalid token`

It is bound to occur at some point. Anyways, we have to generally handle errors that may occur in our api consumption (integration). One way to handle errors is to use `try-and-catch`. We discussed about `try-and-catch` in [JavaScript Essentials: Part 5][js-part-5].

We wrap the code we know might generate an error in a `try-and-catch` block and then return some default message when there is an error. Example:

```js
function someRequestHandler(req, res, next) {
    try {
        /* Do something */
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: "Something went wrong please, try again later.",
        });
    }
}
```

We have about six routes and for starts we can handle the errors simply just as shown above. There are case the above is okay. However, in the case of a commercial application, when an error occurs, we would want to know and resolve it right? The downside with the above implementation us that we may loss the error trace/stack, informing us what and where the error occurred. The point is, we won't know what caused the error. [Express][express] has what we call the _Error-handling middleware_, just like any middleware or request handler, has the `(req, res, next)=> {}`. WHat make this special is it actully has a four parameters instead of three: `(error, req, res, next)=> {}`. It is just like any order middleware but to get to it (in the pipeline or sequence of middlewares) we have to pass the error that we caught in the `catch (error) { /* */ }` to the `next` function. Example:

```js
function someRequestHandler(req, res, next) {
    try {
        /* Do something */
    } catch (error) {
        return next(error);
    }
}
```

So now, instead of returning a general message that, `"Something went wrong please, try again later.",` without even know what went wrong, now we have a devoted mechanism in place to parse and return appropriate error response.

The signature of our error-handling middleware will look like this:

```js
/* error-handling middleware */
function errorHandler(error, req, res, next) {
    /*  */
}
```

We will make use of the `instanceof` operator. The [instanceof][instanceof] operator check is an object is an instance of some class. So far we are aware of `TokenExpiredError` and `JsonWebTokenError`, which is as a result of using the jwt library.

Now we can return an appropriate response based on the error instance and a global message when we are not sure what this error is. We might was to write the error into a log file or some remote server, etc.

```js
// require TokenExpiredError and JsonWebTokenError from jwt
const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");
...


/* error-handling middleware */
function errorHandler(error, req, res, next) {
    if (error instanceof TokenExpiredError) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: please login",
        });
    }

    if (error instanceof JsonWebTokenError) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: please format your auth token",
        });
    }

    // anything else
    return res.status(500).json({
        success: false,
        message: "Internal server error, something went wrong please try again",
        // as if the same error would not occur again when the user tries again 😂
    });
}
```

I am a not a fan of relying on status codes. I believe my apis are a "third party" and as such sending back these status codes that uniquely identifies these specific errors are too much. What do you want the client consuming your api to do when there is a `400` error response or a `500` error response? Some `http` clients throw errors when the status code returned is not `200` or `201`. So looking at my self as "third party", I would an error code, status code or another key, and immediately that key is present, then something went wrong. I have consumed a _3rd_ party api where there is an success and error section.

```json
{
    "success": true,
    "statusCode": "000001",
    "error": {},
    "data": {}
}
```

Anyways, as we know, we can put this error habdling middleware anywhere but it is best bellow our registered endpoints. As an exercise, wrap your controllers, in fact, all your request handler must be wrapped in a `try` and `catch` and pass the error to the next function. Don't do this to the error handling middleware. Frankly do it for those that need it, those that you expext that something could go wrong. There are some funtions that I don't `try-and-catch`. Why? The controller has a `try` and `catch`.

So what ever we are going to update will look like:

```js
function SomeFunction(req, res, next) {
    try {
        /*  */
    } catch (error) {
        return next(error);
    }
}
```

When all is done, there is a likehood that we'd get an error respose such as:

```json
{
    "success": false,
    "message": "Unauthorized: please format your auth token"
}
```

Another case of an error is when the user hits an endpoint that doesn't exist. How do we handle that one and would our error handling middleware account for it? No, the error handling middleware won't account for it.

Well, the idea is this, we hit an endpoint say, `GET http://localhost:3000/audit`. We never defined and endpoint/route for audit. So in the chain of middlewares and requests handlers, in the pipeline, nothing will touch this request so express will handle it say:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Error</title>
    </head>
    <body>
        <pre>Cannot GET /auditing</pre>
    </body>
</html>
```

Express handled it but we want to return a `JSON` not `html`. So we add one final middleware, which will just return something like endpoint not found.

Again, will put this at the after our error handling middleware.

```js
/* not found error-handling middleware */
function notFoundHandler(req, res, next) {
    // anything else
    return res.status(404).json({
        success: false,
        message: "Endpoint not found, kindly read our documentation",
    });
}
```

The function is used after the error-handling middleware

```js
...
/* global error handling */
app.use(errorHandler);

/* handle cannot [METHOD] some endpoint */
app.use(notFoundHandler);
...
```

And we get a json message

```sh
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 79
ETag: W/"4f-ZeAuDFW/On8o/z3qFxGFjcV9e4E"
Date: Mon, 03 Mar 2025 09:01:58 GMT
Connection: close

{
  "success": false,
  "message": "Endpoint not found, kindly read our documentation"
}
```

## Resources

-   [joi]
-   [Validation, Authentication and Authorization with Libraries][prev-article]
-   [How to read environment variables from Node.js][nodejs-how-to-read-environment-variables-from-nodejs]
-   [git]
-   [null-vs-undefined]
-   [JavaScript Essentials: Part 5][js-part-5]
-   [express]
-   [instanceof]

#

[joi]: https://www.npmjs.com/package/joi
[prev-article]: https://dev.to/otumianempire/validation-authentication-and-authorization-with-libraries-ip3
[nodejs-how-to-read-environment-variables-from-nodejs]: https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs
[dotenv]: https://www.npmjs.com/package/dotenv
[git]: https://git-scm.com/
[null-vs-undefined]: https://stackoverflow.com/questions/5076944/what-is-the-difference-between-null-and-undefined-in-javascript
[js-part-5]: https://dev.to/otumianempire/javascript-essentials-part-5-3c9m
[express]: https://www.npmjs.com/package/express
[instanceof]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
