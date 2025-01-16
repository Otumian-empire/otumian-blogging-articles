// import the express lib
const express = require("express");

// import lib for generating uuid
const crypto = require("crypto");

// data source imports
let { expenditures, users } = require("./data");
const { isValidEmail, isValidPassword } = require("./validations");

// validation

// create an express application
const app = express();

// parse request body as json
app.use(express.json());

// list expenditures
app.get("/expenditures", (req, res) => {
    // extra auth token from headers
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(200).json({
            success: false,
            message: "Unathorized, please login",
        });
    }

    // decode auth token
    const decodeToken = Buffer.from(authorization, "base64").toString();

    // parse the decode token into the email and userId
    const [email, userId] = decodeToken.split(":");

    // now we can fetch user with email and userId
    const isAuthenticUser = users.find(
        (user) => user.email === email && user.id === userId
    );

    if (!isAuthenticUser) {
        return res.status(200).json({
            success: false,
            message: "Unathorized, please login",
        });
    }

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

// sign up
app.post("/users/signup", (req, res) => {
    const { email, password } = req.body;

    if (!isValidEmail(email)) {
        return res.status(200).json({
            success: false,
            message: "Invalid email",
        });
    }

    if (!isValidPassword(password)) {
        return res.status(200).json({
            success: false,
            message: "Invalid password",
        });
    }

    // making sure that there is no record with the same email as this user's
    const existingUsers = users.filter((user) => user.email === email);

    if (existingUsers.length > 0) {
        return res.status(200).json({
            success: false,
            message: "Email already taken",
        });
    }

    // we are supposed to do password hashing here (recommended practice)

    // generate uuid unique to this user
    const uuid = crypto.randomUUID();

    // save this record
    const newUser = {
        id: uuid,
        email,
        password,
    };

    console.log(newUser);

    users = [...users, newUser];

    const token = Buffer.from(`${email}:${uuid}`).toString("base64");

    return res.status(200).json({
        success: true,
        message: "Sign up successful",
        data: {
            id: uuid,
            email,
            token,
        },
    });
});

// login
app.post("/users/login", (req, res) => {
    const { email, password } = req.body;

    if (!isValidEmail(email)) {
        return res.status(200).json({
            success: false,
            message: "Invalid email",
        });
    }

    if (!isValidPassword(password)) {
        return res.status(200).json({
            success: false,
            message: "Invalid password",
        });
    }

    // find a user with the same email and password: authentication taking place here
    const authUser = users.filter(
        (user) => user.email === email && user.password === password
    );

    // the number of record expected is one, anything else is invalid
    if (authUser.length !== 1) {
        return res.status(200).json({
            success: false,
            message: "Invalid credentials",
        });
    }

    // we are supposed to compare the password with the hash normally
    const user = authUser[0];

    const token = Buffer.from(`${user.email}:${user.id}`).toString("base64");

    return res.status(200).json({
        success: true,
        message: "Log in successful",
        data: {
            id: user.id,
            email: user.email,
            token,
        },
    });
});

// create a server that listens to requests on port 3000
app.listen(3000, () =>
    console.log(`Api running on ${"http://localhost:3000"}`)
);
