const authService = require('../services/authService');

async function register(req, res) {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email i hasło są wymagane." });
  }

  try {
    const result = await authService.registerUser(email, password, name);
    return res.status(result.status).json(result.response);
  } catch (err) {
    console.error("Error in register:", err);
    return res.status(500).json({ message: "Wewnętrzny błąd serwera." });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email i hasło są wymagane." });
  }

  try {
    const result = await authService.loginUser(email, password);
    return res.status(result.status).json(result.response);
  } catch (err) {
    console.error("Error in login:", err);
    return res.status(500).json({ message: "Wewnętrzny błąd serwera." });
  }
}

module.exports = { register, login };
