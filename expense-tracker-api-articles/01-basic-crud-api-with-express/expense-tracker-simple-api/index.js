console.log("expense-tracker-simple-api");

// import the express lib
const express = require("express");

// create an express application
const app = express();

// create a GET request on the base endpoint
app.get("/", (req, res) => res.send("Hello world"));
app.get("/hello", (req, res) => res.send("<h1>Awesome API</h1><br><h2>H2</h2"));

// create a server that listens to requests on port 3000
app.listen(3000, () =>
  console.log(`Api running on ${"http://localhost:3000"}`)
);
