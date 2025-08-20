import { Title } from "../../components/Title.js";
import { navigateTo } from "../../routes/navigate.js";
import { DashboardItem } from "../../components/Dashboard/DashboardItem.js";
import { DashboardContent } from "../../components/Dashboard/DashboardContent.js";

export function DashboardAdmin() {
  return DashboardContent({
    title: "Dashboard",
    subtitle: "Bem-vindo, Admin!",
    itemsLoader: async () => [
      DashboardItem({
        title: "Alunos",
        description: "Cadastrar novo",
        onClick: () => navigateTo("#/students"),
      }),
      DashboardItem({
        title: "Professores",
        description: "Cadastrar novo",
        onClick: () => navigateTo("#/teachers"),
      }),
      DashboardItem({
        title: "Disciplinas",
        description: "Cadastrar novo",
        onClick: () => navigateTo("#/subjects"),
      }),
    ],
  });
}
