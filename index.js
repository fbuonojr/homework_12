var inquirer = require("inquirer");
var mysql = require("mysql");
var dotenv = require("dotenv")
dotenv.config();
const { title, allowedNodeEnvironmentFlags } = require("process");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "employees"
});

var optionsList = [
    {
        type: "list",
        choices: [
            "View all employees",
            "View all departments",
            "View all roles",
            "Add an employee",
            "Add a department",
            "Add a role",
            "Update employee role",
            "Quit"
        ],
        name: "choice",
        message: "What would you like to do?"
    }
];

connection.connect(function (err) {
    if (err) throw err;
    console.log("------------------------------");
    console.log("-----------Employee-----------");
    console.log("-----------Tracking-----------");
    console.log("----------Application---------");
    console.log("------------------------------");

    init();
})

function init() {
    inquirer.prompt(optionsList).then(function (response) {
        switch (response.choice) {
            case "View all employees":
                showEmployees();
                break;
            case "View all departments":
                showDepartments();
                break;
            case "View all roles":
                showRoles();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Update employee role":
                updateRole();
                break;
            case "Quit":
                break;
        }
    });
}

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

function showDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        res.forEach(obj => {
            console.log(obj.name);
        });
    });
}

function showRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        res.forEach(obj => {
            console.log("Title: ", obj.title, " Salary: ", obj.salary);
        })
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            name: "fAdd",
            type: "input",
            message: "Enter employee first name" 
        },
        {
            name: "lAdd",
            type: "input",
            message: "Enter employee last name"
        },
        {
            name: "rAdd",
            type: "input",
            message: "Enter role id"
        }
    ]).then(function(answer) {
        var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
        connection.query(query, [answer.fAdd, answer.lAdd, answer.rAdd, null], showEmployees);
    })
}

function addDepartment() {
    inquirer.prompt({
        name: "departmentAdd",
        type: "input",
        message: "Enter name of department to be added"
    }).then(function (answer) {
        var query = "INSERT INTO department (name) VALUES (?)";
        connection.query(query, answer.departmentAdd, showDepartments);
    });
}

function addRole() {
    inquirer.prompt([
        {
            name: "tAdd",
            type: "input",
            message: "Enter role title"
        },
        {
            name: "sAdd",
            type: "input",
            message: "Enter salary"
        },
        {
            name: "idAdd",
            type: "input",
            message: "Enter department ID"
        }
    ]).then(function(answer){
        var intS = parseInt(answer.sAdd);
        var intId = parseInt(answer.idAdd);
        var query = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
        connection.query(query, [answer.tAdd, intS, intId], showRoles);
    })
}

function updateRole() {
    var idArr = [];
    var roleArr = [];
    var roleIDArr = [];
    var roleQuery = "SELECT * FROM role";
    connection.query(roleQuery, function (err, res) {
        res.forEach(obj => {
            roleArr.push(obj.title);
            roleIDArr.push(obj.id);
        })
    })
    var idQuery = "SELECT * FROM employee";
    connection.query(idQuery, function (err, res) {
        res.forEach(obj => {
            console.log("id: ", obj.id, " name: ", obj.first_name, " ", obj.last_name);
            idArr.push(obj.id);
        });

        inquirer.prompt([
            {
                name: "employeeId",
                type: "list",
                choices: idArr,
                message: "Select ID of employee you want to change role for"
            },
            {
                name: "newRole",
                type: "list",
                choices: roleArr,
                message: "Select new role for employee"
            }
        ]).then(function (answer) {
            var changeID = roleIDArr[roleArr.indexOf(answer.newRole)];
            var query = "UPDATE employee SET role_id = ? WHERE ?";
            connection.query(query, [changeID, { id: answer.employeeId }], function (err, res) {
                if (err) throw err;
            });
        });
    });
}