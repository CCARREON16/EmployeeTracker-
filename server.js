var mysql = require("mysql");
var inquirer = require("inquirer");
//const consoleTable = require("console.table")




// connecting server and mySQL
const connection = mysql.createConnection({
    host: "localhost",
  
    
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "rootqwer",
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
                "View all duties",
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
        case "View all duties":
            viewDuties();
            break;
        case "Add an employee":
            addEmployee();
            break;
        case "Add department":
            addDepartment();
            break;
        case "Add a duty":
            addDuty();
            break;
        case "EXIT": 
            endPrompt();
            break;
        default:

    }
})
}
function viewEmployees() {
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(res.length + " employee found!");
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

function viewDuties() {
    var query = "SELECT * FROM duty";
    connection.query(query, function(err, res){
    if (err) throw err;
    console.table('All duties:', res);
    beginPrompt();
    })
}

function addEmployee() {
    connection.query("SELECT * FROM duty", function (err, res) {
    if (err) throw err;
    
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input", 
                message: "Employee First Name: ",
            },
            {
                name: "last_name",
                type: "input", 
                message: "Employee Last Name: "
            },
            {
                name: "duty", 
                type: "list",
                choices: function() {
                var roleArray = [];
                for (let i = 0; i < res.length; i++) {
                    roleArray.push(res[i].title);
                }
                return roleArray;
                },

                message: "Employee Duty?: "
            }
            ]).then(function (answer) {
                let roleID;
                for (let j = 0; j < res.length; j++) {
                if (res[j].title == answer.role) {
                    roleID = res[j].id;
                    console.log(roleID)
                }                  
                }  
                connection.query(
                "INSERT INTO employee SET ?",
                {

                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: roleID,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee Added");
                    beginPrompt();
                }
                )
            })
    })
}

function addDepartment() {
    inquirer
    .prompt([
        {
            name: "new_dept", 
            type: "input", 
            message: "What is the new department you would like to add?"
        }
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.new_dept
            }
        );
          var query = "SELECT * FROM department";
        connection.query(query, function(err, res) {
        if(err)throw err;
        console.table('All Departments:', res);
        beginPrompt();
        })
    })
}

function addDuty() {
    connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;

    inquirer 
    .prompt([
        {
            name: "new_duty",
            type: "input", 
            message: "What is the new duty of the employee?"
        },
        {
            name: "salary",
            type: "input",
            message: "How much does this position pay?"
        },
        {
            name: "deptChoice",
            type: "rawlist",
            choices: function() {
                var deptArry = [];
                for (let i = 0; i < res.length; i++) {
                deptArry.push(res[i].name);
                }
                return deptArry;
            },
        }
    ]).then(function (answer) {
        let deptID;
        for (let j = 0; j < res.length; j++) {
            if (res[j].name == answer.deptChoice) {
                deptID = res[j].id;
            }
        }

        connection.query(
            "INSERT INTO duty SET ?",
            {
                title: answer.new_duty,
                salary: answer.salary,
                department_id: deptID
            },
            function (err, res) {
                if(err)throw err;
                console.log("Duty Added");
                beginPrompt();
            }
        )
    })
    })
    
}

function endPrompt() {
    connection.end();
}