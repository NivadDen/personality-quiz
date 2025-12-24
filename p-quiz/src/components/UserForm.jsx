import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserForm({ onSubmit }) {
  const [inputName, setInputName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(inputName);
    navigate("/quiz");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your name:
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Start Quiz</button>
    </form>
  );
}
