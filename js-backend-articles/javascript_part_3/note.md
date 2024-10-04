# JavaScript Essentials: Part 3

Previously in [JavaScript Essentials: Part 2](https://dev.to/otumianempire/javascript-essentials-part-2-3k6j), we discussed quite a lot about string properties and methods, and indexing strings when split into an array. In this part, we will look at:

- Arrays
- Object
- Control structures (if statements, loops)
- Functions
- Callbacks, promises, async & await
- Next big thing

## Array

An array is a list or a collection of items. Since this is javascript, we can have a list of anything or nothing. We can have an array of numbers, strings, booleans, etc.

In javascript, we can use the square bracket to create an array. All that we have have discussed about variables and values applies to an array. SOme know from strings might apply (borrowed knowledge).

**Example**

```js
// an empty array
const anEmptyArray = [];

// array of numbers
const arrayOfNumbers = [1, 2, 3, 4, 5];

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
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];
```

## Array properties and methods

## Email Validation

These are the rules for the email validation. Email must:

- be at least sixteen characters
- be in all lowercase
- not have 'email' in it
- not include an underscore
- have one '@'
- have one '.'
- end with '.com'
- have the character before the '@' to be the character, uppercase v, 'V'

**Example**

```js
// email_validation.js
const sampleEmail = "johndoe@email.com";
// Email must:
// - be at least sixteen characters
const emailLength = sampleEmail.length;
console.log(
  `- Email must be at least sixteen characters => "${sampleEmail}" has '${emailLength}' characters`
);

// - be in all lowercase
// there could be split opinions, either force the users to enter their
// emails in lowercase or cast it to lowercase. The latter seems better
const lowercasedEmail = sampleEmail.toLowerCase();
// or can use the `sampleEmail.toLowerCase()` from here onwards

// - not have 'email' in it
const hasEmail = lowercasedEmail.includes("email");
// if `hasEmail` is true then this email is invalid
console.log(
  `- Email must not have 'email' in it => It is '${hasEmail}' that "${lowercasedEmail}" has 'email' in it`
);

// - not include an underscore
const hasUnderscore = lowercasedEmail.includes("_");
console.log(
  `- Email must not include an underscore => It is '${hasUnderscore}' that "${lowercasedEmail}" includes an underscore`
);

// - have one '@'
const hasAtSymbol = lowercasedEmail.includes("@");
console.log(
  `- Email must have one '@' => It is '${hasAtSymbol}' that "${lowercasedEmail}" has one '@;`
);

// get the index of the first at
const indexOfFirstAtSymbol = lowercasedEmail.indexOf("@");
console.log(`The index of the first '@' is at: ${indexOfFirstAtSymbol}`);
// the output from above will let's us know if there is even an '@'
// the index must not be -1

// lowercasedEmail.includes("@") and lowercasedEmail.indexOf("@")
// shows that there is an '@' but not how many

// if there is more than one '@' then when we split the email,
// there will be more than two elements
// when you split in the middle (one part), you get 2 parts
// when you split at 2 parts, you get 3 parts
const arrayLengthAfterSplitting = lowercasedEmail.split("@").length;
console.log(
  `The number of elements after the email is split at the '@' is: ${arrayLengthAfterSplitting}`
);

// there is the lastIndexOf string method, which returns the last occurrence
// of a substring in a string

// - have one '.'
const arrayLengthAfterSplittingAtDot = lowercasedEmail.split(".").length;
console.log(
  `The number of elements after the email is split at the '.' is: ${arrayLengthAfterSplittingAtDot}`
);

// - end with '.com'
const emailEndsWithDotCom = lowercasedEmail.endsWith(".com");
console.log(
  `- Email ends with '.com' => It is '${emailEndsWithDotCom}' that "${lowercasedEmail}" ends with '.com'`
);

// - have the character before the '@' to be the character, uppercase v, 'V'
// the character before the '@' is at index, '@' index - 1
const characterBeforeAt = lowercasedEmail.charAt(indexOfFirstAtSymbol - 1);
console.log(
  `- Email must have the character before the '@' to be the character, uppercase v, 'V' => The character before the '@' is '${characterBeforeAt}'`
);
```

## Conclusion

String forms part of almost any data structure one would use. So knowing how to manipulate them gives you the upper hand.

Try your hands on the email verification and don't hesitate to share your implementation.

We have more on javascript to discuss such as:

- Object
- Arrays
- Control structures (if statements, loops)
- Functions
- Callbacks, promises, async & await
- Next big thing
