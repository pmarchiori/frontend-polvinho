import { Dashboard } from "../src/pages/Dashboard.js";
import { Sidebar } from "./components/Sidebar.js";
import { Login } from "./pages/Login.js";
import { RetrievePassword } from "./pages/RetrievePassword.js";
import { ChangePassword } from "./pages/ChangePassword.js";
import { PageNotFound } from "./pages/PageNotFound.js";
import { StudentRegister } from "./pages/StudentRegister.js";

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  // const sidebar = Sidebar();
  // container.appendChild(sidebar);

  // const dashboard = Dashboard();
  // container.appendChild(dashboard);

  // const studentRegister = StudentRegister();
  // container.appendChild(studentRegister);

  //TESTANDO/DESENVOLVENDO A TELA LOGIN
  const login = Login();
  container.appendChild(login);

  // const retrievePassword = RetrievePassword();
  // container.appendChild(retrievePassword);

  // const changePassword = ChangePassword();
  // container.appendChild(changePassword);

  // const pageNotFound = PageNotFound();
  // container.appendChild(pageNotFound);
});
