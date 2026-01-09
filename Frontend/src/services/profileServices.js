const API_URL = "http://localhost:5000/api";
export async function fetchUser(id) {
  const response = await fetch(`${API_URL}/getUserCredentials/${id}`);
  console.log("Status odpowiedzi:", response.status);

  if (!response.ok) {
    const text = await response.text();
    console.error("Błąd z backendu:", text);
    throw new Error("Nie pobrano wyników");
  }

  return response.json();
}

export async function deleteUser(id) {
  const response = await fetch(`${API_URL}/deleteUser/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("delete nie dziala", text);
    throw new Error("Nie usunięto użytkownika");
  }

  return response.json();
}

export async function updateUser(id, name) {
  const response = await fetch(`${API_URL}/updateUser/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Błąd z backendu:", text);
    throw new Error("Nie zaaktualizowano");
  }

  return response.json();
}