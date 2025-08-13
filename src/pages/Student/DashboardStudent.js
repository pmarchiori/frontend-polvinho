import { navigateTo } from "../../routes/navigate.js";
import { DashboardItem } from "../../components/Dashboard/DashboardItem.js";
import { fetchUserById } from "../../handlers/users/userHandler.js";
import { DashboardContent } from "../../components/Dashboard/DashboardContent.js";

export function DashboardStudent({ userId }) {
  return DashboardContent({
    title: "Dashboard",
    subtitle: "Bem-vindo, Aluno!",
    itemsLoader: async () => {
      const student = await fetchUserById(userId);
      return (student?.subjects || []).map((subject) =>
        DashboardItem({
          title: subject.name,
          onClick: () => navigateTo(`#/`),
        })
      );
    },
  });
}
