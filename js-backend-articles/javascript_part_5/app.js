// // FIZZBUZZ

// const givenNumber = 3;

// if (givenNumber % 3 === 0 && givenNumber % 5 === 0) {
//     console.log("fizzbuzz");
// } else if (givenNumber % 3 === 0) {
//     console.log("fizz");
// } else if (givenNumber % 5 === 0) {
//     console.log("buzz");
// }

// fizzbuzz for an array

// const numbers = [3, 6, 10, 15];

// for (const givenNumber of numbers) {
//     if (givenNumber % 3 === 0 && givenNumber % 5 === 0) {
//         console.log("fizzbuzz");
//     } else if (givenNumber % 3 === 0) {
//         console.log("fizz");
//     } else if (givenNumber % 5 === 0) {
//         console.log("buzz");
//     }
// }

// // password validation
// const veryWeakPassword = "PrQ1V_";
// // const veryWeakPassword = "rtfy67Fg";
// // const veryWeakPassword = "OlJgRc__1qwPVa";
// console.log(`Password validation for "${veryWeakPassword}"`);

// // - be six characters
// if (veryWeakPassword.length !== 6) {
//     console.log(
//         `- Password must have 6 characters => "${veryWeakPassword}" has '${veryWeakPassword.length}' characters`
//     );
// }
// // - start with uppercase p, 'P'
// else if (!veryWeakPassword.startsWith("P")) {
//     console.log(
//         `- Password must start with 'P' => it is ${veryWeakPassword.startsWith(
//             "P"
//         )} that "${veryWeakPassword}" starts with 'P'`
//     );
// }
// // - end with underscore
// else if (!veryWeakPassword.endsWith("_")) {
//     console.log(
//         `- Password must end with '_' => it is ${veryWeakPassword.endsWith(
//             "_"
//         )} that "${veryWeakPassword}" ends with '_'`
//     );
// }
// // - have uppercase q, 'Q'
// else if (!veryWeakPassword.includes("Q")) {
//     console.log(
//         `- Password must have uppercase q, 'Q' => it is ${veryWeakPassword.includes(
//             "Q"
//         )} that "${veryWeakPassword}" has 'Q'`
//     );
// }
// // - have lowercase r, 'r'
// else if (!veryWeakPassword.includes("r")) {
//     console.log(
//         `- Password must have lowercase r, 'r' => it is ${veryWeakPassword.includes(
//             "r"
//         )} that "${veryWeakPassword}" has 'r'`
//     );
// }
// // - have its fifth character as uppercase v, 'V'
// // fifth character with have index = fifth position - 1 = 4
// // const fifthCharacter = veryWeakPassword[4]
// else if (veryWeakPassword.charAt(4) !== "V") {
//     console.log(
//         `- Password must have its fifth character as uppercase v, 'V' => "${veryWeakPassword}" has its 5th character as '${veryWeakPassword.charAt(
//             4
//         )}'`
//     );
// } else {
//     console.log(`${veryWeakPassword} is a valid password`);
// }

// // password validation
// const veryWeakPassword = "PrQ1V_";
// // const veryWeakPassword = "rtfy67Fg";
// // const veryWeakPassword = "OlJgRc__1qwPVa";
// console.log(`Password validation for "${veryWeakPassword}"`);

