import { useLocation } from "react-router-dom";

function Result() {
  const location = useLocation();
  const { score, total } = location.state || {};

  if (score === undefined) {
    return <h3>No result available</h3>;
  }

  return (
    <div className="card">
      <h2>Quiz Result</h2>
      <h3>
        Score: {score} / {total}
      </h3>
      <p>
        {score === total
          ? "Excellent! 🎉"
          : score >= total / 2
            ? "Good job "
            : "Keep practicing "}
      </p>
    </div>
  );
}

export default Result;
