// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

// Create connection to mysql db
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: pw,
  database: "employee_manager",
});

// Connecting to the db
connection.connect((err) => {
    if (err) {
        throw err
    }
    // Logs CPU thread to console
    console.log(`\n \n Connected on thread: ${connection.threadId}`);
    // initPrompts();
})