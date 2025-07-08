import { DashboardItem } from "../components/DashboardItem.js";
import { Title } from "../components/Title.js";
import { navigateTo } from "../routes/navigate.js";

export function Dashboard() {
  const dashboard = document.createElement("div");
  dashboard.classList.add("dashboard");

  const titleContent = Title({
    title: "Dashboard",
    subtitle: "Bem vindo, Admin!",
    titleClass: "title2",
    subtitleClass: "textXl",
    titleColor: "var(--stone-900)",
    subtitleColor: "var(--stone-700)",
  });
  titleContent.classList.add("dashboard-title");

  const itemsArea = document.createElement("div");
  itemsArea.classList.add("items-area");

  const studentsItem = DashboardItem({
    title: "Alunos",
    description: "Cadastrar novo",
    onClick: () => {
      navigateTo("#/students");
    },
  });

  const teachersItem = DashboardItem({
    title: "Professores",
    description: "Cadastrar novo",
    onClick: () => {
      navigateTo("#/teachers");
    },
  });

  const disciplinesItem = DashboardItem({
    title: "Disciplinas",
    description: "Cadastrar novo",
  });

  itemsArea.appendChild(studentsItem);
  itemsArea.appendChild(teachersItem);
  itemsArea.appendChild(disciplinesItem);

  dashboard.appendChild(titleContent);
  dashboard.appendChild(itemsArea);

  return dashboard;
}
