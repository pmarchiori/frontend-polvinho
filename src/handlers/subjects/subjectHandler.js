import { API_URL } from "../../config/config.js";
import { fetchWithAuth } from "../../utils/fetchWithAuth.js";

export async function fetchSubjects(page = 1) {
  try {
    const data = await fetchWithAuth(`${API_URL}/subjects?page=${page}`);

    return {
      subjects: data.subjects,
      total: data.total,
      currentPage: data.page,
      totalPages: data.totalPages,
    };
  } catch (err) {
    console.error(`Erro ao fazer o fetch de disciplinas`, err);
    throw err;
  }
}

export async function fetchSubjectById(id) {
  try {
    return await fetchWithAuth(`${API_URL}/subjects/${id}`);
  } catch (err) {
    console.error("Erro ao buscar disciplina:", err);
    throw err;
  }
}

export async function removeSubject(id) {
  try {
    return await fetchWithAuth(`${API_URL}/subjects/${id}/remove`, {
      method: "PUT",
    });
  } catch (err) {
    console.error("Erro ao eliminar a disciplina:", err);
    throw err;
  }
}
