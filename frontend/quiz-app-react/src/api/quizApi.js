import axios from "axios";
const API_BASE_URL = "https://quiz-backend-86af.onrender.com";

export const createQuiz = (category, numQ, title) => {
  return axios.post(`${API_BASE_URL}/quiz/create`, null, {
    params: {
      category: category,
      numQ: numQ,
      title: title,
    },
  });
};

export const getQuizQuestions = (quizId) => {
  return axios.get(`${API_BASE_URL}/quiz/get/${quizId}`);
};

export const submitQuiz = (quizId, answers) => {
  return axios.post(
    `${API_BASE_URL}/quiz/submit/${quizId}`,
    answers
  );
};

export const getCategories = () => {
  return axios.get(`${API_BASE_URL}/question/categories`);
};
