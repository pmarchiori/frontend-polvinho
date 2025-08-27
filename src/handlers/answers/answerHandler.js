import { API_URL } from "../../config/config.js";
import { fetchWithAuth } from "../../utils/fetchWithAuth.js";

export async function submitQuizAnswers(quizId, studentAnswers) {
  const payload = {
    quizId,
    answers: Object.entries(studentAnswers).map(([qId, optionId]) => ({
      questionId: qId,
      selectedOption: optionId,
    })),
  };

  try {
    return await fetchWithAuth(`${API_URL}/answers/submit`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("Erro ao enviar quiz:", err);
    throw err;
  }
}

export async function fetchStudentAttempts(quizId) {
  try {
    return await fetchWithAuth(`${API_URL}/answers/student/${quizId}`);
  } catch (err) {
    console.error("Erro ao buscar tentativas:", err);
    throw err;
  }
}

export async function getAttemptDetails(answerId) {
  try {
    return await fetchWithAuth(`${API_URL}/answers/${answerId}`);
  } catch (err) {
    console.error("Erro no getAttemptDetails:", err);
    throw err;
  }
}
