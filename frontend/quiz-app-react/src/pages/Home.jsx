import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../api/quizApi";
import { getCategories } from "../api/quizApi";

function Home() {
  const [category, setCategory] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleStart = async () => {
    try {
      const response = await createQuiz(
        category,
        Number(numQuestions),
        "My Quiz",
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
        <select
          className="input-field"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
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

      <button onClick={handleStart} disabled={!category || !numQuestions}>
        Start Quiz
      </button>
    </div>
  );
}

export default Home;
