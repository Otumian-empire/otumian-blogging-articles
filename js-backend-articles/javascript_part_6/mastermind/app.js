const readline = require("readline");

let CODE_MAKER = [];
let HINTS = [0, 0, 0, 0];

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

function generateRandomNumbersBetween(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function generateCodeMaker(isDuplicatesAllowed = false) {
    let counter = ZERO;
    let codeMaker = [];

    while (counter < NUMBER_CODE) {
        let code = generateRandomNumbersBetween(RAND_INT_MIN, RAND_INT_MAX);

        if (isDuplicatesAllowed || !codeMaker.includes(code)) {
            codeMaker.push(code);
            counter += ONE;
        }
    }

    return codeMaker;
}

async function getInput(query) {
    const readlineOInstance = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return await new Promise((resolve) => {
        readlineOInstance.question(query, (userInput) => {
            resolve(userInput);
            readlineOInstance.close();
        });
    });
}

function isValidRound(rounds) {
    return MIN_ROUNDS <= rounds && rounds <= MAX_ROUNDS && rounds % 2 == ZERO;
}

function compareCode(codeMaker, codeBreaker) {
    let hints = [0, 0, 0, 0];

    // compare each code at the same index and provide a hint
    for (let codeIndex = 0; codeIndex < NUMBER_CODE; codeIndex++) {
        if (codeBreaker[codeIndex] > codeMaker[codeIndex]) {
            hints[codeIndex] = MORE;
        } else if (codeBreaker[codeIndex] === codeMaker[codeIndex]) {
            hints[codeIndex] = EQUAL;
        } else {
            hints[codeIndex] = LESS;
        }
    }

    return hints;
}

function clearScreen() {
    console.clear();
}

function hasGuessedCodeMaker(hints) {
    return hints.filter((code) => ZERO === code).length === NUMBER_CODE;
}

function declareResult(rounds) {
    if (rounds > TERMINATING_VALUE) {
        console.log(WIN_PROMPT);
    } else {
        console.log(LOSS_PROMPT);
    }
}

async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// This is where the whole game is at
async function App() {
    let rounds = ZERO;
    let isDuplicateAllowed = false;

    // The number of times to play must be even between 2 to 12 rounds
    while (true) {
        try {
            const roundsInput = await getInput(ROUNDS_PROMPT);

            // Number(some value) -> converts some value to a number
            // if possible else returns NaN. we could directly check
            // that 'rounds' is not NaN but any error will be caught
            // in the catch
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
        isDuplicateAllowed = Number(duplicateInput) === ONE;
    } catch (error) {
        isDuplicateAllowed = false;
    }

    clearScreen();

    CODE_MAKER = generateCodeMaker(isDuplicateAllowed);

    // code breaker guesses the code by the code maker
    while (rounds > TERMINATING_VALUE) {
        console.log(`Number of rounds left: ${rounds}`);

        // enter guess with spaces
        const codeBreakerInput = await getInput(CODE_BREAKER_PROMPT);

        // we are converting the code breaker into numbers
        const codeBreaker = codeBreakerInput
            .split(" ")
            .map((value) => Number(value));

        HINTS = compareCode(CODE_MAKER, codeBreaker);

        // because of the values that we used to hint the user
        // we have to find some dicey way to break the program
        // when the user guesses the code (all hints go to 0)
        if (hasGuessedCodeMaker(HINTS)) {
            break;
        }

        console.log(HINTS);

        rounds -= ONE;
    }

    declareResult(rounds);

    console.log(`CODE_MAKER: ${CODE_MAKER}`);
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
        CODE_MAKER = [0, 0, 0, 0];
        HINTS = [0, 0, 0, 0];
    }
})();
