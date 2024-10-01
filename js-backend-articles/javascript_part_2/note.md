# JavaScript Essentials: Part 2

Previously in [JavaScript Essentials: Part 1](https://dev.to/otumianempire/javascript-essentials-part-1-39c1), we started with some javascript data types including a string, number, boolean, and object. In this part, we will delve a little deeper and look at:

- String interpolation and a gist of its methods

## String interpolation

We know how to create strings and print them out. However, how do we use a variable in a string to create some sort of sentence? That is what string interpolation is all about.

**Example**

Let's consider these variables.

```js
const name = "John Doe";
const dateOfBirth = "2000-12-25";
const profession = "Software Engineer";
const numberOfPets = 2;
const weightOfProteinInGrams = 12.5;
const hasAJob = true;
```

I don't think we are new to the snippet above. If you are not sure, refer to [JavaScript Essentials: Part 1](https://dev.to/otumianempire/javascript-essentials-part-1-39c1).

In string interpolations, we use backticks. Yes, the backticks used to create a string are used to create string interpolations. All we want to do, as mentioned before, is add variables to strings to create a sentence.

```js
const sentence = `Full name: ${name}, date of birth: ${dateOfBirth}, profession: ${profession}`;
console.log(sentence);
```

We have a string variable called _sentence_. In _sentence_, we assign a string that makes use of the values assigned to the _name_ and _dateOfBirth_.

Is it obvious how the string interpolation thing was done? It should. We put `${name}` where _name_ is a variable (whose value) we want to add to our string variable. The example above uses _name_ and _dateOfBirth_. Do for the others.

We could have had the same result had we used string concatenation using the _plus_ operator properly in places where it is required.

**Example**

Since we are creating a string, we can choose any delimiter we prefer.

```js
const name = "John Doe";
const dateOfBirth = "2000-12-25";
const profession = "Software Engineer";
const numberOfPets = 2;
const weightOfProteinInGrams = 12.5;
const hasAJob = true;

const sentence =
  "Full name: " +
  name +
  ", date of birth: " +
  dateOfBirth +
  ", profession: " +
  profession;

console.log(sentence);
```

## Indexing a string

You would surely hear a lot about indexing. So let's talk a little about it now. Indexing is the same as sub-scripting if it helps. In brief, it means you can find or retrieve a character from a string using its numeric position (index, counting from zero). We will discuss this (indexing) when dealing with arrays (the same idea applies to arrays).

Consider the string "Doe", the first letter is 'D', the second is 'o' and the third is 'e'. In javascript indexing starts at zero, so the first character (positioned element) is at index 0, pointing to 'D'. The second will be 1, after index 0, which will point to 'o', and then index 2 will point to the last (third) element, the 'e' character at the third position. In JavaScript, `index = element position - 1`.

**Example**

```js
const someName = "Doe";

const firstChar = someName[0];
const secondChar = someName[1];
const thirdChar = someName[2];

console.log(
  `The characters in "${someName}" are: '${firstChar}', '${secondChar}' and '${thirdChar}'`
);
// The characters in "Doe" are: 'D', 'o' and 'e'
```

## String properties and methods

A string is an object. This means they have methods and properties. A method is an action or function that can be performed on the string object. This string object has properties. For now, we can say a property is like a variable attached to this object of interest that keeps some state (data) about this same object.

We look at a new operator called the _dot_ operator. It is used to access properties and methods on an object.

We will be looking at the frequently used properties and methods. I will denote properties as _p_ and methods as _m_.

- `length` (p): is a property that returns the number of characters in a string. Hence the length of the string.
- `toUpperCase()` (m): is a method that returns the string in uppercase
- `toLowerCase()` (m): is a method that returns the string in lowercase
- `endsWith(key: string)` (m): is a method that returns true when the string ends with the key parameter (a string) else false
- `startsWith(key: string)` (m): is a method that returns true when the string starts with the key parameter (a string) else false
- `includes(key: string)` (m): is a method that returns true when the string contains the key string else false
- `replace(oldStr: string, withNewString: string)` (m): is a method that replaces `oldStr` in the string with `withNewString` and returns the newly updated string
- `trim()` (m): is a method that removes starting or ending white spaces of a string and returns a new value
- `split(key: string)` (m): returns an array of the string where key is used as a divider (to split the string at the point)
- `substring(startingIndex: number, optionalEndingIndex?: number)` (m): returns a position of a string specified by the \_startingIndex\_ to the character at the _optionalEndingIndex_, when provided.
- `indexOf(key: string, optionalKeySearchingStartingAtIndex?: number)` (m): returns the position of the first occurrence of key. When _optionalKeySearchingStartingAtIndex_ is provided, the searching starts there. If there _key_ is not found, it returns _-1_
- `charAt(index: number)` (m): returns the character at _index_ or an empty string

**Example**
This is a whole single snippet in a single file, `string_methods.js`

```js
// Using string methods and properties
const fullName = "John Doe";
```

- Length

```js
// NB: whatever method we can call on a string literal,
//we can do the same for a variable

// find and print out the length of the fullName string
// variable using the length property
const fullNameLength = fullName.length;

// using string interpolations here
console.log(`The name, "${fullName}", has ${fullNameLength} characters`);
```

- To uppercase and lowercase

```js
// counting includes the spaces and symbols too
// update the value of fullName and see what happens

// this is the same as above but I will encourage you
// to stick to string interpolations in cases like this
// console.log("The name, " + fullName + ", has " + fullNameLength + " characters");

// convert uppercase and lowercase
console.log(`Upper: ${fullName.toUpperCase()}`);
console.log(`Lower: ${fullName.toLowerCase()}`);
```

- Starts and ends with

```js
// check if fullName starts with John
const startsWithKey = "John";
const fullNameStartsWithJohn = fullName.startsWith(startsWithKey);
console.log(
  `It is ${fullNameStartsWithJohn} that "${fullName}" starts with "${startsWithKey}"`
);

const endsWithKey = "Doe";
const fullNameEndsWithDoe = fullName.endsWith(endsWithKey);
console.log(
  `It is ${fullNameEndsWithDoe} that "${fullName}" ends with "${endsWithKey}"`
);
```

- includes

```js
// try this yourself, check if fullName starts with john and doe,
// then uppercase and lowercase the key and try again (for both cases)

// check if fullName as a space
const fullNameHasASpace = fullName.includes(" ");
// here we passed the key/search string directly without creating a variable.
// I want you to know that we can also do that
console.log(`It is ${fullNameHasASpace} that "${fullName}" has a space`);
// we could have also done
// console.log(`It is ${fullName.includes(" ")} that "${fullName}" has a space`);
```

- replace

```js
// try checking if the fullName contains the letter J, either uppercase or lowercase
// how would you achieve this? refer to the methods above for clues, first

// replace Doe with Moe
const moedFullName = fullName.replace("Doe", "Moe");
console.log(`New full name: ${moedFullName}`);

// try replacing spaces with underscore
const stringWithStaringAndTrailingSpaces = " John Doe ";
console.log(
  stringWithStaringAndTrailingSpaces
    .replace(" ", "JS") // replaces the first " "
    .replace(" ", "_") // replaces the second " "
    .replace(" ", "TS") // replaces the third " "
);

// it replaces only one instance at a time. so it was chained.
// I don't have to create a temp variable

// trust me, having your users start their email with spaces is annoying
// and sometimes it's the input keyboard (I get it, I am just venting off)
// but then again it will not harm trimming the unnecessary (white) spaces
// we will trim the whites off the stringWithStaringAndTrailingSpaces
// we'd use another method to let you know that the trimming worked
console.log(
  `Length of original string: ${stringWithStaringAndTrailingSpaces.length}`
);
```

- trim

```js
console.log(
  `Length of trimmed string: ${
    stringWithStaringAndTrailingSpaces.trim().length
  }`
);
// remember the definition of the length, it counts the spaces too
```

- split

```js
// split is really useful, we can split the full name into the first
// and last name in order as is
// i don't think it will be pretty to have spaces with the names
// we'd do the splitting at the space
console.log(stringWithStaringAndTrailingSpaces.split(" "));
console.log(stringWithStaringAndTrailingSpaces.trim().split(" "));
// printing the split string (becomes an array) shows the content
// of the array (or string to be precise)
// note any difference? Would the assumption still hold that the
// first element (object) in the array will be the first name and
// second (which should be the last actually) is the last name?
// this doesn't hold anymore because of the starting and trailing spaces
```

- substring

```js
// substring(starting [, ending])
const someLongString = "This is some long string";
const substringFromTwoToEight = someLongString.substring(2, 8);
console.log(substringFromTwoToEight);
// is is

const substringFromStartToTwelve = someLongString.substring(0, 12);
console.log(substringFromStartToTwelve);
// This is some

const substringFromTenth = someLongString.substring(10);
console.log(substringFromTenth);
// me long string
```

- indexOf

```js
// chartAt and indexOf
const veryWeakPassword = "qwerty12";

const indexOfTee = veryWeakPassword.indexOf("t");
console.log(`The first 't' in "${veryWeakPassword}" is at index ${indexOfTee}`);
// The first 't' in "qwerty12" is at index 4

// Note that there is no 'v'
const indexOfVee = veryWeakPassword.indexOf("v");
console.log(`The first 'v' in "${veryWeakPassword}" is at index ${indexOfVee}`);
// The first 'v' in "qwerty12" is at index -1
```

- chartAt

```js
// based on the result of the above (using the indexOf Tee which was 4)
// let's find the value at index 4
const characterAtIndexFour = veryWeakPassword.charAt(4);
// we could have passed 'indexOfTee'
console.log(`The character at index '4' is '${characterAtIndexFour}'`);
// The character at index '4' is 't'

const characterAtIndexNegativeOne = veryWeakPassword.charAt(-1);
console.log(`The character at index '4' is '${characterAtIndexNegativeOne}'`);
// returns an empty string
// The character at index '4' is ''
```

## Password and email validation

We have discussed a lot of concepts about strings here. There are a lot more. Practically, these are some of the (biasedly) frequently used methods. Let's create a script for password and email validation.

**Password rules**
Password must:

- be six characters
- start with uppercase p, 'P'
- end with an underscore
- have uppercase q, 'Q'
- have lowercase r, 'r'
- have its fifth character as uppercase v, 'V'

**Email rules**

Email must:

- be at least sixteen characters
- be in all lowercase
- not have 'email' in it
- not include an underscore
- have one '@'
- have one '.'
- end with '.com'
- have the character before the '@' to be the character, uppercase v, 'V'

It is simple actually. So let's do password validation together and you'd do the email verification.

**Password validation**

```js
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
);
```

**Output from the console.log**

```
Password validation for "qwerty12"
- Password must have 6 characters => "qwerty12" has '8' characters
- Password must start with 'P' => it is false that "qwerty12" starts with 'P'
- Password must start with 'P' => "qwerty12" starts with 'q'
- Password must end with '_' => it is false that "qwerty12" ends with '_'
- Password must start with 'P' => "qwerty12" ends with '2'
- Password must have uppercase q, 'Q' => it is false that "qwerty12" has 'Q'
- Password must have uppercase q, 'Q' => 'Q' is at index '-1' of "qwerty12"
- Password must have lowercase r, 'r' => it is true that "qwerty12" has 'r'
- Password must have lowercase r, 'r' => 'r' is at index '3' of "qwerty12"
- Password must have its fifth character as uppercase v, 'V' => "qwerty12" has its 5th character as 't'
- Password must have its fifth character as uppercase v, 'V' => 'V' is at index '-1' of "qwerty12"
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
