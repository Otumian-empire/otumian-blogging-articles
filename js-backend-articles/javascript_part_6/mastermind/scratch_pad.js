const readline = require("readline");

// generate by the code maker function
let CODE_MAKER = [3, 6, 7, 0];

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

// new code

let HINTS = [0, 0, 0, 0];

async function compareCode(codeMaker) {
    // enter guess with spaces
    const input = await getInput("Enter code breaker with spaces: ");

    // we are converting the code breaker into numbers
    const codeBreaker = input.split(" ").map((value) => Number(value));

    // compare each code at the same index and provide a hint
    for (let codeIndex = 0; codeIndex < 4; codeIndex++) {
        if (codeBreaker[codeIndex] > codeMaker[codeIndex]) {
            HINTS[codeIndex] = 1;
        } else if (codeBreaker[codeIndex] === codeMaker[codeIndex]) {
            HINTS[codeIndex] = 0;
        } else {
            HINTS[codeIndex] = -1;
        }
    }
}

(async () => {
    console.log(`INITIAL Hint: ${HINTS}`);

    // await because of the input
    await compareCode(CODE_MAKER);

    console.log(`INITIAL Hint: ${HINTS}`);
})();
