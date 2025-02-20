// joi_validations.js;
const Joi = require("joi");

const authValidationSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const credentials = {
    email: "johndoe1@gmail.com",
    password: "JohnPwd12_",
};

let { error, value } = authValidationSchema.validate(credentials);

// console.log({ error, value });
/* console
{
  error: undefined,
  value: { email: 'johndoe1@gmail.com', password: 'JohnPwd12_' }
}
*/

const inValidCredentials = {
    email: "johndoe1gmail.com",
    password: "John",
};

// abortEarly: true,
// allowUnknown: false,
// convert: true,
const invalidResult = authValidationSchema.validate(inValidCredentials, {
    // when true, stops validation on the first error, otherwise returns all the errors found.
    abortEarly: false,
});

// console.log(invalidResult.value);
// { email: 'johndoe1gmail.com', password: 'John' }
// console.log(invalidResult.error);
/* 
[Error [ValidationError]: "email" must be a valid email. "password" length must be at least 6 characters long] {
  _original: { email: 'johndoe1gmail.com', password: 'John' },
  details: [
    {
      message: '"email" must be a valid email',
      path: [Array],
      type: 'string.email',
      context: [Object]
    },
    {
      message: '"password" length must be at least 6 characters long',
      path: [Array],
      type: 'string.min',
      context: [Object]
    }
  ]
}
*/
// console.log(invalidResult.warning);
// undefined

const LETTERS = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
];
const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const SPECIAL_SYMBOLS = ["$", "_", "-"];

const hasAnyOf = (arg, these = []) => {
    return arg.split("").filter((char) => these.includes(char)).length > 0;
};

const customPasswordValidation = (value, helpers) => {
    if (!value || typeof value !== "string") {
        throw new Error("Password invalid");
    }

    if (value.length < 6) {
        throw new Error("Password must be at least 6 characters");
    }

    const UPPER_CASE = LETTERS.map((char) => char.toUpperCase());
    if (!hasAnyOf(value, UPPER_CASE)) {
        throw new Error(
            "Password must inlcude at least one uppercase character"
        );
    }

    if (!hasAnyOf(value, NUMBERS)) {
        throw new Error("Password must inlcude at least one numeric character");
    }

    if (!hasAnyOf(value, SPECIAL_SYMBOLS)) {
        throw new Error(
            `Password must inlcude at least one of these special characters: [${SPECIAL_SYMBOLS.join(
                ","
            )}]`
        );
    }

    return value;
};

const passwords = ["", "John", "john123", "John123", "John123_"];

const customPasswordSchema = Joi.string().custom(
    customPasswordValidation,
    "custom password validation"
);

const errorList = passwords.reduce((errors, password) => {
    const { error } = customPasswordSchema.validate(password);

    errors.push({
        [password]:
            error?.details?.map((log) => log.message).join("and") ?? "No error",
    });

    return errors;
}, []);

console.log(errorList);
/* [
    { "": '"value" is not allowed to be empty' },
    {
        John: '"value" failed custom validation because Password must be at least 6 characters',
    },
    {
        john123:
            '"value" failed custom validation because Password must inlcude at least one uppercase character',
    },
    {
        John123:
            '"value" failed custom validation because Password must inlcude at least one of these special characters: [$,_,-]',
    },
    { John123_: "No error" },
]; */
