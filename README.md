Gra GameDLE to aplikacja webowa, która umożliwia użytkownikom rywalizowanie poprzez zgadywanie losowo wybranych gier. Gracze mają możliwość sprawdzenia swojego wyniku w rankingu i interakcji z innymi użytkownikami. Gra oferuje dynamiczny interfejs frontendowy zbudowany na React oraz backend obsługujący logikę gry i dane użytkowników za pomocą Express.js i MongoDB.

Funkcjonalności

Rejestracja i logowanie użytkowników – użytkownicy mogą zakładać konta i logować się za pomocą bezpiecznych haseł.
Gra Gamedle – użytkownicy biorą udział w grze, zgadując grę w określonej ilościu prób.
Tabela wyników – gracze mogą przeglądać swoje wyniki oraz rankingi innych graczy.
Profile użytkowników – każdy użytkownik ma możliwość edytowania swojego profilu.
Bezpieczna autentykacja – hasła są przechowywane w bezpieczny sposób dzięki użyciu biblioteki bcrypt.
API – pełna interakcja z aplikacją za pośrednictwem REST API z użyciem Express.js.

Instrukcja instalacji i uruchomienia
Aby uruchomić aplikację na swoim lokalnym środowisku, wykonaj poniższe kroki:
Sklonuj repozytorium:
git clone https://github.com/corzyn/f101.git
Wejdź do katalogu projektu:
cd f101
Zainstaluj wymagane zależności:
Jeśli jeszcze nie masz zainstalowanego npm lub yarn, zainstaluj je i następnie zainstaluj zależności:
npm install
Uruchom aplikację:
Uruchom backend:
npm start
Uruchom frontend:
npm run dev

Aplikacja powinna być dostępna pod adresem:
Frontend: http://localhost:5173
Backend: http://localhost:5000

Użyj Docker do uruchomienia w kontenerach :
Jeśli chcesz uruchomić aplikację z Dockerem, skorzystaj z pliku docker.txt

Lista endpointów
Auth API (Autentykacja)

POST /api/register
Rejestruje nowego użytkownika.
POST /api/login
Loguje użytkownika.

Gra

GET /api/game
Rozpoczyna nową grę lub pobiera dane o trwającej grze.
POST /api/attempt
Wysyła próbę zgadnięcia słowa.
POST /api/game/reset
Resetuje aktualną grę.

Tabela wyników (Leaderboard)
GET /api/getScore
Zwraca wynik gracza w bieżącej grze.

Profile API (Zarządzanie kontem)
GET /api/getUserCredentials/:id
Pobiera dane użytkownika na podstawie jego ID.
DELETE /api/deleteUser/:id
Usuwa użytkownika o podanym ID.
PUT /api/updateUser/:id
Aktualizuje dane użytkownika.
GET /api/users
Zwraca listę wszystkich użytkowników.

Technologie:
Frontend:
React.js

Backend:
Node.js
Express.js
MongoDB
bcrypt
CORS

Inne:

Docker

Autorzy
Oskar Adamski
