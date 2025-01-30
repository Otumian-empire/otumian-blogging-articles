# Validation, Authentication and Authorization with Libraries

In the previous excerpt, we discussed validation, authentication and authorization. We mentioned that validation is a mechanism to ensure that data passed to the api is in an accepted format. Authentication is verifying the legitimacy of a user's claim and authorization is what a user can and cannot do. We went ahead and implemented these concepts. In this excerpt, we will look at how to use libraries/packages for validation and auth.

## Content

-   Separation of concerns
-   Validation with Joi
-   Auth with JSON Web Tokens

## Separation of concerns

We started sectioning or moving some of our code into different files. We have the data we are manipulating in the `data.js` file, the validations in `validations.js`, and so on. This process can get complicated and out of hand, so don't push it. We are building a simple application.

As usual, we are building on top of the previous codebase which can be found [on GitHub][previous-code-on-github] and read more on it on [Validation, Authentication and Authorization][previous-article].

The api we are building is titled Expense Tracker. We have users and their expenses. So we are dealing with two entities. As the project grows and the content of the `index.js` grows, we have to pull certain codes out or group them to be precise. This is not a must, we can write all our code in one file and it will work fine. There are advantages and disadvantages to it, however, it is better to know when to group your functionalities.

In the `index.js`, which serves as the entry point into our application, there are:

-   application configurations, which will include top-level middlewares, etc
-   routes for expenses
-   routes for users
-   there are some snippets we can have as functions and some literals as constants
-   app, listen on port 3000 (server running here), may do database connections when the server starts, etc

Consider, `app.SOME_METHOD(route, request handlers)` `SOME_METHOD` is the http method, is the definition of how routes are passed with some middlewares and the request handlers are passed or handled. We have `app.get("/expenditures", (req, res) => {...})` where `"/expenditures"` is the routes and `(req, res) => {...}` is a request handler. We can separate the request handler as a standalone function. We already know how to create functions (and even async functions). When we create a function outof `(req, res) => {...}`, we can pass it as, ``app.get("/expenditures", functionName)`. That is it. We can choose to keep the routes and the request handlers (controllers) in the same file or separate them.

We can have a file, just because our project is small else we would use folders, for the list above.

### Taking actions

These are some of the changes we can make (follow along):

-   create a file for `user` and `expenditures` endpoints. So we'd have `users.js` and `expenditures.js`.
    -   move the _login_ and _sign up_ endpoints into `users.js`
    -   move CRUD expenditure into `expenditures.js`
    -   there are imports that we have to take care of such as the validation functions, the data consumed and others.
    -   remove unused imports from the `index.js`
-   import and create router from express. We can name this route `app` so that it will be easier to maintain the current implementation as is. Or we can give it a custom name and replace `app` with the custom name. I will keep to `app` and export it at the very bottom of `users.js` and `expenditures.js`.

```js
// import at the very top
const app = require("express").Router();

// there are other code

// very bottom
module.exports = app;
```

-   in `users.js`, we have to import the validation functions and also the `crypto` package for creating the user ID (UUID). In all we will have an import like this:

```js
const app = require("express").Router();
const crypto = require("crypto");
let { users } = require("./data");
const { isValidEmail, isValidPassword } = require("./validations");

// the endpoints below

// the export
```

-   in `expenditures.js`

```js
const app = require("express").Router();
let { users, expenditures } = require("./data");
const { isValidName, isValidAmount, isValidDate } = require("./validations");
// the endpoints below

// the export
```

-   at this point, the `index.js` file should look more or less

```js
// import the express lib
const express = require("express");

// import lib for generating uuid
const crypto = require("crypto");

// data source imports
let { expenditures, users } = require("./data");
const { isValidEmail, isValidPassword } = require("./validations");

// validation

// create an express application
const app = express();

// parse request body as json
app.use(express.json());

// create a server that listens to requests on port 3000
app.listen(3000, () =>
    console.log(`Api running on ${"http://localhost:3000"}`)
);
```

-   we have to clean it since some of these imports are unused and we will import the routers we exported from `users.js` and `expenditures.js`.

```js
// import the express lib
const express = require("express");

// import the routers exported from users and expenditures
const userEndpoints = require("./users");
const expendituresEndpoints = require("./expenditures");

// create an express application
const app = express();

// parse request body as json
app.use(express.json());

// register routers
app.use(userEndpoints);
app.use(expendituresEndpoints);

