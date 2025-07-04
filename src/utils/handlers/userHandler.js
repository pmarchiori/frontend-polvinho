export const API_URL = "http://localhost:8000";

export async function fetchStudents() {
  try {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) {
      throw new Error("Erro ao buscar usuários");
    }
    const users = await res.json();
    const alunos = users.filter((user) => user.role === "student");
    return alunos;
  } catch (err) {
    console.error("Erro no fetchStudents:", err);
    throw err;
  }
}

export async function fetchStudentById(id) {
  try {
    const res = await fetch(`${API_URL}/users/${id}`);
    if (!res.ok) throw new Error("Aluno não encontrado");
    return await res.json();
  } catch (err) {
    console.error("Erro ao buscar aluno:", err);
    throw err;
  }
}

export async function removeStudent(studentId) {
  try {
    const res = await fetch(`${API_URL}/users/${studentId}/remove`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Erro ao eliminar o aluno");
    }

    return await res.json();
  } catch (err) {
    console.error("Erro ao eliminar aluno:", err);
    throw err;
  }
}
