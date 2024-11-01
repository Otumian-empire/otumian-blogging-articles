/**
 * Simple User Authentication Logic
 *
 * Concepts Covered:
 * -> Variables
 * -> functions
 * -> conditionals
 *
 * Description
 * -> Create a login system where users can sign up with a email and password, and then attempt to log in.
 * -> Store user data in memory (using an array or object), and compare the entered credentials with the stored ones during login.
 *
 * Challenge
 * -> Implement password validation with the following rules. Password must:
 *  - not be null or empty, hence, required
 *  - be at least six characters
 *  - must have at least on of the special characters: !, @, $, _, -
 *  - have at least one uppercase
 *  - have at least one lowercase
 *  - have at least one number
 * -> Implement email validation with the following rules. Email must:
 *  - not be null or empty, hence, required
 *  - not exceed 256 characters in length
 *  - not contain prohibited characters (spaces, quotes, parentheses, brackets, comma, semicolon, colon, exclamation)
 *  - have a valid syntax (local part + "@" + domain + "." + tld)
 *  - not have 'email' in it
 *  - Local Part (Username):
 *      - Maximum length: 64 characters
 *  - Domain:
 *      - Maximum length: 253 characters
 *  - TLD (Top-Level Domain):
 *      - Must be one of the recognized TLDs (e.g., .com, .org, .net, etc.)
 *      - Maximum length: 6 characters
 */

const readline = require("readline");
const crypto = require("node:crypto");

// users will an object with the key as the email because we intend to make the email unique
// another approach is to generate some random string for the key (the key must be unique)
// so that in the USERS object we can have { keys: {email, password}, ...}
// another approach is to use an array where we'd have [{email, password}, ...]
// try both approaches and let's know what is best
const USERS = {};

// expected actions are either login or signup
const AUTH_ACTIONS = {
    LOGIN: "login",
    SIGNUP: "signup",
};

// We are expecting that a user input will indicate what action to be performed
// and the data to be used.
// Eg: [action] [email] [password]
async function getUserInput(question) {
    const ReadLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return await new Promise((resolve) => {
        ReadLine.question(question, (answer) => {
            resolve(answer);
            ReadLine.close();
        });
    });
}

// We expect user to enter-> [action] [email] [password]
function isValidInputFormat(input = "") {
    return input.split(" ").length === 3;
}

// This function should return an object with the property, action, email and password
// We could also have done, { action, data: { email, password } }
function destructureInput(input = "") {
    const [action, email, password] = input.split(" ");
    return {
        action,
        email,
        password,
    };
}

function isValidationAction(action = "") {
    return action && Object.values(AUTH_ACTIONS).includes(action);
}

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// usually, password validators will return a boolean, whether the password is valid or not
// however, we should consider adding an error message too
function isValidPassword(password = "") {
    // not be null or empty, hence, required
    if (!password || password === "") {
        return {
            isValid: false,
            message: "Password is required",
        };
    }

    // TODO: Complete the body

    // at this point, we've met all the rules we've set however there are some values
    // that will pass through because of the approach we took
    return {
        isValid: true,
        message: "",
    };
}


function isValidEmail(email = "") {
    //  - not be null or empty, hence, required
    if (!email || email === "") {
        return {
            isValid: false,
            message: "Email is required",
        };
    }

    // TODO: Complete the body

    return {
        isValid: true,
        message: "",
    };
}

// will return undefine or the user object
function findUserByEmail(email) {
    return USERS[email];
}

// hashes the password using sha256, we could use something better
// usually something like bcrypt, argon, etc
function hashPassword(password) {
    return crypto.hash("sha256", password);
}

function isValidHash(password, passwordHash) {
    return hashPassword(password) === passwordHash;
}

// When signing up, we have to make sure that the email doesn't exist
// The email and password are valid
// Then generate a key that hasn't been used and create an object
// and assign an object of the credentials as value
// Log that signup successful and log the key and email of the user
function signUpLogic({ email, password }) {
    const user = findUserByEmail(email);
    if (user) {
        return {
            success: false,
            message: "User with such email already exist",
        };
    }

    const passwordHash = hashPassword(password);

    USERS[email] = { email, password: passwordHash };

    return {
        success: true,
        message: "User created successfully, you can now login",
    };
}

// When logging in, we have to make sure that the email exists
// We have to validate the email and password
// Opinion here: I learn from one of the devs that there is no need to
// validate data that you are not going to write to the db
// What do you think
function loginLogic({ email, password }) {
    const user = findUserByEmail(email);
    if (!user) {
        // here the message could just be invalid credentials
        return {
            success: false,
            message: "User with not found",
        };
    }

    if (!isValidHash(password, user.password)) {
        return {
            success: false,
            message: "Invalid credentials",
        };
    }

    return {
        success: true,
        message: `${user.email} has logged in`,
    };
}

async function App() {
    console.clear();
    console.log("Running authentication app");

    const userInput = await getUserInput("\n$ ");

    if (["help", "h", "about"].includes(userInput)) {
        console.log(
            "About: Simple User Authentication Logic" +
            "\n- Expected format->[action] [email] [password]" +
            "\n\t[action] can be 'signup' or 'login' followed by email and password" +
            "\n" +
            "\n- Expected format->[action]" +
            "\n\t[action] can be 'exit', 'quit', 'list', 'l, 'about', 'help', or 'h'" +
            "\n\t\t- [exit|quit]: exits or quits the program" +
            "\n\t\t- [list|l]: list the user emails available" +
            "\n\t\t- [about|help|h]: displays the about page"
        );
        return;
    }

    if (["list", "l"].includes(userInput)) {
        console.clear();
        console.log("Users\n-----");
        for (const user of Object.values(USERS)) {
            console.log(`${user.email}`);
        }
        return;
    }

    if (["exit", "quit", "\n"].includes(userInput)) {
        console.clear();
        console.log("Application ended");
        process.exit();
    }

    if (!isValidInputFormat(userInput)) {
        console.log(
            "FormatError: Invalid date format. Expected format->[action] [email] [password]"
        );
        return;
    }

    const { action, email, password } = destructureInput(userInput);

    if (!isValidationAction(action)) {
        console.log("FormatError: Invalid action. Expected->login|signup");
        return;
    }

    const emailValidation = isValidEmail(email);
    if (!emailValidation.isValid) {
        console.log(emailValidation.message);
        return;
    }

    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.isValid) {
        // It is not a good idea to trust what api (message) your are using, especially if the
        // message is from a vendor (a 3rd party and the error messages aren't predefined)
        // Usually, I'd just say invalid credentials or throw some error that the client can catch
        // and knowing the error type, they'd be certain of what to do based on the rules
        // the client has set (just print everything out, all the rules regarding a valid password)
        // And most vendors will just return true or false but in our case, we'd add a message
        console.log(passwordValidation.message);
        return;
    }

    // had we several actions, we could use switch instead
    if (action === AUTH_ACTIONS.LOGIN) {
        // console.log("We are doing a login");
        const { success, message } = loginLogic({ email, password });
        if (!success) {
            console.log(message);
            return;
        }

        console.log(message);
    } else if (action === AUTH_ACTIONS.SIGNUP) {
        // console.log("We are doing a signup");
        const { success, message } = signUpLogic({ email, password });
        if (!success) {
            console.log(message);
            return;
        }

        console.log(message);
    } else {
        console.log(
            `FormatError: Action must be one of ${Object.values(AUTH_ACTIONS)}`
        );
    }
}

(async () => {
    while (true) {
        // Run the App function
        await App();
        await sleep(5000);
    }
})();
