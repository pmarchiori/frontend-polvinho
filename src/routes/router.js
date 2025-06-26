import { Login } from "../pages/Login.js";
import { Dashboard } from "../pages/Dashboard.js";
import { StudentList } from "../pages/StudentList.js";
import { Sidebar } from "../components/Sidebar.js";
import { PageNotFound } from "../pages/PageNotFound.js";

const routesWithSidebar = ["#/dashboard", "#/students"];

const routes = {
  404: PageNotFound,
  "#/login": Login,
  "#/dashboard": Dashboard,
  "#/students": StudentList,
};

export function router() {
  let container = document.querySelector("#container");
  if (!container) {
    container = document.createElement("div");
    container.id = "container";
    document.body.appendChild(container);
  }

  const path = window.location.hash || "#/login";
  const PageComponent = routes[path];

  container.innerHTML = "";

  if (!PageComponent) {
    container.appendChild(routes[404]());
    return;
  }

  if (routesWithSidebar.includes(path)) {
    const sidebar = Sidebar();
    const page = PageComponent();

    container.appendChild(sidebar);
    container.appendChild(page);
  } else {
    container.appendChild(PageComponent());
  }
}
