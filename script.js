const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'C0pp!c3H4l!f4x',
  database: 'employees_db'
});

const questionAction = {
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: ["View employees", "Update employees", "Add employees"]
  }

const actionPrompt = () => {
  inquirer.prompt(questionAction).then((answer) => {
    switch(answer.action){
      case "View employees":
        return viewEmployees();
      case "Update employees":
        return updateEmployees();
      case "Add employees":
        return addEmployees();
      default: return;
    }
  })
}