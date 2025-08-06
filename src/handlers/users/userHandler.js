import { API_URL } from "../../config/config.js";
import { fetchWithAuth } from "../../utils/fetchWithAuth.js";

export async function fetchUsersByRole(role, page = 1) {
  try {
    const data = await fetchWithAuth(
      `${API_URL}/users?role=${role}&page=${page}`
    );
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
    return await fetchWithAuth(`${API_URL}/users/${id}`);
  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    throw err;
  }
}

export const fetchStudentById = fetchUserById;
export const fetchTeacherById = fetchUserById;

export async function removeUser(id) {
  try {
    return await fetchWithAuth(`${API_URL}/users/${id}/remove`, {
      method: "PUT",
    });
  } catch (err) {
    console.error("Erro ao eliminar usuário:", err);
    throw err;
  }
}

export const removeStudent = removeUser;
export const removeTeacher = removeUser;
