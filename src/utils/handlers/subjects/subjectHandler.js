import { API_URL } from "../../../config/config.js";

export async function fetchSubjects(page = 1) {
  try {
    const res = await fetch(`${API_URL}/subjects?page=${page}`);
    if (!res.ok) {
      throw new Error("Erro ao buscas disciplinas.");
    }
    const data = await res.json();
    return {
      subjects: data.subjects,
      total: data.total,
      currentPage: data.page,
      totalPages: data.totalPages,
    };
  } catch (err) {
    console.log("Erro ao fazer o fetch de disciplinas: ", err);
    throw err;
  }
}

export async function fetchSubjectById(id) {
  try {
    const res = await fetch(`${API_URL}/subjects/${id}`);
    if (!res.ok) throw new Error("Disciplina não encontrada");
    return await res.json();
  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    throw err;
  }
}

export async function removeSubject(id) {
  try {
    const res = await fetch(`${API_URL}/subjects/${id}/remove`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Erro ao eliminar a disciplina");
    }

    return await res.json();
  } catch (err) {
    console.error("Erro ao eliminar a disciplina:", err);
    throw err;
  }
}
