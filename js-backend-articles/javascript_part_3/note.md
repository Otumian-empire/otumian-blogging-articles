# JavaScript Essentials: Part 3

Previously in [JavaScript Essentials: Part 2](https://dev.to/otumianempire/javascript-essentials-part-2-3k6j), we discussed quite a lot about string properties and methods, and indexing strings when split into an array. In this part, we will look at:

- Object
- Arrays

## Object

We have discussed objects and seen some examples of an object.

**Example**

```js
const profile = {
  name: "John Doe",
  "date of birth": "2000-12-25",
  profession: "Software Engineer",
  "number of pets": 2,
  "weight of protein in grams": 12.5,
  "has a job": true,
};

console.log(profile);
```

We can access the properties of the object using the dot operator. We can do, `profile.name` to the the value for the _name_. We can also assign or reassign a value to any of the properties or a new property. There is another way to access the value of a property. In indexing, we pass a number, but this approach, we pass the property name instead. `profile["property"]`. So `profile.name` and `profile["name"]` will have the same result. We use the latter when we have white spaces in the property name. I might not have mentioned this, however, for the best, avoid property names with whites spaces. (Do you recall camelCasing, snake_casing, PascalCasing, CONSTANT_CASING, etc).

```js
console.log(`Name on profile: ${profile.name}`);
console.log(`Profession: ${profile.profession}`);
console.log(`Number of pets: ${profile["number of pets"]}`);
console.log(`Protein weight (g): ${profile["weight of protein in grams"]}g`);
console.log(`Is employed: ${profile["has a job"]}`);
```

We can also alter the data in the object

```js
profile.name = "Michael Angelo";
profile.isBald = false;

console.log(profile);
```

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

## Indexing an array

The concepts of indexing as we discussed in the string section applies here. Index starts at zero.

**Example**

```js
const evenNumbers = [2, 4, 6];

const firstEvenNumber = evenNumbers[0];
const secondEvenNumber = evenNumbers[1];
const thirdEvenNumber = evenNumbers[2];

const sumOfEvenNumbers = firstEvenNumber + secondEvenNumber + thirdEvenNumber;
const productOfEvenNumbers =
  firstEvenNumber * secondEvenNumber * thirdEvenNumber;

console.log(
  `The sum and product of the even numbers, ${evenNumbers} are, ${sumOfEvenNumbers} and ${productOfEvenNumbers} respectively`
);
// The sum and product of the even numbers, 2,4,6 are, 12 and 48 respectively
```

## Array properties and methods

Arrays, like strings, also have properties and methods which can be accessed using the dot operator, `arrayVariable.propertyName` and `arrayVariable.methodName(someArgs)`;

These are some of the properties and methods I have used professionally. There are a lot however I'd mention a few and demonstrate how to use them.

- `length` (p): `arrayVariable.length` returns the length (number of elements) of an array.

  ```js
  const stringArray = ["math", "meth", "mith", "moth", "muth"];

  // get the length of an array
  console.log(
    `There are ${stringArray.length} elements in the array, ${stringArray}`
  );
  ```

- `map` (m): returns a new array with the same size as the original with some computations done based on elements of the array. The signature of the `map` method is `(callbackfn: (value: elementType, index: number, array: elementType[]) => callbackfnReturnType, thisArg?: any): callbackfnReturnType[]`.

  - `callbackfn`: stands for callback function, a function passed as an argument (as value to something, here to the map method)
  - the `callbackfn` takes in `value`, `index` and `array` as parameters. The `value` (first and required parameter) the callback function refers to an element in the array. The `index` refers to the index of that element. The `array` parameter (which could be called anything) is references a copy of the original array.
  - The callback function is applied on each element of the array
  - For our use case, we'd need the `value` and sometimes, the `index`.

  ```js
  const stringArray = ["math", "meth", "mith", "moth", "muth"];

  const uppercaseStringArray = stringArray.map((value, index, theArray) => {
    return value.toUpperCase();
  });
  console.log(uppercaseStringArray);
  // [ 'MATH', 'METH', 'MITH', 'MOTH', 'MUTH' ]
  ```

  The index and the `theArray` values were not used in this case. I will modify the use of the map method.

  ```js
  const stringArray = ["math", "meth", "mith", "moth", "muth"];
  const uppercaseStringArray = stringArray.map((value) => value.toUpperCase());
  console.log(uppercaseStringArray);
  ```

  What we can do with the math function is a limited by our knowledge at the moment.

  Remember that the `=>` returns the new value that will be used to form the array.

- `filter` (m): the `filter` method functions like the `map` method however, it returns an array of the elements that meets condition (some truth statement - returns a boolean).

  ```js
  const elementInNature = ["water", "earth", "wind", "fire"];

  // filter elements that includes 'a'
  const elementsThatIncludeA = elementInNature.filter((value) =>
    value.includes("a")
  );
  console.log(elementsThatIncludeA);

  // filter elements that ends with 'er'
  const elementsThatEndsWithER = elementInNature.filter((value) =>
    value.endsWith("er")
  );
  console.log(elementsThatEndsWithER);
  ```

- `reduce` (m): just like filter and map, applies a function to each element. However, it returns a value instead of an array. It "reduces" an array to a single value. The signature of the `reduce` method is almost the same as that of `map` and `reduce`. However, `reduces` takes in another required parameter, which is the previous value. `reduce<U>(callbackfn: (previousValue: ReduceToType, currentValue: ElementType, currentIndex: number, array: ElementType[]) => ReduceToType, initialValue: ReduceToType): ReduceToType;`. It is better at this point to use an example rather.

  ```js
  const numberArray = [4, 6, 5, 9, 2, 8];
  const sumOfNumbers = numberArray.reduce((prev, curr) => prev + curr, 0);
  console.log(numberArray);
  console.log(sumOfNumbers);
  ```

  We set the initial value to zero. As the looping starts from the first value, the previous value will not be define (or be zero by default). We can choose to set it to another number. Try that and see the results.

  Let me rewrite this using something more pseudo-code like:

  ```js
  const result = someArray.reduce((initial value, current value)=> some action involving the previous value and current value, set the initial value to be something here)
  ```

  and another one

  ```js
  const result = someArray.reduce((expected result, current value)=> some action involving the previous value, which is the expected value, and current value, set a default value for the expected result here)
  ```

  > We'd surely have a lot of example involving `map`, `filter` and `reduce`.

  - `include` (m): returns a boolean indicating the presence of an element in an array. It is the same as the `includes` method of a _string_.

  - `join` (m): combines the elements in an array with a _separator_ into a string.The _join_ method takes a separator argument. This is a string.

    ```js
    const numberArray = [4, 6, 5, 9, 2, 8];

    console.log(numberArray.join(""));
    // 465928
    console.log(numberArray.join("_"));
    // 4_6_5_9_2_8
    console.log(numberArray.join("000"));
    // 400060005000900020008
    ```

    We can do awesome things with a string and an array

  - `find` (m): it has the same parameter format as the `map` and `filter`. It returns the first element which meets the condition else it returns undefined. There is a good place to use `find` in place of `filter`. More on that later.

> We will learn more about functions and parameters and arguments in the function section to come.
> We will discuss the return keyword as well and comments too.

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

- Arrays
- Object
- Operators
- Control structures (if statements, loops)
- Functions
- Callbacks, promises, async & await
- Next big thing
