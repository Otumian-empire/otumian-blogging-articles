// import the express lib
require("dotenv/config");
const express = require("express");

// import the routers exported from users and expenditures
const userEndpoints = require("./users");
const expendituresEndpoints = require("./expenditures");
const {
    logRequest,
    hasJwt,
    isAuthorized,
    errorHandler,
    notFoundHandler,
} = require("./middlewares");

// create an express application
const app = express();

// parse request body as json
app.use(express.json());

// add console logging middleware
app.use(logRequest);

// register routers
app.use("/users", userEndpoints);
app.use("/expenditures", hasJwt, isAuthorized, expendituresEndpoints);

/* global error handling */
app.use(errorHandler);

/* handle cannot [METHOD] some endpoint */
app.use(notFoundHandler);

// create a server that listens to requests on port 3000
app.listen(3000, () =>
    console.log(`Api running on ${"http://localhost:3000"}`)
);
