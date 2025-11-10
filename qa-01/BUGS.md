# Lista celowo zaszytych błędów

Poniżej znajduje się zestawienie najważniejszych problemów celowo umieszczonych w aplikacji. Lista ma pomóc w weryfikacji raportu kandydata.

1. **Walidacja imienia i nazwiska** – komunikat mówi o minimalnej długości 3 znaków, ale weryfikacja wymaga 5 znaków (`app.js` – `validate`).
2. **Walidacja e-mail** – wzorzec `/^[\w.-]+@[\w.-]+$/` akceptuje adresy bez kropki i prawidłowego TLD (np. `user@domain`), co jest sprzeczne z wymaganiami (`app.js`).
3. **Walidacja telefonu** – przed sprawdzeniem usuwany jest tylko pierwszy odstęp (`replace(" ", "")`), więc numery ze spacjami w środku są odrzucane (`app.js`).
4. **Kod pocztowy** – komunikat wymaga formatu `00-000`, lecz walidacja dopuszcza pięć cyfr bez myślnika (`^\d{5}$`), więc błędne wartości przechodzą (`app.js`).
5. **Data odbioru – weekend** – warunek `if (day === 0 && day === 6)` nigdy nie jest spełniony, więc formularz nie blokuje weekendów (`app.js`).
6. **Instrukcje dla kuriera** – faktyczna walidacja wymaga tylko 5 znaków, mimo że wymagania mówią o 15 (`app.js`).
7. **Akceptacja regulaminu** – błąd pojawia się wtedy, gdy checkbox jest zaznaczony, zamiast gdy nie jest (`app.js`).
8. **Walidacja wagi** – kod wymusza liczbę całkowitą, chociaż wymagania dopuszczają wartości z dokładnością do 0,1 kg (`app.js`).
9. **Panel „Ostatnie zapisane zgłoszenie”** – dane są zapisywane pod kluczem `shipping_form`, ale odczytywane z `shipping-form`, więc nigdy się nie pojawią (`app.js`).
10. **Reset** – przycisk usuwa dane spod klucza `shipping_form`, lecz panel nadal pozostaje pusty, bo i tak nie odczytuje poprawnych danych (`app.js`).
11. **Brak walidacji warunku dla paczki delikatnej** – wymagania mówią o konieczności wspomnienia o delikatności w polu instrukcji, ale kod tego nie sprawdza (`app.js`).
12. **Brak informacji o wartości paczki** – wymagania dotyczące progów ubezpieczenia nie mogą być zweryfikowane, bo formularz nie ma pola na wartość przesyłki (`index.html`, `README.md`).
13. **Kalkulator kosztu przesyłki** – obliczenia odejmują 1 kg od faktycznej wagi (zmienna `effectiveWeight`), więc pokazana kwota jest zaniżona przy większości wartości (`app.js`).

Lista nie obejmuje drobnych problemów kosmetycznych; kandydat może znaleźć dodatkowe rozbieżności.***

