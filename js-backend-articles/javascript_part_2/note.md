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

## String properties and methods

A string is an object. This means they have methods and properties. A method is an action or function that can be performed on the string object. This string object has properties. For now we can say a property is a like a variable attach to this object of interest that keeps some state (data) about this same object.

We look at a new operator called the _dot_ operator. It is used to access properties and methods on an object.

We will be looking at the frequently used properties and methods. I will denote properties as _p_ and methods as _m_.

- `length` (p): returns the number of characters in a string. Hence the length of the string.
-
