# JavaScript Essentials: Part 2

Previously in [JavaScript Essentials: Part 1](https://dev.to/otumianempire/javascript-essentials-part-1-39c1), we started off with some javascript data types including a string, number, boolean, and object. In this part, we would delve a little deeper and look at:

- String interpolation and a gist of its methods
- Object
- Arrays
- Control structures (if statements, loops)
- Functions
- Callbacks, promises, async & await
- Next big thing

## String interpolation

We know how to create strings and print them out. However, how do we use a variable in a string to create some sort of a sentence? That is what string interpolation is all about.

**Example**

Let's consider this variables.

```js
const name = "John Doe";
const dateOfBirth = "2000-12-25";
const profession = "Software Engineer";
const numberOfPets = 2;
const weightOfProteinInGrams = 12.5;
const hasAJob = true;
```

I don't think at this point we are new to the snippet above. If you are not sure, refer to [JavaScript Essentials: Part 1](https://dev.to/otumianempire/javascript-essentials-part-1-39c1).

In string interpolations, we use backticks. Yes, that backticks used for creating a string is used for creating a string interpolations. All we want to do, as mentioned before, is add variables to strings to create a sentence.

```js
const sentence = `Full name: ${name}, date of birth: ${dateOfBirth}, profession: ${profession}`;
console.log(sentence);
```

We have a string variable called _sentence_. In _sentence_, we assign as string that makes use of the values assigned to the _name_ and _dateOfBirth_.

Is it obvious how the string interpolation thing was done? It should. We put `${name}` where, _name_ is a variable (whose value) we want to add to our string variable. The example above uses _name_ and _dateOfBirth_. Do for the others.

We could have had the same result had we used string concatenation which is basically using the _plus_ operator properly in places where it is required.

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

You would surely hear a lot about indexing. So let's talk a little about it now. Indexing is the same as subscripting, if it helps. In brief, it means you can find or retrieve a character from a string using its numeric position (index, counting from zero). We will discuss this (indexing) when dealing with arrays (the same idea is the applies to arrays).

Consider the string "Doe", the first letter is 'D', second is 'o' and the third is 'e'. In javascript indexing starts at zero, so the first character (positioned element) is at index 0, pointing to 'D'. The second will be 1, after index 0, which will point to 'o', then index 2 will point to the last (third) element, which is 'e' character at the third position. In JavaScript, `index = element position - 1`.

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

A string is an object. This means they have methods and properties. A method is an action or function that can be performed on the string object. This string object has properties. For now we can say a property is a like a variable attach to this object of interest that keeps some state (data) about this same object.

We look at a new operator called the _dot_ operator. It is used to access properties and methods on an object.

We will be looking at the frequently used properties and methods. I will denote properties as _p_ and methods as _m_.

- `length` (p): is a property that returns the number of characters in a string. Hence the length of the string.
- `toUpperCase()` (m): is a method that returns the string in uppercase
- `toLowerCase()` (m): is a method that returns the string in lowercase
- `endsWith(key:string)` (m): is a method that returns true when the string ends with the key parameter (a string) else false
- `startsWith(key:string)` (m): is a method that returns true when the string starts with the key parameter (a string) else false
- `includes(key:string)` (m): is a method that returns true when the string contains the key string else false
- `replace(oldStr: string, withNewString: string)` (m): is a method that replaces `oldStr` in the string with `withNewString` and returns the new updated string
- `trim()` (m): is a method that removes starting or ending white spaces of a string and returns a new value
- `split(key: string)` (m): returns an array of the string where key is used a a divider (to split the string at the point)
- `substring(startingIndex: number, optionalEndingIndex?: number)` (m): returns a position of a string specified by the \_startingIndex\_ all the way to the character at the _optionalEndingIndex_, when provided.

**Example**

```js
// Using string methods and properties
const fullName = "John Doe";

// NB: whatever method we can call on a string literal, we can do same for a variable

// find and print out the length of the fullName string variable using the length property
const fullNameLength = fullName.length;

// using string interpolations here
console.log(`The name, "${fullName}", has ${fullNameLength} characters`);

// counting includes the spaces and symbols too
// update the value of fullName and see what happens

// this is the same as above but I will encourage you to stick to string interpolations in cases like this
// console.log("The name, " + fullName + ", has " + fullNameLength + " characters");

// convert uppercase and lowercase
console.log(`Upper: ${fullName.toUpperCase()}`);
console.log(`Lower: ${fullName.toLowerCase()}`);

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

// try this yourself, check if fullName starts with john and doe, then uppercase and lowercase the key and try again (for both cases)

// check if fullName as a space
const fullNameHasASpace = fullName.includes(" ");
// here we passed the key/search string directly without creating a variable for it.
// I want you to know that we can also do that
console.log(`It is ${fullNameHasASpace} that "${fullName}" has a space`);
// we could have also done
// console.log(`It is ${fullName.includes(" ")} that "${fullName}" has a space`);

// try checking if the fullName contains the letter J, either uppercase or lowercase
// how would you achieve this? refer to the methods above for clue, first

// replace Doe with Moe
const moedFullName = fullName.replace("Doe", "Moe");
console.log(`New full name: ${moedFullName}`);

// try replace spaces with underscore
const stringWithStaringAndTrailingSpaces = " John Doe ";
console.log(
  stringWithStaringAndTrailingSpaces
    .replace(" ", "JS") // replaces the first " "
    .replace(" ", "_") // replaces the second " "
    .replace(" ", "TS") // replaces the third " "
);

// it replaces only one instance at a time. so it was chained. I don't have to create a temp variable

// trust me, having your users starting their email with a spaces is annoying
// and sometimes it's the input keyboard (I get it, I am just venting off)
// but then again it will do no harm in trimming the unnecessary (white) spaces
// we will trim the whites off the stringWithStaringAndTrailingSpaces
// we'd use another method to let you know that the trimming worked
console.log(
  `Length of original string: ${stringWithStaringAndTrailingSpaces.length}`
);
console.log(
  `Length of trimmed string: ${
    stringWithStaringAndTrailingSpaces.trim().length
  }`
);
// remember the definition of the length, it counts the spaces too

// split is really useful, we can split the full name into first and last name in order as is
// i don't think it will be pretty to have spaces with the names
// we'd do the splitting at the space
console.log(stringWithStaringAndTrailingSpaces.split(" "));
console.log(stringWithStaringAndTrailingSpaces.trim().split(" "));
// printing the split string (becomes an array) shows the content of the array (or string to be precise)
// note any difference? Would the assumption still hold that the first element (object) in the
// array will be the first name and second (which should be the last actually) is the last name?
// this doesn't hold anymore because of the starting and trailing spaces
```

Let's create some rules to create some sc

```js
// indexing a string (or array)
const someName = "Doe";
// consider the string Doe, the first letter is 'D', second is 'o' and the third is 'e'
// In javascript indexing starts at zero, so the first position is at index 0, pointing to 'D'
// second will be 1, after index 0, which will point to 'o', then index 2 will point to the last element,
// which is 'e' character at the third position
// try writing a password validator
```
