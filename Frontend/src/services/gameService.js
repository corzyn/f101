const API_URL = "http://localhost:5000/api";

export async function getGame(userId) {
  const response = await fetch(`${API_URL}/game?userId=${userId}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Błąd pobierania gry");
  }

  return response.json();
}

export async function submitAttempt(userId, guessId) {
  const response = await fetch(`${API_URL}/attempt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, guessId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Błąd wysyłania próby");
  }

  return response.json();
}
