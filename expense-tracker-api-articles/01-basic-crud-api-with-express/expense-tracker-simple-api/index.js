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
  }
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
