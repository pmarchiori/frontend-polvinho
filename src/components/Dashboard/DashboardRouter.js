import { decodeToken } from "../../utils/validators.js";
import { DashboardAdmin } from "../../pages/Admin/DashboardAdmin.js";
import { DashboardTeacher } from "../../pages/Teacher/DashboardTeacher.js";
import { PageNotFound } from "../../pages/PageNotFound.js";
import { DashboardStudent } from "../../pages/Student/DashboardStudent.js";

export async function DashboardRouter() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    window.location.hash = "#/login";
    const div = document.createElement("div");
    div.textContent = "Redirecionando...";
    return div;
  }

  let role, userId;

  try {
    const { role: r, id } = decodeToken(token);
    role = r;
    userId = id;
  } catch (err) {
    console.error("Erro ao decodificar token:", err);
    window.location.hash = "#/login";
    const div = document.createElement("div");
    div.textContent = "Token inválido.";
    return div;
  }

  if (role === "admin") {
    return await DashboardAdmin({ userId });
  }

  if (role === "teacher") {
    return await DashboardTeacher({ userId });
  }

  if (role === "student") {
    return await DashboardStudent({ userId });
  }

  return PageNotFound();
}
