// require("dotenv/config");

// console.log(process.env.SECRET);

// [async] function FunctionName(requestObject, responseObject, nextMiddleware) {
//     // do something on the request
//     // return a response if there is an error
//     // else go the the next middleware
// }

// router.method("/some route", middlewares, controller);

const app = require("express")();

app.use((req, res, next) => {
    console.log("We are in the middleware");

    res.send("Hi...");

    return next();
});

app.get("/", (req, res) => {
    return res.send("Ok... Now ");
});

app.listen(3000, () => console.log("Middleware app running on port 3000"));
