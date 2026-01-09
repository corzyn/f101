const express = require("express");
const router = express.Router();
const { getGame, submitAttempt, resetGame } = require("../controllers/gameController");

router.get("/game", getGame);
router.post("/attempt", submitAttempt);
router.post("/game/reset", resetGame);

module.exports = router;
