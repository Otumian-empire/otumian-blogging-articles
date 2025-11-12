// file name: validations.js

// typeof operator returns the type of a value

// check that a value is string
const isString = (arg) => typeof arg === "string";

// check that a value is number
// const isNumber = (arg) => typeof arg === "number";
// if we use this approach then, "2.99" fails as a number even though it is a numeric string
// as such we are going with this and later casting the values to numbers
const isNumber = (arg) => !isNaN(Number(arg));
// when a arg is non-numeric or a numeric string, Number(arg) returns NaN
// isNaN checks if a value is NaN and returns true if so else false
// which is why we negate the results from isNaN(...)

/**
 *
 * @param {*} name
 * -   Must be a string
 * -   Must not be empty or null (it is required)
 * -   minimum characters of 10
 * -   maximum characters of 255
 * @returns boolean
 */
function isValidName(name) {
    if (!name || !isString(name)) {
        return false;
    }

    return name.length >= 10 && name.length <= 255;
}

/**
 *
 * @param {*} amount
 * -   Must be a number or numeric string
 * -   Must not be empty (it is required)
 * -   Must be a positive number
 * @returns boolean
 */
function isValidAmount(amount) {
    if (!amount || !isNumber(amount)) {
        return false;
    }

    return amount > 0;
}

/**
 *
 * @param {*} date
 * -   Must be a string
 * -   Could be empty or null (it is option, current date will be used)
 * -   Must be in YYYY-MM-DD format
 * @returns boolean
 */
function isValidDate(date) {
    if (!date || !isString(date)) {
        return false;
    }

    const parsedDate = date.split("-");

    if (parsedDate.length !== 3) {
        return false;
    }

    const [year, month, day] = parsedDate;

    // there is more validations to be done on the years, month and day
    // there are 12 months, max day is 31 and others
    return isNumber(year) && isNumber(month) && isNumber(day);
}

const LETTERS = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
];
const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const SPECIAL_SYMBOLS = ["$", "_", "-"];

const hasAnyOf = (arg, these = []) => {
    return arg.split("").filter((char) => these.includes(char)).length > 0;
};

const hasOneOf = (arg, key) => {
    return arg.split("").filter((char) => char === key).length === 1;
};

// password validation
function isValidPassword(password) {
    if (!password || !isString(password) || password.length < 6) {
        return false;
    }

    const UPPER_CASE = LETTERS.map((char) => char.toUpperCase());
    if (!hasAnyOf(password, UPPER_CASE)) {
        return false;
    }

    if (!hasAnyOf(password, NUMBERS)) {
        return false;
    }

    return hasAnyOf(password, SPECIAL_SYMBOLS);
}

// email validation
function isValidEmail(email) {
    // - be at least sixteen characters
    if (!email || !isString(email) || email.length < 16) {
        return false;
    }

    const lowercasedEmail = email.toLowerCase();
    // or can use the `email.toLowerCase()` from here onwards

    // - not have 'email' in it
    if (lowercasedEmail.includes("email") || lowercasedEmail.includes("_")) {
        return false;
    }

    // - have one '@'
    if (!hasOneOf(lowercasedEmail, "@")) {
        return false;
    }

    // should only one dot
    if (!hasOneOf(lowercasedEmail, ".")) {
        return false;
    }

    // - end with '.com'
    return lowercasedEmail.endsWith(".com");
}

module.exports = {
    isValidName,
    isValidAmount,
    isValidDate,
    isValidPassword,
    isValidEmail,
    NUMBERS,
    SPECIAL_SYMBOLS,
    LETTERS,
    hasAnyOf,
};
