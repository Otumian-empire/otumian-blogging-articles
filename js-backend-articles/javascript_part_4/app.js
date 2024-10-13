// // array destructuring

// const numbers = [1, 2, 3]

// const [firstElement, secondElement, thirdElement] = number

// console.log(firstElement)
// console.log(secondElement)
// console.log(thirdElement)

// // array destructuring

// const numbers = [1, 2, 3]

// const firstElement = numbers[0],
//     secondElement = numbers[1],
//     thirdElement = numbers[2]

// console.log(firstElement)
// console.log(secondElement)
// console.log(thirdElement)

// const profile = {
//     firstName: "John",
//     lastName: "Doe",
//     job: "Debugger",
//     isBald: false,
//     numberOfPets: 3
// }

// we want the first and last name

// const firstName = profile.firstName
// const lastName = profile.lastName

// console.log(`Full name: ${firstName} ${lastName}`)

// we can extract just the first and last name

// const profile = {
//     firstName: "John",
//     lastName: "Doe",
//     job: "Debugger",
//     isBald: false,
//     numberOfPets: 3,
// };

// // const { firstName, lastName } = profile;

// // console.log(`Full name: ${firstName} ${lastName}`);

// const { firstName: anotherVarForFirstName, lastName } = profile;

// console.log(`Full name: ${anotherVarForFirstName} ${lastName}`);
// const numbers = [1, 2, 3]

// // destructure the first and the rest of the elements
// const [firstElement, ...theRestOfTheElements] = numbers

// console.log(firstElement)
// console.log(theRestOfTheElements)

// const profile = {
//     firstName: "John",
//     lastName: "Doe",
//     job: "Debugger",
//     isBald: false,
//     numberOfPets: 3,
// };

// const { firstName, ...restOfTheProperties } = profile;

// console.log(firstName);
// // John
// console.log(restOfTheProperties);
// // { lastName: 'Doe', job: 'Debugger', isBald: false, numberOfPets: 3 }

// // we have the original array
// const firstArray = [1, 3]

// // we assign a reference (not a copy of the original to another another)
// const secondArray = firstArray

// // we update the first element in the original array
// firstArray[0] = 5

// // log the content of both arrays
// console.log({ firstArray, secondArray })

// // we actually have to copy the original and assign the value to the new array
// // or use spreading
// const thirdArray = [...firstArray]
// firstArray[1] = -1

// console.log({ firstArray, secondArray, thirdArray });

// const personal = {
//     firstName: "John",
//     lastName: "Doe",
// }

// const physical = {
//     isBald: false,
//     hasFatBelly: true
// }

// const employment = {
//     job: "Debugger",
//     salary: 257000
// }

// const emotional = {
//     isHappy: true
// }

// const profile = { ...personal, physical, employment, emotional }

// // assignment
// let a = 10;
// let b = 4;
// console.log({ a, b })

// // addition assignment
// // a += b is the same as a = a + b
// a += b
// console.log({ a, b })

// // subtraction assignment
// // a -= b is the same as a = a - b
// a -= b
// console.log({ a, b })

// // try your the rest out

// comparison operators
// let a = 10;
// let b = 4;

// // equal to
// console.log(`${a} is Equal to ${b} is, ${a == b}`)
// console.log(`${a} is Strictly Equal to is, ${b} ${a === b}`)

// // it will be in your best interest to stick to === instead of ==
// const strTwo = "2"
// const intTwo = 2

// // is "2" the same as 2???
// // the answer is yes and no
// // javascript is javascript
// // yes because the value (look) are the same... they are all 'two'
// // however, strictly speaking, they two values are of different types
// // strTwo is a string and intTwo is a number so if we are going to compare them,
// // we have to be strict

// console.log(`'${strTwo}' is Equal to ${intTwo} is, ${strTwo == intTwo}`)
// console.log(`'${strTwo}' is Strictly Equal to is, ${intTwo} ${strTwo === intTwo}`)
// // does this give you some funny ideas to check out??