// create a server that listens to requests on port 3000
app.listen(3000, () =>
    console.log(`Api running on ${"http://localhost:3000"}`)
);
```

-   the signup and login work fine, you should test them too
-   we can create a new user (copy the newly created user's log into the data file)
-   update the http request for expenditures endpoints by adding `Authorization` to each request
-   the code for authorizing the user to browse their expenditures is only found in the `list expenditures` endpoint. Let's "copy" and "paste" it... 🥳🥳🥳 (that is what programmers do but software engineers will create a reusable block of code from it, isn't that right?)
-   let's a function for authorize in a file called `auth.js`. This function will take in the auth token and a boolean indicating if the token is authorized and an object which can be used to identify the user, `{ userId, email }`.
-   we want to change

```js
// extra auth token from headers
const authorization = req.headers.authorization;
if (!authorization) {
    return res.status(200).json({
        success: false,
        message: "Unauthorized, please log in",
    });
}

// decode auth token
const decodeToken = Buffer.from(authorization, "base64").toString();

// parse the decoded token into the email and userId
const [email, userId] = decodeToken.split(":");

// now we can fetch the user with email and userId
const isAuthenticUser = users.find(
    (user) => user.email === email && user.id === userId
);

if (!isAuthenticUser) {
    return res.status(200).json({
        success: false,
        message: "Unauthorized, please log in",
    });
}
```

-   into

```js
// auth.js;

const { users } = require("./data");

// pass the req.headers.authorization as argument
function authorize(authToken) {
    const response = {
        isAuthorized: false,
        userId: "",
        email: "",
    };

    if (!authToken) {
        return response;
    }

    // decode auth token
    const decodeToken = Buffer.from(authToken, "base64").toString();

    // parse the decoded token into the email and userId
    const [email, userId] = decodeToken.split(":");

    // now we can fetch the user with email and userId
    const isAuthenticUser = users.find(
        (user) => user.email === email && user.id === userId
    );

    if (!isAuthenticUser) {
        return response;
    }

    // here the token is valid
    response.isAuthorized = true;
    response.email = email;
    response.userId = userId;

    return response;
}

module.exports = { authorize };
```

-   let's add this guard into each expenditures endpoint.

```js
// we have to import the authorize function from auth.js

// extra auth token from headers
const authReponse = authorize(req.headers.authorization);
if (!authReponse.isAuthorized) {
    return res.status(200).json({
        success: false,
        message: "Unauthorized, please log in",
    });
}

// parse the auth user id
const { userId } = authReponse;
```

    > Try running some of these endpoints... we have passed the auth token and we have a guard in place. Don't believe everything I say 🙈

    > back to "copy and paste"... We will learn about middlewares later and update our to use middleware.

-   Running `list expenditures` is successful
-   we have to update `read expenditure` to account for the `userId` from the `auth response` and also the resource ID is not a number but a uuid. we will remove the checking if the `id` is a number and use `expenditures.find` (or filter if you want to but handle the rest) instead of `expenditures[id]`

```js
// read expenditure
app.get("/expenditures/:id", (req, res) => {
    // extra auth token from headers
    const authReponse = authorize(req.headers.authorization);
    if (!authReponse.isAuthorized) {
        return res.status(200).json({
            success: false,
            message: "Unauthorized, please log in",
        });
    }

    // parse the auth user id
    const { userId } = authReponse;

    // get the id of the requested resource from the params
    const id = req.params.id;

    const row = expenditures.find(
        (row) => row.userId === userId && row.id === id
    );
    if (!row) {
        // what status code do this should be passed here? 404 not not found? why??
        return res.status(200).json({
            success: false,
            message: `Resource with ID, '${id}' not found`,
        });
    }

    return res.status(200).json({
        success: true,
        data: row,
    });
});
```

-   When we run create, the record is created however is not assigned to the user who created it. Did you notice that? Create a very small request to fetch all expenditures or `console.log` the `expenditures` variable you are fetching the user's expenditures. This was because we added the `authorize`, from which we got `userId` but we didn't use it. All we have to do is add the `userId` to the expense record and generate a UUID (sample code is in the `users.js`, _sign up_).

```js
// generate uuid unique to this expense
const uuid = crypto.randomUUID();

