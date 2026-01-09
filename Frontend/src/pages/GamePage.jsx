import { useState, useEffect } from "react";
import { getGame, submitAttempt } from "../services/gameService";
import Header from "../components/Header";

function GamePage() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [gameState, setGameState] = useState(null);
  const [guessName, setGuessName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Błąd pobierania użytkowników:", err);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!userId) return;

    async function fetchGame() {
      try {
        const state = await getGame(userId);
        setGameState(state);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchGame();
  }, [userId]);

const normalizeGameName = (name) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");
};

const handleAttempt = async (e) => {
  e.preventDefault();
  setError("");
  setMessage("");

  if (!guessName) {
    setError("Wpisz nazwę gry");
    return;
  }

  try {
    const normalizedGuess = normalizeGameName(guessName);
    const result = await submitAttempt(userId, normalizedGuess);

    setMessage(result.correct ? "Mega big win" : "Spróbuj ponownie");
    const state = await getGame(userId);
    setGameState(state);
    setGuessName("");
  } catch (err) {
    setError(err.message);
  }
};


  const getBgColor = (status) => {
    if (status === "correct") return "lightgreen";
    if (status === "partial") return "orange";
    return "lightcoral";
  };

  return (
    <div style={{ maxWidth: 800, margin: "50px auto" }}>
      <Header />
      <h2>Gamedle - zgadnij grę!</h2>

      <div style={{ marginBottom: 20 }}>
        <label>Wybierz użytkownika:</label>
        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="">-- wybierz --</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {userId && gameState && (
        <>
          <p>Status gry: {gameState.status}</p>
          <p>Pozostało prób: {gameState.attemptsLeft}</p>

          <form onSubmit={handleAttempt} style={{ marginBottom: 20 }}>
            <div>
              <label>Wpisz nazwę gry:</label>
              <input
                value={guessName}
                onChange={(e) => setGuessName(e.target.value)}
              />
            </div>
            <button type="submit" disabled={gameState.status !== "IN_PROGRESS"}>
              Zgadnij
            </button>
          </form>

          <h3>Historia prób:</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Title</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Year</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Genre</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Studio</th>
                <th style={{ border: "1px solid #ccc", padding: 8 }}>Platforms</th>
              </tr>
            </thead>
            <tbody>
              {gameState.attempts.map((attempt, idx) => (
                <tr key={idx}>
                  {Object.entries(attempt.feedback).map(([key, data]) => {
                    const displayValue = Array.isArray(data.value)
                      ? data.value.join(", ")
                      : data.value;
                    return (
                      <td
                        key={key}
                        style={{
                          border: "1px solid #ccc",
                          padding: 8,
                          backgroundColor: getBgColor(data.status),
                        }}
                      >
                        {displayValue}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default GamePage;
