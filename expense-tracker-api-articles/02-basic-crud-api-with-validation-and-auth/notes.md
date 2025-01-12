# Validation, Authentication and Authorization

## Content

- Validation
- Authentication
- Authorization

In the previous excerpt, [Basic CRUD API with express](https://dev.to/otumianempire/basic-crud-api-with-express-2eoc), we discussed how to create a CRUD API with express. We installed extensions for our development environment. We also installed express, an npm package, to create our server. We discussed how to create POST, GET UPDATE and DELETE routes, and how to parse (access) data from the request body, query string and request parameter.

In this excerpt will discuss validation, authenticstion and authorization. We will be building on top of the previous excerpt. Refer to the previous material for the cold snippet. You can also reference this material from here.

> We are using the the snippet from the previous excerpt. You can follow that to have the start code.
> Since we always start on a fresh environment, I will have to follow the process of creating a node app and copy the content of the `index.js` file and the `package.json`. Remeber to run `npm i` or `yarn` to install the npm packages (if you cloned the project)
> If you are having any issues, the project can be found here on github, [expense-tracker-api-articles/01-basic-crud-api-with-express/expense-tracker-simple-api](https://github.com/Otumian-empire/otumian-blogging-articles/tree/main/expense-tracker-api-articles/01-basic-crud-api-with-express/expense-tracker-simple-api)

## Validation

Before we jump into definitions of what what is and all that, let me draw your attension to why we have to validate data received from users by referenceing some articles writing on [DEV](dev.to). Check out this articles to have a different voice on why validations is importance.

- [Why Form Validation Is Important](https://dev.to/flippedcoding/why-form-validation-is-important-37mj)
  > You need form validation as a security measure. Forms are an easy target for hackers because we all know they're connected to a database somehow. Letting people put whatever they want into your form opens you up to SQL injection attacks as a start and it can get way more advanced than that.
- [Input Validation: Client-side or Server-side?](https://dev.to/madza/input-validation-client-side-or-server-side-3h50/)
  > There is a rule of thumb to never trust the user input
- [Data Validation in Your Backend: A Practical Guide](https://dev.to/starkprince/data-validation-in-your-backend-a-practical-guide-1kn6)
  > Failing to validate data can lead to security vulnerabilities, bugs, and data integrity issues
- [Data validation is a vital step in creating reliable and secure applications.](https://dev.to/starkprince/data-validation-in-your-backend-a-practical-guide-1kn6)
  > Data validation is a vital step in creating reliable and secure applications.
- [In Defense of D](https://dev.to/bytebodger/in-defense-of-defensive-programming-k45)
  > The function has inputs. And the function shouldn't be aware of where those inputs originated. Therefore, from the perspective of the function, the inputs are all potentially dangerous.

From this very short portions about validations from these articles, it should be clear why validation is important and why it should matter. They all point out that it will be a security disaster if proper validations aren't done and this obviously will/may lead to a loss, a financial loss, primarily. One's business may loss data, users, integrity, money, etc as a result of a security breach.

<!--  -->

## Resources

- [expense-tracker-api-articles/01-basic-crud-api-with-express/expense-tracker-simple-api](https://github.com/Otumian-empire/otumian-blogging-articles/tree/main/expense-tracker-api-articles/01-basic-crud-api-with-express/expense-tracker-simple-api)

- [Why Form Validation Is Important](https://dev.to/flippedcoding/why-form-validation-is-important-37mj)
- [Input Validation: Client-side or Server-side?](https://dev.to/madza/input-validation-client-side-or-server-side-3h50/)
- [Data Validation in Your Backend: A Practical Guide](https://dev.to/starkprince/data-validation-in-your-backend-a-practical-guide-1kn6)
- [Data validation is a vital step in creating reliable and secure applications.](https://dev.to/starkprince/data-validation-in-your-backend-a-practical-guide-1kn6)
- [In Defense of D](https://dev.to/bytebodger/in-defense-of-defensive-programming-k45)

<!-- put all the urls here -->

[owasp input validation cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html#:~:text=Input%20validation%20is%20performed%20to,malfunction%20of%20various%20downstream%20components.)
