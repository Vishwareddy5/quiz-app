import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../api/quizApi";
function Home() {
  const [category, setCategory] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const navigate = useNavigate();

  const handleStart = async () => {
    try {
      const response = await createQuiz(
        category,
        Number(numQuestions),
        "My Quiz"
      );
      const quizId = response.data;
      navigate(`/quiz/${quizId}`);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <div>
      <h2>Start Quiz</h2>

      <div>
        <label>Category:</label>
        <input
          type="text"
          className="input-field"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        ></input>
      </div>

      <div>
        <label>Number Of Questions</label>
        <input
          type="number"
          className="input-field"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
        ></input>
      </div>

      <button onClick={handleStart}>Start Quiz</button>
    </div>
  );
}

export default Home;
