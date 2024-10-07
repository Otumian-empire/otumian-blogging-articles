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

We can access the properties of the object using the dot operator. We can do, `profile.name` to the the value for the _name_. We can also assign or reassign a value to any of the properties or a new property. There is another way to access the value of a property. In indexing, we pass a number, but in this approach, we pass the property name instead. `profile["property"]`. So `profile.name` and `profile["name"]` will have the same result. We use the latter when we have white spaces in the property name. I might not have mentioned this, however, for the best, avoid property names with white spaces. (Do you recall camelCasing, snake_casing, PascalCasing, CONSTANT_CASING, etc).

```js
console.log(`Name on profile: ${profile.name}`);
console.log(`Profession: ${profile.profession}`);
console.log(`Number of pets: ${profile["number of pets"]}`);
console.log(`Protein weight (g): ${profile["weight of protein in grams"]}g`);
console.log(`Is employed: ${profile["has a job"]}`);
```

We can also alter the data in the object.

```js
profile.name = "Michael Angelo";
profile.isBald = false;

console.log(profile);
```

There is this `Object` in javascript that we can use to map the keys to the values, get the keys, get the values and other functions on the object variable. It has some methods such as `entries(objectVariable)`, `keys(objectVariable)` and `values(objectVariable)`.

```js
console.log(Object.entries(profile));
//It has created an array of the key and value
// [
//   [ 'name', 'John Doe' ],
//   [ 'date of birth', '2000-12-25' ],
//   [ 'profession', 'Software Engineer' ],
//   [ 'number of pets', 2 ],
//   [ 'weight of protein in grams', 12.5 ],
//   [ 'has a job', true ]
// ]

console.log(Object.keys(profile));
//It returns the keys of the object as an array
// [
//   'name',
//   'date of birth',
//   'profession',
//   'number of pets',
//   'weight of protein in grams',
//   'has a job'
// ]

console.log(Object.values(profile));
//It returns the values of the object as an array
// ["John Doe", "2000-12-25", "Software Engineer", 2, 12.5, true];
```

There are more, however, at this point, I think this is enough.

## Array

An array is a list or a collection of items. Since this is JavaScript, we can list anything or nothing. We can have an array of numbers, strings, booleans, etc.

In JavaScript, we can use the square bracket to create an array. All that we have discussed about variables and values applies to an array. Some knowledge from strings might apply (borrowed knowledge).

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

The concepts of indexing as we discussed in the string section apply here. The index starts at zero.

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

- `push` (m): Takes in a value and adds it to the original array. Know that this will alter the array.

```js
const numbers = [1, 2, 3, 4, 5];
console.log(numbers);
console.log(numbers.length);

// add an element at the end of the array
numbers.push(-1);
console.log(numbers);
console.log(numbers.length);
```

- `pop` (m): removes the last element from the array and returns it. So you can salvage the last element and use it in some computations.

```js
const numbers = [1, 2, 3, 4, 5];
console.log(numbers);
console.log(numbers.length);

// returns the last element from the array
const poppedNumber = numbers.pop();
console.log(`${poppedNumber} was popped from the array`);
console.log(numbers);
console.log(numbers.length);
```

- `map` (m): returns a new array with the same size as the original with some computations done based on elements of the array. The signature of the `map` method is `(callbackfn: (value: elementType, index: number, array: elementType[]) => callbackfnReturnType, thisArg?: any): callbackfnReturnType[]`.

  - `callbackfn`: stands for callback function, a function passed as an argument (as value to something, here to the map method)
  - the `callbackfn` takes in `value`, `index` and `array` as parameters. The `value` (first and required parameter) of the callback function refers to an element in the array. The `index` refers to the index of that element. The `array` parameter (which could be called anything) references a copy of the original array.
  - The callback function is applied to each element of the array
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

What we can do with math functions is limited by our knowledge at the moment.

Remember that the `=>` returns the new value used to form the array.

- `filter` (m): the `filter` method functions like the `map` method however, it returns an array of the elements that meet the condition (some truth statement - returns a boolean).

```js
const elementInNature = ["water", "earth", "wind", "fire"];

// filter elements that include 'a'
const elementsThatIncludeA = elementInNature.filter((value) =>
  value.includes("a")
);
console.log(elementsThatIncludeA);

// filter elements that end with 'er'
const elementsThatEndsWithER = elementInNature.filter((value) =>
  value.endsWith("er")
);
console.log(elementsThatEndsWithER);
```

