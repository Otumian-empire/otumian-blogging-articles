// auth.js;

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

    // decode auth token
    const decodeToken = Buffer.from(authToken, "base64").toString();

    // parse the decode token into the email and userId
    const [email, userId] = decodeToken.split(":");

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
