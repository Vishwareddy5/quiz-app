import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuizQuestions } from "../api/quizApi";
import { submitQuiz } from "../api/quizApi";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const navigate = useNavigate();

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getQuizQuestions(id);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error Fetching Questions : ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [id]);

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const prepareSubmission = () => {
    return Object.entries(selectedAnswers).map(([questionId, answer]) => ({
      id: Number(questionId),
      response: answer,
    }));
  };

  // console.log(selectedAnswers);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = prepareSubmission();
      const response = await submitQuiz(id, payload);
      const score = response.data;
      navigate("/result", {
        state: {
          score: score,
          total: questions.length,
        },
      });
    } catch (error) {
      console.log("Error Submitting quiz: ", error);
    }
  };

  if (loading) {
    return <h3>Loading Quiz...</h3>;
  }

  if (!currentQuestion) {
    return <h3>No questions available</h3>;
  }

  const isAnswered = selectedAnswers[currentQuestion.id] !== undefined;
console.log(prepareSubmission());

  

  return (
    <div className="card">
      <h4>
        {currentQuestionIndex + 1}. {currentQuestion.questionTitle}
      </h4>

      <div className="option">
        <label>
          <input
            type="radio"
            name="option"
            checked={selectedAnswers[currentQuestion.id] === currentQuestion.option1}
            onChange={() => handleOptionChange(currentQuestion.id, currentQuestion.option1)}
          />{" "}
          {currentQuestion.option1}
        </label>
      </div>

      <div className="option">
        <label>
          <input
            type="radio"
            name="option"
            checked={selectedAnswers[currentQuestion.id] === currentQuestion.option2}
            onChange={() => handleOptionChange(currentQuestion.id, currentQuestion.option2)}
          />{" "}
          {currentQuestion.option2}
        </label>
      </div>

      <div className="option">
        <label>
          <input
            type="radio"
            name="option"
            checked={selectedAnswers[currentQuestion.id] === currentQuestion.option3}
            onChange={() => handleOptionChange(currentQuestion.id, currentQuestion.option3)}
          />{" "}
          {currentQuestion.option3}
        </label>
      </div>

      <div className="option">
        <label>
          <input
            type="radio"
            name="option"
            checked={selectedAnswers[currentQuestion.id] === currentQuestion.option4}
            onChange={() => handleOptionChange(currentQuestion.id, currentQuestion.option4)}
          />{" "}
          {currentQuestion.option4}
        </label>
      </div>

      {currentQuestionIndex < questions.length - 1 ? (
        <button onClick={handleNext} disabled={!isAnswered}>
          Next
        </button>
      ) : (
        <button onClick={handleSubmit} disabled={!isAnswered}>
          Submit Quiz
        </button>
      )}
    </div>
  );
}
export default Quiz;
