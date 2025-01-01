# Basic CRUD api with express

## Content

- Introduction✅
- Project creation and initialization✅
- Create a simple server and a GET route✅
- Routes and Request handlers✅
- Request and Response✅
- Watch for changes✅
- Create POST, GET, UPDATE, DELETE routes
- Extract controller
- Request body, params, query, header, ...
- Validation
- Authentication and Authorization
- Middlewares
- Validation Middleware
- Criticism

## Introduction

In [JavaScript Essentials: Part 7](https://dev.to/otumianempire/javascript-essentials-part-7-3e65), I hinted that we'd look into developing APIs ([[0]](https://dev.to/otumianempire/what-is-an-api-4n4j) [[1]](https://dev.to/otumianempire/what-is-rest-api-53li)) and this is where we start. We are going to have a taste of what it takes to develop a simple api to track expenditures.

### Project Description

For this expense tracker, we will need to keep track of the item purchased, the amount and the date the item was purchased. Basically an expense will look like this:

```js
{
    "name": "Legion Tower 7i Gen 8 (Intel) Gaming Desktop",
    "amount": 2099.99,
    "date": "2024-31-12"
}
```

At this point where a real database is not added yet, what we can do is to use a list (an array) to hold the data that we will create. We will go through each major concept surrouding creating apis in this excerpt and add some ways to improve this app later.

> Know that we will be building on top of this project, so, keep it clean and explore, experiment, fidget, etc as much as you can.

## Project creation and initialization

As usual, we need a fresh working environment for each project and as such we will begin by creating and initializing a nodejs project. If you are not sure, check out, [JavaScript Essentials: Part 6 (Mastermind in Javascript)](https://dev.to/otumianempire/javascript-essentials-part-6-mastermind-in-javascript-53l).

Now we have to create the parent folder for our api by doing:

```sh
# create a folder for the project at the path of your choice
mkdir expense-tracker-simple-api

# open the project with vscode
# code expense-tracker-simple-api
code -r expense-tracker-simple-api

# open the built-in terminal and init node
npm init -y
# this should create the package.json file

# create the entry file, index.js
echo "console.log(\"expense-tracker-simple-api\");" > index.js

# run the index.js file
node index.js
```

All we are doing with this script is quite direct.

- We create a folder for our project
- We opened the folder in vscode
- We initialized a nodejs project
- We added a console log into index.js file. This creates the file and adds some content
- We execute the index.js file

An alternative is to go to wherever you want to create this folder and create it over there then open the folder in vscode and init node project - check out, [JavaScript Essentials: Part 6 (Mastermind in Javascript)](https://dev.to/otumianempire/javascript-essentials-part-6-mastermind-in-javascript-53l).

At this point we need to install an nodejs package called [express](https://www.npmjs.com/package/express). Express is a library that will help us create our apis.

We can install this package by running, `npm i express`. This should modify the `package.json` file, create the `package-lock.json` file and `node_modules` folder. Consult the excerpt, [What is Nodejs](https://dev.to/otumianempire/what-is-nodejs-4h10), for further understanding and information regarding how to use npm to install packages.

## Create a simple server and a GET route

In our `index.js` file, we can add this code.

```js
console.log("expense-tracker-simple-api");

// import the express lib
const express = require("express");

// create an express application
const app = express();

// create a GET request on the base endpoint
app.get("/", (req, res) => res.send("Hello world"));

// create a server that listens to requests on port 3000
app.listen(3000, () =>
  console.log(`Api running on ${"http://localhost:3000"}`)
);
```

All that we did was to create an express application, use the application to create a `GET` request to send message and let the application listen in on request coming from port `3000`.

```js
const app = express();
```

Creates an express application (🥳 that how to create an express application)

```js
app.get("/", (req, res) => res.send("Hello world"));
```

We used the express application instance to create a `GET` request. `app` has several methods and properties that includes the http methods. Check out the except about [http methods here](https://dev.to/otumianempire/request-and-response-1031).

```js
app.listen(3000, () =>
  console.log(`Api running on ${"http://localhost:3000"}`)
);
```

We used the express application to listen on some port and used an arrow function to tell us, tell developers, that our application is running. For the port, we can alter it to another port of our choice. However there are some special ports that are already meant or used for some particular task and they are well known in the community and as such servers as default when such application or programs are running on our PC. Check these out - [0](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers) [1](https://www.all-about-security.de/identifying-secure-and-unsecured-ports-and-how-to-secure-them/) [2](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml)

> Note: There are some that are no-go because your system comes with them and there are some that comes with applications we install such some servers and database and others. Fret not, when we use a port that is already in use, our application will let us know. All we have to do is add one or substract one. No sweat.

## Routes and Request handlers

To create a `GET` request, use `app.get(...)`, for `POST` use `app.post(...)` and so on. For each route we want to create, the `app.SomeMethod(...)`, will take in a `route` or path, indicating which resource the user client desires or action they want to execute. As part of the route, it can take at atleast one request handler. This mean, we can have `app.SomeMethod(path, hanlder1, handler2, ..., handlern);`.

For the `GET` request above, the `path` or route is `/` (a string) and the single request handler we have is `(req, res) => res.send("Hello world")`, a handler function (a callback or some simplied arrow function). The request hand;ers can be middlewares and controllers.

## Request and Response

A request handler normally takes in two arguments, the `request` and the `response` which are shortend as `req` and `res` respectively (you don't have to call them that but the first is always request and the second is response). The `request` holds the data (or some information) about who made the request and what they want. The `response` is a means to provide feedback to the user who made the request. In this case, we send "Hello world" when the client makes a `GET` request to the `/` path.

Here you notice that client and user are interchangable, in the sense of which device makes the http request to our api server and not a user, as in a user account.

Usually, the request handler will take a third argument which will point to the next handler after the previous handler has done its job. We call this `next`. I looks more or less like:

```js
app.get("/", (req, res, next) => ...);
```

The next argument is useful, it points to the request handler and at times it takes an argument, an error. We will implement an error handler to generally handle error we did not handle or errors that we "pass" to the next request handler.

Now let's cancel the running `nodejs` process that was running (in the terminal), using `control + c`. Then run it again. This time we with the updated content from _Create a simple server and a GET route_ section, we should see an output in the console (terminal) similar to,

```sh
expense-tracker-simple-api
Api running on http://localhost:3000
```

Open _<http://localhost:3000>_ in the browser. What do you see? A text saying, _Hello world_ ?

## Watch for changes

Rome was not built in one day as the saying goes. Same applies to software development. Maybe here what we mean is that, we will gradually add more features as we develop and in this continues process, it becomes irritating to start and stop the server all the time.

Go on, add another `GET` request (route) with `/hello` path and a request handler that says somwthing you'd would want to say. Be happy.

You'd have to restart the server (the running nodejs process) and visit, _<http://localhost:3000/hello>_ in the browser to see the response from that endpoint.

> This,`GET` _<http://localhost:3000/hello>_, is an endpoint. You share this with api consumers. Among ourselves, we say route, because we don't have to know the whole url (including protocol - _http_, domain - _localhost_, port - _3000_, and path - _/hello_). Route is `METHOD + PATH`, more or less, `GET` _/hello_.

On macOS or windowns, we can do `node --watch index.js` or we can look out for changes not just in our entry file in the whole folder path by, `node --watch-path=./ index.js` to watch for changes in file path and also the file itself.

Currently this is the content of my `package.json` file:

```json
{
  "name": "expense-tracker-simple-api",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^4.21.2"
  }
}
```

We can add a script called `dev` under the script section.

```json
"dev" : "node --watch-path=./ index.js" 
```

We can stop the running server with `control + c` and now execute `npm run dev`. This will monitor saved changes in our files and reload the server.

So you who this is not working for you, we have an alternative. We will install nodemone, `npm i nodemon -g`. We'd use it everywhere as a utility tool so we don't have to install it as part of our packages. We can watch changes by executing, `nodemon index.js`. There are cases where this won't work and when it doesn't, dom `nodemon --exec node index.js`

We can modify our `dev` script to use nodemon by,

```json
"dev" : "nodemon --exec node index.js" 
```

At this point you can freely modify your `.js` files and on save, the server will restart to reload the load changes applied.

<!--
⁠To-Do List
⁠Calculator
⁠Currency Converter
⁠Unit Converter
⁠Notes App
⁠Personal Blog
⁠Quiz App
 -->
