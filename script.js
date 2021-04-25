const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'C0pp!c3H4l!f4x',
  database: 'employees_db'
});



const actionPrompt = () => {
  const questionAction = {
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: ["View something", "Update employee role", "Add something", "Quit"]
  }

  inquirer.prompt(questionAction).then((answer) => {
    switch(answer.action){
      case "View something":
        return viewSomething();
      case "Update employee role":
        return updateEmployees();
      case "Add something":
        return addSomething();
      default:
        console.log("Goodbye!");
        return connection.end();
    }
  })
}

const viewSomething = () => {
  const questionAdd = {
    type: "list",
    name: "view",
    message: "View...",
    choices: ["Employees", "Roles", "Departments", "Never mind"]
  }

  inquirer.prompt(questionAdd).then(answer => {
    switch(answer.add){
      case "Employees":
        return viewEmployees();
      case "Roles":
        return viewRoles();
      case "Departments":
        return viewDepartments();
      case "Never mind":
        return actionPrompt();
    }
  });
}

const viewEmployees = () => {
  
}

/* const filterView = () => {
  const questionFilter = {
    type: "list",
    name: "viewFilter",
    message: "View all, or filter by department/role?",
    choices: ["View all", "Filter by department", "Filter by role"]
  }
  inquirer.prompt(questionFilter).then((answer) => {
    switch(answer.viewFilter){
      case "View all":
        return 
    }
  })
} */

// Asks user what to add, sends them to their answer's corresponding set of questions
const addSomething = () => {
  const questionAdd = {
    type: "list",
    name: "add",
    message: "Add...",
    choices: ["Employee", "Role", "Department", "Never mind"]
  }

  inquirer.prompt(questionAdd).then(answer => {
    switch(answer.add){
      case "Employee":
        return addEmployee();
      case "Role":
        return addRole();
      case "Department":
        return addDepartment();
      case "Never mind":
        return actionPrompt();
    }
  });
}

const addEmployee = () => {

}

const addRole = () => {
  const questionAddRole = {

  }
}

// Allows user to add a new department
const addDepartment = () => {
  const questionAddDept = {
    type: "input",
    name: "dept",
    message: "Enter new department name:"
  }
  inquirer.prompt(questionAddDept).then(answer => {
    connection.query("INSERT INTO department SET ?",
    {name: answer.dept},
    (err) => {
      if(err) console.log(err);
      console.log("Department successfully added!");
      actionPrompt();
    })
  })
}

const startProgram = () => {
  actionPrompt();
  
}

connection.connect((err) => {
  if (err) throw err;

  startProgram();
})
