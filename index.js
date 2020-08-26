var inquirer = require("inquirer");
var mysql = require("mysql");
const { title } = require("process");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Verr2171#",
    database: "employees"
});

var optionsList = [
    {
        type: "list",
        choices: [
            "View all employees",
            "View employees by department",
            "View employees by Manager",
            "Add an employee",
            "Add a department",
            "Add a role",
            "Update employee role"
        ],
        name: "choice",
        message: "Which kind of employee are you?"
    }
];

connection.connect(function (err) {
    if (err) throw err;
    inquirer.prompt(optionsList).then(function (response) {
        switch (response.choice) {
            case "View all employees":
                showEmployees();
                break;
            case "Add a department":
                addDepartments();
                break;
            case "Update employee role":
                updateRole();
                break;
        }
    });
})

function showEmployees() {
    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        res.forEach(obj => {
            var roleQuery = "SELECT title, salary FROM role WHERE ?";
            connection.query(roleQuery, { id: obj.role_id }, function (err, res2) {
                console.log("id: ", obj.id, " name: ", obj.first_name, " ", obj.last_name, " role: ", res2[0].title, " salary: ", res2[0].salary, " manager id: ", obj.manager_id);
            });
        });
    })
}

function addDepartments(){
    inquirer.prompt({
        name: "departmentAdd",
        type: "input",
        message: "Enter name of department to be added"
    }).then(function(answer){
        var query = "INSERT INTO department (name) VALUES (?)";
        connection.query(query, answer.departmentAdd, function(err, res){ if(err) throw err; });
        var display = "SELECT * FROM department";
        connection.query(display, function(err, res){
            res.forEach(obj => {
                console.log(obj.name);
            })
        })
    });
}

function updateRole(){
    showEmployees();
    var idArr = [];
    var idQuery = "SELECT id FROM employee";
    connection.query(idQuery, function(err, res){
        res.forEach(obj => {
            idArr.push(obj.id);
        });
    });
    inquirer.prompt({
        name: "employeeId",
        type: "list",
        choices: 
    })
}