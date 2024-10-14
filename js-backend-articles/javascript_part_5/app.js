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

// password validation
const veryWeakPassword = "PrQ1V_";
// const veryWeakPassword = "rtfy67Fg";
// const veryWeakPassword = "OlJgRc__1qwPVa";
console.log(`Password validation for "${veryWeakPassword}"`);

// - be six characters
if (veryWeakPassword.length === 6) {
    if (veryWeakPassword.startsWith("P")) {
        if (veryWeakPassword.endsWith("_")) {
            if (veryWeakPassword.includes("Q")) {
                if (veryWeakPassword.includes("r")) {
                    if (veryWeakPassword.charAt(4) === "V") {
                        console.log(`${veryWeakPassword} is a valid password`);
                    } else {
                        console.log(
                            `- Password must have its fifth character as uppercase v, 'V' => "${veryWeakPassword}" has its 5th character as '${veryWeakPassword.charAt(
                                4
                            )}'`
                        );
                    }
                } else {
                    console.log(
                        `- Password must have lowercase r, 'r' => it is ${veryWeakPassword.includes(
                            "r"
                        )} that "${veryWeakPassword}" has 'r'`
                    );
                }
            } else {
                console.log(
                    `- Password must have uppercase q, 'Q' => it is ${veryWeakPassword.includes(
                        "Q"
                    )} that "${veryWeakPassword}" has 'Q'`
                );
            }
        } else {
            console.log(
                `- Password must end with '_' => it is ${veryWeakPassword.endsWith(
                    "_"
                )} that "${veryWeakPassword}" ends with '_'`
            );
        }
    } else {
        console.log(
            `- Password must start with 'P' => it is ${veryWeakPassword.startsWith(
                "P"
            )} that "${veryWeakPassword}" starts with 'P'`
        );
    }
} else {
    console.log(
        `- Password must have 6 characters => "${veryWeakPassword}" has '${veryWeakPassword.length}' characters`
    );
}
