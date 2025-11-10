# Przykładowe scenariusze testowe

Scenariusze mają pomóc kandydatom w przygotowaniu planu testów bez dodatkowej dokumentacji. Poniżej lista przykładowych przypadków wraz z oczekiwanym rezultatem.

## Lista przypadków testowych

1. **Wyświetlenie domyślnej firmy po uruchomieniu**
   - Kroki: Otwórz aplikację.
   - Oczekiwany rezultat: Pierwsza firma na liście jest zaznaczona, a w sekcji szczegółów widnieją informacje o tej firmie.

2. **Zmiana wyboru firmy**
   - Kroki: Zmień zaznaczenie na inną firmę.
   - Oczekiwany rezultat: Sekcja szczegółów aktualizuje się i prezentuje dane nowej firmy.

3. **Walidacja kwoty zadłużenia**
   - Kroki: Usuń wartość z pola kwoty; kliknij „Wyślij zgłoszenie”.
   - Oczekiwany rezultat: Pojawia się komunikat o konieczności podania kwoty większej od zera, brak podglądu.

4. **Walidacja nazwy firmy windykacyjnej**
   - Kroki: Uzupełnij poprawną kwotę; pozostaw nazwę firmy windykacyjnej pustą; kliknij „Podgląd zgłoszenia”.
   - Oczekiwany rezultat: Wyświetla się komunikat o konieczności podania nazwy firmy.

5. **Poprawne zgłoszenie minimalne**
   - Kroki: Uzupełnij wymagane pola minimalne (kwota, nazwa firmy windykacyjnej); kliknij „Wyślij zgłoszenie”.
   - Oczekiwany rezultat: Komunikat o sukcesie oraz widoczny podgląd z wprowadzonymi danymi.

6. **Podgląd z dodatkowymi danymi**
   - Kroki: Uzupełnij wszystkie pola, zaznacz kilka checkboxów; kliknij „Podgląd zgłoszenia”.
   - Oczekiwany rezultat: Podgląd zawiera wszystkie wpisane dane, zaznaczone zasoby pojawiają się jako lista w jednej linii.

7. **Zamknięcie podglądu**
   - Kroki: Otwórz podgląd; kliknij „Zamknij podgląd”.
   - Oczekiwany rezultat: Sekcja podglądu staje się niewidoczna.

8. **Reakcja na błąd po wcześniejszym sukcesie**
   - Kroki: Wykonaj poprawne zgłoszenie; usuń kwotę i spróbuj ponownie.
   - Oczekiwany rezultat: Podgląd znika, pojawia się komunikat błędu.

9. **Obsługa daty w przyszłości**
   - Kroki: Wybierz datę wcześniejszą niż bieżąca; wyślij zgłoszenie.
   - Oczekiwany rezultat: Aplikacja akceptuje dowolną datę, bez walidacji – informacja do odnotowania.

10. **Wprowadzanie znaków specjalnych**
    - Kroki: Wprowadź znaki specjalne i polskie litery do pól tekstowych.
    - Oczekiwany rezultat: Dane są poprawnie wyświetlane w podglądzie.

11. **Zachowanie po odświeżeniu strony**
    - Kroki: Uzupełnij formularz; odśwież stronę (F5).
    - Oczekiwany rezultat: Wszystkie dane wracają do stanu początkowego (brak trwałego zapisu).

12. **Responsywność na urządzeniu mobilnym**
    - Kroki: Zmniejsz szerokość okna przeglądarki do około 375 px.
    - Oczekiwany rezultat: Formularz pozostaje czytelny, pola mieszczą się w jednej kolumnie, podgląd dostosowuje się do węższego widoku.

## Dodatkowe obserwacje

- Warto sprawdzić zgodność z czytnikami ekranu (role ARIA, nawigacja klawiaturą).
- Brak ograniczeń dla pól tekstowych może prowadzić do testów na długość i nietypowe formaty.
- Pole załączników to zwykły tekst – tester może zaproponować ulepszenia.