- `reduce` (m): like filter and map, apply a function to each element. However, it returns a value instead of an array. It "reduces" an array to a single value. The signature of the `reduce` method is almost the same as that of `map` and `reduce`. However, `reduces` takes in another required parameter, which is the previous value. `reduce<U>(callbackfn: (previousValue: ReduceToType, currentValue: ElementType, currentIndex: number, array: ElementType[]) => ReduceToType, initialValue: ReduceToType): ReduceToType;`. It is better at this point to use an example rather.

```js
const numberArray = [4, 6, 5, 9, 2, 8];
const sumOfNumbers = numberArray.reduce((prev, curr) => prev + curr, 0);
console.log(numberArray);
console.log(sumOfNumbers);
```

We set the initial value to zero. As the looping starts from the first value, the previous value will not be defined (or be zero by default). We can choose to set it to another number. Try that and see the results.

Let me rewrite this using something more pseudo-code like:

```js
 const result = someArray.reduce((initial value, current value)=> some action involving the previous value and current value, set the initial value to be something here)
```

and another one

```js
 const result = someArray.reduce((expected result, current value)=> some action involving the previous value, which is the expected value, and current value, set a default value for the expected result here)
```

- `include` (m): returns a boolean indicating the presence of an element in an array. It is the same as the `includes` method of a _string_.

- `join` (m): combines the elements in an array with a _separator_ into a string. The _join_ method takes a separator argument. This is a string.

```js
const numberArray = [4, 6, 5, 9, 2, 8];

console.log(numberArray.join(""));
// 465928
console.log(numberArray.join("_"));
// 4_6_5_9_2_8
console.log(numberArray.join("000"));
// 400060005000900020008
```

We can do awesome things with a string and an array.

- `find` (m): it has the same parameter format as the `map` and `filter`. It returns the first element which meets the condition else it returns undefined. There is a good place to use `find` instead of `filter`. More on that later.

## A peek into the future

We can be doing things like these in the next part.

Consider the user profile array.

```js
const profileArray = [
  { id: 1, username: "AdamDoe", pet: "math", isBald: true },
  { id: 2, username: "PeterPen", pet: "meth", isBald: false },
  { id: 3, username: "MaxBuffer", pet: "mith", isBald: false },
  { id: 4, username: "CheeseCake", pet: "moth", isBald: true },
  { id: 5, username: "PaxTingAA", pet: "muth", isBald: true },
];
```

We can use a filter to find users who have 'a' or 'A' in their user name.

```js
const usersWithA = profileArray.filter((user) =>
  user.username.toLowerCase().includes("a")
);
```

Instead of console logging the whole object, we will only log their usernames.

```js
const usernamesWithA = usersWithA.map((user) => user.username);
console.log(usernamesWithA);
```

We did these actions separately, however, we can have them together by chaining them.

```js
const usernamesWithA = profileArray
  .filter((user) => user.username.toLowerCase().includes("a"))
  .map((user) => user.username);

console.log(usernamesWithA);
// [ 'AdamDoe', 'MaxBuffer', 'CheeseCake', 'PaxTingAA' ]
```

The `user` variable used in the `filter` and `map` can be any other variable name. I chose `user` because it adds context to what we are doing.

Know that we can also call the `map` method before the `filter` method and we'd have the same output. However, we have to be careful. In the `map` method, we are accessing the `username` property (key) so the returning array from the `map` method will be an array of strings and not an object with several properties.

```js
const usernamesWithA = profileArray
  .map((user) => user.username)
  .filter((username) => username.toLowerCase().includes("a"));

console.log(usernamesWithA);
// [ 'AdamDoe', 'MaxBuffer', 'CheeseCake', 'PaxTingAA' ]

//We listed the username, then filtered out usernames that included 'a'
```

We can use the `find` method to find the first instance of a bald user who makes over 200000.

```js
const exclusiveUsers = profileArray
  .filter((user) => user.isBald)
  .filter((user) => user.salary > 200000)
  .map((user) => user.username);

console.log(exclusiveUsers);
// [ 'AdamDoe', 'PaxTingAA' ]
```

Since we are looking for the first user, we can do, `exclusiveUsers[0]` which should be _AdamDoe_ when we console log it.

In the coming section, we'll learn enough to use one `filter` method instead of two or more.

```js
const exclusiveUsers = profileArray
  .filter((user) => user.isBald && user.salary > 200000)
  .map((user) => user.username);

console.log(exclusiveUsers[0]);
// AdamDoe
```

