# Basic CRUD api with express

## Content

- Introduction
- Project creation and initialization
- Create a simple server and a GET route
- Create another GET route
- Routes and Controller
- Request and Response
- Create POST, GET, UPDATE, DELETE routes
- Extract controller
- Validation
- Authentication and Authorization
- Middlewares
- Validation Middleware
- Criticism

## Introduction

In [JavaScript Essentials: Part 7](https://dev.to/otumianempire/javascript-essentials-part-7-3e65), I hinted that we'd look into developing APIs[0](https://dev.to/otumianempire/what-is-an-api-4n4j) [1](https://dev.to/otumianempire/what-is-rest-api-53li) and this is where we start. We are going to have a taste of what it takes to develop a simple api to track expenditures.

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
app.listen(3000, () => console.log(`Api running on ${"http://localhost:3000"}`));

```


<!--
⁠To-Do List
⁠Calculator
⁠Currency Converter
⁠Unit Converter
⁠Notes App
⁠Personal Blog
⁠Quiz App
 -->
