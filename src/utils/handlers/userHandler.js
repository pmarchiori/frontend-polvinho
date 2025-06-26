const API_URL = "http://localhost:8000";

export async function fetchStudents() {
  try {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) {
      throw new Error("Erro ao buscar usuários");
    }
    const users = await res.json();
    const alunos = users.filter((user) => user.role === "aluno");
    return alunos;
  } catch (err) {
    console.error("Erro no fetchStudents:", err);
    throw err;
  }
}
