// auth.js;
const JWT_SECRET = process.env.SECRET;

console.log({ JWT_SECRET });
const jwt = require("jsonwebtoken");

const { users } = require("./data");

// pass the req.headers.authorization as argument
function authorize(authToken) {
    const response = {
        isAuthorized: false,
        userId: "",
        email: "",
    };

    if (!authToken) {
        return response;
    }

    const { userId, email } = jwt.verify(authToken, JWT_SECRET);

    // now we can fetch user with email and userId
    const isAuthenticUser = users.find(
        (user) => user.email === email && user.id === userId
    );

    if (!isAuthenticUser) {
        return response;
    }

    // here the token is valid
    response.isAuthorized = true;
    response.email = email;
    response.userId = userId;

    return response;
}

module.exports = { authorize };
