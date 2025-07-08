export const API_URL = "http://localhost:8000";

export async function fetchUsersByRole(role) {
  try {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) {
      throw new Error("Erro ao buscar usuários");
    }
    const users = await res.json();
    return users.filter((user) => user.role === role);
  } catch (err) {
    console.error(`Erro ao fazer o fetch de usuários com role ${role}:`, err);
    throw err;
  }
}

export const fetchStudents = () => fetchUsersByRole("student");
export const fetchTeachers = () => fetchUsersByRole("teacher");

export async function fetchUserById(id) {
  try {
    const res = await fetch(`${API_URL}/users/${id}`);
    if (!res.ok) throw new Error("Usuário não encontrado");
    return await res.json();
  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    throw err;
  }
}

export const fetchStudentById = fetchUserById;
export const fetchTeacherById = fetchUserById;

export async function removeUser(id) {
  try {
    const res = await fetch(`${API_URL}/users/${id}/remove`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "Erro ao eliminar o usuário");
    }

    return await res.json();
  } catch (err) {
    console.error("Erro ao eliminar usuário:", err);
    throw err;
  }
}

export const removeStudent = removeUser;
export const removeTeacher = removeUser;
