# Zadanie QA-03 — Tworzenie zapytań SQL

## Cel zadania
Sprawdzamy, czy kandydat potrafi zaprojektować zapytania SQL wykorzystując `JOIN`, agregację (`GROUP BY`, `HAVING`) oraz sortowanie wyników. Zamiast przygotowanego środowiska, przekazujemy schemat bazy i próbkę danych w formie grafiki — kandydat powinien pracować we własnym narzędziu (np. ulubiony edytor, klient SQL, arkusz kalkulacyjny).

## Instrukcja dla kandydata
1. Otwórz stronę `qa-03/index.html`, aby zobaczyć schemat bazy danych i treść zadań.
2. Pobierz grafikę `schema.svg` (prawy przycisk myszy → Zapisz jako), aby móc z niej korzystać podczas przygotowywania zapytań.
3. Napisz zapytania SQL dla trzech opisanych przypadków:
   - Lista pracowników z przypisanymi działami oraz wynagrodzeniem, posortowana według działów i nazwisk.
   - Zestawienie średnich wynagrodzeń i liczby pracowników w działach z minimum dwoma osobami, posortowane malejąco po średnim wynagrodzeniu.
   - Projekty z łączną liczbą godzin większą niż 40, wraz z nazwą działu i sumą godzin, posortowane malejąco.
4. Gotowe zapytania zapisz w jednym pliku (np. `.txt`, `.md`, `.pdf`) i prześlij wraz z krótkim opisem sposobu weryfikacji rezultatów na adres `xyz@qbico.pl`.

## Wskazówki
- Schemat zakłada relacje:
  - `employees.department_id` → `departments.id`
  - `timesheets.employee_id` → `employees.id`
- Przykładowe dane z obrazka można przenieść do dowolnego narzędzia (np. lokalnej bazy SQLite, arkusza kalkulacyjnego) na czas przygotowywania zapytań.
- Prosimy o schludny format SQL (wcięcia, aliasy, czytelne nazwy kolumn w wynikach).
- Jeśli chcesz szybko odtworzyć strukturę i dane, skorzystaj z pliku `qa-03/sample-data.sql` (pasuje do przykładowego schematu).

## Ocena
Podczas oceny zwracamy uwagę na:

- poprawność merytoryczną zapytań (czy realizują postawione zadania),
- wykorzystanie odpowiednich konstrukcji SQL,
- sposób weryfikacji wyników opisany w przesłanym pliku,
- ewentualne dodatkowe spostrzeżenia dotyczące danych.

---
_Aplikacja demonstracyjna dla zadania rekrutacyjnego. Qbico sp. z o.o._


