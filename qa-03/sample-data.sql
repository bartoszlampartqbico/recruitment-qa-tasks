-- Schema and seed data for QA-03 SQL exercise
-- The dataset mirrors the example shown in qa-03/assets/schema.svg

DROP TABLE IF EXISTS timesheets;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name NVARCHAR(100) NOT NULL
);

CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  first_name NVARCHAR(100) NOT NULL,
  last_name NVARCHAR(100) NOT NULL,
  department_id INTEGER NOT NULL,
  salary INTEGER NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE timesheets (
  id INTEGER PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  project_name NVARCHAR(120) NOT NULL,
  hours INTEGER NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);

INSERT INTO departments (id, name) VALUES
  (1, 'Sprzedaż'),
  (2, 'Inżynieria'),
  (3, 'Operacje');

INSERT INTO employees (id, first_name, last_name, department_id, salary) VALUES
  (1, 'Anna', 'Nowak', 1, 7200),
  (2, 'Marek', 'Kowalski', 1, 6800),
  (3, 'Zofia', 'Mazur', 2, 9800),
  (4, 'Piotr', 'Lis', 2, 9100),
  (5, 'Karolina', 'Sikora', 2, 8400),
  (6, 'Tomasz', 'Wróbel', 3, 6300),
  (7, 'Ewa', 'Pawlak', 3, 6100);

INSERT INTO timesheets (id, employee_id, project_name, hours) VALUES
  (1, 1, 'CRM 2.0', 35),
  (2, 1, 'CRM 2.0', 12),
  (3, 2, 'CRM 2.0', 28),
  (4, 3, 'Silnik rekomendacji', 42),
  (5, 3, 'Aplikacja mobilna', 18),
  (6, 4, 'Silnik rekomendacji', 44),
  (7, 4, 'Billing', 16),
  (8, 5, 'Aplikacja mobilna', 41),
  (9, 6, 'Optymalizacja dostaw', 23),
  (10, 6, 'System magazynowy', 27),
  (11, 7, 'Optymalizacja dostaw', 26),
  (12, 7, 'System magazynowy', 19);

