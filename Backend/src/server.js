const express = require("express");
const cors = require("cors");
const { connectDb } = require("./config/db");
const authRoutes = require("./routes/auth");
const leaderboardRoutes = require("./routes/leaderboard");
const profileRoutes = require("./routes/profile");
const gameRoutes = require("./routes/game");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", leaderboardRoutes)
app.use("/api", profileRoutes)
app.use("/api/", gameRoutes);

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Błąd połączenia z MongoDB:", err);
  });
