// app.js

const readline = require("readline");

// string constants
const ROUNDS_PROMPT = "Enter number of rounds (Even in [2, 12]) 🤗️: ";
const INVALID_ROUNDS_PROMPT =
    "Round must be an even number from 2 to 12 includes 😩️";
const DUPLICATE_PROMPT = "Duplicates allowed? (1/0) 🤤️: ";
const CODE_BREAKER_PROMPT = "Enter codes separated by space: ";
const WIN_PROMPT = "You won the rounds 👏️";
const LOSS_PROMPT = "You lost bitterly to a computer 😏️";

// int constants
const ZERO = 0;
const ONE = 1;

const NUMBER_CODE = 4;
const TERMINATING_VALUE = 0;

const MORE = 1;
const EQUAL = 0;
const LESS = -1;

const MIN_ROUNDS = 2;
const MAX_ROUNDS = 12;

const RAND_INT_MIN = 0;
const RAND_INT_MAX = 9;
const WAITING_TIME = 5000; // in milliseconds

// The code maker
let CODE_MAKER = [];

// hint
let HINTS = ["h", "i", "n", "t"];

/**
 * Counts the number of occurrences of a key in a collection.
 *
 * Filters the collection to find elements that match the key and returns the count.
 *
 * @param {any} key - The key to search for in the collection.
 * @param {Array<any>} [inCollection=[]] - The collection to search in. Defaults to an empty array.
 * @returns {number} The number of occurrences of the key in the collection.
 */
function countNumberOf(key, inCollection = []) {
    return inCollection.filter((value) => key === value).length;
}

/**
 * Clears the console screen.
 *
 * Calls the console.clear() method to remove all output from the console.
 */
function clearScreen() {
    console.clear();
}

/**
 * Validates the round input.
 *
 * Checks if the input rounds are within the valid range (MIN_ROUNDS to MAX_ROUNDS)
 * and if they are an even number.
 *
 * @param {number} rounds - The number of rounds to validate.
 * @returns {boolean} true if the rounds are valid, false otherwise.
 */
function isValidRound(rounds) {
    return MIN_ROUNDS <= rounds && rounds <= MAX_ROUNDS && rounds % 2 == ZERO;
}

/**
 * Generates a random number between two integers.
 *
 * Uses the Math.random() function to generate a random number within the specified range.
 *
 * @param {number} min - The minimum value of the range (inclusive).
 * @param {number} max - The maximum value of the range (inclusive).
 * @returns {number} A random number between min and max.
 */
function generateRandomNumbersBetween(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

/**
 * Gets user input from the console.
 *
 * Creates a readline interface and prompts the user with a question.
 *
 * @param {string} question - The question to prompt the user with.
 * @returns {Promise<string>} A promise that resolves with the user's input.
 */
async function getInput(question) {
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

/**
 * Pauses execution for a specified amount of time.
 *
 * Uses the setTimeout function to create a promise that resolves after the specified time.
 *
 * @param {number} ms - The time to pause in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified time.
 */
async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generates a random number between two integers.
 *
 * Uses the Math.random() function to generate a random number within the specified range.
 *
 * @param {number} min - The minimum value of the range (inclusive).
 * @param {number} max - The maximum value of the range (inclusive).
 * @returns {number} A random number between min and max.
 */
function generateRandomNumbersBetween(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

/**
 * Gets user input from the console.
 *
 * Creates a readline interface and prompts the user with a question.
 *
 * @param {string} question - The question to prompt the user with.
 * @returns {Promise<string>} A promise that resolves with the user's input.
 */
async function getInput(question) {
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

/**
 * Pauses execution for a specified amount of time.
 *
 * Uses the setTimeout function to create a promise that resolves after the specified time.
 *
 * @param {number} ms - The time to pause in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified time.
 */
async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Declares the result of the game.
 *
 * Prints a win or loss message to the console based on the number of rounds.
 *
 * @param {number} rounds - The number of rounds played.
 */
function declareResult(rounds) {
    if (rounds > TERMINATING_VALUE) {
        console.log(WIN_PROMPT);
    } else {
        console.log(LOSS_PROMPT);
    }
}

/**
 * Generates a code maker.
 *
 * Creates a code maker array with a specified length and optional duplicates.
 *
 * @param {boolean} [duplicates_allowed=false] - Whether duplicates are allowed in the code maker.
 */
function generateCodeMaker(duplicates_allowed = false) {
    let counter = 0;

    while (counter < NUMBER_CODE) {
        let code = generateRandomNumbersBetween(RAND_INT_MIN, RAND_INT_MAX);

        if (duplicates_allowed) {
            CODE_MAKER.push(code);
            counter += ONE;
        } else if (!CODE_MAKER.includes(code)) {
            CODE_MAKER.push(code);
            counter += ONE;
        }
    }
}

/**
 * Compares the code breaker to the code maker.
 *
 * Prompts the user for a guess, compares it to the code maker, and updates the hints array.
 *
 * @returns {Promise<void>} A promise that resolves when the comparison is complete.
 */
async function compareCode() {
    // enter guess with spaces
    const input = await getInput(CODE_BREAKER_PROMPT);

    const codeBreaker = input.split(" ").map((value) => Number(value));

    for (let codeIndex = 0; codeIndex < NUMBER_CODE; codeIndex++) {
        if (codeBreaker[codeIndex] > CODE_MAKER[codeIndex]) {
            HINTS[codeIndex] = MORE;
        } else if (codeBreaker[codeIndex] === CODE_MAKER[codeIndex]) {
            HINTS[codeIndex] = EQUAL;
        } else {
            HINTS[codeIndex] = LESS;
        }
    }
}

// entry point
async function App() {
    let rounds = ZERO;
    let duplicates_allowed = ZERO;

    // The number of times to play must be even between 2 to 12 rounds
    while (true) {
        try {
            const roundsInput = await getInput(ROUNDS_PROMPT);
            rounds = Number(roundsInput);

            if (isValidRound(rounds)) {
                break;
            }
        } catch (error) {
            console.log(INVALID_ROUNDS_PROMPT);
        }
    }

    // should there be duplicates
    try {
        const duplicateInput = await getInput(DUPLICATE_PROMPT);
        duplicates_allowed = Number(duplicateInput);
    } catch (error) {
        duplicates_allowed = ZERO;
    }

    clearScreen();

    generateCodeMaker(duplicates_allowed);

    // code breaker guesses the code by the code maker
    while (rounds > TERMINATING_VALUE) {
        console.log(`Number of rounds left: ${rounds}`);
        await compareCode();

        // because of the values that we used to hint the user
        // we have to find some dicey way to break the program
        // when the user guesses the code (all hints go to 0)
        if (countNumberOf(EQUAL, HINTS) === NUMBER_CODE) {
            break;
        }

        console.log(HINTS);

        rounds -= ONE;
    }

    declareResult(rounds);

    console.log(CODE_MAKER);
}

/**
 * Infinitely keeps playing the game.
 *
 * Runs the App function in an infinite loop, with a delay between each run.
 * Resets the game state after each run.
 */
(async () => {
    while (true) {
        // Run the App function
        await App();

        // Wait for a specified time before next run
        await sleep(WAITING_TIME);

        // Clear the screen
        clearScreen();

        // Reset the game state for replay
        CODE_MAKER = [];
        HINTS = ["h", "i", "n", "t"];
    }
})();
