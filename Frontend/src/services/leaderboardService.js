const API_URL = "http://localhost:5000/api";

export async function fetchScores({ limit = 10, sortOrder = "desc" } = {}) {
  const response = await fetch(`${API_URL}/getScore?limit=${limit}&sort=${sortOrder}`);

  if (!response.ok) {
    throw new Error("Nie pobrano wyników");
  }

  return response.json();
}
