USE employees_db;

INSERT INTO department(name) VALUES("sales");
INSERT INTO department(name) VALUES("human resources");
INSERT INTO department(name) VALUES("accounting");
INSERT INTO department(name) VALUES("engineering");

INSERT INTO role(title, salary, department_id) VALUES("Head of Sales", 87580.00, 1);
INSERT INTO role(title, salary, department_id) VALUES("Sr. Salesperson", 73580.00, 1);
INSERT INTO role(title, salary, department_id) VALUES("Jr. Salesperson", 51900.40, 1);
INSERT INTO role(title, salary, department_id) VALUES("HR Representative", 50290.00, 2);
INSERT INTO role(title, salary, department_id) VALUES("Head of Accounting", 80550.90, 3);
INSERT INTO role(title, salary, department_id) VALUES("Accountant", 66060.00, 3);
INSERT INTO role(title, salary, department_id) VALUES("Head of Engineering", 115800.00, 4);
INSERT INTO role(title, salary, department_id) VALUES("Sr. Engineer", 103900.00, 4);
INSERT INTO role(title, salary, department_id) VALUES("Jr. Engineer", 84300.00, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Chi", "Yoshida", 1, NULL);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Sofia", "Wallace" , 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Samson", "Bell" , 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Branden", "Carr" , 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Livia", "Horn" , 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Santos", "Ramirez" , 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Ronny", "Elliston" , 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Marcia", "Carter" , 4, NULL);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Phillip", "Close" , 4, NULL);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Monique", "Caro", 5, NULL);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Derick", "Banner", 6, 5);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Byron", "Clark", 7, NULL);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Reese", "Wray", 8, 7);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Tamika", "Lindsey", 8, 7);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Graham", "Southgate", 8, 7);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Patricia", "Fulton", 9, 7);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Julia", "Alvarado", 9, 7);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("Keith", "Foss", 9, 7);