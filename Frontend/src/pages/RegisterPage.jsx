import { useState } from "react";
import { register } from "../services/authService";
import { validateForm } from "../utils/validators";
import Header from "../components/Header";

function RegisterPage(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("");
    const [name,setName] = useState("")
    const [error,setError] = useState("");
    const [user,setUser] = useState(null);


    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");

        const validationError = validateForm(email, password, confirmPassword);
        if (validationError) {
            setError(validationError);
            return;
        }

        if(password !== confirmPassword){
            setError("Hasłą się nie zgadzają")
            return
        }
        
        try {
        const result = await register({ email, password, name });

        if (result && result.userId) {
            setUser({ userId: result.userId, name });
        } else {
            setError("Rejestracja nieudana: " + result.message);
        }
    } catch (err) {
        console.error('Błąd rejestracji:', err);
        setError("Wystąpił błąd: " + err.message);
    }
    }
    if(user){
        return<h2>Witaj, {user.name}</h2>;
    }
    return(
        <div className="registerContainer">
            <Header />
            <h2>Rejestracja</h2>
            <form onSubmit={handleSubmit}>
                <div className="usernameContainer">
                    <label>Nazwa użytkownika</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="emailContainer">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="passwordContainer">
                    <label>Hasło</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="confirmPasswordContainer">
                    <label>Hasło</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Utworz użytkownika</button>
            </form>
        </div>
    )
}

export default RegisterPage