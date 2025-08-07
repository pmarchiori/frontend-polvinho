import { navigateTo } from "../../routes/navigate.js";
import { DashboardItem } from "./DashboardItem.js";

export function DashboardContent({ role }) {
  const dashboard = document.createElement("div");
  dashboard.classList.add("dashboard");

  const itemsArea = document.createElement("div");
  itemsArea.classList.add("items-area");

  if (role == "admin") {
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
      onClick: () => {
        navigateTo("#/subjects");
      },
    });

    itemsArea.appendChild(studentsItem);
    itemsArea.appendChild(teachersItem);
    itemsArea.appendChild(disciplinesItem);
  }

  dashboard.appendChild(titleContent);
  dashboard.appendChild(itemsArea);

  return dashboard;
}
