// expenditures.js;
const app = require("express").Router();
const { authorize } = require("./auth");
let { users, expenditures } = require("./data");
const { isValidName, isValidAmount, isValidDate } = require("./validations");

app.get("/expendituresx", (req, res) => {
    return res.json({
        success: true,
        data: expenditures,
    });
});

// list expenditures
app.get("/expenditures", (req, res) => {
    // extra auth token from headers
    const authReponse = authorize(req.headers.authorization);
    if (!authReponse.isAuthorized) {
        return res.status(200).json({
            success: false,
            message: "Unathorized, please login",
        });
    }

    // parse the auth user id
    const { userId } = authReponse;

    // ====================
    // get the query string and check if it not a number or something
    // that can be a number else set a default filter value of 0
    let amountMoreThan = Number(req.query.amountMoreThan);
    if (isNaN(amountMoreThan) || amountMoreThan < 0) {
        amountMoreThan = 0;
    }

    return res.json({
        success: true,
        data: expenditures.filter(
            (row) => row.userId === userId && row.amount > amountMoreThan
        ),
    });
});

// read expenditure
app.get("/expenditures/:id", (req, res) => {
    // extra auth token from headers
    const authReponse = authorize(req.headers.authorization);
    if (!authReponse.isAuthorized) {
        return res.status(200).json({
            success: false,
            message: "Unathorized, please login",
        });
    }

    // parse the auth user id
    const { userId } = authReponse;

    // get the id of the request resource from the params
    const id = req.params.id;

    const row = expenditures.find(
        (row) => row.userId === userId && row.id === id
    );
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
    // extra auth token from headers
    const authReponse = authorize(req.headers.authorization);
    if (!authReponse.isAuthorized) {
        return res.status(200).json({
            success: false,
            message: "Unathorized, please login",
        });
    }

    // parse the auth user id
    const { userId } = authReponse;

    // const { name, amount, date } = req.body
    const payload = req.body;

    if (!payload?.name || !payload.amount || !payload.date) {
        return res.status(200).json({
            success: false,
            message: "name, amount and date for expense are required",
        });
    }

    // we have to validate the name, maybe, there name must have some number of characters
    if (!isValidName(payload.name)) {
        return res.status(200).json({
            success: false,
            message: "Name is invalid",
        });
    }

    // we have to make sure that amount is actually a number
    if (!isValidAmount(payload.amount)) {
        return res.status(200).json({
            success: false,
            message: "Amount is invalid",
        });
    }

    // we have to also make sure that date is of the format, yyyy-MM-dd
    if (!isValidDate(payload.date)) {
        return res.status(200).json({
            success: false,
            message: "Expense date is invalid",
        });
    }

    // generate uuid unique to this expense
    const uuid = crypto.randomUUID();

    // insert the new record
    expenditures.push({
        id: uuid,
        userId,
        name: payload.name,
        amount: payload.amount,
        date: payload.date,
    });

    return res.status(201).json({
        success: true,
        message: "expenditure created successfully",
    });
});

// update expenditure
app.put("/expenditures/:id", (req, res) => {
    // extra auth token from headers
    const authReponse = authorize(req.headers.authorization);
    if (!authReponse.isAuthorized) {
        return res.status(200).json({
            success: false,
            message: "Unathorized, please login",
        });
    }

    // parse the auth user id
    const { userId } = authReponse;

    // get the id of the request resource from the params
    const id = Number(req.params.id);

    // if the record is not found, rowIndex becomes -1
    const rowIndex = expenditures.findIndex(
        (row) => row.userId === userId && row,
        id === id
    );
    if (rowIndex === -1) {
        // what status code do this should be passed here? 404 not not found? why??
        return res.status(200).json({
            success: false,
            message: `Resource with ID, '${id}' not found`,
        });
    }

    const row = expenditures[rowIndex];

    // we have to validate the name, maybe, there name must have some number of characters
    // we have to make sure that amount is actually a number
    // we have to also make sure that date is of the format, yyyy-MM-dd
    const { name, amount, date } = req.body;

    if (!name || !amount || !date) {
        return res.status(200).json({
            success: false,
            message: "name, amount and date for expense are required",
        });
    }

    // validate name if it is passed
    if (name && !isValidName(name)) {
        return res.status(200).json({
            success: false,
            message: "Name is invalid",
        });
    }

    // validate amount if it is passed
    if (amount && !isValidAmount(amount)) {
        return res.status(200).json({
            success: false,
            message: "Amount is invalid",
        });
    }

    // validate date if it is passed
    if (date && !isValidDate(date)) {
        return res.status(200).json({
            success: false,
            message: "Expense date is invalid",
        });
    }

    expenditures[rowIndex].name = name ?? row.name;
    expenditures[rowIndex].amount = amount ?? row.amount;
    expenditures[rowIndex].date = date ?? row.date;

    // there was a time a saw a 204 status - No content
    // since there was no data to return however we'll return the usual
    return res.status(200).json({
        success: true,
        message: "expenditure updated successfully",
    });
});

// delete expenditure
app.delete("/expenditures/:id", (req, res) => {
    // extra auth token from headers
    const authReponse = authorize(req.headers.authorization);
    if (!authReponse.isAuthorized) {
        return res.status(200).json({
            success: false,
            message: "Unathorized, please login",
        });
    }

    // parse the auth user id
    const { userId } = authReponse;

    // get the id of the request resource from the params
    const id = req.params.id;

    // we don't take negative ids, why?
    const rowIndex = expenditures.findIndex(
        (row) => row.userId === userId && row.id === id
    );
    if (rowIndex === -1) {
        // what status code do this should be passed here? 404 not not found? why??
        return res.status(200).json({
            success: false,
            message: `Resource with ID, '${id}' not found`,
        });
    }

    expenditures = expenditures.filter((_, index) => index !== rowIndex);

    return res.status(200).json({
        success: true,
        message: "expenditure deleted successfully",
    });
});

module.exports = app;
