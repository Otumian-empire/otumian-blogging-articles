// auth.js;
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

    const { userId, email } = jwt.verify(authToken, "SOME SERECT");

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

// ///

// const jwt = require("jsonwebtoken");

// // default algo is HS256
// const authToken = jwt.sign(
//     {
//         id: "c96b08b8-f92f-4e27-8f04-c4f3604907d6",
//         email: "john@gmail.com",
//     },
//     "SOME SERECT",
//     {
//         expiresIn: "1h",
//     }
// );

// // console.log(authToken);
// // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5NmIwOGI4LWY5MmYtNGUyNy04ZjA0LWM0ZjM2MDQ5MDdkNiIsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJpYXQiOjE3MzgyMTM0NTAsImV4cCI6MTczODIxNzA1MH0.3edLKTeSlgo8vThEAmDJ1uC5GU58AxeLzNpSgVAOYvc
// // https://github.com/vercel/ms/blob/main/readme.md
// // use number: counted as seconds
// // use numberic string, counted as millisec
// // n d, n w, n m, n y, n s,

// // does not validate token, just decodes it
// console.log(
//     jwt.decode(
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5NmIwOGI4LWY5MmYtNGUyNy04ZjA0LWM0ZjM2MDQ5MDdkNiIsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJpYXQiOjE3MzgyMTM0NTAsImV4cCI6MTczODIxNzA1MH0.3edLKTeSlgo8vThEAmDJ1uC5GU58AxeLzNpSgVAOYvc"
//     )
// );
// /*
// {
//   id: 'c96b08b8-f92f-4e27-8f04-c4f3604907d6',
//   email: 'john@gmail.com',
//   iat: 1738213450,// seconds
//   exp: 1738217050 // seconds
// }
// */
// // jwt.verify;

// console.log(
//     jwt.verify(
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5NmIwOGI4LWY5MmYtNGUyNy04ZjA0LWM0ZjM2MDQ5MDdkNiIsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJpYXQiOjE3MzgyMTM0NTAsImV4cCI6MTczODIxNzA1MH0.3edLKTeSlgo8vThEAmDJ1uC5GU58AxeLzNpSgVAOYvc",
//         "SOME SERECT"
//     )
// );

// // let the token expire
// // TokenExpiredError: Thrown error if the token is expired.
// //       if (err) throw err;
// //                ^
// // TokenExpiredError: jwt expired
// //     at /Users/user/expense-tracker-simple-api/node_modules/jsonwebtoken/verify.js:190:21
// //     at getSecret (/Users/user/expense-tracker-simple-api/node_modules/jsonwebtoken/verify.js:97:14)
// //     at module.exports [as verify] (/Users/user/expense-tracker-simple-api/node_modules/jsonwebtoken/verify.js:101:10)
// //     at Object.<anonymous> (/Users/user/expense-tracker-simple-api/auth.js:82:9)
// //     at Module._compile (node:internal/modules/cjs/loader:1565:14)
// //     at Object..js (node:internal/modules/cjs/loader:1708:10)
// //     at Module.load (node:internal/modules/cjs/loader:1318:32)
// //     at Function._load (node:internal/modules/cjs/loader:1128:12)
// //     at TracingChannel.traceSync (node:diagnostics_channel:322:14)
// //     at wrapModuleLoad (node:internal/modules/cjs/loader:219:24) {
// //   expiredAt: 2025-01-30T06:04:10.000Z
// // }

// // Node.js v22.12.0

// // JsonWebTokenError
// //       if (err) throw err;
// //                ^
// // JsonWebTokenError: invalid signature
// //     at /Users/user/Projects/me/human/otumian-blogging-articles/expense-tracker-api-articles/03-basic-crud-api-validation-and-auth-with-lib/expense-tracker-simple-api/node_modules/jsonwebtoken/verify.js:171:19
// //     at getSecret (/Users/user/Projects/me/human/otumian-blogging-articles/expense-tracker-api-articles/03-basic-crud-api-validation-and-auth-with-lib/expense-tracker-simple-api/node_modules/jsonwebtoken/verify.js:97:14)
// //     at module.exports [as verify] (/Users/user/Projects/me/human/otumian-blogging-articles/expense-tracker-api-articles/03-basic-crud-api-validation-and-auth-with-lib/expense-tracker-simple-api/node_modules/jsonwebtoken/verify.js:101:10)
// //     at Object.<anonymous> (/Users/user/Projects/me/human/otumian-blogging-articles/expense-tracker-api-articles/03-basic-crud-api-validation-and-auth-with-lib/expense-tracker-simple-api/auth.js:82:9)
// //     at Module._compile (node:internal/modules/cjs/loader:1565:14)
// //     at Object..js (node:internal/modules/cjs/loader:1708:10)
// //     at Module.load (node:internal/modules/cjs/loader:1318:32)
// //     at Function._load (node:internal/modules/cjs/loader:1128:12)
// //     at TracingChannel.traceSync (node:diagnostics_channel:322:14)
// //     at wrapModuleLoad (node:internal/modules/cjs/loader:219:24)

// // Node.js v22.12.0

// // NotBeforeError
// // Thrown if current time is before the nbf claim.
