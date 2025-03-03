// middlewares.js;
const jwt = require("jsonwebtoken");
const { TokenExpiredError, JsonWebTokenError } = require("jsonwebtoken");
const { users } = require("./data");

/* Logs the request method, route and the time the request was made */
function logRequest(req, res, next) {
    try {
        const log = `${req.method} :: ${
            req.originalUrl
        } - ${new Date().toISOString()}`;

        console.log(log);

        return next();
    } catch (error) {
        return next(error);
    }
}

/* checks the header of the incoming request if there is a jwt */
function hasJwt(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(200).json({
                success: false,
                message: "Unathorized, No auth token found",
            });
        }

        return next();
    } catch (error) {
        return next(error);
    }
}

/* authenticates and authorize user */
function isAuthorized(req, res, next) {
    try {
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
    } catch (error) {
        return next(error);
    }
}

/* validation middleware: takes schema and a request property*/
function validation(schema, requestProperty) {
    return function (req, res, next) {
        try {
            const validationResponse = schema.validate(req[requestProperty]);

            if (validationResponse.error) {
                return res.status(200).json({
                    success: false,
                    message: validationResponse.error.message,
                    // message: validationResponse.error.details[0].message,
                });
            }

            return next();
        } catch (error) {
            return next(error);
        }
    };
}

/* error-handling middleware */
function errorHandler(error, req, res, next) {
    console.log(error);
    if (error instanceof TokenExpiredError) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: please login",
        });
    }

    if (error instanceof JsonWebTokenError) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: please format your auth token",
        });
    }

    // anything else
    return res.status(500).json({
        success: false,
        message: "Internal server error, something went wrong please try again",
        // as if the same error would not occur again when the user tries again 😂
    });
}

/* not found error-handling middleware */
function notFoundHandler(req, res, next) {
    // anything else
    return res.status(404).json({
        success: false,
        message: "Endpoint not found, kindly read our documentation",
    });
}

module.exports = {
    logRequest,
    hasJwt,
    isAuthorized,
    validation,
    errorHandler,
    notFoundHandler,
};
