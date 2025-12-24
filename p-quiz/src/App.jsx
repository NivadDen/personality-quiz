import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import UserForm from "./components/UserForm";
import Question from "./components/Question";
import Results from "./components/Results";
import Header from "./components/Header";

// 🔑 MET API KEY
const MET_API_KEY =
  "ESK1PguJxWoIYX7oPNY0xpCAQ7pzo3V91dYF7pCcFCVneCAs5gZAHPdm";

function App() {
  // ✅ REQUIRED STATE
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);

  // ✅ QUESTIONS
  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
      question: "Which season do you enjoy the most?",
      options: ["Summer ☀️", "Winter ❄️", "Spring 🌸", "Autumn 🍂"],
    },
    {
      question: "Pick a type of landscape you like:",
      options: ["Mountains ⛰️", "Ocean 🌊", "Forest 🌳", "Desert 🏜️"],
    },
    {
      question: "Choose a hobby:",
      options: ["Reading 📚", "Sports 🏀", "Painting 🎨", "Traveling ✈️"],
    },
    {
      question: "Pick a personality trait that fits you best:",
      options: ["Adventurous 🗺️", "Calm 🧘", "Creative 🎭", "Analytical 🧠"],
    },
  ];

  // ✅ OPTION → ELEMENT MAP
  const elements = {
    // Question 1
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
    
    // Question 2 (season)
    "Summer ☀️": "Fire",
    "Winter ❄️": "Water",
    "Spring 🌸": "Earth",
    "Autumn 🍂": "Air",
  
    // Question 3 (landscape)
    "Mountains ⛰️": "Fire",
    "Ocean 🌊": "Water",
    "Forest 🌳": "Earth",
    "Desert 🏜️": "Air",
  
    // Question 4 (hobby)
    "Reading 📚": "Earth",
    "Sports 🏀": "Fire",
    "Painting 🎨": "Air",
    "Traveling ✈️": "Water",
  
    // Question 5 (personality trait)
    "Adventurous 🗺️": "Fire",
    "Calm 🧘": "Water",
    "Creative 🎭": "Air",
    "Analytical 🧠": "Earth",
  };
  

  // 🎨 FETCH ARTWORK FROM MET
  async function fetchArtwork(element) {
    const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${element}`;

    const searchRes = await fetch(searchUrl, {
      headers: {
        "x-api-key": MET_API_KEY,
      },
    });
    const searchData = await searchRes.json();

    if (!searchData.objectIDs || searchData.objectIDs.length === 0) return;

    const objectId = searchData.objectIDs[0];

    const objectRes = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`,
      {
        headers: {
          "x-api-key": MET_API_KEY,
        },
      }
    );

    const objectData = await objectRes.json();
    setArtwork(objectData);
  }

  // ✅ HANDLE ANSWER
  function handleAnswer(answer) {
    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);

    const nextIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIndex);

    // Quiz finished → determine element + fetch artwork
    if (nextIndex === questions.length) {
      const finalElement = determineElement(updatedAnswers);
      setElement(finalElement);
      fetchArtwork(finalElement);
    }
  }

  // ✅ HANDLE USER NAME
  function handleUserFormSubmit(name) {
    setUserName(name);
  }

  // ✅ DETERMINE ELEMENT
  function determineElement(answersArray) {
    const counts = {};

    answersArray.forEach((answer) => {
      const el = elements[answer];
      counts[el] = (counts[el] || 0) + 1;
    });

    return Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
  }

  return (
    <>
      {/* ✅ HEADER */}
      <Header userName={userName} />

      {/* ✅ ROUTES */}
      <Routes>
        <Route
          path="/"
          element={<UserForm onSubmit={handleUserFormSubmit} />}
        />

        <Route
          path="/quiz"
          element={
            currentQuestionIndex < questions.length ? (
              <Question
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                onAnswer={handleAnswer}
              />
            ) : (
              <Results
                userName={userName}
                element={element}
                artwork={artwork}
              />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
