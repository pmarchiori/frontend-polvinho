import { API_URL } from "../../config/config.js";
import { fetchWithAuth } from "../../utils/fetchWithAuth.js";

export async function fetchQuizById(id) {
  try {
    return await fetchWithAuth(`${API_URL}/quizzes/${id}`);
  } catch (err) {
    console.error("Erro ao buscar quiz:", err);
    throw err;
  }
}

export async function fetchQuizResultsById(id) {
  try {
    return await fetchWithAuth(`${API_URL}/quizzes/${id}/results`);
  } catch (err) {
    console.error("Erro ao buscar resultados do quiz:", err);
    throw err;
  }
}

export async function updateQuiz(quizId, updates) {
  const response = await fetchWithAuth(`${API_URL}/quizzes/${quizId}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });

  return response;
}

export async function removeQuiz(id) {
  try {
    return await fetchWithAuth(`${API_URL}/quizzes/${id}/remove`, {
      method: "PUT",
    });
  } catch (err) {
    console.error("Erro ao eliminar o quiz:", err);
    throw err;
  }
}
