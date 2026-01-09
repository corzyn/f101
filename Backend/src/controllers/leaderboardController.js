const leaderboardService = require("../services/leaderboardService");

async function getScore(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const sortOrder = req.query.sort === "asc" ? "asc" : "desc";

    const scores = await leaderboardService.getHighestScore(limit, sortOrder);

    res.status(200).json({
      data: scores
    });
  } catch (error) {
    console.error("Błąd podczas pobierania leaderboarda:", error);
    res.status(500).json({
      message: "Błąd podczas pobierania wyniku"
    });
  }
}

module.exports = { getScore };
