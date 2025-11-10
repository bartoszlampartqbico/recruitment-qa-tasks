# Dokumentacja aplikacji „Zgłoszenie firmy do windykacji”

## Cel aplikacji

Aplikacja służy jako prosty interaktywny formularz, w którym użytkownik wybiera firmę dłużnika z listy oraz przekazuje informacje o zadłużeniu i firmie windykacyjnej. Projekt został przygotowany jako zadanie rekrutacyjne dla kandydatów na stanowisko testera manualnego.

## Technologie

- HTML5 (struktura formularza i treści)
- CSS3 (stylizacja w pliku `styles.css`)
- JavaScript (logika interakcji w pliku `script.js`)

Nie są wykorzystywane żadne zewnętrzne biblioteki. Aplikacja działa lokalnie w przeglądarce i nie komunikuje się z serwerem.

## Uruchomienie

1. Otwórz plik `index.html` w przeglądarce (np. przeciągnij plik do przeglądarki).
2. Upewnij się, że wraz z plikiem HTML w tym samym katalogu znajdują się pliki `styles.css` oraz `script.js`.

## Główne elementy interfejsu

- **Lista firm dłużników** – generowana dynamicznie na podstawie tablicy danych w `script.js`. Domyślnie zaznaczona jest pierwsza pozycja.
- **Szczegóły zadłużenia** – pola tekstowe, liczba oraz lista checkboxów do zaznaczenia zajętych zasobów.
- **Dane firmy windykacyjnej** – podstawowe informacje wymagane do przekazania sprawy.
- **Podgląd zgłoszenia** – sekcja, która pojawia się po kliknięciu „Podgląd zgłoszenia” lub „Wyślij zgłoszenie”, prezentując wprowadzone dane w formie listy definicji.
- **Komunikaty walidacyjne** – w obszarze `#message-area` wyświetlane są wiadomości o błędach i powodzeniu operacji.

## Logika i walidacja

- Wybranie firmy jest wymagane (pole radio `companyId`).
- Kwota zadłużenia (`debtAmount`) musi być liczbą dodatnią.
- Nazwa firmy windykacyjnej (`agencyName`) nie może być pusta.
- Pozostałe pola są opcjonalne, ale pojawiają się w podglądzie.
- Przycisk „Podgląd zgłoszenia”:
  - weryfikuje minimalne wymagania (jak wyżej),
  - w przypadku poprawnych danych odsłania sekcję podglądu i wypełnia ją danymi,
  - w przypadku błędu wyświetla komunikat w obszarze `#message-area`.
- Przycisk „Wyślij zgłoszenie”:
  - blokuje domyślną akcję formularza,
  - ponownie wykonuje walidację,
  - w przypadku sukcesu pokazuje podgląd oraz komunikat o symulacji zarejestrowania zgłoszenia.

## Scenariusze użytkowania

1. Użytkownik uruchamia aplikację i widzi domyślnie zaznaczoną firmę wraz z jej szczegółami.
2. W razie potrzeby wybiera inną firmę – szczegóły aktualizują się na bieżąco.
3. Uzupełnia minimalne wymagane pola (kwota i nazwa firmy windykacyjnej) oraz dodatkowe dane według uznania.
4. Generuje podgląd, sprawdza poprawność danych, ewentualnie wraca do edycji.
5. Symuluje wysłanie zgłoszenia – aplikacja potwierdza przyjęcie i nadal umożliwia edycję danych.

## Zakres danych testowych

Tablica `companies` w `script.js` zawiera przykładowe firmy z polami:

- `id` – unikalny identyfikator,
- `name`, `nip`, `address`, `contact` – podstawowe dane identyfikacyjne,
- `overdueInvoices` – liczba zaległych faktur,
- `overdueDays` – liczba dni po terminie najstarszej faktury.

Możliwe jest łatwe rozszerzenie listy o kolejne rekordy.

## Ograniczenia i założenia

- Brak backendu i trwałego zapisu danych – wszystkie operacje odbywają się w pamięci przeglądarki.
- Brak walidacji formatów (np. poprawności NIP, formatu numeru faktury) – celem było przygotowanie surowego scenariusza do testów.
- Załączniki są symulowane jako zwykłe pole tekstowe.

## Potencjalne kierunki rozwoju

- Dodanie wielojęzyczności interfejsu.
- Rozszerzenie walidacji o kolejne reguły biznesowe.
- Zapisywanie zgłoszeń (np. w LocalStorage lub poprzez API).
- Weryfikacja zgodności z WCAG, np. dodanie wsparcia dla czytników ekranu.

