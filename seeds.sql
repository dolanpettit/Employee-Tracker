-- Inserting department values
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Finance');
INSERT INTO department (name) VALUES ('Legal');

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
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Jim Dodson');
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Casey Smith');
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Hannah Porter');
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Chris Dunn');
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Ashley Jacobs');
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Dimitri Diroseau');
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Abigail Harris');
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Scott Mitchell');





