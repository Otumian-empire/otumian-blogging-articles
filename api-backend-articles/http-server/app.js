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
let USERS = [];

// item is an object: { full name, email, password }
function save(item) {
    DB.push({ id: generateId(), ...item, password: item.password });
}

function read(id) {
    const user = USERS.find((user) => user.id === id);
    if (!user) {
        throw new Error(`User with id, ${id}, not found`)
    }

    return user
}

function list() {
    return USERS.map((user) => ({ ...user, password: undefined }));
}

function update(id, field, value) {
    // TODO: check for password, that is if we want the password to be 
    // updated this way
    // TODO: check that the id is not updated
    const user = read(id)

    // the element is passed as reference so when we update the element
    // the original is updated as well
    user[field] = value

}

// same as delete
function remove(id) {
    read(id)
    USERS = USERS.filter(user => user.id !== id)
}


const port = 3000;
const host = "localhost";


const requestListener = (req, res) => {
    console.dir(req)
    console.log({ url: req.url })
    console.log({ params: req.params })
    console.log({ body: req.body })
    console.log({ query: req.query })
    console.log({ header: req.header })
    console.log({ method: req.method })
    console.log("Hello there")
    res.writeHead(200, {
        message: "It is okay and all that",
        authorization: "Api-Token:rtykFDGHjklRtyulicvbnm,fghjk456&*OGHJk",
    });
    // console.log(req);
    res.write(JSON.stringify({ message: "Hello there" }));
    res.end();
};


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

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
