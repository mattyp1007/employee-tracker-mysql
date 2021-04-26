const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'C0pp!c3H4l!f4x',
  database: 'employees_db'
});

const viewQuery = `
  SELECT employee.id, first_name, last_name, department.name, role.title, manager_id
  FROM employee
  JOIN role
    ON role.id = role_id
  JOIN department
    ON department.id = department_id`;

const actionPrompt = () => {
  const questionAction = {
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: ["View employee data", "Add employee data", "Update employee role",  "Quit"]
  }

  inquirer.prompt(questionAction).then((answer) => {
    switch(answer.action){
      case "View employee data":
        return viewData();
      case "Update employee role":
        return updateEmployees();
      case "Add employee data":
        return addData();
      default:
        console.log("Goodbye!");
        return connection.end();
    }
  })
}

const viewData = () => {
  const questionAdd = {
    type: "list",
    name: "view",
    message: "View...",
    choices: ["Employees", "Roles", "Departments", "Never mind"]
  }

  inquirer.prompt(questionAdd).then(answer => {
    switch(answer.add){
      case "Employees":
        return viewEmployeesStart();
      case "Roles":
        return viewRoles();
      case "Departments":
        return viewDepartments();
      case "Never mind":
        return actionPrompt();
    }
  });
}

const viewEmployeesStart = () => {
  
  const questionFilter = {
    type: "list",
    name: "viewFilter",
    message: "View all, or filter by department/role?",
    choices: ["View all", "Filter by department", "Filter by role", "Never mind"]
  }
  inquirer.prompt(questionFilter).then((answer) => {
    switch(answer.viewFilter){
      case "View all":
        return viewEmployeesAll();
      case "Filter by department":
        return viewEmployeesByDept();
      case "Filter by role":
        return viewEmployeesByRole();
      default:
        return actionPrompt();
    }
  })
}

const viewEmployeesAll = () => {

  connection.query(viewQuery, (err, res) => {
    if (err) throw err;
    console.log("Displaying all employees:");
    console.table(res);
    actionPrompt();
  })
}

const viewEmployeesByDept = () => {

}

const viewEmployeesByRole = () => {
  
}

// Asks user what to add, sends them to their answer's corresponding set of questions
const addData = () => {
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
  const questionAddEmp = [
    {
      type: "input",
      name: "first",
      message: "Enter employee's first name:"
    },
    {
      type: "input",
      name: "last",
      message: "Enter employee's last name:"
    },
  ];
  // get the employee's first and last name
  inquirer.prompt(questionAddEmp).then(nameAnswers => {
    // then show the user the list of departments to select from
    connection.query("SELECT * FROM department", (err, res) => {
      if (err) throw err;
      console.log("Here are all the deprtments:");
      console.table(res);
      
      const questionPickDept = {
        type: "input",
        name: "dept",
        message: "Enter the ID of the department this new employee is in:"
      }
      // get the employee's department
      inquirer.prompt(questionPickDept).then(deptAnswer => {
        // then show the roles in that department
        const query1 = "SELECT id, title, salary FROM role WHERE department_id = ?";
        connection.query(query1, deptAnswer.dept, (err, res) => {
          if (err) throw err;
          console.log("Here are the roles in that department:");
          console.table(res);

          const questionPickRole = {
            type: "input",
            name: "role",
            message: "Enter the role ID for this new employee:"
          }
          // get employee's role
          inquirer.prompt(questionPickRole).then(roleAnswer => {
            const query2 = 
              `SELECT employee.id, first_name, last_name, title
              FROM employee
              JOIN role
                ON role_id = role.id
              WHERE department_id = ?`;
            // display existing employees in selected dept to pick manager ID
            connection.query(query2, deptAnswer.dept, (err, res) => {
              if (err) throw err;
              console.log("Displaying current employees in selected department:");
              console.table(res);

              const questionManager = {
                type: "input",
                name: "manager",
                message: "Enter the ID of the new employee's manager:"
              }
              // get the manager ID
              inquirer.prompt(questionManager).then(managerAnswer => {
                // insert object into employee table
                connection.query("INSERT INTO employee SET ?",
                {
                  first_name: nameAnswers.first,
                  last_name: nameAnswers.last,
                  role_id: roleAnswer.role,
                  manager_id: managerAnswer.manager
                }, (err, res) => {
                  if (err) throw err;
                  console.log("Employee successfully added!");
                  actionPrompt();
                })
              })
            })  
          })
        })
      })
    })
  })
}

const addRole = () => {
  const query1 = "SELECT * FROM department";
  connection.query(query1, (err, res) => {
    if (err) throw err;
    console.log("Displaying all departments:");
    console.table(res);

    const questionAddRole = [
      {
      type: "input",
      name: "dept",
      message: "Enter the ID of the new role's department:"
      },
      {
        type: "input",
        name: "roleName",
        message: "Enter the new role's name:"
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Enter the new role's salary:"
      }
    ];
    inquirer.prompt(questionAddRole).then(answers => {
      const query2 = "INSERT INTO role SET ?"
      connection.query(query2, 
      {
        title: answers.roleName,
        salary: answers.roleSalary,
        department_id: answers.dept
      }, 
      (err, res) => {
        if (err) throw err;
        console.log(`The role of ${answers.roleName} was successfully added!`);
        actionPrompt();
      })
    })
  })

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
      if (err) throw err;
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
