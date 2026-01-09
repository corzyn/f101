const { getDb } = require("../config/db");

async function getHighestScore(limit = 10, sortOrder = "desc") {
  try {
    const users = getDb().collection("users");

    const sortDirection = sortOrder === "asc" ? 1 : -1;

    const scores = await users
      .find()
      .sort({ score: sortDirection })
      .limit(limit)
      .toArray();

    return scores;
  } catch (error) {
    console.error("Błąd podczas pobierania wynikow:", error);
    throw new Error("Nie udało się pobrać wynikow.");
  }
}

module.exports = { getHighestScore };
