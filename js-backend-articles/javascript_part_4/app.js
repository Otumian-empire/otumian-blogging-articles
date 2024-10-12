// // array destructuring

// const numbers = [1, 2, 3]

// const [firstElement, secondElement, thirdElement] = number

// console.log(firstElement)
// console.log(secondElement)
// console.log(thirdElement)

// // array destructuring

// const numbers = [1, 2, 3]

// const firstElement = numbers[0],
//     secondElement = numbers[1],
//     thirdElement = numbers[2]

// console.log(firstElement)
// console.log(secondElement)
// console.log(thirdElement)

// const profile = {
//     firstName: "John",
//     lastName: "Doe",
//     job: "Debugger",
//     isBald: false,
//     numberOfPets: 3
// }

// we want the first and last name

// const firstName = profile.firstName
// const lastName = profile.lastName

// console.log(`Full name: ${firstName} ${lastName}`)

// we can extract just the first and last name

// const profile = {
//     firstName: "John",
//     lastName: "Doe",
//     job: "Debugger",
//     isBald: false,
//     numberOfPets: 3,
// };

// // const { firstName, lastName } = profile;

// // console.log(`Full name: ${firstName} ${lastName}`);

// const { firstName: anotherVarForFirstName, lastName } = profile;

// console.log(`Full name: ${anotherVarForFirstName} ${lastName}`);
// const numbers = [1, 2, 3]

// // destructure the first and the rest of the elements
// const [firstElement, ...theRestOfTheElements] = numbers

// console.log(firstElement)
// console.log(theRestOfTheElements)

// const profile = {
//     firstName: "John",
//     lastName: "Doe",
//     job: "Debugger",
//     isBald: false,
//     numberOfPets: 3,
// };

// const { firstName, ...restOfTheProperties } = profile;

// console.log(firstName);
// // John
// console.log(restOfTheProperties);
// // { lastName: 'Doe', job: 'Debugger', isBald: false, numberOfPets: 3 }

// // we have the original array
// const firstArray = [1, 3]

// // we assign a reference (not a copy of the original to another another)
// const secondArray = firstArray

// // we update the first element in the original array
// firstArray[0] = 5

// // log the content of both arrays
// console.log({ firstArray, secondArray })

// // we actually have to copy the original and assign the value to the new array
// // or use spreading
// const thirdArray = [...firstArray]
// firstArray[1] = -1

// console.log({ firstArray, secondArray, thirdArray });


// const personal = {
//     firstName: "John",
//     lastName: "Doe",
// }

// const physical = {
//     isBald: false,
//     hasFatBelly: true
// }

// const employment = {
//     job: "Debugger",
//     salary: 257000
// }

// const emotional = {
//     isHappy: true
// }


// const profile = { ...personal, physical, employment, emotional }

// // assignment
// let a = 10;
// let b = 4;
// console.log({ a, b })

// // addition assignment
// // a += b is the same as a = a + b
// a += b
// console.log({ a, b })

// // subtraction assignment
// // a -= b is the same as a = a - b
// a -= b
// console.log({ a, b })

// // try your the rest out

// comparison operators
// let a = 10;
// let b = 4;

// // equal to
// console.log(`${a} is Equal to ${b} is, ${a == b}`)
// console.log(`${a} is Strictly Equal to is, ${b} ${a === b}`)

// // it will be in your best interest to stick to === instead of ==
// const strTwo = "2"
// const intTwo = 2

// // is "2" the same as 2???
// // the answer is yes and no
// // javascript is javascript
// // yes because the value (look) are the same... they are all 'two'
// // however, strictly speaking, they two values are of different types
// // strTwo is a string and intTwo is a number so if we are going to compare them,
// // we have to be strict


// console.log(`'${strTwo}' is Equal to ${intTwo} is, ${strTwo == intTwo}`)
// console.log(`'${strTwo}' is Strictly Equal to is, ${intTwo} ${strTwo === intTwo}`)
// // does this give you some funny ideas to check out??

// // when game starts, set the life and power to the default
// let attackPower = 0;
// let playerLife = 5;
// console.log({ playerLife, attackPower });
// // { playerLife: 5, attackPower: 0 }

// // when player picks bullet, increase attack power
// attackPower++
// console.log({ attackPower });
// // { attackPower: 1 }

// // when player gets shot, decrease life
// playerLife--
// console.log({ playerLife })
// // { playerLife: 4 }