// Native SQLite in Node.js

const { DatabaseSync } = require('node:sqlite');


// inventory
// categories, weapons, potions

// Or create a file-based database
const database = new DatabaseSync('expense-tracker.sqlite');

// Create a table using exec()
// database.exec(`
//   CREATE TABLE IF NOT EXISTS inventory (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     category TEXT NOT NULL,
//     quantity INTEGER DEFAULT 0
//   );

//   INSERT INTO inventory (name, category, quantity) VALUES ('dan', 'dandadan', 4);
// `);

// // Insert data using a prepared statement
// const preparedInsertSQL = database.prepare('INSERT INTO inventory (name, category, quantity) VALUES (?, ?, ?)');
// console.log(JSON.stringify(preparedInsertSQL.run("Bakker", "rice", 4), null, 4))

// const preparedInsertSQL = database.prepare('DELETE FROM inventory WHERE id = ?');
// console.log(JSON.stringify(preparedInsertSQL.run(4), null, 4))

// const preparedInsertSQL = database.prepare('UPDATE inventory set name = ? WHERE id = ?');
// console.log(JSON.stringify(preparedInsertSQL.run("Panda", 1), null, 4))

// // Execute the prepared statement with run()
// preparedInsertSQL.run('Health potion', "potion", 10);
// preparedInsertSQL.run('Poison', "potion", 3);
// preparedInsertSQL.run('Speed potion', "potion", 8);
// preparedInsertSQL.run('Slime potion', "potion", 14);


// preparedInsertSQL.run('Rocks', "weapon", 40);
// preparedInsertSQL.run('Iron Sword', 'weapon', 1);
// preparedInsertSQL.run('Spear', 'weapon', 33);
// preparedInsertSQL.run('Rope', "potion", 8);

// Query data with a prepared statement
// const preparedSelectSQL = database.prepare('SELECT id FROM inventory');
// const preparedSelectSQL = database.prepare('SELECT * FROM inventory where id = ?');

// const rows = preparedSelectSQL.run();
// const rows = preparedSelectSQL.get(1);

// console.log(JSON.stringify(rows, null, 4));