// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const pw = require("./pw");
const chalk = require("chalk");

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
      switch (initChoice) {
        case "View Employees":
          viewEmployees();
          break;
        case "View Departments":
          viewDepartments();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
        case "Delete Role":
          deleteRole();
          break;
        case "Delete Department":
          deleteDepartment();
          break;
        case "Exit":
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
        function manager() {
          if (employeeRole.includes("Manager")) {
            return roleID;
          } else {
            return null;
          }
        }
        result.map((existingRole) => {
          if (existingRole.title === employeeRole) {
            roleID = existingRole.id;
            connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name: firstName,
                last_name: lastName,
                role_id: roleID,
                manager_key: manager(),
              },
              console.log("Your employee was created successfully.")
            );
            viewEmployees();
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
      viewDepartments();
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
        {
          name: "managerKey",
          type: "list",
          message: "Is this role a management position?",
          choices: ["Yes", "No"],
        },
      ])
      .then(({ roleTitle, roleSalary, roleDept, managerKey }) => {
        let deptID;
        function manager() {
          if (managerKey === "Yes") {
            return deptID;
          } else {
            return null;
          }
        }
        result.map((existingDept) => {
          if (existingDept.department_name === roleDept) {
            deptID = existingDept.id;
            connection.query(
              "INSERT INTO role SET ?",
              {
                title: roleTitle,
                salary: roleSalary,
                department_id: deptID,
                manager_key: manager(),
              },
              console.log(
                `You successfully added a new job title: ${roleTitle}, with a salary of ${roleSalary}`
              )
            );
          }
        });
        viewRoles();
      });
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, result) {
    if (err) throw err;
    console.log(
      chalk.blue("There are: " + result.length + " total employees.")
    );
    console.table(result);
    initPrompts();
  });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, result) {
    if (err) throw err;
    console.log(
      chalk.blue("There are: " + result.length + " total departments.")
    );
    console.table(result);
    initPrompts();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM role", function (err, result) {
    if (err) throw err;
    console.log(
      chalk.blue("There are: " + result.length + " total employee roles.")
    );
    console.table(result);
    initPrompts();
  });
}

function deleteEmployee() {
  connection.query("SELECT id, first_name, last_name FROM employee", function (
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
            `${employeeName.id} ${employeeName.first_name} ${employeeName.last_name}`
        ),
      })
      .then(({ employeeName }) => {
        employeeName = employeeName.replace(/\D/g, "");
        console.log(employeeName);
        connection.query(
          "DELETE FROM employee WHERE ?",
          {
            id: employeeName,
          },
          function (err, result) {
            if (err) throw err;
          }
        );
        viewEmployees();
      });
  });
}

function deleteRole() {
  connection.query("SELECT * FROM role", function (err, result) {
    if (err) throw err;
    inquirer
      .prompt({
        name: "roleChosen",
        type: "list",
        message: "Which role would you like to delete?",
        choices: result.map((role) => role.title),
      })
      .then(({ roleChosen }) => {
        connection.query("DELETE FROM role WHERE ?", {
          title: roleChosen,
        });
        viewRoles();
        initPrompts();
      });
  });
}

function deleteDepartment() {
  connection.query("SELECT * FROM department", function (err, result) {
    if (err) throw err;
    inquirer
      .prompt({
        name: "departmentChosen",
        type: "list",
        message: "Which department would you like to delete?",
        choices: result.map((department) => department.department_name),
      })
      .then(({ departmentChosen }) => {
        connection.query("DELETE FROM department WHERE ?", {
          department_name: departmentChosen,
        });
        viewDepartments();
        initPrompts();
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
        choices: result.map((employeeRole) => `${employeeRole.id}`),
      },
    ]);
  });
}

function exit() {
  connection.end();
}
