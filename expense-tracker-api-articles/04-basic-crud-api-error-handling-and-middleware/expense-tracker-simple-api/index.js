// import the express lib
require("dotenv/config");
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