// // when game starts, set the life and power to the default
// let attackPower = 0;
// let playerLife = 5;
// console.log({ playerLife, attackPower });
// // { playerLife: 5, attackPower: 0 }

// // when player picks bullet, increase attack power
// attackPower++
// console.log({ attackPower });
// // { attackPower: 1 }

// // when player gets shot, decrease life
// playerLife--
// console.log({ playerLife })
// // { playerLife: 4 }

// let pay = 30
// const RATE = 0.05
// const didOverTime = true

// // if employee did overtime
// if (didOverTime) {
//     pay = pay + (pay * RATE)
// }

// console.log(`Total take home: ${pay}`)

// let pay = 30;
// const RATE = 0.05;
// const didOverTime = true;

// // if employee did overtime
// if (didOverTime) {
//     pay = pay + pay * RATE;
// } else {
//     pay = pay - pay * RATE;
// }

// console.log(`Total take home: ${pay}`);

// let pay = 30;
// const RATE = 0.05;
// const didOverTime = true;

// let payChange = pay * RATE;

// if (didOverTime) {
//     pay += payChange;
// } else {
//     pay -= payChange;
// }

// console.log(`Total take home: ${pay}`);

// fizz buzz program

// let pay = 30;
// const RATE = 0.05;
// const didOverTime = true;

// // if employee did overtime
// // if (didOverTime) {
// //   pay = pay + pay * RATE;
// // } else {
// //   pay = pay - pay * RATE;
// // }

// // using ternary
// pay = didOverTime ? pay + pay * RATE : pay - pay * RATE;

// console.log(`Total take home: ${pay}`);

// const day = "Friday";

// switch (day) {
//     case "Monday":
//         console.log("Today is Monday");
//         break;
//     case "Tuesday":
//         console.log("Today is Tuesday");
//         break;
//     case "Wednesday":
//         console.log("Today is Wednesday");
//         break;
//     default:
//         console.log("Unknown day");
// }

// // console log numbers between 0 and 10
// for (let loopingNumber = 0; loopingNumber <= 10; loopingNumber++) {
//     console.log(loopingNumber)
// }
/*
// let's loop through the array and print out the number of characters in it
const daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

for (let index = 0; index < daysOfTheWeek.length; index += 1) {
    console.log(
        `${daysOfTheWeek[index]} at index ${index} has ${daysOfTheWeek[index].length} characters`
    );
}
// Monday at index 0 has 6 characters
// Tuesday at index 1 has 7 characters
// Wednesday at index 2 has 9 characters
// Thursday at index 3 has 8 characters
// Friday at index 4 has 6 characters
// Saturday at index 5 has 8 characters
// Sunday at index 6 has 6 characters */
/*
const daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

for (const index in daysOfTheWeek) {
    console.log(
        `${daysOfTheWeek[index]} at index ${index} has ${daysOfTheWeek[index].length} characters`
    );
} */

/*
const profile = {
    firstName: "John",
    lastName: "Doe",
    job: "Debugger",
    isBald: false,
    numberOfPets: 3
}

for (const key in profile) {
    console.log(`${key} points to, ${profile[key]}`)
} */

/* const daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

for (const element of daysOfTheWeek) {
    console.log(
        `${element} at index ${daysOfTheWeek.indexOf(element)} has ${element.length} characters`
    );
} */

/* const emailList = [
    "johndoes@email.com",
    "pancake@email@ny.com",
    "tenya123@@email@ny.com"
]

const AT_SIGN = "@"

const response = {}

for (const email of emailList) {
    let numberOfAtSigns = 0;

    for (const character of email) {
        if (character === AT_SIGN) {
            numberOfAtSigns++
        }
    }

    response[email] = numberOfAtSigns
}

console.log(response)
// {
//     'johndoes@email.com': 1,
//     'pancake@email@ny.com': 2,
//     'tenya123@@email@ny.com': 3
// }
 */

const emailList = [
    "johndoes@email.com",
    "pancake@email@ny.com",
    "tenya123@@email@ny.com",
];

const AT_SIGN = "@";