// // - be six characters
// if (veryWeakPassword.length === 6) {
//     if (veryWeakPassword.startsWith("P")) {
//         if (veryWeakPassword.endsWith("_")) {
//             if (veryWeakPassword.includes("Q")) {
//                 if (veryWeakPassword.includes("r")) {
//                     if (veryWeakPassword.charAt(4) === "V") {
//                         console.log(`${veryWeakPassword} is a valid password`);
//                     } else {
//                         console.log(
//                             `- Password must have its fifth character as uppercase v, 'V' => "${veryWeakPassword}" has its 5th character as '${veryWeakPassword.charAt(
//                                 4
//                             )}'`
//                         );
//                     }
//                 } else {
//                     console.log(
//                         `- Password must have lowercase r, 'r' => it is ${veryWeakPassword.includes(
//                             "r"
//                         )} that "${veryWeakPassword}" has 'r'`
//                     );
//                 }
//             } else {
//                 console.log(
//                     `- Password must have uppercase q, 'Q' => it is ${veryWeakPassword.includes(
//                         "Q"
//                     )} that "${veryWeakPassword}" has 'Q'`
//                 );
//             }
//         } else {
//             console.log(
//                 `- Password must end with '_' => it is ${veryWeakPassword.endsWith(
//                     "_"
//                 )} that "${veryWeakPassword}" ends with '_'`
//             );
//         }
//     } else {
//         console.log(
//             `- Password must start with 'P' => it is ${veryWeakPassword.startsWith(
//                 "P"
//             )} that "${veryWeakPassword}" starts with 'P'`
//         );
//     }
// } else {
//     console.log(
//         `- Password must have 6 characters => "${veryWeakPassword}" has '${veryWeakPassword.length}' characters`
//     );
// }

// function to print "hello world"
// function printHelloWorld() {
//     console.log("Hello world")
// }

// function add() {
//     const x = 3;
//     const y = 20;

//     const sum = x + y;

//     console.log(`${x} + ${y} = ${sum}`)
// }

// add();

// function add(x, y) {
//     // const x = 3;
//     // const y = 20;

//     const sum = x + y;

//     console.log(`${x} + ${y} = ${sum}`);
// }

// add(3, 30);
// add(10, 2);
// add(6, 100);
// // 3 + 30 = 33
// // 10 + 2 = 12
// // 6 + 100 = 106

// function passwordValidation(password) {
//     // write the password validation program here
// }

// // interest = (principal * rate * time) / 100
// function calculateInterest(principal, rate, time) {
//     const interest = (principal * rate * time) / 100;

//     console.log(
//         `The interest on \$${principal} for ${time} years at a rate of ${rate}% is \$${interest}`
//     );
// }

// calculateInterest(2000, 0.05, 3);
// // The interest on $2000 for 3 years at a rate of 0.05% is $3
// calculateInterest(1000, 0.25, 6);
// // The interest on $1000 for 6 years at a rate of 0.25% is $15

// function printAverage(arrayOfNumbers) {
//     const sum = arrayOfNumbers.reduce((sum, num) => sum + num, 0)
//     const avg = sum / arrayOfNumbers.length

//     console.log(`The average of ${arrayOfNumbers} of size ${arrayOfNumbers.length} is ${avg}`)
// }

// printAverage([1, 2, 3, 4, 5])
// // The average of 1,2,3,4,5 of size 5 is 3
// printAverage([9, 8, 0, 6])
// // The average of 9,8,0,6 of size 4 is 5.75

// // interest = (principal * rate * time) / 100
// function calculateInterest(principal, rate, time) {
//     const interest = (principal * rate * time) / 100;

//     console.log(
//         `The interest on \$${principal} for ${time} years at a rate of ${rate}% is \$${interest}`
//     );
// }

// function add(x, y) {
//     const sum = x + y;

//     // usually, we an just do, return x + y and that will also work
//     return sum
// }

// console.log(`${3} + ${30} = ${add(3, 30)}`);
// // 3 + 30 = 33
// console.log(`${10} + ${2} = ${add(10, 2)}`);
// // 10 + 2 = 12
// console.log(`${6} + ${100} = ${add(6, 100)}`);
// // 6 + 100 = 106

// const add = (x, y) => x + y;

// const callback = (outFunction) => {
//     console.log(`${outFunction.name} function was called`)
// }

// const login = (username, password, logger) => {
//     console.log(`localhost://${username}:${password}@weird.com/login`)
//     logger(login)
// }

// const clearAccount = (username, logger) => {
//     console.log(`localhost://${username}@weird.com/clear`)
//     logger(clearAccount)
// }

