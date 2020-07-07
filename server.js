var mysql = require("mysql");
var inquirer = require("inquirer");
const consoleTable = require("console.table")




// connecting server and mySQL
const connection = mysql.createConnection({
    host: "localhost",
  
    
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "miley6545",
    database: "employees_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    beginPrompt();
  });
// starting function for propmpt
  function beginPrompt() {
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do",
        choices: [
            "View all employees",
                "View all departments",
                "View all roles",
                "Add an employee",
                "Add department",
                "Add a role",
                "EXIT"
        ]
    })
// start statements for prompt answers
.then(function (answer) {
    switch (answer.action) {
        case "View all employees":
            viewEmployees();
            break;
        case "View all departments":
            viewDepartments();
            break;
        case "View all roles":
            viewRoles();
            break;
        case "Add an employee":
            addEmployee();
            break;
        case "Add department":
            addDepartment();
            break;
        case "Add a role":
            addRole();
            break;
        case "EXIT": 
            endApp();
            break;
        default:
            break;
    }
})
}
function viewEmployees() {
    var query = "SELECT * FROM employees";
    connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(res.length + " employees found!");
    console.table('All Employees:', res); 
    beginPrompt();
    })
}

function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
    if(err)throw err;
    console.table('All Departments:', res);
    beginPrompt();
    })
}

function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res){
    if (err) throw err;
    console.table('All roles:', res);
    beginPrompt();
    })
}
