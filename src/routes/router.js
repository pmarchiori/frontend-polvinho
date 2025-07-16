import { Login } from "../pages/Login.js";
import { ChangePassword } from "../pages/ChangePassword.js";
import { RetrievePassword } from "../pages/RetrievePassword.js";
import { Sidebar } from "../components/Sidebar.js";
import { Dashboard } from "../pages/Dashboard.js";
import { StudentList } from "../pages/StudentList.js";
import { StudentRegister } from "../pages/StudentRegister.js";
import { StudentEdit } from "../pages/StudentEdit.js";
import { PageNotFound } from "../pages/PageNotFound.js";
import { TeacherRegister } from "../pages/TeacherRegister.js";
import { TeacherList } from "../pages/TeacherList.js";
import { TeacherEdit } from "../pages/TeacherEdit.js";
import { SubjectList } from "../pages/SubjectList.js";
import { SubjectEdit } from "../pages/SubjectEdit.js";
import { SubjectRegister } from "../pages/SubjectRegister.js";

const routesWithSidebar = [
  "#/dashboard",
  "#/students",
  "#/student-register",
  "#/student-edit",
  "#/teachers",
  "#/teacher-register",
  "#/teacher-edit",
  "#/subjects",
  "#/subject-register",
  "#/subject-edit",
];

const routes = {
  404: PageNotFound,
  "#/login": Login,
  "#/change-password": ChangePassword,
  "#/retrieve-password": RetrievePassword,
  "#/dashboard": Dashboard,
  "#/students": StudentList,
  "#/student-register": StudentRegister,
  "#/student-edit": StudentEdit,
  "#/teachers": TeacherList,
  "#/teacher-register": TeacherRegister,
  "#/teacher-edit": TeacherEdit,
  "#/subjects": SubjectList,
  "#/subject-register": SubjectRegister,
  "#/subject-edit": SubjectEdit,
};

const protectedRoutes = {
  "#/dashboard": ["admin", "teacher", "student"],
  "#/students": ["admin", "teacher"],
  "#/student-register": ["admin"],
  "#/student-edit": ["admin", "teacher"],
  "#/teachers": ["admin"],
  "#/teacher-register": ["admin"],
  "#/teacher-edit": ["admin"],
  "#/subjects": ["admin", "teacher"],
  "#/subject-register": ["admin"],
  "#/subject-edit": ["admin"],
};

function getUserFromToken() {
  const token = localStorage.getItem("authToken");
  if (!token) return null;
  try {
    const payloadBase64 = token.split(".")[1];
    return JSON.parse(atob(payloadBase64));
  } catch {
    return null;
  }
}

export function router() {
  const container =
    document.querySelector("#container") ||
    document.body.appendChild(document.createElement("div"));
  container.id = "container";
  container.innerHTML = "";

  const fullPath = window.location.hash || "#/login";
  const [basePath, param] =
    fullPath.split("/").length > 2
      ? [fullPath.split("/").slice(0, 2).join("/"), fullPath.split("/")[2]]
      : [fullPath, null];

  const user = getUserFromToken();
  const allowedRoles = protectedRoutes[basePath];

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    console.log("usuário não autorizado");
    window.location.hash = "#/login";
    return;
  }

  const PageComponent = routes[basePath];
  if (!PageComponent) {
    container.appendChild(routes[404]());
    return;
  }

  if (routesWithSidebar.includes(basePath)) {
    container.appendChild(Sidebar());
  }

  container.appendChild(param ? PageComponent(param) : PageComponent());
}
