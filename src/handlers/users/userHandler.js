import { API_URL } from "../../config/config.js";

export async function fetchUsersByRole(role, page = 1) {
  try {
    const res = await fetch(`${API_URL}/users?role=${role}&page=${page}`);
    if (!res.ok) {
      throw new Error("Erro ao buscar usuários");
    }
    const data = await res.json();
    return {
      users: data.users.filter((user) => user.role === role),
      total: data.total,
      currentPage: data.page,
      totalPages: data.totalPages,
    };
  } catch (err) {
    console.error(`Erro ao fazer o fetch de usuários com role ${role}:`, err);
    throw err;
  }
}

export async function fetchStudents(page = 1) {
  return await fetchUsersByRole("student", page);
}

export async function fetchTeachers(page = 1) {
  return await fetchUsersByRole("teacher", page);
}

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
