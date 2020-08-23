

USE employees;

INSERT INTO department
    (name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("HR"),
    ("IT");

INSERT INTO role
    (title, salary, department__id)
VALUES
    ("Salesperson", 100000, 1),
    ("Mechanical Engineer", 120000, 2),
    ("Software Engineer", 150000, 2),
    ("Junior Engineer", 85000, 2),
    ("HR Person", 80000, 3),
    ("IT Person", 70000, 4);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id);
VALUES
    ("Erin", "Platvoet", 1, 101)
    ("Manoli", "IDK", 2, 102),
    ("Hojin", "M", 2, NULL),
    ("Thomas", "Chalanee", 2, NULL),
    ("Kyle", "Andie", 3, 103),
    ("Ed", "Gibbons", 4, 104);
