# Zadanie QA-03 — Walidacja zapytań SQL

## Cel zadania
Chcemy sprawdzić, czy kandydat potrafi budować zapytania SQL, wykorzystując `JOIN`, agregacje (`GROUP BY`, `HAVING`) oraz sortowanie wyników. Nie tworzymy lokalnej bazy danych — całość uruchamia się w przeglądarce dzięki bibliotece [`sql.js`](https://sql.js.org/), czyli wersji SQLite działającej w WebAssembly.

## Jak działa środowisko
1. Otwórz stronę `qa-03/index.html` w przeglądarce.
2. Po lewej stronie zobaczysz opis schematu i zestaw zadań, po prawej — edytor SQL z przyciskiem `Uruchom zapytanie`.
3. Dane testowe są ładowane do in-memory bazy SQLite przy starcie strony. Możesz więc pisać i uruchamiać zapytania bez instalowania czegokolwiek.
4. Wyniki zapytań wyświetlają się w tabeli. Dodatkowo można użyć przycisku `Porównaj z wzorcowym wynikiem`, aby sprawdzić czy wynik odpowiada oczekiwanemu rezultatowi dla danego zadania.

## Zakres danych
Dostępne są trzy tabele:

| Tabela | Kolumny | Opis |
| ------ | ------- | ---- |
| `departments` | `id`, `name` | Lista działów firmy |
| `employees` | `id`, `first_name`, `last_name`, `department_id`, `salary` | Pracownicy wraz z działem i pensją |
| `timesheets` | `id`, `employee_id`, `project_name`, `hours` | Rejestr przepracowanych godzin w projektach |

## Zadania dla kandydata
1. **Lista pracowników z nazwą działu** — przygotuj zapytanie, które zwróci pełne imię i nazwisko pracownika, nazwę działu oraz wynagrodzenie. Wynik posortuj rosnąco po nazwie działu, a w ramach działu po nazwisku.
2. **Średnie wynagrodzenie w działach** — policz średnią pensję i liczbę pracowników w każdym dziale. Pokaż tylko działy zatrudniające co najmniej dwóch pracowników. Posortuj wynik malejąco po średnim wynagrodzeniu.
3. **Projekty z dużym nakładem pracy** — zwróć nazwę działu, nazwę projektu i łączną liczbę przepracowanych godzin w projekcie. Uwzględnij tylko te projekty, w których sumarycznie przepracowano więcej niż 40 godzin. Posortuj malejąco po liczbie godzin.

## Wyniki kandydata
Kandydat powinien przesłać:

- treść przygotowanych zapytań SQL dla każdego zadania,
- (opcjonalnie) screenshoty wyników lub eksport tabel wynikowych,
- krótkie wyjaśnienie, jak weryfikował poprawność wyników.

## Jak oceniamy
Podczas oceny zwracamy uwagę na:

- poprawność zapytań (czy dają oczekiwany rezultat),
- czytelność i formatowanie SQL,
- umiejętność wykorzystywania aliasów, warunków `HAVING`, funkcji agregujących,
- ewentualne dodatkowe wnioski (np. zauważone ograniczenia, pomysły na dalszą analizę danych).

---
_Aplikacja demonstracyjna dla zadania rekrutacyjnego. Qbico sp. z o.o._


