# Validation, Authentication and Authorization with Libraries

In the previous excerpt with discussed validation, authentication and authorization. We mentioned that validation is a mechanism to ensure that data passed to the api is in a accepted format. Authentication is verifying the legitimacy of a user's claim and authorization is what a user can and cannot do. We went ahead and implemented these concepts. In this excerpts we are going to look at how to use libraries/packages for validation and auth.

## Content

-   Separation of concerns
-   Criticism
-   Verification
-   Extract controller

## Separation of concerns

We started to section or move some of our code into different files. We have the data we are manipulating, in the `data.js` file, we have the validations in `validations.js` and so on. This process can get complicated and out of hand easily. So don't push it. It is a simple application we are building.

As usual, we are building on top of the previous codebase which can be found [on github](https://github.com/Otumian-empire/otumian-blogging-articles/tree/main/expense-tracker-api-articles/02-basic-crud-api-with-validation-and-auth/expense-tracker-simple-api) and read more on it on [Validation, Authentication and Authorization](https://dev.to/otumianempire/validation-authentication-and-authorization-5cag).

The api we are building is that titled expense tracker. We have users and their expenses. So we are dealing with two entities. As the project grows and the content of the `index.js` grows, we have to pull certain codes out or group them to be precise. This is not a must, we can write all our code in one files and it will work fine. There are advantages and disadvantages to it, however, it is better to know when to group your functionalities.

In the `index.js`, which serves as the entry point into out application, there are:

-   application conficurations, which will include top level middlewares, etc
-   routes for expenses
-   routes for users
-   there are some snippet we can have as functions and some literals as constants
-   app, listen on port 3000 (server runing here), may do database connections when the server starts, etc

Consider, `app.SOME_METHOD(route, request handlers)` `SOME_METHOD` is the http method, is the definition of how routes are passed with some middlewares and the request handlers are passed or handled. We have `app.get("/expenditures", (req, res) => {...})` where `"/expenditures"` is the routes and `(req, res) => {...}` is a request handler. We can separate the request handler as a standalone function. We already know how to create functions (and even async functions). When we create a function outof `(req, res) => {...}`, we can pass it as, ``app.get("/expenditures", functionName)`. That is it. We can choose to keep the routes and the request handlers (controllers) in the same file or separate them.

We can have a file, just because our project is small else we would use folders, for the list above.

These are some of the changes we can do (follow along):

-   create a file for `user` and `expenditures` endpoints. So we'd have `users.js` and `expenditures.js`.
    -   move the _login_ and _sign up_ endpoints into `users.js`
    -   move CRUD expenditure into `expenditures.js`
    -   there are imports that we have to take care of such as the validation functions, the data consumed and others.
    -   remove unused imports from the `index.js`
-   import and create router from express. We can name this route `app` so that it will be easier for to maintain the current implementation as is. Or we can give it a custom name and replace `app` in the custom name. I will keep to `app` and export it at the very bottom of `users.js` and `expenditures.js`.

    ```js
    // import at the very top
    const app = require("express").Router();

    // there other code

    // very bottom
    module.exports = app;
    ```

-   in `users.js`, we have to import the validation functions and also `crypto` for creating the user id (uuid). In all we will have an import like this:

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
    const {
        isValidName,
        isValidAmount,
        isValidDate,
    } = require("./validations");
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

-   the sign up and login works fine, you should test them too
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
            message: "Unathorized, please login",
        });
    }

    // decode auth token
    const decodeToken = Buffer.from(authorization, "base64").toString();

    // parse the decode token into the email and userId
    const [email, userId] = decodeToken.split(":");

    // now we can fetch user with email and userId
    const isAuthenticUser = users.find(
        (user) => user.email === email && user.id === userId
    );

    if (!isAuthenticUser) {
        return res.status(200).json({
            success: false,
            message: "Unathorized, please login",
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

        // parse the decode token into the email and userId
        const [email, userId] = decodeToken.split(":");

        // now we can fetch user with email and userId
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

-   let's add this guard into each expenditures endpoint..

    ```js
    // we have to import the authorize function from auth.js

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
    ```

    > Try running some of these endpoints... we have passed the auth token and we have a guard in place. Don't believe everything I say 🙈

    > back to "copy and paste"... We will learn about middlewares later and update our to use middleware.

-   Running `list expenditures` is successful
-   we have to update `read expenditure` to account for the `userId` from the `auth response` and also the resourse ID is not a number but a uuid. we will remove the checking if the `id` is a number and use `expenditures.find` (or filter if you want to but handle the rest) instead of `expenditures[id]`

    ```js
    // read expenditure
    app.get("/expenditures/:id", (req, res) => {
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

        // get the id of the request resource from the params
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

-   When we run create, the record is created however is not assigned to the user who created it. Did you notice that? Create a very small request to fetch all expenditures or `console.log` the `expenditures` variable you are fetching the user's expenditures. This was because we added the `authorize`, from which we got `userId` but we didn't use it. All we have to do is add the `userId` to the expense record and generate a uuid (sample code is in the `users.js`, _sign up_).

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

    -   to update the expenditure, we can find the index of this (expenditure of interest) and if we get the _index_, we can update it. There is the _map_ and match approach too where we _map_ the `expenditures` and match the resource id to a record and update that record, reassign the `expenditures` with the newly created array.
    -   remove the number checking for resource ID (did similar in `read expenditure`)
    -   replace `const row = expenditures[id];` with `const rowIndex = expenditures.findIndex(...)` accounting for the `userId`. We will use this `rowIndex` to assign value to `row` and also use it to _index_ the row we wanted updated from the `expenditures`.
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
                message: "Unathorized, please login",
            });
        }

        // parse the auth user id
        const { userId } = authReponse;

        // get the id of the request resource from the params
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

        // we have to validate the name, maybe, there name must have some number of characters
        // we have to make sure that amount is actually a number
        // we have to also make sure that date is of the format, yyyy-MM-dd
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

        // there was a time a saw a 204 status - No content
        // since there was no data to return however we'll return the usual
        return res.status(200).json({
            success: true,
            message: "expenditure updated successfully",
        });
    });
    ```

-   for `delete expenditure`:
    -   most of the changes to be done is similar to the update
    -   remove the number checking for the resource ID
    -   find the `rowIndex`, if it is `-1` then there is no row found
    -   pass the `rowIndex` inplace of `id` in `expenditures = expenditures.filter((_, index) => index !== id);`
    -   Give it a try
