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

const routesWithSidebar = [
  "#/dashboard",
  "#/students",
  "#/student-register",
  "#/student-edit",
  "#/teachers",
  "#/teacher-register",
  "#/teacher-edit",
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
};

export function router() {
  let container = document.querySelector("#container");
  if (!container) {
    container = document.createElement("div");
    container.id = "container";
    document.body.appendChild(container);
  }

  const fullPath = window.location.hash || "#/login";
  const [basePath, param] =
    fullPath.split("/").length > 2
      ? [fullPath.split("/").slice(0, 2).join("/"), fullPath.split("/")[2]]
      : [fullPath, null];

  const PageComponent = routes[basePath];

  container.innerHTML = "";

  if (!PageComponent) {
    container.appendChild(routes[404]());
    return;
  }

  if (routesWithSidebar.includes(basePath)) {
    const sidebar = Sidebar();
    const page = param ? PageComponent(param) : PageComponent();
    container.appendChild(sidebar);
    container.appendChild(page);
  } else {
    container.appendChild(param ? PageComponent(param) : PageComponent());
  }
}
