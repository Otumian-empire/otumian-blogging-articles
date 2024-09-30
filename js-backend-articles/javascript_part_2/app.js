// ## String interpolation and a gist of its methods

// const name = "John Doe";
// const dateOfBirth = "2000-12-25";
// const profession = "Software Engineer";
// const numberOfPets = 2;
// const weightOfProteinInGrams = 12.5;
// const hasAJob = true;

// const sentence = `Full name: ${name}, date of birth: ${dateOfBirth}, profession: ${profession}`;
// console.log(sentence)

// const sentence = "Full name: " + name + ", date of birth: " + dateOfBirth + ", profession: " + profession
// // console.log(sentence.replace())
// console.log("hello there,hello".("ll"))

// ## String methods

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
console.log(`Length of original string: ${stringWithStaringAndTrailingSpaces.length}`)
console.log(`Length of trimmed string: ${stringWithStaringAndTrailingSpaces.trim().length}`)
// remember the definition of the length, it counts the spaces too


// split is really useful, we can split the full name into first and last name in order as is
// i don't think it will be pretty to have spaces with the names
// we'd do the splitting at the space
console.log(stringWithStaringAndTrailingSpaces.split(" "))
console.log(stringWithStaringAndTrailingSpaces.trim().split(" "))
// printing the split string (becomes an array) shows the content of the array (or string to be precise)
// note any difference? Would the assumption still hold that the first element (object) in the 
// array will be the first name and second (which should be the last actually) is the last name?
// this doesn't hold anymore because of the starting and trailing spaces


// indexing a string (or array)
const someName = "Doe";
// consider the string Doe, the first letter is 'D', second is 'o' and the third is 'e'
// In javascript indexing starts at zero, so the first position is at index 0, pointing to 'D'
// second will be 1, after index 0, which will point to 'o', then index 2 will point to the last element, 
// which is 'e' character at the third position
// try writing a password validator