// insert the new record
expenditures.push({
    id: uuid,
    userId,
    name: payload.name,
    amount: payload.amount,
    date: payload.date,
});
```

-   for `update expenditure`:

    -   to update the expenditure, we can find the index of this (expenditure of interest) and if we get the _index_, we can update it. There is the _map_ and match approach too where we _map_ the `expenditures` and match the resource ID to a record and update that record, reassigning the `expenditures` with the newly created array.
    -   remove the number checking for resource ID (did similar in `read expenditure`)
    -   replace `const row = expenditures[id];` with `const rowIndex = expenditures.findIndex(...)` accounting for the `userId`. We will use this `rowIndex` to assign value to `row` and also use it to _index_ the row we wanted to be updated from the `expenditures`.
    -   we will replace, `expenditures[id].PROPERTY = PROPERTY ?? row.PROPERTY;` with `expenditures[rowIndex].PROPERTY = PROPERTY ?? row.PROPERTY;
    -   update the `http` request to use the `uuid` instead of a number.

```js
// update expenditure
app.put("/expenditures/:id", (req, res) => {
    // extra auth token from headers
    const authReponse = authorize(req.headers.authorization);
    if (!authReponse.isAuthorized) {
        return res.status(200).json({
            success: false,
            message: "Unauthorized, please log in",
        });
    }

    // parse the auth user id
    const { userId } = authReponse;

    // get the id of the requested resource from the params
    const id = Number(req.params.id);

    // if the record is not found, rowIndex becomes -1
    const rowIndex = expenditures.findIndex(
        (row) => row.userId === userId && row,
        id === id
    );
    if (rowIndex === -1) {
        // what status code do this should be passed here? 404 not not found? why??
        return res.status(200).json({
            success: false,
            message: `Resource with ID, '${id}' not found`,
        });
    }

    const row = expenditures[rowIndex];

    // we have to validate the name, maybe, their name must have some number of characters
    // we have to make sure that amount is a number
    // we have to also make sure that the date is of the format, yyyy-MM-dd
    const { name, amount, date } = req.body;

    if (!name || !amount || !date) {
        return res.status(200).json({
            success: false,
            message: "name, amount and date for expense are required",
        });
    }

    // validate name if it is passed
    if (name && !isValidName(name)) {
        return res.status(200).json({
            success: false,
            message: "Name is invalid",
        });
    }

    // validate amount if it is passed
    if (amount && !isValidAmount(amount)) {
        return res.status(200).json({
            success: false,
            message: "Amount is invalid",
        });
    }

    // validate date if it is passed
    if (date && !isValidDate(date)) {
        return res.status(200).json({
            success: false,
            message: "Expense date is invalid",
        });
    }

    expenditures[rowIndex].name = name ?? row.name;
    expenditures[rowIndex].amount = amount ?? row.amount;
    expenditures[rowIndex].date = date ?? row.date;

    // there was a time I saw a 204 status - No content
    // since there was no data to return however we'll return the usual
    return res.status(200).json({
        success: true,
        message: "expenditure updated successfully",
    });
});
```

-   for `delete expenditure`:
    -   most of the changes to be done are similar to the update
    -   remove the number checking for the resource ID
    -   find the `rowIndex`, if it is `-1` then there is no row found
    -   pass the `rowIndex` in place of `id` in `expenditures = expenditures.filter((_, index) => index !== id);`
    -   Give it a try

At this point, we have :

-   rewritten most parts of this api
-   separated the endpoints into their various files
-   fixed file paths and imports and exports
-   fixed the resource ID validations
-   fixed or patched the auth mechanism
-   fixed managing resources, accounting for `userId`

> Make sure you have a working api by testing (hitting) each endpoint and that you get the appropriate response. Use console logs if you have to, read the error logs displayed in the console.

## Validation

I want to point out that even though we wrote most of our validations, we can use a library for that. As we discussed some time ago, a library is a piece of code that does something specific and can be reused, and bundled as one (as in whatever functionalities the library provides). Usually, libraries are well-versioned, maintained and tested. Using a library removes some sort of responsibility in maintaining some functionality. This would save time and reduce the chunks of code "we" write. There are also downsides to this. Some libraries may be outdated and be vulnerable to some attacks as a result of not being maintained and up to date with the current (nodejs) runtime. As such be careful with using third-party libraries.

