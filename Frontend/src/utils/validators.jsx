export const validateForm = (email, password, confirmPassword = null) => {
    const minEmailLength = 5;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.length < minEmailLength) {
        return "Email jest za krótki";
    }
    if (!email.includes('@')) {
        return "Email musi zawierać znak '@'";
    }
    if (!emailRegex.test(email)) {
        return "Email ma niepoprawny format";
    }

    const minPasswordLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minPasswordLength) {
        return "Hasło musi mieć co najmniej 6 znaków.";
    }
    if (!hasUpperCase) {
        return "Hasło musi zawierać przynajmniej jedną dużą literę.";
    }
    if (!hasLowerCase) {
        return "Hasło musi zawierać przynajmniej jedną małą literę.";
    }
    if (!hasDigit) {
        return "Hasło musi zawierać przynajmniej jedną cyfrę.";
    }
    if (!hasSpecialChar) {
        return "Hasło musi zawierać przynajmniej jeden znak specjalny.";
    }

    if (confirmPassword !== null && password !== confirmPassword) {
        return "Hasła się nie zgadzają";
    }

    return "";
};
