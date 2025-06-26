// src/router/router.js
import { LoginPage } from "../pages/LoginPage.js";
import { DashboardPage } from "../pages/DashboardPage.js";
import { StudentList } from "../pages/StudentList.js";

const routes = {
  "/login": LoginPage,
  "/dashboard": DashboardPage,
  "/alunos": StudentList,
};

export function navigateTo(path) {
  history.pushState(null, null, path);
  renderRoute();
}

export function renderRoute() {
  const main = document.querySelector("main");
  const path = window.location.pathname;
  const page = routes[path];

  main.innerHTML = "";

  if (page) {
    main.appendChild(page());
  } else {
    main.innerHTML = "<h1>Página não encontrada</h1>";
  }
}
