// expenditures.js;
const app = require("express").Router();
let { expenditures } = require("./data");
const {
    createExpenseSchema,
    updateExpenseSchema,
    expenditureQuerySchema,
    IdValidationSchema,
} = require("./joi_validations");
const { validation } = require("./middlewares");

app.get("/expendituresx", (req, res) => {
    return res.json({
        success: true,
        data: expenditures,
    });
});

// list expenditures
app.get("/", validation(expenditureQuerySchema, "query"), (req, res) => {
    try {
        // parse the userId and email from the req.user
        const { userId /*,  email */ } = req.user;

        // ====================
        // get the query string and check if it not a number or something
        // that can be a number else set a default filter value of 0
        let amountMoreThan = Number(req.query.amountMoreThan);
        if (isNaN(amountMoreThan)) {
            amountMoreThan = 0;
        }

        return res.json({
            success: true,
            data: expenditures.filter(
                (row) => row.userId === userId && row.amount > amountMoreThan
            ),
        });
    } catch (error) {
        return next(error);
    }
});

// read expenditure
app.get("/:id", validation(IdValidationSchema, "params"), (req, res) => {
    try {
        // parse the auth user id
        const { userId } = req.user;

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
    } catch (error) {
        return next(error);
    }
});

// create expenditure
app.post("/", validation(createExpenseSchema, "body"), (req, res) => {
    try {
        // parse the auth user id
        const { userId } = req.user;

        const { name, amount, date } = req.body;

        // generate uuid unique to this expense
        const uuid = crypto.randomUUID();

        // insert the new record
        expenditures.push({
            id: uuid,
            userId,
            name,
            amount,
            date,
        });

        return res.status(201).json({
            success: true,
            message: "expenditure created successfully",
        });
    } catch (error) {
        return next(error);
    }
});

// update expenditure
app.put(
    "/:id",
    validation(IdValidationSchema, "params"),
    validation(updateExpenseSchema, "body"),
    (req, res) => {
        try {
            // parse the auth user id
            const { userId } = req.user;

            // get the id of the request resource from the params
            const id = req.params.id;

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

            expenditures[rowIndex].name = name ?? row.name;
            expenditures[rowIndex].amount = amount ?? row.amount;
            expenditures[rowIndex].date = date ?? row.date;

            // there was a time a saw a 204 status - No content
            // since there was no data to return however we'll return the usual
            return res.status(200).json({
                success: true,
                message: "expenditure updated successfully",
            });
        } catch (error) {
            return next(error);
        }
    }
);

// delete expenditure
app.delete("/:id", validation(IdValidationSchema, "params"), (req, res) => {
    try {
        // parse the auth user id
        const { userId } = req.user;

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
    } catch (error) {
        return next(error);
    }
});

module.exports = app;
