const { getDb } = require("../config/db");
const { ObjectId } = require("mongodb");

const MAX_ATTEMPTS = 6;
const BASE_POINTS = 100;
const BONUS_PER_ATTEMPT = 10;

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function compareGames(solution, guess) {
  return {
    title: {
      value: guess.title,
      status: guess.title === solution.title ? "correct" : "wrong"
    },
    year: {
      value: guess.year,
      status:
        guess.year === solution.year
          ? "correct"
          : Math.abs(guess.year - solution.year) <= 1
          ? "partial"
          : "wrong"
    },
    genre: {
      value: guess.genre,
      status: guess.genre.some(g => solution.genre.includes(g))
        ? guess.genre.every(g => solution.genre.includes(g))
          ? "correct"
          : "partial"
        : "wrong"
    },
    studio: {
      value: guess.studio,
      status: guess.studio === solution.studio ? "correct" : "wrong"
    },
    platforms: {
      value: guess.platforms,
      status: guess.platforms.some(p => solution.platforms.includes(p))
        ? guess.platforms.every(p => solution.platforms.includes(p))
          ? "correct"
          : "partial"
        : "wrong"
    }
  };
}

function isWinningFeedback(feedback) {
  return Object.values(feedback).every(v => v.status === "correct");
}

async function getRandomGame() {
  const db = getDb();
  const gamesCollection = db.collection("games");
  const count = await gamesCollection.countDocuments();

  if (count === 0) throw new Error("Brak gier w bazie.");

  const randomIndex = Math.floor(Math.random() * count);
  const game = await gamesCollection.find().limit(1).skip(randomIndex).next();
  return game;
}

async function getOrCreateGameSession(userId) {
  const db = getDb();
  const sessions = db.collection("gameSessions");

  const date = getTodayDate();
  const objectUserId = new ObjectId(userId);

  let session = await sessions.findOne({ userId: objectUserId, date });
  if (session) return session;

  const gameForUser = await getRandomGame();

  const newSession = {
    userId: objectUserId,
    date,
    gameId: gameForUser.id,
    solution: gameForUser,
    attempts: [],
    attemptsLeft: MAX_ATTEMPTS,
    status: "IN_PROGRESS",
    pointsAwarded: 0,
    finishedAt: null,
    createdAt: new Date()
  };

  await sessions.insertOne(newSession);
  return newSession;
}

async function getGameState(userId) {
  const session = await getOrCreateGameSession(userId);

  return {
    date: session.date,
    status: session.status,
    attemptsLeft: session.attemptsLeft,
    attempts: session.attempts,
    meta: session.solution.meta || {}
  };
}

async function submitGameAttempt(userId, guessId) {
  const db = getDb();
  const sessions = db.collection("gameSessions");
  const users = db.collection("users");
  const gamesCollection = db.collection("games");

  const objectUserId = new ObjectId(userId);

  const session = await sessions.findOne({ userId: objectUserId, date: getTodayDate() });
  if (!session) throw new Error("Sesja gry nie istnieje.");

  if (session.status !== "IN_PROGRESS") {
    return {
      status: session.status,
      attemptsLeft: session.attemptsLeft,
      pointsAwarded: session.pointsAwarded
    };
  }

  if (session.attemptsLeft <= 0) {
    return {
      status: "LOST",
      attemptsLeft: 0,
      pointsAwarded: 0
    };
  }

  const guessedGame = await gamesCollection.findOne({ id: guessId });
  if (!guessedGame) throw new Error("Taka gra nie istnieje.");

  const feedback = compareGames(session.solution, guessedGame);
  const isCorrect = isWinningFeedback(feedback);

  const attempt = {
    guessId: guessedGame.id,
    feedback,
    createdAt: new Date()
  };

  const update = {
    $push: { attempts: attempt },
    $inc: { attemptsLeft: -1 }
  };

  let newStatus = session.status;
  let pointsAwarded = session.pointsAwarded;

  if (isCorrect) {
    newStatus = "WON";
    pointsAwarded = BASE_POINTS + (session.attemptsLeft - 1) * BONUS_PER_ATTEMPT;

    update.$set = {
      status: "WON",
      finishedAt: new Date(),
      pointsAwarded
    };

    await users.updateOne(
      { _id: objectUserId },
      { $inc: { score: pointsAwarded } }
    );
  } else if (session.attemptsLeft - 1 <= 0) {
    newStatus = "LOST";
    update.$set = {
      status: "LOST",
      finishedAt: new Date()
    };
  }

  await sessions.updateOne({ _id: session._id }, update);

  return {
    correct: isCorrect,
    feedback,
    status: newStatus,
    attemptsLeft: session.attemptsLeft - 1,
    pointsAwarded
  };
}

async function resetTodayGame() {
  const db = getDb();
  const sessions = db.collection("gameSessions");
  const today = getTodayDate();

  await sessions.deleteMany({date: today });

  return { message: "Dzisiejsza gra została zresetowana." };
}

module.exports = {
  getGameState,
  submitGameAttempt,
  resetTodayGame
};
