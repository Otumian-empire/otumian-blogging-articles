// users.js;
const app = require("express").Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
let { users } = require("./data");
const { authValidationSchema } = require("./joi_validations");
const { validation } = require("./middlewares");
const JWT_SECRET = process.env.SECRET;

console.log({ JWT_SECRET });

// sign up
app.post("/signup", validation(authValidationSchema, "body"), (req, res) => {
    try {
        const { email, password } = req.body;

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
            JWT_SECRET,
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
    } catch (error) {
        return next(error);
    }
});

// login
app.post("/login", validation(authValidationSchema, "body"), (req, res) => {
    try {
        const { email, password } = req.body;

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
            JWT_SECRET,
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
    } catch (error) {
        return next(error);
    }
});

module.exports = app;
