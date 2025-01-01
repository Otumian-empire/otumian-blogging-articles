# Basic CRUD api with express

## Content

- Introduction
- Project creation and initialization
- Create a simple server and a GET route
- Routes and Request handlers
- Request and Response
- Watch for changes
- Create POST, GET, UPDATE, DELETE routes
- API Clients
- Request body, params, query, header, ...
- Manipulating memory datadata
- Conclusion

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

## Create POST, GET, UPDATE, DELETE routes

We have already created a `GET` request. In this section, we will look into what each method means briefly since we have discussed them at length in [Request and Response](https://dev.to/otumianempire/request-and-response-1031).

In this application, we are only serving one kind of resource to our clients, and that is, expenditures. Assuming we are serving several resources, then we'd group request under each resources.

So let's say we have user and expenditure, we have GET, POST, PUT, DELETE, etc for both users and expenditures.

For now, we'd use the `/expenditures` route to represent the expenditure resource.

- `GET`: This means we will create a route to list, get all, fetch all, etc the records we have on expenditures. We can have a `GET` request that fetches one of the records. We have created similar `GET`

- `POST`: The post method is often used for creating resources

- `PUT`: The put method is used to update recourses

- `DELETE`: The delete method is used to delete resource

Now we can add the following lines of code to the `index.js` file but above `app.listen(3000,...)`.

```js
// --- expenditure routes ---

// list expenditures
app.get("/expenditures", (req, res) => res.send("list expenditures"));

// create expenditure
app.post("/expenditures", (req, res) => res.send("create expenditure"));

// update expenditure
app.put("/expenditures", (req, res) => res.send("update expenditure"));

// delete expenditure
app.delete("/expenditures", (req, res) => res.send("delete expenditure"));
```

When you save your file, do you notice the logs in the terminal? Test the `GET` route for the expenditure in the browser.

> We can only run the `GET` requests in the browser. We will discuss api clients next.

## API Clients

An API client in this context is tool, a program or an applications that is used to interact (consume, integrate, or test) APIs. Most commonly used are [Postman](https://www.postman.com/downloads/), [Insomnia](https://insomnia.rest/download), [curl](https://curl.se/docs/), etc...

In vscode and alongisde some other IDEs, there are extension that provides extensions to api clients. vscode has some of these extension for that matter. However, we will be considering an api client known as [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client). For our usecase it will be simpler to use Rest Client as such don't fret. We are covered.

> Note: postman or any other api client of your choice is okay to use

### How to use REST Client

- First install, [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).
- We are creating http request as such we can create a file with `.http` or `.rest` extension - `touch expense-tracker-api.http`
- In `expense-tracker-api.http` we can define our request
- To create a `GET` request, add the following to the `.http` file

  ```http
  GET http://localhost:3000
  ```

- The endpoint is passed as seen above. For a post, put or delete request update the endpoint. Remember the difference between an endpoint and a route?
- For a request that requires that data be passed to the api, we can pass the data as part of the route as a parameter or a string query, or we can pass it in the body.

  ```http
  POST http://localhost:3000
  Content-Type: application/json

  {
      "property1": "value1",
      "property2": "value1",
      ...
      "propertyN": "valueN",
  }
  ```

- `Content-Type: application/json` is a header key-value. This means, thats how you pass headers using rest-client.
- For the request body, we pass it as a json object - a newline is expected between the headers and the body though
- Each request can be separated by three pound or ash signs, `###`. A text can be added at the end of `###` to make it look as if it is a title.

  ```http
  ### test base GET endpoint
  GET http://localhost:3000

  ### Create a dummy POST request
  POST http://localhost:3000
  Content-Type: application/json

  {
      "property1": "value1",
      "property2": "value1",
      ...
      "propertyN": "valueN",
  }
  ```

As exercise, create the request for the expenditure endpoints. Refer to [](https://dev.to/otumianempire/request-and-response-1031) when you are having any difficulties. We have more to do.

## Request body, params, query, header

At this point I don't have to stress that we'd be using [JSON](https://dev.to/otumianempire/what-is-json-5cel) to communicate with our api using the api-client.

As mention earlier, we can pass data to our api using the body, header, or the url of our request. We have seen how to pass data via the request body and the header (We will look into passing some specific data at anothet time). Check the `POST` request created. What we have not looked at is how to pass data as part of the url.

Let's say we want to read an expenditure which has an id of `4`, we can pass the add a parameter (as part of the url) as, `/expenditures/2`. For the request which will be handling this requirement, we do, `/expenditures/:id`, where `:id` refers to the `id` of the expenditure. Assuming it is something else other than an `id`, let's say a name, then we'd do `:name`. Express will process this a provide use with a means to extract this value without sweat.

Now, for a query string, the idea is similar to request parameters however, it comes after a question, followed by a key1=value1&key2=value2...&keyN=valueN, where the key is the identifier of the value you want to pass. A very direct example is the REST-Client url, _<https://marketplace.visualstudio.com/items?itemName=humao.rest-client>_. The question mark marks the beginning of the query string and whatever follows it maps a key to a value. Eg: _?itemName=humao.rest-client_.

> It will be a good time to test all your api endpoints and experience playing with it.

### Request Body

Now we are going to process a request that passes data using the request body - The `POST` endpoint.

```js
// create expenditure
app.post("/expenditures", (req, res) => res.send("create expenditure"));
```

The request object has a property, `body`, and on this property, are the values that we passed in the request body of our request - `req.body`.

This is the request will be running

```http
### Create Expenditures
POST http://localhost:3000/expenditures
Content-Type: application/json

{
    "name": "Legion Tower 7i Gen 8 (Intel) Gaming Desktop",
    "amount": 2099.99,
    "date": "2024-31-12"
}
```

and this is our endpoint implementation that will just log the requuest body to the console.

```js
// create expenditure
app.post("/expenditures", (req, res) => {
  console.log(req.body);
  return res.send("create expenditure");
});
```

What happened? We had the usual response but... `undefined` was logged in the console. Well, it basically means everything is alright however, our api server doesn't know that it should parse the incoming as `json`. Remember `json`?

Let's add this one line below the `const app = express();` which should solve parse the incoming data as `json`.

```js
// parse request body as json
app.use(express.json());
```

Now, let's test the `POST` endpoint again. What did you get this time? Did you get something similar to this?

```json
{
  "name": "Legion Tower 7i Gen 8 (Intel) Gaming Desktop",
  "amount": 2099.99,
  "date": "2024-31-12"
}
```

Now you know how to get the data from the body. Now as exercise, desctruct the body and pass an object in the response. So instead of logging it, return it as the response.

### Request parameter

We will create a new `GET` endpoint to read an expenditure by id.

This will be our API request:

```http
### Read Expenditure
GET http://localhost:3000/expenditures/1
```

The request object has a property, `params` and on this property, are the values that we passed in the request param of our request - `req.params`.

Now the implementation will be similar to what we have done so far but a little different, however not align to us.

```js
// read expenditure
app.get("/expenditures/:id", (req, res) => {
  /* const id = req.params.id;
  console.log(id) */
  console.log(req.params);
  return res.send("read expenditure");
});
```

We can access the `id` directly too. I hope you noticed that the `:id` key or name passed as part of the route matches the key in the logged object. Try renaming the params key in the route and see the output logged.

### Request query (query string)

For the query strings, there is a property on the request object, `query`, which expose the query strings passed.

To demonstrate this will pass a query string to filter the records to return. This endpoint should do enough.

```http
### List Expenditures
GET http://localhost:3000/expenditures?amountMoreThan=1000&nameStartsWith=Legion
```

Now the implementation will something similar to:

```js
// list expenditures
app.get("/expenditures", (req, res) => {
  console.log(req.query);
  return res.send("list expenditures");
});
```

Now run your api and check your logs. Experiment with this.

## Manipulating memory data

At this point we are not connecting to a database yet so we have to manipulate date from memory. What we intend to do is to create an array, add to the array, update an element in it, and remove an element. It sounds feasible as such that's what we are going to do.

> We will be doing some modifications to some previously written code as such, feel free to alter your too. The final excerpt will be shared at the end.

### Initialize in memory data

Let's create an array of expenditures (dummy data) below `const express = require("express");`

```js
// dummy data
let expenditures = [
  {
    name: "Legion Tower 7i Gen 8 (Intel) Gaming Desktop",
    amount: 2099.99,
    date: "2024-12-31",
  },
  {
    name: "Apple MacBook Pro 16-inch",
    amount: 2499.99,
    date: "2024-12-15",
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    amount: 1199.99,
    date: "2024-12-10",
  },
  {
    name: "Sony WH-1000XM5 Noise Cancelling Headphones",
    amount: 349.99,
    date: "2024-12-20",
  },
  {
    name: "Dell UltraSharp 27 4K USB-C Monitor",
    amount: 699.99,
    date: "2024-11-25",
  },
  {
    name: "Logitech MX Keys Wireless Keyboard",
    amount: 119.99,
    date: "2024-10-05",
  },
  {
    name: "HP Envy x360 Convertible Laptop",
    amount: 1349.99,
    date: "2024-09-30",
  },
  {
    name: "NVIDIA GeForce RTX 4080 Graphics Card",
    amount: 1199.99,
    date: "2024-08-15",
  },
  {
    name: "ASUS ROG Zephyrus G14 Gaming Laptop",
    amount: 1599.99,
    date: "2024-07-18",
  },
  {
    name: "Canon EOS R6 Mark II Mirrorless Camera",
    amount: 2499.99,
    date: "2024-07-12",
  },
];
```

### List expenditures

The current endpoint returns just a message using the `res.send(message)` but what we want to return is `json`. Though thr `.send` can also take in a object or `json`, we will use `res.json(obj)`.

I didn't mention but the default status code returned is `200`. Have you noticed that? Except that another occurs or there is an issue with the resquest, the status code remains the same. There is a section under [status codes](https://dev.to/otumianempire/request-and-response-1031), glance through.

We can alter the status code by passing the desired status code in `res.status(desireStatusCode).json(obj)`. I will maintain the `200` status code through out.

> Make sure the server is still running

We can pass the list of expenditures directly.

```js
// list expenditures
app.get("/expenditures", (req, res) => {
  return res.json(expenditures);
});
```

What was the response received? Check the status code as well as the response payload.

From experience and also to avoid abiguity, I prefer to return status code `200` be default, have a either `success` property, `message` or `data` property to return a message or requested resource. By default, when `status` is `false`, `message` will be passed else, `message` or `data` may be passed.

```js
// list expenditures
app.get("/expenditures", (req, res) => {
  return res.json({
    success: true,
    data: expenditures,
  });
});
```

We need to display the id (index of each row)

```js
// list expenditures
app.get("/expenditures", (req, res) => {
  return res.json({
    success: true,
    data: expenditures.map((row, index) => ({ id: index, ...row })),
  });
});
```

### Apply filtering with

```js
// list expenditures
app.get("/expenditures", (req, res) => {
  // get the query string and check if it not a number or something
  // that can be a number else set a default filter value of 0
  let amountMoreThan = Number(req.query.amountMoreThan);
  if (isNaN(amountMoreThan) || amountMoreThan < 0) {
    amountMoreThan = 0;
  }

  return res.json({
    success: true,
    data: expenditures
      .map((row, index) => ({ id: index, ...row }))
      .filter((row) => row.amount > amountMoreThan),
  });
});
```

Why was the filter done after the mapping?

### Read expenditure

```js
// read expenditure
app.get("/expenditures/:id", (req, res) => {
  // get the id of the request resource from the params
  const id = Number(req.params.id);
  if (isNaN(id) || id < 0) {
    return res.status(200).json({
      success: false,
      message: "Resource ID invalid",
    });
  }

  // we don't take negative ids, why?
  const row = expenditures[id];
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

Does this implementation hint you about, _Why was the filter done after the mapping?_ ?

### Create expenditure

```js
// create expenditure
app.post("/expenditures", (req, res) => {
  // const { name, amount, date } = req.body
  const payload = req.body;

  if (!payload?.name || !payload.amount || !payload.date) {
    return res.status(200).json({
      success: false,
      message: "name, amount and date for expense are required",
    });
  }

  // we have to validate the name, maybe, there name must have some number of characters
  // we have to make sure that amount is actually a number
  // we have to also make sure that date is of the format, yyyy-MM-dd

  // insert the new record
  expenditures.push({
    name: payload.name,
    amount: payload.amount,
    date: payload.date,
  });

  return res.status(201).json({
    success: true,
    message: "expenditure created successfully",
  });

  // there situations that it is best that you pass the new record created
  /* return res.status(201).json({
    success: true,
    message: "expenditure created successfully",
    data: expenditures[expenditures.length - 1],
  }); */

  // pass a route to fetch the new record created
  /* return res.status(201).json({
    success: true,
    message: "expenditure created successfully",
    route: `/expenditures/${expenditures[expenditures.length - 1]}`,
  }); */
});
```

### Update expenditure

```js
// update expenditure
app.put("/expenditures/:id", (req, res) => {
  // get the id of the request resource from the params
  const id = Number(req.params.id);
  if (isNaN(id) || id < 0) {
    return res.status(200).json({
      success: false,
      message: "Resource ID invalid",
    });
  }

  // we don't take negative ids, why?
  const row = expenditures[id];
  if (!row) {
    // what status code do this should be passed here? 404 not not found? why??
    return res.status(200).json({
      success: false,
      message: `Resource with ID, '${id}' not found`,
    });
  }

  // we have to validate the name, maybe, there name must have some number of characters
  // we have to make sure that amount is actually a number
  // we have to also make sure that date is of the format, yyyy-MM-dd
  const { name, amount, date } = req.body;

  expenditures[id].name = name ?? row.name;
  expenditures[id].amount = amount ?? row.amount;
  expenditures[id].date = date ?? row.date;

  // there was a time a saw a 204 status - No content
  // since there was no data to return however we'll return the usual
  return res.status(200).json({
    success: true,
    message: "expenditure updated successfully",
  });
});
```

### Delete expenditure

```js
// delete expenditure
app.delete("/expenditures/:id", (req, res) => {
  // get the id of the request resource from the params
  const id = Number(req.params.id);
  if (isNaN(id) || id < 0) {
    return res.status(200).json({
      success: false,
      message: "Resource ID invalid",
    });
  }

  // we don't take negative ids, why?
  const row = expenditures[id];
  if (!row) {
    // what status code do this should be passed here? 404 not not found? why??
    return res.status(200).json({
      success: false,
      message: `Resource with ID, '${id}' not found`,
    });
  }

  expenditures = expenditures.filter((_, index) => index !== id);

  return res.status(200).json({
    success: true,
    message: "expenditure deleted successfully",
  });
});
```

## Conclusion

We have covered basically the root of most apis delepments. This project is as basic as it comes. Relax and glance thtough again. There is more to look into such as

- validation
- authentication and authorization
- middleware
- error handling
- sql
- database integration

### Practice project

crud api = create, list, read, update, and delete. It is how you approach this problems.

⁠**To-Do List**

- todo object: { id: int, task: string, status: boolean }
- crud api
- add an endpoint to mark all task as completed, success is true or not completed

⁠**Calculator⁠**

- you have to decide, either you'd create an endpoint for all the operations (addition, subtraction, multiplication, division)
- or you would create a single endpoint with different functions that corresponds to each operation. the user should be able to pass the operator and thw two perands

⁠**Currency Converter⁠**
You are basically converting from one currency to another. Do for as many currencies as you can (3 is enough)

⁠**Unit Converter⁠**
⁠**Notes App⁠**
⁠**Personal Blog⁠**
⁠**Quiz App⁠**

### Snippets

Know that the execess was removed

```js
// import the express lib
const express = require("express");

// dummy data
let expenditures = [
  {
    name: "Legion Tower 7i Gen 8 (Intel) Gaming Desktop",
    amount: 2099.99,
    date: "2024-12-31",
  },
  {
    name: "Apple MacBook Pro 16-inch",
    amount: 2499.99,
    date: "2024-12-15",
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    amount: 1199.99,
    date: "2024-12-10",
  },
];

// create an express application
const app = express();

// parse request body as json
app.use(express.json());

// list expenditures
app.get("/expenditures", (req, res) => {
  // get the query string and check if it not a number or something
  // that can be a number else set a default filter value of 0
  let amountMoreThan = Number(req.query.amountMoreThan);
  if (isNaN(amountMoreThan) || amountMoreThan < 0) {
    amountMoreThan = 0;
  }

  return res.json({
    success: true,
    data: expenditures
      .map((row, index) => ({ id: index, ...row }))
      .filter((row) => row.amount > amountMoreThan),
  });
});

// read expenditure
app.get("/expenditures/:id", (req, res) => {
  // get the id of the request resource from the params
  const id = Number(req.params.id);
  if (isNaN(id) || id < 0) {
    return res.status(200).json({
      success: false,
      message: "Resource ID invalid",
    });
  }

  // we don't take negative ids, why?
  const row = expenditures[id];
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

// create expenditure
app.post("/expenditures", (req, res) => {
  // const { name, amount, date } = req.body
  const payload = req.body;

  if (!payload?.name || !payload.amount || !payload.date) {
    return res.status(200).json({
      success: false,
      message: "name, amount and date for expense are required",
    });
  }

  // we have to validate the name, maybe, there name must have some number of characters
  // we have to make sure that amount is actually a number
  // we have to also make sure that date is of the format, yyyy-MM-dd

  // insert the new record
  expenditures.push({
    name: payload.name,
    amount: payload.amount,
    date: payload.date,
  });

  return res.status(201).json({
    success: true,
    message: "expenditure created successfully",
  });

  // there situations that it is best that you pass the new record created
  /* return res.status(201).json({
    success: true,
    message: "expenditure created successfully",
    data: expenditures[expenditures.length - 1],
  }); */

  // pass a route to fetch the new record created
  /* return res.status(201).json({
    success: true,
    message: "expenditure created successfully",
    route: `/expenditures/${expenditures[expenditures.length - 1]}`,
  }); */
});

// update expenditure
app.put("/expenditures/:id", (req, res) => {
  // get the id of the request resource from the params
  const id = Number(req.params.id);
  if (isNaN(id) || id < 0) {
    return res.status(200).json({
      success: false,
      message: "Resource ID invalid",
    });
  }

  // we don't take negative ids, why?
  const row = expenditures[id];
  if (!row) {
    // what status code do this should be passed here? 404 not not found? why??
    return res.status(200).json({
      success: false,
      message: `Resource with ID, '${id}' not found`,
    });
  }

  // we have to validate the name, maybe, there name must have some number of characters
  // we have to make sure that amount is actually a number
  // we have to also make sure that date is of the format, yyyy-MM-dd
  const { name, amount, date } = req.body;

  expenditures[id].name = name ?? row.name;
  expenditures[id].amount = amount ?? row.amount;
  expenditures[id].date = date ?? row.date;

  // there was a time a saw a 204 status - No content
  // since there was no data to return however we'll return the usual
  return res.status(200).json({
    success: true,
    message: "expenditure updated successfully",
  });
});

// delete expenditure
app.delete("/expenditures/:id", (req, res) => {
  // get the id of the request resource from the params
  const id = Number(req.params.id);
  if (isNaN(id) || id < 0) {
    return res.status(200).json({
      success: false,
      message: "Resource ID invalid",
    });
  }

  // we don't take negative ids, why?
  const row = expenditures[id];
  if (!row) {
    // what status code do this should be passed here? 404 not not found? why??
    return res.status(200).json({
      success: false,
      message: `Resource with ID, '${id}' not found`,
    });
  }

  expenditures = expenditures.filter((_, index) => index !== id);

  return res.status(200).json({
    success: true,
    message: "expenditure deleted successfully",
  });
});

// create a server that listens to requests on port 3000
app.listen(3000, () =>
  console.log(`Api running on ${"http://localhost:3000"}`)
);
```

API requests

```http
# Expenditure endpoints

### Create Expenditures
POST http://localhost:3000/expenditures
Content-Type: application/json

{
    "name": "Legion Tower 7i Gen 8 (Intel) Gaming Desktop",
    "amount": 2099.99,
    "date": "2024-31-12"
}

### List Expenditures
GET http://localhost:3000/expenditures?

### Read Expenditure
GET http://localhost:3000/expenditures/1

### Update Expenditure
PUT http://localhost:3000/expenditures/11
Content-Type: application/json

{
    "name": "MacBook pro laptop",
    "amount": 5099.99,
    "date": "2025-01-01"
}

### Delete Expenditure
DELETE http://localhost:3000/expenditures/0
```
