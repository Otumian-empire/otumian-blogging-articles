# Introduction to SQL using SQLite: Node SQLite

## Objective

- Node SQLite APIs
- CRUD with Node SQLite

## Introduction

In [Introduction to SQL using SQLite: Data Manipulation][nodejs-sqlite], we discussed creating, reading, updating and deleting records from a SQLite database using SQL. In this session, we will be doing the data manipulation with `node:sqlite`, which is a native (built-in) module for SQLite.

## node:sqlite APIs

To use the sqlite module, you would have to import it as:

```js
const { DatabaseSync } = require("node:sqlite");
```

`const { DatabaseSync } = require('sqlite');` will throw an error, `Error: Cannot find module 'sqlite'`

### Connect database

Using `DatabaseSync`, we can connect to an existing database or create a new one.

```js
const database = new DatabaseSync("<DATABASE NAME>");
```

### exec

The database object's `exec` method executes one or more SQL statements without returning results. It's useful for running SQL statements from a file.

```js
database.exec(sql);
```

This is usually useful when creating and inserting at the same time.

```js
database.exec(`
  CREATE TABLE IF NOT EXISTS TABLE_NAME (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    ...
  );

  INSERT INTO TABLE_NAME (name, category, quantity) 
    VALUES 
    ('Bam', ...),
    ('Cain', ...),
    ('Dan', ...);
`);
```

### prepare

Now, to manipulate data, we can use the `prepare` method. This brings us to the point where we discuss prepared statements. Prepared statements are a way to pass data to the SQL safely for execution.

Instead of

```sql
INSERT INTO TABLE_NAME (name, ...)  VALUES ('Bam', ...);
```

We can pass place holders for the values.

```sql
INSERT INTO TABLE_NAME (name, ...)  VALUES (?, ...);
```

The `prepare` method returns a prepared statement object, `StatementSync`

### run

For queries such as `INSERT`, `UPDATE` and `DELETE`, for there to be a change, a row or a number of rows would be affected. For this `run` returns an object of `StatementResultingChanges`

```js
{
    "lastInsertRowid": number,
    "changes": number
}
```

In the case of `INSERT`, the last inserted record's ID is returned and the number of rows that were affected by the query. If there are changes, then some rows were affected, and that is one way that you'd verify if the query was successful or not.

```js
const preparedInsertSQL = database.prepare(
    "INSERT INTO TABLE_NAME (name, ...) VALUES (?, ...)",
);

const response = preparedInsertSQL.run("Fushiguro", ...)

console.log(
    JSON.stringify(response, null, 4),
);

```

The order of the place holders of the prepared statement matters. It dictates the order of the values passed.

```js
// Delete with prepared statement
const preparedDeleteSQL = database.prepare(
    "DELETE FROM TABLE_NAME WHERE id = ?",
);

const response = preparedDeleteSQL.run(4);

console.log(JSON.stringify(response, null, 4));

// Update with prepared statement
const preparedInsertSQL = database.prepare(
    "UPDATE TABLE_NAME set name = ? WHERE id = ?",
);

console.log(JSON.stringify(preparedInsertSQL.run("Panda", 1), null, 4));
```

### all & get

For `SELECT` statements, we can use the `all` or `get` method on the `StatementSync` object. The `all` method returns an array of objects parsed from the result of the query. `get` returns one object. If you are expecting a list, then use `all`. If you want the one object from the response, then use `get`. `get` is like `all` indexed `0`.

```js
const preparedSelectAllSQL = database.prepare("SELECT * FROM TABLE_NAME");
const rows = preparedSelectAllSQL.all();
// returns an array

const preparedSelectOneSQL = database.prepare(
    "SELECT * FROM TABLE_NAME WHERE id = ?",
);
const rows = preparedSelectAllSQL.get(1);
// returns an object
```

## CRUD with Node SQLite

> First of all, for one to execute a program running with the built-in SQLite, we use the experimental flag, `node --experimental-sqlite FILE-PATH`

Let's create a program for tracking expenses. We have done a similar mini-project before. Check out, Expense tracker project [0][expense-tracker-0] [1][expense-tracker-1] [2][expense-tracker-2] [3][expense-tracker-3].

**Connect Database**

Let's create a database for this project called `expense-tracker.sqlite`.

```js
const { DatabaseSync } = require("node:sqlite");

const database = new DatabaseSync("expense-tracker.sqlite");
```

**Create Table**

This table will consist of an ID, the name of the expense, the amount and the date of expenditure.

