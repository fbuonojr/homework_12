var inquirer = require("inquirer");
var mysql = require("mysql");

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
            "Add a role"
        ],
        name: "choice",
        message: "Which kind of employee are you?"
    }
];

connection.connect(function (err) {
    if (err) throw err;
    inquirer.prompt(optionsList).then(function(response){
        switch(response.choice){
            case "View all employees":
                showEmployees();
            break;
        }
    });
})

function showEmployees(){
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, res){
        res.forEach(obj => {
            var roleQuery = "SELECT title FROM role WHERE ?";
            connection.query(roleQuery, { id: obj.role_id }, )
            console.log("id: ", obj.id, " first name: ", obj.first_name, " last name: ", obj.last_name, " role id: ", obj.role_id, " manager id: ", obj.manager_id);
        });
    })
}