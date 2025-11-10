const seedSQL = `
  CREATE TABLE departments (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
  );

  CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    department_id INTEGER NOT NULL REFERENCES departments(id),
    salary INTEGER NOT NULL
  );

  CREATE TABLE timesheets (
    id INTEGER PRIMARY KEY,
    employee_id INTEGER NOT NULL REFERENCES employees(id),
    project_name TEXT NOT NULL,
    hours INTEGER NOT NULL
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
`;

const canonicalQueries = {
  "task-1": `
    SELECT
      e.first_name || ' ' || e.last_name AS employee,
      d.name AS department,
      e.salary
    FROM employees AS e
    INNER JOIN departments AS d ON d.id = e.department_id
    ORDER BY department ASC, e.last_name ASC;
  `,
  "task-2": `
    SELECT
      d.name AS department,
      ROUND(AVG(e.salary), 2) AS avg_salary,
      COUNT(e.id) AS employee_count
    FROM employees AS e
    INNER JOIN departments AS d ON d.id = e.department_id
    GROUP BY d.id, d.name
    HAVING COUNT(e.id) >= 2
    ORDER BY avg_salary DESC;
  `,
  "task-3": `
    SELECT
      d.name AS department,
      ts.project_name,
      SUM(ts.hours) AS total_hours
    FROM timesheets AS ts
    INNER JOIN employees AS e ON e.id = ts.employee_id
    INNER JOIN departments AS d ON d.id = e.department_id
    GROUP BY d.name, ts.project_name
    HAVING SUM(ts.hours) > 40
    ORDER BY total_hours DESC;
  `,
};

const helperSnippets = {
  "task-1": `SELECT
  e.first_name || ' ' || e.last_name AS employee,
  d.name AS department,
  e.salary
FROM employees AS e
JOIN departments AS d ON d.id = e.department_id
-- ORDER BY department ASC, e.last_name ASC;
`,
  "task-2": `SELECT
  d.name AS department,
  AVG(e.salary) AS avg_salary,
  COUNT(*) AS employee_count
FROM employees AS e
JOIN departments AS d ON d.id = e.department_id
-- GROUP BY d.id, d.name
-- HAVING COUNT(*) >= 2
-- ORDER BY avg_salary DESC;
`,
  "task-3": `SELECT
  d.name AS department,
  ts.project_name,
  SUM(ts.hours) AS total_hours
FROM timesheets AS ts
JOIN employees AS e ON e.id = ts.employee_id
JOIN departments AS d ON d.id = e.department_id
-- GROUP BY d.name, ts.project_name
-- HAVING SUM(ts.hours) > 40
-- ORDER BY total_hours DESC;
`,
};

const statusMessage = document.getElementById("status-message");
const form = document.getElementById("sql-form");
const sqlInput = document.getElementById("sql-input");
const resultContainer = document.getElementById("result-table");
const checkButton = document.getElementById("check-button");
const resetButton = document.getElementById("reset-button");
const taskSelect = document.getElementById("task-select");

let SQL;
let expectedResults = {};

init();

async function init() {
  setStatus("Ładowanie środowiska SQL…");

  try {
    SQL = await initSqlJs({
      locateFile: (file) =>
        `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`,
    });

    expectedResults = computeExpectedResults();
    setStatus("Środowisko SQL gotowe. Powodzenia!", "success");
    applySnippet(taskSelect.value, true);
  } catch (error) {
    console.error(error);
    setStatus(
      "Nie udało się zainicjować środowiska SQL. Odśwież stronę i spróbuj ponownie.",
      "error"
    );
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!SQL) {
    setStatus("Środowisko SQL jeszcze się ładuje.", "error");
    return;
  }

  const query = sqlInput.value.trim();
  if (!query) {
    setStatus("Wpisz zapytanie SQL, aby zobaczyć wynik.", "error");
    return;
  }

  try {
    const result = executeQuery(query);
    renderResult(result);

    const info =
      result.values.length === 0
        ? "Zapytanie wykonane. Brak danych do wyświetlenia."
        : `Zapytanie wykonane. Liczba wierszy: ${result.values.length}.`;
    setStatus(info, "success");
  } catch (error) {
    console.error(error);
    renderEmptyTable(
      "Nie udało się wykonać zapytania. Sprawdź poprawność składni."
    );
    setStatus(error.message, "error");
  }
});

