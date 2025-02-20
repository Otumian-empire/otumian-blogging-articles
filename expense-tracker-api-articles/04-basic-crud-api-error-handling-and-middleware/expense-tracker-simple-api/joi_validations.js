// joi_validations.js;
const Joi = require("joi");
const {
    hasAnyOf,
    LETTERS,
    NUMBERS,
    SPECIAL_SYMBOLS,
} = require("./validations");

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

const authValidationSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string()
        .custom(customPasswordValidation, "custom password validation")
        .required(),
});

const createExpenseSchema = Joi.object().keys({
    name: Joi.string().min(10).max(255).required(),
    amount: Joi.number().positive().required(),
    date: Joi.date().iso().required(),
    // date: Joi.string().isoDate().required(),
});

const updateExpenseSchema = Joi.object().keys({
    name: Joi.string().min(10).max(255).optional(),
    amount: Joi.number().positive().optional(),
    date: Joi.date().iso().optional(),
    // date: Joi.string().isoDate().optional(),
});

module.exports = {
    authValidationSchema,
    createExpenseSchema,
    updateExpenseSchema,
};
