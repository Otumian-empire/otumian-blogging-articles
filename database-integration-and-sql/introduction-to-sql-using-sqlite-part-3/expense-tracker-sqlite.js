const { DatabaseSync } = require("node:sqlite");

const database = new DatabaseSync("expense-tracker.sqlite");

// database.exec(`
//   CREATE TABLE IF NOT EXISTS expenses (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     amount INTEGER NOT NULL,
//     date TEXT
//   );
// `);

// database.exec(
//     `INSERT INTO 
//         expenses (name, amount, date) 
//     VALUES 
//         ('Lenovo ThinkPad', 1040.39, '2025-12-24'),
//         ('Ergonomic Office Chair', 139.55, '2026-01-05'),
//         ('Samsung 27" Essential S3', 140.06, '2026-01-15'),
//         ('Samsung 27" Essential S3', 139.06, '2026-01-20'),
//         ('Portable External Hard Drive', 60.00, '2026-02-01'),
//         ('Logitech M185 Wireless Mouse', 13.00, '2026-02-01'),
//         ('Logitech H390 Wired Headset', 20.91, '2026-02-01'),
//         ('Dual Monitor Stand', 47.82, '2026-03-11');
//     `
// )

// const prepareInsertSql = database.prepare("INSERT INTO expenses (name, amount, date) VALUES (?, ?, ?)")

// const insertChanges = prepareInsertSql.run("USB C Cable", 9.91, "2026-02-10")

// if (insertChanges.changes > 0) {
//     console.log("Expense recorded successfully - ref: ", insertChanges.lastInsertRowid)
// }



// const prepareSelectSql = database.prepare("SELECT * FROM expenses WHERE amount > ?")

// const rowsWithAmountAboveHundred = prepareSelectSql.all(100)

// console.log(rowsWithAmountAboveHundred)


// const prepareSelectSql = database.prepare("SELECT * FROM expenses WHERE amount > ?")

// const rowWithAmountAboveHundred = prepareSelectSql.get(100)

// console.log(rowWithAmountAboveHundred)