For validation libraries, there are several and the one we will use today is [Joi][joi]. At the time of writing this excerpt, the current version was [17.13.3](https://joi.dev/api/?v=17.13.3). Spend some time on this [this](https://joi.dev/api/?v=17.13.3#general-usage) page just to see how to use [Joi][joi].

> By the way, run, `npm i joi`, to install Joi

### Replicating validations.js

> This is something we'd be doing on the side then integrate later.

From the general usage [page](https://joi.dev/api/?v=17.13.3#general-usage), validation with Joi is done in two simple steps.

-   Create a schema
-   Use the schema to validate your data
-   Handle the response, error and value. Error is the data that failed the validation criteria. Value is the validated data (passed as argument).

> We can validate the literal types: number, string, bool, and an array and an object as well.

### Validate Sign up and Login Credentials

There is no difference between the _sigu up_ validation and _log in_ validation, both have _email_ and _password_.

> Just to be clear, create a new file for the validation with _Joi_. (`joi_validations.js`)
> We will be referencing the old validations rewritten

We want to create a _schema_ that has _email_ and _password_ properties.

```js
const authValidationSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});
```

Assuming we have, this below, as credentials.

```js
const credentials = {
    email: "johndoe1@gmail.com",
    password: "JohnPwd12_",
};
```

Then we can validate the credentials as follows:

```js
const { error, value } = authValidationSchema.validate(credentials);

console.log({ error, value });

/* console log
{
 error: undefined,
 value: { email: 'johndoe1@gmail.com', password: 'JohnPwd12_' }
}
*/
```

Let's say we passed, intentionally for demo purposes, invalid credentials:

```js
const inValidCredentials = {
    email: "johndoe1gmail.com",
    password: "John",
};
```

The `schema.validate` method, takes an argument of objects, `options`. The second argument is nullable or rather has some default values and among these, there are:

-   `abortEarly`: By default is `true`. When `true`, stops validation on the first error, otherwise returns all the errors found. So if the email is invalid, it will stop the validation, ignoring the password validation, and return the validation response.
-   `allowUnknown`: By default is `false`. When `true`, allows the object to contain unknown keys which are ignored. Let's say we are expecting _email_ and _password_ but the user is passing _ide_ as part of the request, we can ignore this noise by setting `allowUnknown` to `true`.
-   `convert`: by default is `true`. When `true`, attempts to cast values to the required types (e.g. a string to a number).

> You have to think about these because these options can affect the user interface and the user experience

> Aborting early means, I will have one error field and UI will have just one error component (div or something) else UI would either have to join the list of error messages together and display them as one or have different alerts for each error. Depending on what decision is made, this will affect the User experience.

```js
const invalidResult = authValidationSchema.validate(inValidCredentials, {
    abortEarly: false,
});

console.log(invalidResult.value);
// console log
// { email: 'johndoe1gmail.com', password: 'John' }

console.log(invalidResult.error);

/* console log
[Error [ValidationError]: "email" must be a valid email. "password" length must be at least 6 characters long] {
 _original: { email: 'johndoe1gmail.com', password: 'John' },
 details: [
 {
 message: '"email" must be a valid email',
 path: [Array],
 type: 'string.email',
 context: [Object]
 },
 {
 message: '"password" length must be at least 6 characters long',
 path: [Array],
 type: 'string.min',
 context: [Object]
 }
 ]
}
*/
```

We can write a custom validation method.

This is what we have for the previous password validation.

```js
function isValidPassword(password) {
    if (!password || !isString(password) || password.length < 6) {
        return false;
    }

    const UPPER_CASE = LETTERS.map((char) => char.toUpperCase());
    if (!hasAnyOf(password, UPPER_CASE)) {
        return false;
    }

    if (!hasAnyOf(password, NUMBERS)) {
        return false;
    }

    return hasAnyOf(password, SPECIAL_SYMBOLS);
}
```

We can make this function a method to be used in the current validation schema by passing it a method to the `custom` method.

> the reference to constants are inferred (we already have them, 🙈 copy them over or export them from `validations.js`) and here we either return the value or throw an error when it is not valid.

We define a function that takes in the password (or the value to validate) and a second parameter, called, `helper`. (We will not use it but just pass it) - Read on helpers [here](https://joi.dev/api/?v=17.13.3#validation-helpers).

> So that there would be no naming conflicts, the validation method will be named, `customPasswordValidation`

```js
const customPasswordValidation = (value, helpers) => {
    if (!value || typeof value !== "string") {
        throw new Error("Password invalid");
    }

    if (value.length < 6) {
        throw new Error("Password must be at least 6 characters");
    }

    const UPPER_CASE = LETTERS.map((char) => char.toUpperCase());
    if (!hasAnyOf(value, UPPER_CASE)) {
        throw new Error(
            "Password must include at least one uppercase character"
        );
    }

    if (!hasAnyOf(value, NUMBERS)) {
        throw new Error("Password must inlcude at least one numeric character");
    }

    if (!hasAnyOf(value, SPECIAL_SYMBOLS)) {
        throw new Error(
            `Password must include at least one of these special characters: [${SPECIAL_SYMBOLS.join(
                ","
            )}]`
        );
    }

    return value;
};
```

Let's try out this password validation.

```js
const passwords = ["", "John", "john123", "John123", "John123_"];

const customPasswordSchema = Joi.string().custom(
    customPasswordValidation,
    "custom password validation"
);

const errorList = passwords.reduce((errors, password) => {
    const { error } = customPasswordSchema.validate(password);

    errors.push({
        [password]:
            error?.details?.map((log) => log.message).join("and") ?? "No error",
    });

    return errors;
}, []);

console.log(errorList);
/* console log
[
 { "": '"value" is not allowed to be empty' },
 {
 John: '"value" failed custom validation because Password must be at least 6 characters',
 },
 {
 john123:
 '"value" failed custom validation because Password must include at least one uppercase character',
 },
 {
 John123:
 '"value" failed custom validation because Password must include at least one of these special characters: [$,_,-]',
 },
 { John123_: "No error" },
]; 
*/
```

At this point, we can write some custom validation with Joi. Now we want to make use of this validation scheme where needed .i.e in the _sign up_ and _log in_. We can comment out or remove (you decide) the unwanted code from the `joi_validations.js` and export the `authValidationSchema` accounting for the `customPasswordValidation`.

```js
// joi_validations.js;
const Joi = require("joi");
const {
    hasAnyOf,
    LETTERS,
    NUMBERS,
    SPECIAL_SYMBOLS,
} = require("./validations");

const customPasswordValidation = (value, helpers) => {
    if (!value || typeof value !== "string") {
        throw new Error("Password invalid");
    }

    if (value.length < 6) {
        throw new Error("Password must be at least 6 characters");
    }

    const UPPER_CASE = LETTERS.map((char) => char.toUpperCase());
    if (!hasAnyOf(value, UPPER_CASE)) {
        throw new Error(
            "Password must include at least one uppercase character"
        );
    }

    if (!hasAnyOf(value, NUMBERS)) {
        throw new Error("Password must inlcude at least one numeric character");
    }

    if (!hasAnyOf(value, SPECIAL_SYMBOLS)) {
        throw new Error(
            `Password must include at least one of these special characters: [${SPECIAL_SYMBOLS.join(
                ","
            )}]`
        );
    }

    return value;
};

const authValidationSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string()
        .custom(customPasswordValidation, "custom password validation")
        .required(),
});

module.exports = { authValidationSchema };
```

In `user.js`, we will import `authValidationSchema` from `joi_validations.js` and replace:

```js
if (!isValidEmail(email)) {
    return res.status(200).json({
        success: false,
        message: "Invalid email",
    });
}

if (!isValidPassword(password)) {
    return res.status(200).json({
        success: false,
        message: "Invalid password",
    });
}
```

with

```js
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

We will do the same for login and clean up unused imports.

### Validate expense

From the _http_ requests that we have we are to validate the expense on creation and update. During creation, all the fields are required but optional during update.

```js
const createExpenseSchema = Joi.object().keys({
    name: Joi.string().min(10).max(255).required(),
    amount: Joi.number().positive().required(),
    date: Joi.date().iso().required(),
    // date: Joi.string().isoDate().required(),
});

const updateExpenseSchema = Joi.object().keys({
    name: Joi.string().min(10).max(255).optional(),
    amount: Joi.number().positive().optional(),
    date: Joi.date().iso().optional(),
    // date: Joi.string().isoDate().optional(),
});

module.exports = {
    authValidationSchema,
    createExpenseSchema,
    updateExpenseSchema,
};
```

In _create expenditures_, we will replace the individual validates with:

```js
...
// const { name, amount, date } = req.body
const payload = req.body;

const validationResponse = createExpenseSchema.validate(payload);
if (validationResponse.error) {
    return res.status(201).json({
        success: false,
        message: validationResponse.error.message,
 });
}
```

In update,

```js
...
 const { name, amount, date } = req.body;

    if (!name && !amount && !date) {
        return res.status(200).json({
            success: false,
            message: "name, amount or date for expense are required",
 });
 }

    const validationResponse = updateExpenseSchema.validate({
        name,
        amount,
        date,
 });
    if (validationResponse.error) {
        return res.status(200).json({
            success: false,
            message: validationResponse.error.message,
 });
 }
```

## Auth with JSON Web Tokens

For our auth token we combined the user's email and ID (uuid) and then encoded it. It is not safe, it is not secure and THAT IS CRIMINAL. Check out this platform, [BASE64 Decode and Encode][base64-encode-decoder]. This is a platform that allows you to decode and encode some stringified payloads. Copy and paste any of your auth tokens and you'll realize that an attacker wouldn't need nodejs or some programming runtime to know how to generate an auth token. All they have to do, to get a new auth token, is to get a user ID (uuid) and the rest comes and goes into the past, history. For this case, we will use JSON WebTokens. Our initial auth token doesn't expire but JWTs could.

JSON Web Tokens is a ... No! No definitions. Well A JSON Web Token, is a digitally signed token of an encoded payload in a JSON format, that is shared between and used for communication between two parties. JWT is encrypted and its data can be decoded. Head over to [jwt.io][jwt], a platform that allows you to decode, verify and generate jwts.

A JWT has three parts, the header, payload, and signature.

So this is the jwt I modified on [jwt.io][jwt], it is of the format, `HEADER.PAYLOAD.SIGNATURE`.

```sh
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJkb2IiOiIyMDA0LTEyLTAyIn0.NjrWV_CeOphs6WR676B-oyVk5S4mafNZW88SAVrzY0I
```

-   The header, `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`, indicates which hash algorithm was used and what type of token we are creating, in our case, jwt.

```json
{
    "alg": "HS256",
    "typ": "JWT"
}
```

-   Visit [BASE64 Decode and Encode][base64-encode-decoder] or toggle the decode part, and decode the header and payload.
-   The payload, indicates or contains what is in the encoded data or the data we want to associate with the user: a way to identify the user.

```json
{
    "sub": "1234567890",
    "name": "John Doe",
    "iat": 1516239022,
    "dob": "2004-12-02"
}
```

-   The signature is a cryptographic hash of the of the headers and payloads. From the header, we use `HS256` to hash the header and payload.
-   On [jwt.io][jwt], what happens when you add another key value to the payload? Does the signature change? If it changed then it means when an attacker gets an auth token from our platform, they can not replicate it. They have to sign it. Their secret for hashing will not be the same as ours as such our system will not accept it as a valid auth token. For a jwt with a longer TTL, (Time To Live, expiration time), an attacker can use that compromised token to wreak havoc until the token expires. So usually one is advised to use short TTLs. We whitelist valid tokens or blacklist invalidated tokens (the user logs out but the token is still invalid). We have to be creative.

### Using JWT

> install jsonwebtoken, `npm install jsonwebtoken`

Read about the jwt lib from [here][jsonwebtoken] and a more technical version from, [rfc7519](https://datatracker.ietf.org/doc/html/rfc7519).

As usual, just like the Joi library, the usage of the library speeds up our work. This is another reason to use the code another developer has written.

There are three methods to:

-   sign (create a new) token: pass the payload, the secret and some options like the expiresIn property which defines the TTL for the token
-   decode jwt: decodes the payload of the jwt, however, does not verify the jwt
-   verify jwt: verifies the jwt. Has it expired? Is it malformed and all that?

This was how we generated the auth token:

```js
const token = Buffer.from(`${email}:${uuid}`).toString("base64");
```

But now we are doing it differently, we are going to use the `sign(payload, secret, options)` method from the jwt lib. We will use the email and uuid as payload. Generally, the sign format is of the form:

```js
const jwt = require("jsonwebtoken");

const authToken = jwt.sign(
    {
        id: "c96b08b8-f92f-4e27-8f04-c4f3604907d6",
        email: "john@gmail.com",
    },
    "SOME SERECT",
    {
        expiresIn: "1h",
    }
);

console.log(authToken);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5NmIwOGI4LWY5MmYtNGUyNy04ZjA0LWM0ZjM2MDQ5MDdkNiIsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJpYXQiOjE3MzgyMTM0NTAsImV4cCI6MTczODIxNzA1MH0.3edLKTeSlgo8vThEAmDJ1uC5GU58AxeLzNpSgVAOYvc
```

The sign method takes in the payload, which is part of the [claims](https://datatracker.ietf.org/doc/html/rfc7519#section-4). Refer to the documentation for more [details](https://www.npmjs.com/package/jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback).

For demo purposes, I am passing the secret as `"SOME SERECT"`. In a production application, we'd hide these from the code itself. We will put it into an environmental variable path or file.

> DO NOT ADD YOUR SECRET TO YOUR APPLICATION. YOU WILL BE IN A LOT OF TROUBLE, I think 😒.

> We will look into how to handle environmental variables later.

In the options object parameter, we have the option to pass an algorithm but the default is `HS256`. Check the docs for the other options. What we can do is assign the `algorithm` property to `HS384` to set it to `HS384`.

Now on the `expiresIn: "1h"`, it indicates that the token becomes invalid or expires in one hour. This is directly from the docs:

```md
Eg: 1000, "2 days", "10h", "7d". A numeric value is interpreted as a second count. If you use a string be sure you provide the time units (days, hours, etc), otherwise, the milliseconds unit is used by default ("120" is equal to "120ms").
```

-   When you set the TTL to a number, `3600`, it is understood that you want the TTL to be in seconds. `3600` one hour.
-   When you set the TTL to a number string, `"3600"`, it is assumed that you want the TTL to be in milliseconds. S0 `"3600"` in parsed as `3.`6 seconds.
-   There are other formats as well, specified by the docs on, [vercel/ms](https://github.com/vercel/ms) and I will share a snippet describing some time span:

```js
ms("2 days"); // 172800000
ms("1d"); // 86400000
ms("10h"); // 36000000
ms("2.5 hrs"); // 9000000
ms("2h"); // 7200000
ms("1m"); // 60000
ms("5s"); // 5000
ms("1y"); // 31557600000
ms("100"); // 100
ms("-3 days"); // -259200000
ms("-1h"); // -3600000
ms("-200"); // -200
```

-   What we are interested in here is `"2 days"` for two days, `"1d"` for one day, etc. We used `"1h"` for one hour. I think it is clear how to use the ms time span description to define the time span of the ttl.

So the `sign.(PAYLOAD, SECRET, { expiresIn: X })`, generates a jwt with payload, `PAYLOAD` signed with the secret, `SECRET`, which will become invalid in `X` specified time span.

The `decode(authToken)` method decodes the payload without verifying it.

```js
console.log(
    jwt.decode(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5NmIwOGI4LWY5MmYtNGUyNy04ZjA0LWM0ZjM2MDQ5MDdkNiIsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJpYXQiOjE3MzgyMTM0NTAsImV4cCI6MTczODIxNzA1MH0.3edLKTeSlgo8vThEAmDJ1uC5GU58AxeLzNpSgVAOYvc"
    )
);
/* 
{
 id: 'c96b08b8-f92f-4e27-8f04-c4f3604907d6',
 email: 'john@gmail.com',
 iat: 1738213450,// seconds
 exp: 1738217050 // seconds
}
*/
```

Try removing or adding some characters to the auth token, and then decode. What value do you get?

The `verify(authToken, secret)`, verifies then decodes the auth token on success, else throws an error.

```js
console.log(
    jwt.verify(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5NmIwOGI4LWY5MmYtNGUyNy04ZjA0LWM0ZjM2MDQ5MDdkNiIsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJpYXQiOjE3MzgyMTM0NTAsImV4cCI6MTczODIxNzA1MH0.3edLKTeSlgo8vThEAmDJ1uC5GU58AxeLzNpSgVAOYvc",
        "SOME SERECT"
    )
);
/* 
{
 id: 'c96b08b8-f92f-4e27-8f04-c4f3604907d6',
 email: 'john@gmail.com',
 iat: 1738213450,// seconds
 exp: 1738217050 // seconds
}
*/
```

Now when the auth token is faulty or has expired, it is likely that you may encounter one of these errors:

-   TokenExpiredError: when the token has expired

```sh
   TokenExpiredError: Thrown error if the token is expired.
       if (err) throw err;
               ^
   TokenExpiredError: jwt expired
    at /Users/user/expense-tracker-simple-api/node_modules/jsonwebtoken/verify.js:190:21
    at getSecret (/Users/user/expense-tracker-simple-api/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/user/expense-tracker-simple-api/node_modules/jsonwebtoken/verify.js:101:10)
    at Object.<anonymous> (/Users/user/expense-tracker-simple-api/auth.js:82:9)
    at Module._compile (node:internal/modules/cjs/loader:1565:14)
    at Object..js (node:internal/modules/cjs/loader:1708:10)
    at Module.load (node:internal/modules/cjs/loader:1318:32)
    at Function._load (node:internal/modules/cjs/loader:1128:12)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:219:24) {
   expiredAt: 2025-01-30T06:04:10.000Z
   }
```

-   JsonWebTokenError: when there is an issue with the token or the secret

```sh
   JsonWebTokenError
       if (err) throw err;
               ^
   JsonWebTokenError: invalid signature
    at /Users/user/expense-tracker-simple-api/node_modules/jsonwebtoken/verify.js:171:19
    at getSecret (/Users/user/expense-tracker-simple-api/node_modules/jsonwebtoken/verify.js:97:14)
    at module.exports [as verify] (/Users/user/expense-tracker-simple-api/node_modules/jsonwebtoken/verify.js:101:10)
    at Object.<anonymous> (/Users/user/expense-tracker-simple-api/auth.js:82:9)
    at Module._compile (node:internal/modules/cjs/loader:1565:14)
    at Object..js (node:internal/modules/cjs/loader:1708:10)
    at Module.load (node:internal/modules/cjs/loader:1318:32)
    at Function._load (node:internal/modules/cjs/loader:1128:12)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:219:24)
```

-   NotBeforeError: Thrown if the current time is before the nbf claim.

> We will be looking into how to handle these errors later on

### Integrating JWT

To integrate the use of jwt in our application, we need to modify a few parts of api such as the _sign up_ and _login_ in `users.js` and `authorize(authToken)` function in `auth.js`.

In `users.js`, let's import the jwt library as, `const jwt = require("jsonwebtoken");`. Then replace all instances of:

```js
const token = Buffer.from(`${email}:${uuid}`).toString("base64");
```

with the snippet below for sign-up

```js
const token = jwt.sign(
    {
        userId: uuid,
        email,
    },
    "SOME SERECT",
    {
        expiresIn: "1h",
    }
);
```

and for login

```js
const token = jwt.sign(
    {
        userId: user.id,
        email: user.email,
    },
    "SOME SERECT",
    {
        expiresIn: "1h",
    }
);
```

Since this looks similar, we can wrap in a function and call the function passing in the payload. The secret and ttl, are always the same.

> As an exercise, create a function in the `auth.js` file, called `generateJwt({ userId, email})` and return the token generated.

When we try the log in, we should get a response similar to

```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "id": "b58bceeb-4041-4a50-b204-85caa2ad6c20",
        "email": "johndoe1@gmail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNThiY2VlYi00MDQxLTRhNTAtYjIwNC04NWNhYTJhZDZjMjAiLCJlbWFpbCI6ImpvaG5kb2UxQGdtYWlsLmNvbSIsImlhdCI6MTczODIzMTE5MiwiZXhwIjoxNzM4MjM0NzkyfQ.GYXR3qhJ_NdXwbjjrHbel-i7cKSBOX2izMBoO6hOhK4"
    }
}
```

You can copy and paste the auth token into [jwt.io][jwt] to inspect the token.

> Do the same for sign-up.
> Replace the authorization tokens with the new ones from the login or sign-up response

In `auth.js`, we will replace

```js
// decode auth token
const decodeToken = Buffer.from(authToken, "base64").toString();

// parse the decoded token into the email and userId
const [email, userId] = decodeToken.split(":");
```

with

```js
const { userId, email } = jwt.verify(authToken, "SOME SERECT");
```

> Remember to import jwt.

## Conclusion

We have come a long way here and gradually we will plough through, surging forward. I could argue that this excerpt is about the importance of using libraries. We can reduce the number of codes by using libraries. The number of code we "reduce" by not writing is written by the library authors. Maybe some code but less writing on our part.

[Joi][joi] and [jsonwebtoken][jsonwebtoken] are one of the few implementations of these concepts. For our use case, this is enough and we meet shortly.

#

[joi]: https://www.npmjs.com/package/joi
[jsonwebtoken]: https://www.npmjs.com/package/jsonwebtoken
[jwt]: https://jwt.io
[base64-encode-decoder]: https://www.base64encode.org/
[previous-code-on-github]: https://github.com/Otumian-empire/otumian-blogging-articles/tree/main/expense-tracker-api-articles/02-basic-crud-api-with-validation-and-auth/expense-tracker-simple-api
[previous-article]: https://dev.to/otumianempire/validation-authentication-and-authorization-5cag
