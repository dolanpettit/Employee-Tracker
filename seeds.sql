-- Inserting department values
INSERT INTO department (department_name) VALUES ('Sales');
INSERT INTO department (department_name) VALUES ('Engineering');
INSERT INTO department (department_name) VALUES ('Finance');
INSERT INTO department (department_name) VALUES ('Legal');

-- Inserting role values
INSERT INTO role (title, salary, department_id) VALUES ('Junior Sales Associate', 42000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Senior Sales Associate', 85000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Sales Manager', 62500.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Junior Software Engineer', 62000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Senior Software Engineer', 94000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Engineering Manager', 82000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Junior Financial Analyst', 54000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Senior Financial Analyst', 87500.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Finance Manager', 75000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Junior Legal Analyst', 60000.00, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Senior Legal Analyst', 91000.00, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Legal Manager', 78500.00, 4);

-- Inserting employee values
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Jim', 'Dodson', 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Casey', 'Smith', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Hannah', 'Porter', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Chris', 'Dunn', 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Ashley', 'Jacobs', 5);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Dimitri', 'Diroseau', 6);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Abigail', 'Harris', 7);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Scott', 'Mitchell', 8);





