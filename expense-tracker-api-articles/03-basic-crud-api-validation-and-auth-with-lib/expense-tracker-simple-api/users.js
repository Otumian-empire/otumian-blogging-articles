// users.js;
const app = require("express").Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
let { users } = require("./data");
const { authValidationSchema } = require("./joi_validations");

// sign up
app.post("/users/signup", (req, res) => {
    const { email, password } = req.body;

    const validationResponse = authValidationSchema.validate({
        email,
        password,
    });
    if (validationResponse.error) {
        return res.status(200).json({
            success: false,
            message: validationResponse.error.message,
            // message: validationResponse.error.details[0].message,
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

    const token = jwt.sign(
        {
            userId: uuid,
            email,
        },
        "SOME SERECT",
        {
            expiresIn: "1h",
        }
    );

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

    const validationResponse = authValidationSchema.validate({
        email,
        password,
    });
    if (validationResponse.error) {
        return res.status(200).json({
            success: false,
            message: validationResponse.error.message,
            // message: validationResponse.error.details[0].message,
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

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
        },
        "SOME SERECT",
        {
            expiresIn: "1h",
        }
    );

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

module.exports = app;
