import { Link } from "react-router-dom";

function Header() {
  return (
    <nav>
      <Link to ="/">Strona Glowna </Link>
      <Link to ="/login">Login </Link>
      <Link to ="/register">Rejestracja </Link>
      <Link to = "/leaderboard">leaderboard</Link>
      
      
    </nav>
  );
}

export default Header;
