# Javascript Part 1

Javascript is like a pot of honey. You can dip your finger into it and swipe a mouthful. It is sweet. It is awesome. It is dangerous. It can be hazardous, like hot honey, in a pot.

Is JavaScript complicated? Well, you should find an answer to this question at the end of this excerpt (including the other parts too). We can ask another question. How much JavaScript knowledge is necessary to develop a program? It would help if you had an understanding of data and data flow. What data do I need and how do I structure it? What do I do with the data? Something like that. When you think about a concept, you do or should be able to do. And that, will essentially be the aim of this material (we have not forgotten the first question though, "Is javascript complicated?").

> I usually prefer short and detailed articles but this time it will be long so buckle up.

We will discuss data types and variables in this part.

## Running Javascript

Previously on [What is Nodejs](https://dev.to/otumianempire/what-is-nodejs-4h10), we created a `hello world` program. We will do the same here.

To run a javascript program, we need `nodejs` and a program (code) to run. We will be using a file called `app.js`. So create a file called, `app.js` and follow along. The `.js` extension indicates that it is a Javascript file. We have discussed this already so I will leave it at that.

```sh
node app.js
```

## console.log

There is a simple way to print text (data) to the terminal (screen) and this is done with `console.log`. Just like our `hello world` program. Enter this code into your text editor.

```js
console.log("Hello, it's me, javascript");
```

Whatever valid data we put between the `(` and `)`, will be printed to the terminal. In our case we printed a text to the screen, saying, `Hello, it's me, javascript`. There are double quotes surrounding (enclosing) the data we want to print. This enclosing quote makes our data a string.

Try printing (writing) your strings to the terminal and have a feel of it.

> For the benefit of the doubt, when you create your `app.js`, save it when you enter your code then run it.

## String

A string is a value (data) enclosed in a quote (double quote, single quote or backtick). A string is a text. Your name, grade, etc are strings. A string can be a phrase, sentence, paragraph, word, character, etc.

**Examples**

- "Lorem ipsum"
- 'Lorem ipsum'
- \`Lorem ipsum\`
- "Oh! That library was developed by Ant Fu, A fanatical open sourceror?"
- "Danny's mom is a Tech CEO"
- "I want to use a single quote in a string. So isn't it better to use a double quote as the enclosing quotes?"
- 'I want to use a double quote in a string. Single quote said, "There lived a string called foo bar"'
- \`"I can mix and match single quotes and double quotes in backticks", John Doe's dad said.\`

The above examples were to show you how to use strings and point out the caveat that handling strings in JavaScript comes with. For starters, you can decide to use double or single quotes. You choose. Use backticks when doing string interpolations or when you encounter the last example. Just know that, when you use a quote to create a string, the opening quote must match and be closed by the same quote. So you can not open with a single quote and close with a double quote.

We can use a quote (double quote, single quote or backtick) in the quote delimited string but then we have to escape it. We use a backslash, `\`.

**Example**

```js
console.log('we can use double quote in a double-quoted string, " by escaping');
```

Now, use `console.log` to log the above strings and write your own.

## Number

Examples of numbers: `-3, 5, 10000, 12.5, etc`. They can be used to represent the counted or measured value of an item. I mean, that is what a number is. Or?

## Boolean

A boolean, is a value (data) type, just like string and number. However, the values for a boolean, are either `true` or `false`. It is the case that some condition is, or is not.

## Object

An object in Javascript is a way to present a key-value paired data. We can use an object literal to group related data about some item. To create an object literal we enclose this data in a `{` and `}`. Let's create a user profile.

**Example**

We will `console.log` user profile. The user profile _name, date of birth, profession, number of pets, weight of protein in grams, has a job etc_. Every key value is separated by a comma. A key is followed by a colon, then the value, to form a key-value pair. Usually, keys are strings (Yes, we enclose the keys of an object into quotes). You can add more keys (properties) to it.

_name_ is a string (its value I mean). There is a date object in javascript but for now, we can use a string for _date of birth_. _profession_ is also a string. _number of pets_ and _weight of protein in grams_ are numbers. _has a job_ indicates if the profile holder has a job. So it is a boolean.

```js
{
    "name": "John Doe",
    "date of birth": "2000-12-25",
    "profession": "Software Engineer",
    "number of pets": 2,
    "weight of protein in grams": 12.5,
    "has a job": true
}
```

This is an object (literal) that details the content of _John Doe's_ profile.

Now we can `console.log` it.

```js
console.log({
  name: "John Doe",
  "date of birth": "2000-12-25",
  profession: "Software Engineer",
  "number of pets": 2,
  "weight of protein in grams": 12.5,
  "has a job": true,
});
```

Note that it is important to make the keys a string for now. Be curious and use something else other than a string as a key. You will learn a lot.

## Calculator

Math is a daily thing for programming and science at large. We won't need that much math. All we need to know is addition (_+_), subtraction (_-_), multiplication (_\*_), division (_/_), modulo (_%_) and exponent (_\*\*_).

From here, modulo (_%_) and exponent (_\*\*_) are new to you so that we will do some math.

```js
// adding numbers with the plus
console.log(3 + 3); // answer = 6
console.log(1 + 2 + 4); // answer = 7

// subtraction with dash
console.log(6 - 3); // answer = 3
console.log(-16 - 3); // answer = -19

// multiplication with asterisk
console.log(5 * 3); // answer = 15
console.log(30 * 15); // answer = 450

// division with forward slash
console.log(30 / 5); // answer = 6
console.log(12.25 / 0.5); // answer = 24.5

// modulo (is the remainder after division is done) with the percentage sign (%)
console.log(5 % 2); // answer = 1
console.log(2 % 5); // answer = 2

// exponent with two asterisks (**)
console.log(5 ** 2); // answer = 5 * 5 = 25
```

## Variables

In a second, we will talk about what a variable is after we consider why we need them. I think you'd know what a variable is based on why you might need it.

Let's consider the strings, numbers, booleans, objects and calculations we have done until now. How do we get those values and do other computations on them? We use a variable.

So we can have the result of `3 + 3` which is `6` stored or assigned as a value to a variable. Then we can use that value later. This way we are keeping track of the value (state) of the variable. Know that, whenever you see a variable, there is a value.

A variable is a tag, label or name attached to a value. Wherever you call (reference) or use that variable, the value is referred. When we say, `let x be 2`. Add `3` to `x`, that is, `x + 3`. The result will be, `x + 3 = 2 + 3 = 5`.

A variable holds data which is used in the data flow.

**Const and Let**
In Javascript, `const` and `let` (in lowercase) are used when creating variables.

- use `const` when you want to assign a value that shouldn't or wouldn't change
- use `let` when you want to assign a value that might change

**Let's create and use some variables**

```js
const name = "John Doe";
const dateOfBirth = "2000-12-25";
const profession = "Software Engineer";
const numberOfPets = 2;
const weightOfProteinInGrams = 12.5;
const hasAJob = true;
```

The above variables are constants. If we want them to be changeable (reassigned), we'd use `let` instead of `const`. This way we can assign different values to these variables. Try your hands on reassigning values to the `const` variables.

This is what we mean by reassigning a value to a variable.

```js
const name = "John Doe";
name = "Peter Dow";
```

Or

```js
const name = "John Doe";
name = "John Dow";
```

will result in this error message: `Uncaught TypeError: Assignment to constant variable.`

**Notes on variables**

- To create a variable, we can use `const` and `let`.
- It takes the form, `let <variable name> = <value>;`
- `<variable name>` is the name/tag/phrase. Look at the `const` variables above.
- `<variable name>` must start with an alphabetic character or underscore (`_`)
- `<variable name>` can not have a space in it. `my name` can not be a variable name because of the space.
- `<variable name>` can have numbers in it. Based on the previous rules, we can have `name1, a1, _pet3_, MAX_LIFE, max_life, maxLife, MaxLife, etc`.
- It is best that a variable name describes or informs you about the data it holds or what the variable is/will be used for.
- These variables: `MAX_LIFE, max_life, maxLife, MaxLife`, say the same thing, _max life_.
- This format, `maxLife`, known as camelCasing was used. This, `MaxLife` is PascalCasing. This `max_life`, is snake_casing. This, `MAX_LIFE`, is used for creating constants.

We can create a variable for the profile object we created earlier.

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

## Conclusion

There is more to discuss about data and data flow. Until now, we have looked at `string`, `number`, `boolean` and an `object` literal. As we discussed, a `variable` is a way to keep track of values. The statement `const x = 2` **assigns** the value `2` to the variable `x`.

The _equal to_ sign, `=`, is the assignment operator. This is why we say, _a variable `x` is assigned a value of `2`_.

We have more on javascript to discuss such as:

- String interpolation and a gist of its methods
- Arrays
- Control structures (if statements, loops)
- Functions
- Callbacks, promises, async & await
- Next big thing
