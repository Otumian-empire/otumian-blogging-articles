# Javascript

Javascript is a like a pot of honey. You can dip your finger into it and swipe a mouthful. It is sweet. It is awesome. It is dangerous. It can be dangerous, like a hot honey, in a pot.

Is javascript complicated? Well, we will answer that question at the end of this excerpt. We can ask another question, which is, how much javascript does one need to know to write some program? You need as much as, understanding data and data flow. What data do I need and how do I structure it? What do I do with the data? Something like that. When you think, you do or should be able to do. And that, will essentially be the aim of this material (we have not forgotten the the first question, "Is javascript complicated?").

> I usually prefer short and detailed articles but this time it will be long so buckle up.

## Running Javascript

Previously on [What is Nodejs](https://dev.to/otumianempire/what-is-nodejs-4h10), we created a `hello world` program. We will do the same here.

To run a javascript program, we need `nodejs` and a program (code) to run. We will be using a file called `app.js`. The `.js` extension indicates that it a javascript file. We have discussed this already so I will leave it at that.

```sh
node app.js
```

## console.log

There is a simple way to print text to the terminal and this is done with `console.log`. Just like our `hello world`.

```js
console.log("Hello, it's me, javascript");
```

What ever valid data we put between the `(` and `)`, will be printed to the terminal. In our case we printed a text to the screen, saying, `Hello, it's me, javascript`. There are double quotes surrounding (enclosing) the data we want to print. This enclosing quotes makes our data a string.

Try printing (writing) your own strings to the terminal.

## String

A string is a value (data) that is enclosed in a quote (double quote, single quote or tack tick). A string is a text. Your name, grade, etc are strings. A string can be a phrase, sentence, paragraph, word, character, etc.

**Examples**

- "Lorem ipsum"
- 'Lorem ipsum'
- \`Lorem ipsum\`
- "Oh! That library was developed by Ant fu?"
- "Danny's mom is a Tech CEO"
- "I want to use a single quote in a string. So isn't it better to use a double quote as the enclosing quotes?"
- 'I want to use a double quote in a string. Single quote said, "There lived a string called foo bar"'
- \`"I can mix and match single quotes and double quotes in back ticks", John Doe's dad said.\`

The above examples was to show you how to use string and plainly point out the caveat that handling strings in javascript comes with. For starters, you can decide to double or single quotes. You choose. Use back ticks when doing doing string interpolations or when you are encountering the last example. Just know that, when you use a quote to create string, the opening quote must match and closed by the same quote. So you can not open with a single quote and close with a double quote.

We can use a quote (double quote, single quote or tack tick) in the quote delimited string but then we have to escape it. We use back slash, `\`.

**Example**

```js
console.log('we can use double quote in a double quoted string, " by escaping');
```

Now, use `console.log` to log the above strings and come up with your own.

## Number

Examples of numbers: `-3, 5, 10000, 12.5, etc`. They can be used to represent the counted or measure value of an item. I mean, that is what a number is. or?

## Boolean

A boolean, is a value (data) type, just like string and number. However, the values for a boolean, are either `true` or `false`. It is the case that some condition is, or is not.
