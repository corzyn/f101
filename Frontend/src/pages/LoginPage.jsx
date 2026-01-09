import { useState } from "react";
import { login } from "../services/authService";
import { validateForm } from "../utils/validators";
import Header from "../components/Header";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm(email, password);
      if (validationError) {
          setError(validationError);
          return;
      }

    try {
      const result = await login({ email, password });
      setUser(result.user);
      console.log("Zalogowano:", result.user);
    } catch (err) {
      setError(err.message);
    }
  };

  if (user) {
    return <h2>Witaj, {user.name || user.email}!</h2>;
  }

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <Header />
      <h2>Logowanie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        </div>
        <div>
          <label>Hasło</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Zaloguj się</button>
      </form>
    </div>
  );
}

export default LoginPage;