checkButton.addEventListener("click", () => {
  if (!SQL) {
    setStatus("Środowisko SQL jeszcze się ładuje.", "error");
    return;
  }

  const query = sqlInput.value.trim();
  if (!query) {
    setStatus("Wpisz zapytanie, aby porównać wynik.", "error");
    return;
  }

  const taskId = taskSelect.value;
  const expected = expectedResults[taskId];
  if (!expected) {
    setStatus("Brak wzorcowego wyniku dla wybranego zadania.", "error");
    return;
  }

  try {
    const result = executeQuery(query);
    renderResult(result);

    const isMatch = compareWithExpected(result, expected);
    if (isMatch) {
      setStatus("Świetnie! Wynik zapytania zgadza się z oczekiwanym.", "success");
    } else {
      setStatus(
        "Wynik zapytania nie pokrywa się z wzorcem. Sprawdź aliasy, sortowanie i warunki.",
        "error"
      );
    }
  } catch (error) {
    console.error(error);
    renderEmptyTable(
      "Nie udało się wykonać zapytania. Sprawdź poprawność składni."
    );
    setStatus(error.message, "error");
  }
});

resetButton.addEventListener("click", () => {
  applySnippet(taskSelect.value, true);
  renderEmptyTable("Brak wyników. Uruchom zapytanie, aby zobaczyć dane.");
  setStatus("Wyczyszczono pole zapytania.", undefined);
});

taskSelect.addEventListener("change", (event) => {
  applySnippet(event.target.value);
  setStatus("", undefined);
});

function createDatabase() {
  const db = new SQL.Database();
  db.run(seedSQL);
  return db;
}

function executeQuery(sql) {
  const db = createDatabase();
  try {
    const resultSets = db.exec(sql);
    if (!resultSets || resultSets.length === 0) {
      return { columns: [], values: [] };
    }

    const lastResult = resultSets[resultSets.length - 1];
    return {
      columns: lastResult.columns,
      values: lastResult.values,
    };
  } finally {
    db.close();
  }
}

function computeExpectedResults() {
  const entries = Object.entries(canonicalQueries).map(([taskId, query]) => {
    try {
      const result = executeQuery(query);
      return [taskId, result];
    } catch (error) {
      console.error(`Błąd przygotowywania wzorca dla ${taskId}`, error);
      return [taskId, { columns: [], values: [] }];
    }
  });

  return Object.fromEntries(entries);
}

function renderResult(result) {
  if (!result || result.columns.length === 0) {
    renderEmptyTable("Zapytanie nie zwróciło danych.");
    return;
  }

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  result.columns.forEach((column) => {
    const th = document.createElement("th");
    th.textContent = column;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  result.values.forEach((row) => {
    const tr = document.createElement("tr");
    row.forEach((cell) => {
      const td = document.createElement("td");
      td.textContent = formatValue(cell);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  resultContainer.innerHTML = "";
  resultContainer.appendChild(table);
}

function renderEmptyTable(message) {
  resultContainer.innerHTML = "";
  const placeholder = document.createElement("div");
  placeholder.className = "table-placeholder";
  placeholder.textContent = message;
  resultContainer.appendChild(placeholder);
}

function compareWithExpected(candidate, expected) {
  const serialise = (result) => ({
    columns: result.columns.map((col) => col.trim().toLowerCase()),
    values: result.values.map((row) =>
      row.map((value) =>
        value === null
          ? null
          : typeof value === "number"
          ? Number(value.toFixed(5))
          : String(value)
      )
    ),
  });

  const normalisedCandidate = serialise(candidate);
  const normalisedExpected = serialise(expected);

  return JSON.stringify(normalisedCandidate) === JSON.stringify(normalisedExpected);
}

function applySnippet(taskId, force = false) {
  const snippet = helperSnippets[taskId];
  if (!snippet) {
    if (force) {
      sqlInput.value = "";
    }
    return;
  }

  if (force || sqlInput.value.trim() === "") {
    sqlInput.value = snippet;
  }
}

function setStatus(message = "", type) {
  statusMessage.textContent = message;
  statusMessage.classList.remove("success", "error");
  if (type) {
    statusMessage.classList.add(type);
  }
}

function formatValue(value) {
  if (value === null || value === undefined) {
    return "";
  }
  if (typeof value === "number") {
    return Number.isInteger(value) ? value : value.toFixed(2);
  }
  return String(value);
}


