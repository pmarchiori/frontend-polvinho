import { Dashboard } from "../src/pages/Dashboard.js";
import { Sidebar } from "./components/Sidebar.js";
import { Login } from "./pages/Login.js";

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  // const sidebar = Sidebar();
  // container.appendChild(sidebar);

  // const dashboard = Dashboard();
  // container.appendChild(dashboard);

  //TESTANDO/DESENVOLVENDO A TELA LOGIN
  const login = Login();
  container.appendChild(login);
});
