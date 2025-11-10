# QA-01 Formularz wysyłki – zadanie testowe

W tym zadaniu przedstawiamy prostą aplikację przeglądarkową, która symuluje proces rejestracji przesyłki kurierskiej. 
Zadanie polega na manualnym przetestowaniu działania formularza oraz odnalezieniu błędów (w aplikacji przewidziano 12 celowych błędów).

## Wymagania biznesowe i zasady walidacji

- Imię i nazwisko: minimum 3 znaki, tylko litery (w tym polskie), spacja i myślnik.
- Adres e-mail: poprawny adres w formacie `nazwa@domena.tld`, przy czym domena powinna zawierać co najmniej jedną kropkę, a końcówka (TLD) minimum 2 litery.
- Telefon: dopuszczalne są cyfry, spacje i znak `+`; po usunięciu spacji numer musi mieć 9–15 cyfr.
- Adres (ulica i numer): minimum 5 znaków, musi zawierać zarówno litery, jak i cyfry.
- Kod pocztowy: dokładnie w formacie `dd-ddd`, gdzie `d` oznacza cyfrę.
- Miasto: minimum 2 znaki.
- Data odbioru: nie wcześniej niż następny dzień roboczy (poniedziałek–piątek); odbiór w weekend nie jest możliwy.
- Rodzaj paczki:
  - `Dokumenty` i `Standardowa` – bez dodatkowych ograniczeń.
  - `Delikatna` – wymaga dodania instrukcji dla kuriera o ostrożnym obchodzeniu się z paczką.
  - `Gabarytowa` – dostępna tylko dla paczek o wadze powyżej 10 kg.
- Ubezpieczenie:
  - `Brak` – domyślne.
  - `Podstawowe` – dostępne dla paczek do 1000 zł (wartość paczki należy oszacować w polu uwag).
  - `Premium` – można wybrać tylko, jeśli waga paczki przekracza 1 kg.
- Waga paczki: wartość z dokładnością do 0,1 kg, zakres 0,1–30 kg.
- Instrukcje dla kuriera: minimum 15 znaków, powinny zawierać konkretne wskazówki (np. „proszę zadzwonić domofonem nr 12”).
- Regulamin: zaznaczenie checkboxa jest wymagane, w przeciwnym razie formularz nie powinien się wysłać.

## Zachowanie aplikacji

- Po udanym przesłaniu dane powinny zostać zapisane w pamięci przeglądarki (localStorage) oraz wyświetlone w panelu „Ostatnie zapisane zgłoszenie”.
- Kliknięcie „Wyczyść formularz” powinno przywrócić domyślne wartości wszystkich pól, usunąć komunikaty o błędach oraz wyczyścić zapisaną treść.
- Komunikaty walidacyjne powinny być widoczne pod odpowiednimi polami.
- Formularz nie komunikuje się z serwerem – wszystkie operacje odbywają się po stronie przeglądarki.

Powodzenia w testowaniu!

