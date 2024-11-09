const http = require("node:http");
const crypto = require("node:crypto");

function generateId() {
    return crypto.randomUUID();
}

function hashPassword(password) {
    return crypto.hash("sha256", password);
}

// simple CRUD server
// Users is an array of profiles
// a profile is an object with id, full name, email, password
// { id: number, full name: string, email: string, password: string }
const USERS = [];

// item is an object: { full name, email, password }
function save(item) {
    DB.push({ id: generateId(), ...item, password: item.password });
}

function read(id) {
    return USERS.find((user) => user.id === id);
}

function list() {
    return USERS.map((user) => ({ ...user, password: null }));
}

function update(id, field, value) {
    // TODO: check for password, that is if we want the password to be 
    // updated this way
    // TODO: check that the id is not updated
    const user = read(id)
    if (user) {
        user[field] = value

        USERS = [...USERS, user]
    }
}

// same as delete
function remove(id) { }

http.get(
    {
        hostname: "localhost",
        port: 3000,
        path: "/",
        agent: false, // Create a new agent just for this one request
    },
    (res) => { }
);

// const port = 3000;
// const host = "localhost";

// const requestListener = (req, res) => {
//     console.log("Hello there")
//     res.writeHead(200, {
//         message: "It is okay and all that",
//         authorization: "Api-Token:rtykFDGHjklRtyulicvbnm,fghjk456&*OGHJk",
//     });
//     // console.log(req);
//     res.write(JSON.stringify({ message: "Hello there" }));
//     res.end();
// };

// const server = http.createServer(requestListener);

// server.listen(port, host, () => {
//     console.log({ host });
//     // console.log(`Server running on port ${port}`)
//     console.log(`Server is running on http://${host}:${port}`);
// });