`&&` means 'AND' and `>` is greater than sign. They are all operators. We will discuss more about them and redo some of the examples simply or rather realistically.

We wanted to use `find` and not `filter`. We mentioned that `find` returns the element. It doesn't return an array like the `map` or `filter` method. Know that the result can be `undefined`, which means no value was found in the array that matched the truth statement (predicate or condition). The condition we are referring to is `user.isBald && user.salary > 200000`, user is bald (`isBald` will be `true`) and the user's salary is over 200000, (`salary` value is greater than 200000).

```js
const exclusiveUser = profileArray.find(
  (user) => user.isBald && user.salary > 200000
);

console.log(exclusiveUser);
// {
//   id: 1,
//   username: 'AdamDoe',
//   pet: 'math',
//   isBald: true,
//   salary: 250000
// }

// since we are interested in the username, we can do
console.log(exclusiveUser.username);
// AdamDoe
```

We have a complex body or callback function we can use `return` in place of the `=>` (fat arrow operator). However we have to be mindful and add open and closing braces, `{` and `}`.

Now let's consider a case we want to update the user profile by adding a new field.

```js
const exclusiveUsers = profileArray.map((user) => {
  user.username = user.username.toUpperCase();
  user.isExclusive = user.isBald && user.salary > 200000;

  return user;
});
console.log(exclusiveUsers);

// [
//   {
//     id: 1,
//     username: 'ADAMDOE',
//     pet: 'math',
//     isBald: true,
//     salary: 250000,
//     isExclusive: true
//   },
//   {
//     id: 2,
//     username: 'PETERPEN',
//     pet: 'meth',
//     isBald: false,
//     salary: 658000,
//     isExclusive: false
//   },
//   {
//     id: 3,
//     username: 'MAXBUFFER',
//     pet: 'mith',
//     isBald: false,
//     salary: 850000,
//     isExclusive: false
//   },
//   {
//     id: 4,
//     username: 'CHEESECAKE',
//     pet: 'moth',
//     isBald: true,
//     salary: 90000,
//     isExclusive: false
//   },
//   {
//     id: 5,
//     username: 'PAXTINGAA',
//     pet: 'muth',
//     isBald: true,
//     salary: 366000,
//     isExclusive: true
//   }
// ]
```

We updated the username to uppercase and added a new key that indicates that the user (profile) is exclusive.

We can compute the average salary and filter out those who earn above the average salary.

```js
const numberOfUsers = profileArray.length;
const totalSalaries = profileArray.reduce(
  (total, currentUser) => total + currentUser.salary,
  0
);
const averageSalary = totalSalaries / numberOfUsers;
console.log(
  `The average salary of ${numberOfUsers} users with a combined total of ${totalSalaries} is ${averageSalary}`
);
// The average salary of 5 users with a combined total of 2214000 is 442800

// Now let's filter the above average salary users
const aboveAverageSalaryUsers = profileArray.filter(
  (user) => user.salary > averageSalary
);
console.log(
  `${aboveAverageSalaryUsers.length} users who earn above the average salary of ${averageSalary}`
);
// 2 users who earn above the average salary of 442800

// we will get their user names

const combinedUsernames = aboveAverageSalaryUsers
  .map((user) => user.username)
  .join(" and ");
console.log(`These users are ${combinedUsernames}`);
// These users are PeterPen and MaxBuffer
```

> We will learn more about functions and function parameters and arguments in the function section to come.
> We will discuss the return keyword as well and comments too.

## Email Validation

This is my implementation for the email verification from the previous section. These are the rules for the email validation. Email must:

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
// There could be split opinions, either force the users to enter their
// emails in lowercase or cast it to lowercase. The latter seems better
const lowercasedEmail = sampleEmail.toLowerCase();
// or can use the `sampleEmail.toLowerCase()` from here onwards

// - not have 'email' in it
const hasEmail = lowercasedEmail.includes("email");
// If `hasEmail` is true then this email is invalid
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
// the output from above will let us know if there is even an '@'
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

Arrays are useful and array methods make it easier to manipulate data as we see fit. With the new concepts added we can now do more. Try rewriting the password and email validation using array and string methods.

We have more on javascript to discuss such as:

- Spreading and destructuring
- Operators
- Control structures (if statements, loops)
- Functions
- Callbacks, promises, async & await
- Next big thing
