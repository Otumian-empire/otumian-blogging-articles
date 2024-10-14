# JavaScript Essentials: Part 5

Previously in [JavaScript Essentials: Part 4](https://dev.to/otumianempire/javascript-essentials-part-4-2ne6), We discussed `if` and `else` statements, `for` and `while` loops. In this part we will look at:

- Functions
- Callbacks, promises, async & await
- Next big thing

## Examples

There were some exercises from [JavaScript Essentials: Part 4](https://dev.to/otumianempire/javascript-essentials-part-4-2ne6) which included but not limited to "fizzbuzz", password and email validation, etc. If you were to have followed my pseudocode, you'd run into some issues. I will provide a snippet that considers the order.

**fizzbuzz for a single number**

```js
const givenNumber = 3;

if (givenNumber % 3 === 0 && givenNumber % 5 === 0) {
  console.log("fizzbuzz");
} else if (givenNumber % 3 === 0) {
  console.log("fizz");
} else if (givenNumber % 5 === 0) {
  console.log("buzz");
}
```

**fizzbuzz for an array**

```js
const numbers = [3, 6, 10, 15];

for (const givenNumber of numbers) {
  if (givenNumber % 3 === 0 && givenNumber % 5 === 0) {
    console.log("fizzbuzz");
  } else if (givenNumber % 3 === 0) {
    console.log("fizz");
  } else if (givenNumber % 5 === 0) {
    console.log("buzz");
  }
}
```

**password validation**

```js
const veryWeakPassword = "PrQ1V_";
// const veryWeakPassword = "rtfy67Fg";
// const veryWeakPassword = "OlJgRc__1qwPVa";
console.log(`Password validation for "${veryWeakPassword}"`);

// - be six characters
if (veryWeakPassword.length !== 6) {
  console.log(
    `- Password must have 6 characters => "${veryWeakPassword}" has '${veryWeakPassword.length}' characters`
  );
}
// - start with uppercase p, 'P'
else if (!veryWeakPassword.startsWith("P")) {
  console.log(
    `- Password must start with 'P' => it is ${veryWeakPassword.startsWith(
      "P"
    )} that "${veryWeakPassword}" starts with 'P'`
  );
}
// - end with underscore
else if (!veryWeakPassword.endsWith("_")) {
  console.log(
    `- Password must end with '_' => it is ${veryWeakPassword.endsWith(
      "_"
    )} that "${veryWeakPassword}" ends with '_'`
  );
}
// - have uppercase q, 'Q'
else if (!veryWeakPassword.includes("Q")) {
  console.log(
    `- Password must have uppercase q, 'Q' => it is ${veryWeakPassword.includes(
      "Q"
    )} that "${veryWeakPassword}" has 'Q'`
  );
}
// - have lowercase r, 'r'
else if (!veryWeakPassword.includes("r")) {
  console.log(
    `- Password must have lowercase r, 'r' => it is ${veryWeakPassword.includes(
      "r"
    )} that "${veryWeakPassword}" has 'r'`
  );
}
// - have its fifth character as uppercase v, 'V'
// fifth character with have index = fifth position - 1 = 4
// const fifthCharacter = veryWeakPassword[4]
else if (veryWeakPassword.charAt(4) !== "V") {
  console.log(
    `- Password must have its fifth character as uppercase v, 'V' => "${veryWeakPassword}" has its 5th character as '${veryWeakPassword.charAt(
      4
    )}'`
  );
} else {
  console.log(`${veryWeakPassword} is a valid password`);
}
```

Some other solutions would be using nested `if` and `else`.

```js
// password validation
const veryWeakPassword = "PrQ1V_";
// const veryWeakPassword = "rtfy67Fg";
// const veryWeakPassword = "OlJgRc__1qwPVa";
console.log(`Password validation for "${veryWeakPassword}"`);

// - be six characters
if (veryWeakPassword.length === 6) {
  if (veryWeakPassword.startsWith("P")) {
    if (veryWeakPassword.endsWith("_")) {
      if (veryWeakPassword.includes("Q")) {
        if (veryWeakPassword.includes("r")) {
          if (veryWeakPassword.charAt(4) === "V") {
            console.log(`${veryWeakPassword} is a valid password`);
          } else {
            console.log(
              `- Password must have its fifth character as uppercase v, 'V' => "${veryWeakPassword}" has its 5th character as '${veryWeakPassword.charAt(
                4
              )}'`
            );
          }
        } else {
          console.log(
            `- Password must have lowercase r, 'r' => it is ${veryWeakPassword.includes(
              "r"
            )} that "${veryWeakPassword}" has 'r'`
          );
        }
      } else {
        console.log(
          `- Password must have uppercase q, 'Q' => it is ${veryWeakPassword.includes(
            "Q"
          )} that "${veryWeakPassword}" has 'Q'`
        );
      }
    } else {
      console.log(
        `- Password must end with '_' => it is ${veryWeakPassword.endsWith(
          "_"
        )} that "${veryWeakPassword}" ends with '_'`
      );
    }
  } else {
    console.log(
      `- Password must start with 'P' => it is ${veryWeakPassword.startsWith(
        "P"
      )} that "${veryWeakPassword}" starts with 'P'`
    );
  }
} else {
  console.log(
    `- Password must have 6 characters => "${veryWeakPassword}" has '${veryWeakPassword.length}' characters`
  );
}
```

What do you think about the two snippets? Practically the second snippet, even though it works, it is not that great.

## Comments

Comments are great and we are now going to talk about. It is so late that you should know what a comment is. Anyway, a comment in our program is not executed. A comment is meant to document our code. There are three ways to add comments in Javascript. We have the inline, multiline and JsDoc.

**In-line**

```js
// this is a number
const numberOfBirds = 3;

// the above comment is useless since the initial value assigned to the variable
// is physically a number and the variable name also has number in it
// so use comments wisely by using proper naming
```

**Multiline**

```js
/* 
Everything in here is or will be ignored

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


*/

const emptyString = "";
```

**JsDoc**

```js
/**
 * This is a multiline comment
 *
 * But used for documentations
 */
```

##
