const gameService = require("../services/gameService");

async function getGame(req, res) {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ message: "Brak userId" });
  }

  try {
    const gameState = await gameService.getGameState(userId);
    return res.status(200).json(gameState);
  } catch (err) {
    console.error("Błąd", err);
    return res.status(500).json({ message: "Wewnętrzny błąd serwera." });
  }
}

async function submitAttempt(req, res) {
  const { userId, guessId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Brak userId" });
  }
  if (!guessId) {
    return res.status(400).json({ message: "Brak zgadywanej gry" });
  }

  try {
    const result = await gameService.submitGameAttempt(userId, guessId);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Błąd", err);

    if (err.message === "Taka gra nie istnieje.") {
      return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({ message: "Wewnętrzny błąd serwera." });
  }
}

async function resetGame(req, res) {
  try {
    const result = await gameService.resetTodayGame();
    return res.status(200).json(result);
  } catch (err) {
    console.error("Błąd:", err);
    return res.status(500).json({ message: "Wewnętrzny błąd serwera." });
  }
}

module.exports = {
  getGame,
  submitAttempt,
  resetGame
};
