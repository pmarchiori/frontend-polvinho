import { DashboardItem } from "../components/DashboardItem.js";
import { createTitle } from "../components/Titles.js";

export function Dashboard() {
  const dashboard = document.createElement("div");
  dashboard.classList.add("dashboard");

  const titleContent = createTitle("Dashboard", "Bem vindo, Admin!");
  titleContent.classList.add("dashboard-title");

  const itemsArea = document.createElement("div");
  itemsArea.classList.add("items-area");

  //COMPONENTIZAR O CORPO DO DASHBOARD, PARA FUNCIONAR COM DIFERENTES PERFIS
  const studentsItem = DashboardItem("Alunos", "Cadastrar novo");
  const teachersItem = DashboardItem("Professores", "Cadastrar novo");
  const disciplinesItem = DashboardItem("Disciplinas", "Cadastrar novo");

  itemsArea.appendChild(studentsItem);
  itemsArea.appendChild(teachersItem);
  itemsArea.appendChild(disciplinesItem);

  dashboard.appendChild(titleContent);
  dashboard.appendChild(itemsArea);

  return dashboard;
}
