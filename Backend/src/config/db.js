const { MongoClient } = require("mongodb");

const mongoUrl = "mongodb://localhost:27018";
const dbName = "dleGame";

let db;

async function connectDb() {
  const client = new MongoClient(mongoUrl);
  await client.connect();
  console.log("Połączono z MongoDB");
  db = client.db(dbName);
}

function getDb() {
  if (!db) throw new Error("Połączenie z DB nie zostało nawiązane!");
  return db;
}

module.exports = { connectDb, getDb };
