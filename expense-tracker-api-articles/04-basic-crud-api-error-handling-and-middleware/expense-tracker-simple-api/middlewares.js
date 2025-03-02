// middlewares.js;
const jwt = require("jsonwebtoken");
const { users } = require("./data");

/* Logs the request method, route and the time the request was made */
function logRequest(req, res, next) {
    const log = `${req.method} :: ${
        req.originalUrl
    } - ${new Date().toISOString()}`;

    console.log(log);

    return next();
}

/* checks the header of the incoming request if there is a jwt */
function hasJwt(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(200).json({
            success: false,
            message: "Unathorized, No auth token found",
        });
    }

    return next();
}

/* authenticates and authorize user */
function isAuthorized(req, res, next) {
    const authorization = req.headers.authorization;

    const JWT_SECRET = process.env.SECRET;
    if (!JWT_SECRET) {
        return res.status(200).json({
            success: false,
            message: "Something went wrong",
        });
    }

    const { userId, email } = jwt.verify(authorization, JWT_SECRET);

    // now we can fetch user with email and userId
    const isAuthenticUser = users.find(
        (user) => user.email === email && user.id === userId
    );

    if (!isAuthenticUser) {
        return res.status(200).json({
            success: false,
            message: "Unathorized, No user matched",
        });
    }

    req.user = { userId, email };

    return next();
}

/* validation middleware: takes schema and a request property*/
function validation(schema, requestProperty) {
    return function (req, res, next) {
        const validationResponse = schema.validate(req[requestProperty]);

        if (validationResponse.error) {
            return res.status(200).json({
                success: false,
                message: validationResponse.error.message,
                // message: validationResponse.error.details[0].message,
            });
        }

        return next();
    };
}

module.exports = { logRequest, hasJwt, isAuthorized, validation };
