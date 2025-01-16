# Validation, Authentication and Authorization

## Content

-   Validation
-   Authentication
-   Authorization
-   Adding validation
-   Adding Authentication and Authorization

In the previous excerpt, [Basic CRUD API with express](https://dev.to/otumianempire/basic-crud-api-with-express-2eoc), we discussed creating a CRUD API with express. We installed extensions for our development environment. We also installed express, an npm package, to create our server. We discussed how to create POST, GET UPDATE and DELETE routes, and how to parse (access) data from the request body, query string and request parameter.

This excerpt will discuss validation, authentication and authorization. We will be building on top of the previous excerpt. Refer to the previous material for the code snippet. You can also reference this material from [here](https://dev.to/otumianempire/basic-crud-api-with-express-2eoc).

> We are using the snippet from the previous excerpt. You can follow that to have the starter code.
> Since we always start on a fresh environment, I will have to follow the process of creating a node app and copy the content of the `index.js` file and `package.json`. Remember to run `npm i` or `yarn` to install the npm packages (if you cloned the project)
> If you are having any issues, the project can be found here on GitHub, [expense-tracker-api-articles/01-basic-crud-api-with-express/expense-tracker-simple-api](https://github.com/Otumian-empire/otumian-blogging-articles/tree/main/expense-tracker-api-articles/01-basic-crud-api-with-express/expense-tracker-simple-api) or drop a comment. I or any capable individual may attempt to help you, as they see fit.

## Validation

Before we jump into definitions of what is what and all that, let me draw your attention to why we have to validate data received from users by referencing some articles written on [DEV](dev.to). Check out these articles to have a different voice on why validations is importance. I think it will spare us the definition of validation.

-   [Why Form Validation Is Important](https://dev.to/flippedcoding/why-form-validation-is-important-37mj)
    > You need form validation as a security measure. Forms are an easy target for hackers because we all know they're connected to a database somehow. Letting people put whatever they want into your form opens you up to SQL injection attacks as a start and it can get way more advanced than that.
-   [Input Validation: Client-side or Server-side?](https://dev.to/madza/input-validation-client-side-or-server-side-3h50/)
    > There is a rule of thumb to never trust the user's input
-   [Data Validation in Your Backend: A Practical Guide](https://dev.to/starkprince/data-validation-in-your-backend-a-practical-guide-1kn6)
    > Failing to validate data can lead to security vulnerabilities, bugs, and data integrity issues
-   [Data validation is a vital step in creating reliable and secure applications.](https://dev.to/starkprince/data-validation-in-your-backend-a-practical-guide-1kn6)
    > Data validation is a vital step in creating reliable and secure applications.
-   [In Defense of D](https://dev.to/bytebodger/in-defense-of-defensive-programming-k45)
    > The function has inputs. And the function shouldn't be aware of where those inputs originated. Therefore, from the perspective of the function, the inputs are all potentially dangerous.

From these very short portions about validations from these articles, it should be clear why validation is important and why it should matter. They all point out that it will be a security disaster if proper validations aren't done and this obviously will/may lead to a loss, a financial loss, primarily. One's business may lose data, users, integrity, money, etc as a result of a security breach. As such I, and the community as a whole, encourage you to validate data before inserting or updating existing records.

There are several instances where some client (app) communicates with the backend and these moments are mostly submission of forms.

In the previous excerpt where we were creating and updating expenses, what should we "consider" as an **appropriate** or **acceptable** value for _name_, _amount_ and _date_?

-   In this case, the _name_ should specify what object, element or event the expense was for. It could be a word or phrase that describes the expense.
-   For the _amount_, usually, the question should be, do we consider a negative value or even zero in this case as an acceptable value for the amount? What is the limit of the value that the user can pass? This is in a sense that, can a user pass 1 million or 1 billion?
-   For the _date_ value, we should consider the format of the expected expense date. We can have it that the date should start with the year followed by the month and then the day. The year, the month and the day can be separated by some specified character. We used a hyphen, `-`. So here you can specify whether the date should be separated by a forward slash, `/`, or even a colon, `:`. You decide.

If you have been following this series, then you know that we have written some validations in the past. From, [JavaScript Essentials: Part 6 (Mastermind in Javascript)](https://dev.to/otumianempire/javascript-essentials-part-6-mastermind-in-javascript-53l), this is an example of a validation:

```js
function isValidRound(rounds) {
    return MIN_ROUNDS <= rounds && rounds <= MAX_ROUNDS && rounds % 2 == ZERO;
}
```

Let's define some validation rules:

-   Name
    -   Must be a string
    -   Must not be empty or null (it is required)
    -   Minimum characters of 10
    -   Maximum characters of 255
-   Amount
    -   Must be a number or numeric string
    -   Must not be empty (it is required)
    -   Must be a positive number
-   Date
    -   Must be a string
    -   Could be empty or null (it is an option, current date will be used)
    -   Must be in [ISO](https://www.iso.org/iso-8601-date-and-time-format.html#:~:text=Therefore%2C%20the%20order%20of%20the,27%2018%3A00%3A00.000.) format

> As an exercise, implement three functions that take in the specified data, validate it and return a boolean.

```js
function isValidName(name) {
    // returns a bool
}

function isValidAmount(amount) {
    // returns a bool
}

function isValidDate(date) {
    // returns a bool
}
```

> It will be cool to have them exported from another file called validation or some awesome name that hints at what these functions are doing.
> It is also a good practice to separate concerns. If this sounds weird or strange then we can simply say that it is better to reduce the number of code in the `index.js` file.

At this point even if we don't define what validation is, with what we have discussed so far, one can have a solid idea of what validation is and its importance.

So, what is validation? Care to share with us what you believe it is, at this point?

## Authentication

Earlier on with discussed that validation is a mechanism that ensures that the values or input taken from a user is an **appropriate** or an **acceptable** value that conforms to certain requirements or standards. The idea of authentication in some way is similar to validation.

In authentication, where we make sure that the claims of a user, passing their credentials to have access to some account, is legitimate. This means that we check or verify that a user is who they say they are, based on the credentials they pass. Mostly, these credentials are made up of a public identifier which could be an email, username or some string token (an alias which can be shared with others), and a secret which is dubbed as a password (🙈 not safe to share). We first check if there exists a user with such an identifier, we then cross-check the password or the secret passed alongside the identifier against the password or the secret of the record obtained concerning the identifier. So in authentication, the identity of a user is verified.

## Authorization

Authorization on the other hand has to do with what the user can and cannot do on a platform. So a user that claims to be _John_ "cannot" assess a record that doesn't belong to _John_. _John_ can not create, read, update or delete expense records that belong to _Mark_. _John_ is not authorized access nor modify _Mark_'s records. However, _John_ "can" create, read, update and delete expense records that belong to _John_. Another form that authorization can appear is that you have an admin and these admin may have some sort of access levels or permissions. This access level determines what the admin can and cannot do on the platform. Usually, an admin that is a moderator, can only flag and report some accounts and articles, or downvote them (during moderation). Surely there is this admin with enough privileges to even block an active user and even delete or hide an article or a comment.

## Adding validation

I implemented my validations for the `name`, `amount` and `date`. Some comments explain some decisions made.

```js
// file name: validations.js

// typeof operator returns the type of a value

// check that a value is a string
const isString = (arg) => typeof arg === "string";

// check that a value is a number
// const isNumber = (arg) => typeof arg === "number";
// if we use this approach then, "2.99" fails as a number even though it is a numeric string
// as such we are going with this and later casting the values to numbers
const isNumber = (arg) => !isNaN(Number(arg));
// when arg is non-numeric or a numeric string, Number(arg) returns NaN
// isNaN checks if a value is NaN and returns true if so else false
// which is why we negate the results from isNaN(...)

/**
 *
 * @param {*} name
 * -   Must be a string
 * -   Must not be empty or null (it is required)
 * -   minimum characters of 10
 * -   maximum characters of 255
 * @returns boolean
 */
function isValidName(name) {
    if (!name || !isString(name)) {
        return false;
    }

    return name.length >= 10 && name.length <= 255;
}

/**
 *
 * @param {*} amount
 * -   Must be a number or numeric string
 * -   Must not be empty (it is required)
 * -   Must be a positive number
 * @returns boolean
 */
function isValidAmount(amount) {
    if (!amount || !isNumber(amount)) {
        return false;
    }

    return amount > 0;
}

/**
 *
 * @param {*} date
 * -   Must be a string
 * -   Could be empty or null (it is an option, the current date will be used)
 * -   Must be in YYYY-MM-DD format
 * @returns boolean
 */
function isValidDate(date) {
    if (!date || !isString(date)) {
        return false;
    }

    const parsedDate = date.split("-");

    if (parsedDate.length !== 3) {
        return false;
    }

    const [year, month, day] = parsedDate;

    // there are more validations to be done on the years, month and day
    // there are 12 months, the max day is 31 and others
    return isNumber(year) && isNumber(month) && isNumber(day);
}

module.exports = { isValidName, isValidAmount, isValidDate };
```

## Adding Authentication and Authorization

For the sake of demonstration, we will create a user record for the authentication and since we have not done database integration yet, we will use an array of objects instead (we did the same for expenditures). Now, let's do some cleanup. We are going to move the `expenditures` records (array) into a file and export it. Since it is acting as our data source, maybe we can name the file, `data.js`. After that, we'd add another variable for `users`.

> Make sure that the `expenditures` and `users` are exported and imported appropriately.

We will add these lines to `data.js`

```js
let expenditures = [
 ...
]

let users = [
 {
        id: "c96b08b8-f92f-4e27-8f04-c4f3604907d6",
        email: "john@gmail.com",
        password: "John123$",
 },
];

module.exports = { expenditures, users };
```

And import `expenditures` and `users` in `index.js`

```js
...
// data source imports
const { expenditures, users } = require("./data");
...
```

> "...", the three dots indicate that there is some code there. Perhaps the original

We will implement an endpoint to create a user and another, to log in users. There are a few things we have to consider:

-   The data that we are using is saved in memory. This means that when the server is restarted, the whole data will be lost.
-   For the User ID, we are returning or using a UUID.
-   The password will be stored as the raw password (NOT BEST PRACTICE, JUST FOR DEMO)

### Sign up

To create a user, we first have to check the user data (array) and make sure that the email that the user is providing does not exist - there is no element in the array whose email matches the provided email. When there is no user with such an email, we then hash the password (for now just the raw password) and generate a UUID to uniquely identify the user.

These steps should help with the signup process:

-   In `expense-tracker-api.http`, add a `post` request for user signup

```http
### Sign up
POST http://localhost:3000/users/signup
Content-Type: application/json

{
"email": "johndoe@gmail.com",
"password": "JohnPwd12_"
}
```

-   create a `post` request to handle user signup requests. The route should match the one above, expecting _email_ and _password_ from the request body
-   **validate** the email and password
-   check the `users` array (from the data file) that there is no record with an email that matches the email provided by the user. If such a record exists, return an appropriate response
-   we are supposed to hash the password but for demo reasons, we'd pass or save the raw password as is
-   generate a UUID for the new user
-   save the email, password and UUID by updating the `users` array
-   as part of the successful response, add the email and UUID and a message that says sign up successful or whatever appropriate message
-   it will be nice to log the new user record so that you can copy and manually add it to the user data (just to make sure that you have something static you are working with)

```js
// sign up
app.post("/users/signup", (req, res) => {
    const { email, password } = req.body;

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

    // making sure that there is no record with the same email as this user's
    const existingUsers = users.filter((user) => user.email === email);

    if (existingUsers.length > 0) {
        return res.status(200).json({
            success: false,
            message: "Email already taken",
        });
    }

    // we are supposed to do password hashing here (recommended practice)

    // generate uuid unique to this user
    const uuid = crypto.randomUUID();

    // save this record
    const newUser = {
        id: uuid,
        email,
        password,
    };

    console.log(newUser);

    users = [...users, newUser];

    return res.status(200).json({
        success: true,
        message: "Sign up successful",
        data: {
            id: uuid,
            email,
        },
    });
});
```

This is the response that should be expected assuming we are on the same page.

```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 128
ETag: W/"80-1wtZS+F4SzQ3LG+Q5EXmhzMEFaA"
Date: Wed, 15 Jan 2025 12:00:26 GMT
Connection: close

{
  "success": true,
  "message": "Sign up successful",
  "data": {
    "id": "decec694-6d97-4199-8544-f4bbe7ea753b",
    "email": "johndoe@gmail.com"
 }
}
```

And the console log should look similar to

```js
{
  id: 'decec694-6d97-4199-8544-f4bbe7ea753b',
  email: 'johndoe@gmail.com',
  password: 'JohnPwd12_'
}
```

Did you get any other response where the success was false? What was it and how did you fix it?

### Log in

To implement _login_, will check that there is a user with the provided email and that the User password matches the password (hash) of the retrieved record. The login will be very similar to the signup.

> Try implementing the login.

When a user logs in to our platform, we have to find a way to allow the user to browse through the resources available to them without them having to log in all the time. What we are going to look at is how to **authorize** a user to CRUD their data (i.e. expenses and user data). Usually, we provide the user a means for them to access their data without having to log in all the time. There are several to do this. Some of them are:

-   **Basic authorization**: we send the user's credentials in every request they make, i.e. their email in this case with the password. We would encode (base64) these credentials for security's sake.
-   **API key (Or token)**: this is usually a string issued by the platform. It can be used to uniquely identify each user.
-   **Bearer token**: an example of a bearer token is JSON Web tokens.
-   etc

There are several complicated authorization schemas out there. However, at this point, we will discuss each of these above forms of authorization.

-   **Basic auth**: The downside with this approach is that the user has to pass these encoded credentials all the time in every request. It is practically logging in all the time. And the user's account can be compromised easily as well. The only way to resolve this is to ... (no I am not talking about this... too much work - don't do this, I hope we understand). Use any of the ones mentioned below.
-   **API key**: Just like the basic auth, api keys can be compromised. The advantage of an api key is that we can generate another api when it is compromised. We can have it that the user has to request new api keys every week or within some time frame. We set up a mechanism to expire api keys so that the user will have to generate a new api key. Another downside of this is that we have to save the api key somewhere so that we can match it against any request. (Use a cache)
-   **Bearer token (jwt)**: jwt is like an api token but the token itself can be time-bound. The token can expire and as such will become invalid after that period of expiry onwards. The token can store a payload which when parsed would be useful for identifying the owner of the token.

In most cases after login, an authorisation token is added as part of the response to the user. This token is then used by the user in every request thereafter to access the api resources. So Just to make this simple and to demonstrate how we can pass an api key for authorization, let's base64 encode the email and uuid passed as the auth token.

It is simple to encode a string to base64. Do, `Buffer.from(STRING TO ENCODE).toString("base64")`. So for our case, we want to use, `email:uuid` as the string to encode.

So before the `return` statement, let's add the encoding and update the response to include the auth token.

```js
// sign up
app.post("/users/signup", (req, res) => {
    // some codes here were redacted

    const token = Buffer.from(`${email}:${uuid}`).toString("base64"); // newly added

    return res.status(200).json({
        success: true,
        message: "Sign up successful",
        data: {
            id: uuid,
            email,
            token, // newly added
        },
    });
});
```

Run the signup request again with another email and compare the difference in the response. Anything different? What was it?

Now we can do a proper login. The login request will not be that different from the sign-up. It is just the route that will be different.

```js
// login
app.post("/users/login", (req, res) => {
    const { email, password } = req.body;

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

    // find a user with the same email and password: authentication taking place here
    const authUser = users.filter(
        (user) => user.email === email && user.password === password
    );

    // the number of records expected is one, anything else is invalid
    if (authUser.length !== 1) {
        return res.status(200).json({
            success: false,
            message: "Invalid credentials",
        });
    }

    // we are supposed to compare the password with the hash normally
    const user = authUser[0];

    const token = Buffer.from(`${user.email}:${user.id}`).toString("base64");

    return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            id: user.id,
            email: user.email,
            token,
        },
    });
});
```

This is the login request:

```http

### Log in
POST http://localhost:3000/users/login
Content-Type: application/json

{
 "email": "johndoe@gmail.com",
 "password": "JohnPwd12_"
}
```

And this is a sample response on my end.

```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 216
ETag: W/"d8-aHIA5gYn4IKu8QQsFeyfBgNuK/I"
Date: Wed, 15 Jan 2025 18:20:17 GMT
Connection: close

{
  "success": true,
  "message": "Sign up successful",
  "data": {
    "id": "5991be49-d396-4f3e-ae61-89f38207db6c",
    "email": "johndoe1@gmail.com",
    "token": "am9obmRvZTFAZ21haWwuY29tOjU5OTFiZTQ5LWQzOTYtNGYzZS1hZTYxLTg5ZjM4MjA3ZGI2Yw=="
 }
}
```

Now we have an auth token. We will use the auth token to access resources only available to the owner of that token. To do that we have to modify and add (or update) the existing records to account for the `userId`. To make it simpler, I'd suggest we create multiple users and update several or add more expenses with `userId`s.

I have two users and three expenses (statically) and as such I will update them as is:

```js
// data.js
// dummy data
let expenditures = [
    {
        id: "0fb7f7b7-9ed4-41af-858c-840258788479",
        name: "Legion Tower 7i Gen 8 (Intel) Gaming Desktop",
        userId: "c96b08b8-f92f-4e27-8f04-c4f3604907d6",
        amount: 2099.99,
        date: "2024-12-31",
    },
    {
        id: "2ea3786a-7391-46e8-a130-4de79504bd29",
        userId: "c96b08b8-f92f-4e27-8f04-c4f3604907d6",
        name: "Apple MacBook Pro 16-inch",
        amount: 2499.99,
        date: "2024-12-15",
    },
    {
        id: "a29e3057-c07d-4009-be19-f8da705bd5b8",
        userId: "decec694-6d97-4199-8544-f4bbe7ea753b",
        name: "Samsung Galaxy S24 Ultra",
        amount: 1199.99,
        date: "2024-12-10",
    },
];

let users = [
    {
        id: "c96b08b8-f92f-4e27-8f04-c4f3604907d6",
        email: "john@gmail.com",
        password: "John123$",
    },
    {
        id: "decec694-6d97-4199-8544-f4bbe7ea753b",
        email: "johndoe@gmail.com",
        password: "JohnPwd12_",
    },
];

module.exports = { expenditures, users };
```

As presented, now an expense also has an id (a uuid).

### Protected endpoints

A protected endpoint or route requires some sort of "authorization" to access resources on that route. In this case, to protect an endpoint, we expect the request to have an auth token and that we can trace the auth token to an authentic user.

The auth token can be passed in any of the means, discussed so far, that data can be passed in the request: body, param, query and headers. We would pass the auth token in the headers.

Let's modify the _List Expenditures_ endpoint to account for the auth token passed in the headers.

When the auth token is added, the request will look like this, below. Or rather, this is how we'd pass the auth token in the headers.

```http
### List Expenditures
GET http://localhost:3000/expenditures
Authorization: am9obmRvZTFAZ21haWwuY29tOjU5OTFiZTQ5LWQzOTYtNGYzZS1hZTYxLTg5ZjM4MjA3ZGI2Yw==
```

We can get and log the content of the headers by doing so.

```js
app.get("/", (req, res) => {
    return res.send(req.headers);
});
```

And we'd get something similar to

```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 208
ETag: W/"d0-H4HndowWbSuUVoTjck9QS9+XNXo"
Date: Thu, 16 Jan 2025 08:27:35 GMT
Connection: close

{
  "user-agent": "vscode-restclient",
  "authorization": "am9obmRvZTFAZ21haWwuY29tOjU5OTFiZTQ5LWQzOTYtNGYzZS1hZTYxLTg5ZjM4MjA3ZGI2Yw==",
  "accept-encoding": "gzip, deflate",
  "host": "localhost:3000",
  "connection": "close"
}
```

When we run

```http
GET http://localhost:3000/
Authorization: am9obmRvZTFAZ21haWwuY29tOjU5OTFiZTQ5LWQzOTYtNGYzZS1hZTYxLTg5ZjM4MjA3ZGI2Yw==
```

From the content in the headers, we can see a key-value pair of values and as present, we have `"authorization": "am9obmRvZTFAZ21haWwuY29tOjU5OTFiZTQ5LWQzOTYtNGYzZS1hZTYxLTg5ZjM4MjA3ZGI2Yw=="`.

Great. At this point, I think we know what to do when we want to pass other values in the header.

> `authorization` is the standard used when we have/want to pass auth tokens. We can use an arbitrary key and it should still work fine.

Now, we have to make sure the user making the request is authorized (using the auth token). We do that by decoding the auth token, in our case (because we encoded it), extracting the payload in there and comparing it against the `users` and if it's right, we can use the id (uuid) to fetch the expenses based on the `userId`.

When we were encoding, we did, `Buffer.from(STRING TO ENCODE).toString("base64")`. Now to decode is fairly similar. We'd do, `Buffer.from(STRING TO DECODE, "base64").toString()`.

This is what we did to generate the auth token.

```js
const token = Buffer.from(`${user.email}:${user.id}`).toString("base64");
```

And we can decode it by

```js
// decode the auth token
const credential = Buffer.from(authTokenFromHeader, "base64").toString();

// credentials will be EMAIL:UUID and we want just the uuid
// we can get both and user both to fetch a user
const [email, id] = credential.split(":");
// how is that?

console.log(email, id);
```

When we put all these together, we will have the update endpoint to be:

```js
// list expenditures
app.get("/expenditures", (req, res) => {
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

    // parse the decoded token into the email and userId
    const [email, userId] = decodeToken.split(":");

    // now we can fetch the user with email and userId
    const isAuthenticUser = users.find(
        (user) => user.email === email && user.id === userId
    );

    if (!isAuthenticUser) {
        return res.status(200).json({
            success: false,
            message: "Unathorized, please login",
        });
    }

    // get the query string and check if it is not a number or something
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

Log in and the request again.

```json
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 190
ETag: W/"be-LOBEpYsscV5twPwFE50Va2UM9d4"
Date: Thu, 16 Jan 2025 09:23:13 GMT
Connection: close

{
  "success": true,
  "data": [
 {
      "id": "a29e3057-c07d-4009-be19-f8da705bd5b8",
      "userId": "decec694-6d97-4199-8544-f4bbe7ea753b",
      "name": "Samsung Galaxy S24 Ultra",
      "amount": 1199.99,
      "date": "2024-12-10"
 }
 ]
}
```

We are good for now. Now users can only access information that strictly belongs to them. How is that?

## Conclusion

We have looked at how to do validations, authentication and authorization. What we have discussed here is roughly what these concepts are and some "rough" ways to implement them. For learning purposes, I believe these should be done.

A few things to consider:

-   Never save a raw password
-   Never use the auth mechanism employed here in the production environment i.e encoding the email and ID
-   There are cases where you you want to pass a different status code so that you can drop the success property in the json response. Yeah, do that. When you do that, instead of `{ data: [ ...😩 ]}`, just return `[ ...😩 ]`

In the next excerpt, we are going to look at how to use a library to validate data and also hash passwords and break our application down.

Let me know what you think... 🥳

## Resources

-   [Basic CRUD API with express](https://dev.to/otumianempire/basic-crud-api-with-express-2eoc)
-   [expense-tracker-api-articles/01-basic-crud-api-with-express/expense-tracker-simple-api](https://github.com/Otumian-empire/otumian-blogging-articles/tree/main/expense-tracker-api-articles/01-basic-crud-api-with-express/expense-tracker-simple-api)
-   [Why Form Validation Is Important](https://dev.to/flippedcoding/why-form-validation-is-important-37mj)
-   [Input Validation: Client-side or Server-side?](https://dev.to/madza/input-validation-client-side-or-server-side-3h50/)
-   [Data Validation in Your Backend: A Practical Guide](https://dev.to/starkprince/data-validation-in-your-backend-a-practical-guide-1kn6)
-   [Data validation is a vital step in creating reliable and secure applications.](https://dev.to/starkprince/data-validation-in-your-backend-a-practical-guide-1kn6)
-   [In Defense of D](https://dev.to/bytebodger/in-defense-of-defensive-programming-k45)
-   [JavaScript Essentials: Part 6 (Mastermind in Javascript)](https://dev.to/otumianempire/javascript-essentials-part-6-mastermind-in-javascript-53l)
-   [ISO](https://www.iso.org/iso-8601-date-and-time-format.html#:~:text=Therefore%2C%20the%20order%20of%20the,27%2018%3A00%3A00.000.)
-   [owasp input validation cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html#:~:text=Input%20validation%20is%20performed%20to,malfunction%20of%20various%20downstream%20components.)