// login("johndoe", "password", callback)
// clearAccount("johndoe", callback)
//
/*
const calculateSumOfNumbersInArray = (numericArray) =>
    numericArray.reduce((total, element) => total + element, 0);

const numArray = [1, 2, 3]
const total = calculateSumOfNumbersInArray(numArray)

console.log(`The total of the array, ${numArray} is ${total}`)
// The total of the array, 1,2,3 is 6 */

// const reducer = (total, element, someFunction) => someFunction(total, element)

/* const equ = (x, y) => x === y;

const add = (x, y) => x + y;

const sub = (x, y) => x - y;

const mul = (x, y) => x * y;

const div = (x, y) => (equ(y, 0) ? 0 : x / y);

const remainder = (x, y) => (equ(y, 0) ? 0 : x % y);

const calculate = (firstOperand, secondOperand, operation) =>
    operation(firstOperand, secondOperand);

console.log(calculate(2, 3, equ))
console.log(calculate(2, 3, add))
console.log(calculate(2, 3, sub))
console.log(calculate(2, 3, mul))
console.log(calculate(2, 3, div))
console.log(calculate(calculate(1, 2, add), calculate(3, 4, sub), mul));
 */

// the last parameter is called a default parameter and usually it is placed as
// the last argument. This is something that you have to do if you are going to
// use default values. This snippet is not that different than the previous
// except the introduction of the default parameter which means for the third
// argument, we can choose to pass a value for it or not
// const performActionOnArray = (numericArray, someAction, initialValue = 0) => {
//     return numericArray.reduce(
//         (result, element) => someAction(result, element),
//         initialValue
//     );
// };

// const add = (x, y) => x + y;

// const numArray = [1, 2, 3];
// // const total = performActionOnArray(numArray, add);
// const total = performActionOnArray(numArray, (value1, value2) => value1 + value2);

// console.log(`The total of the array, ${numArray} is ${total}`);
// // The total of the array, 1,2,3 is 6
/*
console.log("Hello there");
const someSyncFunction = () => {
    console.log("I am synchronous");
};
someSyncFunction();
console.log(`Bye`); */

// console.log("Hello there");
// setTimeout(() => {
//     console.log("I am asynchronous");
// }, 2000);
// const someSyncFunction = () => {
//     console.log("I am synchronous");
// };
// someSyncFunction();
// console.log("Bye");

// new Promise((resolve, reject) => {
//     // an async operation is executed
//     if (/* on completion resolve promise with a value */) {
//         resolve(value);
//     } else {
//         /* on failure reject promise with an error */
//         reject(error);
//     }
// });

// console.log("Hello there");

// const madeAPromise = new Promise((resolve, reject) => {
//     // this could have been a database or api call
//     const result = true

//     /* on completion resolve promise with a value */
//     if (result) {
//         resolve("🥦 is good for your health");
//     } else {
//         /* on failure reject promise with an error */
//         reject("Well, 🙄, an error occurred");
//     }
// });

// console.log("After the promise is created");

// // madeAPromise
// //     .then((value) => console.log({ value }))
// //     .catch((error) => console.log({ error }))
// //     .finally(() =>
// //         console.log("We have handled the async call, now we can all have pizza")
// //     );

// // console.log("Bye");

// madeAPromise
//     .then((value) => {
//         console.log({ value })
//         console.log("Bye");
//     })
//     .catch((error) => console.log({ error }))
//     .finally(() =>
//         console.log("We have handled the async call, now we can all have pizza")
//     );

console.log("Hello there");

async function asyncFunction() {
    return new Promise((resolve, reject) => {
        // this could have been a database or api call
        const result = false;

        /* on completion resolve promise with a value */
        if (result) {
            resolve("🥦 is good for your health");
        } else {
            /* on failure reject promise with an error */
            reject("Well, 🙄, an error occurred");
        }
    });
}

console.log("After the promise is created");
try {
    const value = await asyncFunction();
    console.log({ value });
} catch (error) {
    console.log({ error });
} finally {
    console.log("We have handled the async call, now we can all have pizza")
}

console.log("Bye");