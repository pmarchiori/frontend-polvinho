import { API_URL } from "../../config/config.js";
import { fetchWithAuth } from "../../utils/fetchWithAuth.js";

export async function createQuestion(questionData) {
  const response = await fetchWithAuth(`${API_URL}/questions`, {
    method: "POST",
    body: JSON.stringify(questionData),
  });

  return response;
}

export async function fetchQuestionsByQuiz(quizId) {
  const response = await fetchWithAuth(`${API_URL}/questions/quiz/${quizId}`, {
    method: "GET",
  });

  return response;
}
