import { Title } from "../../components/Title.js";
import { navigateTo } from "../../routes/navigate.js";
import { DashboardItem } from "../../components/Dashboard/DashboardItem.js";

export async function DashboardAdmin({ userId }) {
  const dashboard = document.createElement("div");
  dashboard.classList.add("dashboard");

  const title = Title({
    title: "Dashboard",
    subtitle: `Bem-vindo, Admin!`,
    titleClass: "title2",
    subtitleClass: "textXl",
  });
  dashboard.appendChild(title);

  const itemsArea = document.createElement("div");
  itemsArea.classList.add("items-area");

  itemsArea.appendChild(
    DashboardItem({
      title: "Alunos",
      description: "Cadastrar novo",
      onClick: () => navigateTo("#/students"),
    })
  );
  itemsArea.appendChild(
    DashboardItem({
      title: "Professores",
      description: "Cadastrar novo",
      onClick: () => navigateTo("#/teachers"),
    })
  );
  itemsArea.appendChild(
    DashboardItem({
      title: "Disciplinas",
      description: "Cadastrar novo",
      onClick: () => navigateTo("#/subjects"),
    })
  );

  dashboard.appendChild(itemsArea);

  return dashboard;
}
