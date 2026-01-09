const bcrypt = require("bcrypt");
const { getDb } = require("../config/db");

async function registerUser(email, password, name) {
  try {
    const users = getDb().collection("users");

    const existing = await users.findOne({ email });
    if (existing) {
      return { status: 400, response: { message: "Użytkownik o tym emailu już istnieje." } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      password: hashedPassword,
      name: name || "",
      createdAt: new Date(),
    };

    const result = await users.insertOne(newUser);
    return { status: 201, response: { message: "Zarejestrowano pomyślnie", userId: result.insertedId } };

  } catch (err) {
    throw new Error("Wewnętrzny błąd serwera.");
  }
}

async function loginUser(email, password) {
  try {
    const users = getDb().collection("users");

    const user = await users.findOne({ email });
    if (!user) {
      return { status: 401, response: { message: "Niepoprawny email lub hasło." } };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { status: 401, response: { message: "Niepoprawny email lub hasło." } };
    }

    const userData = {
      id: user._id,
      email: user.email,
      name: user.name,
    };

    return { status: 200, response: { message: "Zalogowano pomyślnie", user: userData } };
  } catch (err) {
    throw new Error("Wewnętrzny błąd serwera.");
  }
}

module.exports = { registerUser, loginUser };
