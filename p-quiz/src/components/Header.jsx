import { Link } from "react-router-dom";

export default function Header({ userName }) {
  return (
    <header>
      <h1>🖼️ Personality Quiz</h1>

      <nav>
        <Link to="/">Home</Link>
        {userName && <span> | Welcome, {userName}</span>}
      </nav>
    </header>
  );
}