const validation = emailList.map((email) => {
    const emailPartsLength = email.split(AT_SIGN).length;
    const numberOfAtSigns = emailPartsLength > 1 ? emailPartsLength - 1 : 0;

    // we can replace the above two lines with
    // const numberOfAtSigns = email.split("").filter(character => character === AT_SIGN).length
    // why didn't we split at '@'

    return { [email]: numberOfAtSigns };
});

console.log(validation);
// [
//     { 'johndoes@email.com': 1 },
//     { 'pancake@email@ny.com': 2 },
//     { 'tenya123@@email@ny.com': 3 }
// ]



// {
//     'johndoes@email.com': 1,
//     'pancake@email@ny.com': 2,
//     'tenya123@@email@ny.com': 3
// }

// // //
/*
const daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

for (const index in daysOfTheWeek) {
    console.log(
        `${daysOfTheWeek[index]} at index ${index} has ${daysOfTheWeek[index].length} characters`
    );
}

const daysOfTheWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const someDayOfTheWeek = "" */

// const sampleEmail = "johndoes@gmail.com"

/* 
// password_verification.js
const veryWeakPassword = "qwerty12";
console.log(`Password validation for "${veryWeakPassword}"`);

// - be six characters
const passwordLength = veryWeakPassword.length;
console.log(
  `- Password must have 6 characters => "${veryWeakPassword}" has '${passwordLength}' characters`
);
// so it is a valid password based on our rules?

// - start with uppercase p, 'P'
const startsWithPee = veryWeakPassword.startsWith("P");
console.log(
  `- Password must start with 'P' => it is ${startsWithPee} that "${veryWeakPassword}" starts with 'P'`
);

// we can also check the first character, index 0.
const firstCharacter = veryWeakPassword[0];
console.log(
  `- Password must start with 'P' => "${veryWeakPassword}" starts with '${firstCharacter}'`
);

// - end with underscore
const endsWithUnderscore = veryWeakPassword.endsWith("_");
console.log(
  `- Password must end with '_' => it is ${endsWithUnderscore} that "${veryWeakPassword}" ends with '_'`
);

// from the index concept, the last character will be at index, length of string minus one
const lastCharacter = veryWeakPassword[veryWeakPassword.length - 1];
console.log(
  `- Password must start with 'P' => "${veryWeakPassword}" ends with '${lastCharacter}'`
);

// - have uppercase q, 'Q'
const hasUppercaseQue = veryWeakPassword.includes("Q");
console.log(
  `- Password must have uppercase q, 'Q' => it is ${hasUppercaseQue} that "${veryWeakPassword}" has 'Q'`
);

// we can use the index approach
const indexOfUppercaseQue = veryWeakPassword.indexOf("Q");
console.log(
  `- Password must have uppercase q, 'Q' => 'Q' is at index '${indexOfUppercaseQue}' of "${veryWeakPassword}"`
);
// we know that index -1 means, there 'Q' was not found

// - have lowercase r, 'r'
const hasLowercaseArr = veryWeakPassword.includes("r");
console.log(
  `- Password must have lowercase r, 'r' => it is ${hasLowercaseArr} that "${veryWeakPassword}" has 'r'`
);

// we can use the index approach too
const indexOfLowercaseArr = veryWeakPassword.indexOf("r");
console.log(
  `- Password must have lowercase r, 'r' => 'r' is at index '${indexOfLowercaseArr}' of "${veryWeakPassword}"`
);
// we know that index -1 means, there 'r' was not found

// - have its fifth character as uppercase v, 'V'
// fifth character with have index = fifth position - 1 = 4
// const fifthCharacter = veryWeakPassword[4]
const fifthCharacter = veryWeakPassword.charAt(4);
console.log(
  `- Password must have its fifth character as uppercase v, 'V' => "${veryWeakPassword}" has its 5th character as '${fifthCharacter}'`
);

// using the index approach, 'V' must have an index of 4 (same index logic as above)
const indexOfVee = veryWeakPassword.indexOf("V");
console.log(
  `- Password must have its fifth character as uppercase v, 'V' => 'V' is at index '${indexOfVee}' of "${veryWeakPassword}"`
); */
