console.log("expense-tracker-simple-api");

// import the express lib
const express = require("express");

// create an express application
const app = express();

// parse request body as json
app.use(express.json());

// create a GET request on the base endpoint
app.get("/", (req, res) => res.send("Hello world"));

app.get("/hello", (req, res) => res.send("<h1>Awesome API</h1><br><h2>H2</h2"));

// --- expenditure routes ---

// list expenditures
app.get("/expenditures", (req, res) => {
  console.log(req.query)
  return res.send("list expenditures");
});

// read expenditure
app.get("/expenditures/:id", (req, res) => {
  /* const id = req.params.id;
  console.log(id) */
  console.log(req.params);
  return res.send("read expenditure");
});

// create expenditure
app.post("/expenditures", (req, res) => {
  console.log(req.body);
  return res.send("create expenditure");
});

// update expenditure
app.put("/expenditures", (req, res) => res.send("update expenditure"));

// delete expenditure
app.delete("/expenditures", (req, res) => res.send("delete expenditure"));

// create a server that listens to requests on port 3000
app.listen(3000, () =>
  console.log(`Api running on ${"http://localhost:3000"}`)
);
