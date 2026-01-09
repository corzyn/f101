const express = require("express");
const router = express.Router();
const {getScore} = require("../controllers/leaderboardController")

router.get("/getScore",getScore);

module.exports = router;