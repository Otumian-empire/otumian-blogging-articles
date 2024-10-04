// // email_validation.js
// const sampleEmail = "johndoe@email.com";
// // Email must:
// // - be at least sixteen characters
// const emailLength = sampleEmail.length;
// console.log(
//     `- Email must be at least sixteen characters => "${sampleEmail}" has '${emailLength}' characters`
// );

// // - be in all lowercase
// // there could be split opinions, either force the users to enter their
// // emails in lowercase or cast it to lowercase. The latter seems better
// const lowercasedEmail = sampleEmail.toLowerCase();
// // or can use the `sampleEmail.toLowerCase()` from here onwards

// // - not have 'email' in it
// const hasEmail = lowercasedEmail.includes("email");
// // if `hasEmail` is true then this email is invalid
// console.log(
//     `- Email must not have 'email' in it => It is '${hasEmail}' that "${lowercasedEmail}" has 'email' in it`
// );

// // - not include an underscore
// const hasUnderscore = lowercasedEmail.includes("_");
// console.log(
//     `- Email must not include an underscore => It is '${hasUnderscore}' that "${lowercasedEmail}" includes an underscore`
// );

// // - have one '@'
// const hasAtSymbol = lowercasedEmail.includes("@");
// console.log(
//     `- Email must have one '@' => It is '${hasAtSymbol}' that "${lowercasedEmail}" has one '@;`
// );

// // get the index of the first at
// const indexOfFirstAtSymbol = lowercasedEmail.indexOf("@");
// console.log(`The index of the first '@' is at: ${indexOfFirstAtSymbol}`);
// // the output from above will let's us know if there is even an '@'
// // the index must not be -1

// // lowercasedEmail.includes("@") and lowercasedEmail.indexOf("@")
// // shows that there is an '@' but not how many

// // if there is more than one '@' then when we split the email,
// // there will be more than two elements
// // when you split in the middle (one part), you get 2 parts
// // when you split at 2 parts, you get 3 parts
// const arrayLengthAfterSplitting = lowercasedEmail.split("@").length;
// console.log(
//     `The number of elements after the email is split at the '@' is: ${arrayLengthAfterSplitting}`
// );

// // there is the lastIndexOf string method, which returns the last occurrence
// // of a substring in a string

// // - have one '.'
// const arrayLengthAfterSplittingAtDot = lowercasedEmail.split(".").length;
// console.log(
//     `The number of elements after the email is split at the '.' is: ${arrayLengthAfterSplittingAtDot}`
// );

// // - end with '.com'
// const emailEndsWithDotCom = lowercasedEmail.endsWith(".com");
// console.log(
//     `- Email ends with '.com' => It is '${emailEndsWithDotCom}' that "${lowercasedEmail}" ends with '.com'`
// );

// // - have the character before the '@' to be the character, uppercase v, 'V'
// // the character before the '@' is at index, '@' index - 1
// const characterBeforeAt = lowercasedEmail.charAt(indexOfFirstAtSymbol - 1);
// console.log(
//     `- Email must have the character before the '@' to be the character, uppercase v, 'V' => The character before the '@' is '${characterBeforeAt}'`
// );

// an empty array
const anEmptyArray = [];

// array of numbers
const arrayOfNumbers = [1, 2, 3, 4, 5];

// arrayOfNumbers.lastIndexOf(element, optionalFromIndex)
// arrayOfNumbers.indexOf(element, optionalFromIndex)
// arrayOfNumbers.includes(element, optionalFromIndex)
// arrayOfNumbers.join(separator) -> to string



// array of strings
const stringArray = ["math", "meth", "mith", "moth", "muth"];

const listOfBlackListedUsers = [
    "AdamDoe",
    "PeterPen",
    "MaxBuffer",
    "CheeseCake",
    "PaxTingAA",
];

// array of booleans
const booleanArray = [true, false, false, true, true];

// const array of objects
const profileArray = [
    { id: 1, username: "AdamDoe", pet: "math", isBald: true },
    { id: 2, username: "PeterPen", pet: "meth", isBald: false },
    { id: 3, username: "MaxBuffer", pet: "mith", isBald: false },
    { id: 4, username: "CheeseCake", pet: "moth", isBald: true },
    { id: 5, username: "PaxTingAA", pet: "muth", isBald: true },
];

// array of arrays
const threeByThreeSudoku = [
    [4, 9, 2,],
    [3, 5, 7,],
    [8, 1, 6,],
]


/*  properties and methods associated with arrays in various programming languages:
Common Array Properties:
length: Returns the number of elements in the array.
index: Refers to the position of an element in the array (starts at 0).
Common Array Methods:
1. Accessor Methods:
indexOf(): Returns the index of the first occurrence of a specified value.
includes(): Checks if an array contains a specified value.
join(): Concatenates all elements into a string.
toString(): Converts the array to a string.
2. Mutator Methods:
push(): Adds one or more elements to the end of the array.
pop(): Removes the last element from the array.
shift(): Removes the first element from the array.
unshift(): Adds one or more elements to the beginning of the array.
splice(): Adds or removes elements at a specified position.
3. Iteration Methods:
forEach(): Executes a function for each element.
map(): Creates a new array with the results of a function applied to each element.
filter(): Creates a new array with elements that satisfy a condition.
reduce(): Applies a function to each element and reduces the array to a single value.
4. Transformation Methods:
concat(): Merges two or more arrays.
slice(): Extracts a subset of elements.
reverse(): Reverses the order of elements.
sort(): Sorts the elements in ascending or descending order.
5. Search Methods:
find(): Returns the first element that satisfies a condition.
findIndex(): Returns the index of the first element that satisfies a condition.
Some programming languages may have additional array methods or variations on these methods.
Would you like me to provide language-specific array methods (e.g., JavaScript, Python, Java)? */