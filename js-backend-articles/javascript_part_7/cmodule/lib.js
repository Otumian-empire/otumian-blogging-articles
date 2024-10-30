// function add(x, y) {
//     // return the sum of x and y
//     return x + y;
// }

// function sub(x, y) {
//     // return the difference of x and y
//     return x - y;
// }

/// module.exports = sub; /// we can not have multiple module.exports
// module.exports = add // just exports add
// module.exports = { add, sub }

exports.add = function (x, y) {
    // return the sum of x and y
    return x + y;
}

exports.sub = function (x, y) {
    // return the difference of x and y
    return x - y;
}
