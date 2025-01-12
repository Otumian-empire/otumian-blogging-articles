# Validation, Authentication and Authorization

## Content

-   Validation
-   Authentication
-   Authorization
-   Adding validation, Authentication and Authorization

In the previous excerpt, [Basic CRUD API with express](https://dev.to/otumianempire/basic-crud-api-with-express-2eoc), we discussed how to create a CRUD API with express. We installed extensions for our development environment. We also installed express, an npm package, to create our server. We discussed how to create POST, GET UPDATE and DELETE routes, and how to parse (access) data from the request body, query string and request parameter.

In this excerpt will discuss validation, authenticstion and authorization. We will be building on top of the previous excerpt. Refer to the previous material for the cold snippet. You can also reference this material from here.

> We are using the the snippet from the previous excerpt. You can follow that to have the start code.
> Since we always start on a fresh environment, I will have to follow the process of creating a node app and copy the content of the `index.js` file and the `package.json`. Remeber to run `npm i` or `yarn` to install the npm packages (if you cloned the project)
> If you are having any issues, the project can be found here on github, [expense-tracker-api-articles/01-basic-crud-api-with-express/expense-tracker-simple-api](https://github.com/Otumian-empire/otumian-blogging-articles/tree/main/expense-tracker-api-articles/01-basic-crud-api-with-express/expense-tracker-simple-api)

## Validation

Before we jump into definitions of what what is and all that, let me draw your attension to why we have to validate data received from users by referenceing some articles writing on [DEV](dev.to). Check out this articles to have a different voice on why validations is importance.

-   [Why Form Validation Is Important](https://dev.to/flippedcoding/why-form-validation-is-important-37mj)
    > You need form validation as a security measure. Forms are an easy target for hackers because we all know they're connected to a database somehow. Letting people put whatever they want into your form opens you up to SQL injection attacks as a start and it can get way more advanced than that.
-   [Input Validation: Client-side or Server-side?](https://dev.to/madza/input-validation-client-side-or-server-side-3h50/)
    > There is a rule of thumb to never trust the user input
-   [Data Validation in Your Backend: A Practical Guide](https://dev.to/starkprince/data-validation-in-your-backend-a-practical-guide-1kn6)
    > Failing to validate data can lead to security vulnerabilities, bugs, and data integrity issues
-   [Data validation is a vital step in creating reliable and secure applications.](https://dev.to/starkprince/data-validation-in-your-backend-a-practical-guide-1kn6)
    > Data validation is a vital step in creating reliable and secure applications.
-   [In Defense of D](https://dev.to/bytebodger/in-defense-of-defensive-programming-k45)
    > The function has inputs. And the function shouldn't be aware of where those inputs originated. Therefore, from the perspective of the function, the inputs are all potentially dangerous.

From this very short portions about validations from these articles, it should be clear why validation is important and why it should matter. They all point out that it will be a security disaster if proper validations aren't done and this obviously will/may lead to a loss, a financial loss, primarily. One's business may loss data, users, integrity, money, etc as a result of a security breach. As such I, and the community as a whole, encourage you to validate data before inserting or uodating existing records.

There are several instances where some client communicates with the backend and these moments are mostly submission of forms. In the previous excerpt where we were creating and updating expenses, what should we "consider" as an **appropriate** or **acceptable** value for _name_, _amount_ and _date_?

-   In this case, the _name_ should specify what object, element or event the expense is for. It could be a word or phrase that describes the expense.
-   For the _amount_, usually the question should be, do we consider a negative value or even zero in this case as an acceptable value for amount? What is the limit of the value that user can pass? This is in a sense that can a user pass 1 million or 1 billion?
-   For the _date_ value, we should consider the format of the expected expense date. We can have it that the date should start with the year followed by the month and followed by the day. The year, the month and the day can be separated by some specified character. We used hypen, `-`. So here you can specify whether the date should be separated by forward slash, `/`, or even a colon, `:`.

If you have been following this series, then you'd know that we have written some validations in the past. From, [JavaScript Essentials: Part 6 (Mastermind in Javascript)](https://dev.to/otumianempire/javascript-essentials-part-6-mastermind-in-javascript-53l), this is an example of a validation:

```js
function isValidRound(rounds) {
    return MIN_ROUNDS <= rounds && rounds <= MAX_ROUNDS && rounds % 2 == ZERO;
}
```

Let's define some validation rules:

-   Name
    -   Must be a string
    -   Must not be empty or null (it is required)
    -   minimum characters of 10
    -   maximum characters of 255
-   Amount
    -   Must be a number or numeric string
    -   Must not be empty (it is required)
-   Date
    -   Must be a string
    -   Could be empty or null (it is option, current date will be used)
    -   Must be in [ISO](https://www.iso.org/iso-8601-date-and-time-format.html#:~:text=Therefore%2C%20the%20order%20of%20the,27%2018%3A00%3A00.000.) format

> As an exercise, implement three functions that takes in the specified data, validates it and returns a boolean.

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

> It will be cool to have them exported from another file called validation or some awesome name that hints what these functions are doing.

At this point even if we don't define what validation is, with what we have discussed so far, one can have a solid idea of what validation is and its importance.

So, what is validation? Care to share with us what you believe it is, at this point?

## Authentication

Earlier on with discussed that validation is a mechanism that ensures that the values or input taken from a user is as an **appropriate** or **acceptable** one that conforms to certain requirements or standards. The idea of authentication in someway is similar to validation. In authentication, where we make sure that the claims of a user, passing their credentials in order to have access to some account, is legitimate. This means that we check or verify that a user is who they say they are based on the credentials they pass. Mostly, these credentials are made up of a public identifier which could be an email, username or some string token, an aliase, and a secret which is dubbed as password. We first check if there exist a user with such identifier, we then cross check the password or the secret passed alongside the identifier against the password or the secret of the record with respect to the identifier. So in authentication, the identity of a user is verified.

## Authorization

Authorization on the other hand has to do with what the user can do and not do on our platform based on some characteristics. So a user that claims to be John "cannot" assess a record that doesn't belong to John. John can not create, read, update nor delete expense records that belongs to Mark. John is not authorized access nor modify Mark's records. However, John "can" create, read, update and delete expense records that belong to John. So I use the dark claims to be John though cannot assess a record that doesn't belong to John. Another form that authorization can appear is that, you have an admin and these admin may have some sort of access levels or permissions. This access level determins what the admin can do and cannot do on the platform. Usually, an admin that is a moderator, can only flag and report some accounts and articles, or down vote them. Surely there is this admin with enough privileges to even block an active user and even delete or hide an article or a comment.

## Adding validation, Authentication and Authorization

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
