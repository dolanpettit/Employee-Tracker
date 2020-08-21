// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const pw = require("./pw");

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
  if (err) throw err;
  // Logs CPU thread to console
  console.log(`\n \n Connected on thread: ${connection.threadId}`);
  initPrompts();
});

function initPrompts() {
  inquirer
    .prompt({
      name: "initChoice",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Employees",
        "View Departments",
        "View Roles",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Delete Employee",
        "Delete Role",
        "Delete Department",
        "Update Employee Role",
        "Exit",
      ],
    })
    .then(({ initChoice }) => {
      console.log(initChoice);
      switch (initChoice) {
        case "View Employees":
          console.log("View employees");
          viewEmployees();
          break;
        case "View Departments":
          console.log("View department");
          viewDepartments();
          break;
        case "View Roles":
          console.log("View roles");
          viewRoles();
          break;
        case "Add Employee":
          console.log("Add employee");
          addEmployee();
          break;
        case "Add Department":
          console.log("Add department");
          addDepartment();
          break;
        case "Add Role":
          console.log("Add role");
          addRole();
          break;
        case "Update Employee Role":
          console.log("Update Employee Role");
          updateEmployeeRole();
          break;
        case "Delete Employee":
          console.log("Delete Employee");
          deleteEmployee();
          break;
        case "Delete Role":
          console.log("Delete Role");
          deleteRole();
          break;
        case "Delete Department":
          console.log("Delete Department");
          deleteDepartment();
          break;
        case "Exit":
          console.log("Exit");
          exit();
          break;
      }
    });
}

function addEmployee() {
  connection.query("SELECT * FROM role", function (err, result) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "What is the employee's first name",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the employee's last name",
        },
        {
          name: "employeeRole",
          type: "list",
          message: "What is the employee's role",
          choices: result.map((role) => role.title),
        },
      ])
      .then(({ firstName, lastName, employeeRole }) => {
        let roleID;
        result.map((existingRole) => {
          if (existingRole.title === employeeRole) {
            roleID = existingRole.id;
            connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name: firstName,
                last_name: lastName,
                role_id: roleID,
              },
              console.log("Your employee was created successfully.")
            );
            connection.query("SELECT * FROM employee", function (err, result) {
              if (err) throw err;
              console.table(result);
              initPrompts();
            });
          }
        });
      });
  });
}

function addDepartment() {
  inquirer
    .prompt({
      name: "addDepartment",
      type: "input",
      message: "What department would you like to add",
    })
    .then(({ addDepartment }) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          department_name: addDepartment,
        },
        console.log(
          `\n You successfully added a new department: ${addDepartment}`
        )
      );
      connection.query("SELECT * FROM department", function (err, result) {
        if (err) throw err;
        console.table(result);
        initPrompts();
      });
    });
}

function addRole() {
  connection.query("SELECT * FROM department", function (err, result) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "roleTitle",
          type: "input",
          message: "What is the job title you would like to add?",
        },
        {
          name: "roleSalary",
          type: "input",
          message: "What is the salary of the job you are adding?",
          validate: function (salary) {
            if (isNaN(salary) === false) {
              return true;
            }
            return "Please enter a valid number";
          },
        },
        {
          name: "roleDept",
          type: "list",
          message:
            "What is the department of the position you would like to add?",
          choices: result.map((department) => department.department_name),
        },
      ])
      .then(({ roleTitle, roleSalary, roleDept }) => {
        let deptID;
        result.map((existingDept) => {
          if (existingDept.department_name === roleDept) {
            deptID = existingDept.id;
            connection.query(
              "INSERT INTO role SET ?",
              {
                title: roleTitle,
                salary: roleSalary,
                department_id: deptID,
              },
              console.log(
                `You successfully added a new job title: ${roleTitle}, with a salary of ${roleSalary}`
              )
            );
          }
        });
        connection.query("SELECT * FROM role", function (err, result) {
          if (err) throw err;
          console.table(result);
          initPrompts();
        });
      });
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, result) {
    if (err) throw err;
    console.log("There are: " + result.length + " total employees.");
    console.table(result);
    initPrompts();
  });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, result) {
    if (err) throw err;
    console.table(result);
    initPrompts();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM role", function (err, result) {
    if (err) throw err;
    console.table(result);
    initPrompts();
  });
}

// TODO: Ccomplete this function
function deleteEmployee() {
  connection.query("SELECT first_name, last_name FROM employee", function (
    err,
    result
  ) {
    if (err) throw err;
    inquirer
      .prompt({
        name: "employeeName",
        type: "list",
        message: "Who is the employee you would like to delete?",
        choices: result.map(
          (employeeName) =>
            `${employeeName.first_name} ${employeeName.last_name}`
        ),
      })
      .then(({ employeeName }) => {
        connection.query(
          "DELETE FROM employee WHERE ?",
          {
            firstName: employeeName.role,
          },
          function (err, result) {
            if (err) throw err;
          }
        );
        viewEmployees();
      });
  });
}

// TODO: Complete this function 
function updateEmployeeRole() {
  connection.query("SELECT id, first_name, last_name FROM employee", function (
    err,
    result
  ) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "employeeName",
        type: "list",
        message: "Who is the employee you would like to update?",
        choices: result.map(
          (employeeName) =>
            `${employeeName.first_name} ${employeeName.last_name}`
        ),
      },
      {
        name: "employeeRole",
        type: "list",
        message: "What is the employee's role?",
        choices: result.map((employeeRole) => employeeRole.id),
      },
    ]);
  });
}