```js
database.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    amount INTEGER NOT NULL,
    date TEXT
  );
`);
```

**Insert**

We can insert with `exec`

```js
database.exec(
    `INSERT INTO 
        expenses (name, amount, date) 
    VALUES 
        ('Lenovo ThinkPad', 1040.39, '2025-12-24'),
        ('Ergonomic Office Chair', 139.55, '2026-01-05'),
        ('Samsung 27" Essential S3', 140.06, '2026-01-15'),
        ('Samsung 27" Essential S3', 139.06, '2026-01-20'),
        ('Portable External Hard Drive', 60.00, '2026-02-01'),
        ('Logitech M185 Wireless Mouse', 13.00, '2026-02-01'),
        ('Logitech H390 Wired Headset', 20.91, '2026-02-01'),
        ('Dual Monitor Stand', 47.82, '2026-03-11');
    `,
);
```

We can also insert using a `prepare`

```js
const prepareInsertSql = database.prepare(
    "INSERT INTO expenses (name, amount, date) VALUES (?, ?, ?)",
);

const insertChanges = prepareInsertSql.run("USB C Cable", 9.91, "2026-02-10");

if (insertChanges.changes > 0) {
    console.log(
        "Expense recorded successfully - ref: ",
        insertChanges.lastInsertRowid,
    );
}

// Expense recorded successfully - ref:  9
```

**Read**

Let's select records with `amount` above 100.

```js
const prepareSelectSql = database.prepare(
    "SELECT * FROM expenses WHERE amount > ?",
);

const rowsWithAmountAboveHundred = prepareSelectSql.all(100);

console.log(rowsWithAmountAboveHundred);
/* 
[
  [Object: null prototype] {
    id: 1,
    name: 'Lenovo ThinkPad',
    amount: 1040.39,
    date: '2025-12-24'
  },
  [Object: null prototype] {
    id: 2,
    name: 'Ergonomic Office Chair',
    amount: 139.55,
    date: '2026-01-05'
  },
  [Object: null prototype] {
    id: 3,
    name: 'Samsung 27" Essential S3',
    amount: 140.06,
    date: '2026-01-15'
  },
  [Object: null prototype] {
    id: 4,
    name: 'Samsung 27" Essential S3',
    amount: 139.06,
    date: '2026-01-20'
  }
]
*/
```

From this, we can select one.

```js
const rowWithAmountAboveHundred = prepareSelectSql.get(100);

console.log(rowWithAmountAboveHundred);

/* 
[Object: null prototype] {
  id: 1,
  name: 'Lenovo ThinkPad',
  amount: 1040.39,
  date: '2025-12-24'
} 
*/
```

**Update**

Try this. Make a price adjustment of `5%` on items bought on '2026-02-01'.

**Delete**

It has been over 3 months yet, so let's return the `'Lenovo ThinkPad'` and buy `'Apple 2025 MacBook Pro Laptop with M5 chip'` at `1363.43 today's date is `'2026-02-10'`.

## Conclusion

With `node:sqlite`, we can integrate SQLite; however, there are limitations to SQLite itself. For learning purposes and cases like this, it's alright to use SQLite. In fact, the limitations of SQLite become obvious when there are multiple writes at the same time. Again, the knowledge from using SQLite can be transferred to another relational database like MySQL and PostgreSQL.

Try these:

- What happens when you use `run` for a select statement?
- Add a script to find the max and min items
- Add a script to compute the total of all items
- Integration of this into an express application - preferably the [expense tracker API][expense-tracker-3]

In the next section, we will be doing that. Get the experience by doing it yourself.

## Resources

- [Introduction to SQL using SQLite: Data Manipulation][previous-article]
- [nodejs-sqlite]
- [Basic CRUD API with express][expense-tracker-0]
- [Validation, Authentication and Authorization][expense-tracker-1]
- [Validation, Authentication and Authorization with Libraries][expense-tracker-2]
- [Error handling and Middlewares][expense-tracker-3]

#

[previous-article]: https://dev.to/otumianempire/introduction-to-sql-using-sqlite-data-manipulation-1g1f
[nodejs-sqlite]: https://nodejs.org/api/sqlite.html
[expense-tracker-0]: https://dev.to/otumianempire/basic-crud-api-with-express-2eoc
[expense-tracker-1]: https://dev.to/otumianempire/validation-authentication-and-authorization-5cag
[expense-tracker-2]: https://dev.to/otumianempire/validation-authentication-and-authorization-with-libraries-ip3
[expense-tracker-3]: https://dev.to/otumianempire/error-handling-and-middlewares-345p
