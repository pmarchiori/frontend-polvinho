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
