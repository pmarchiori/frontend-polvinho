import { navigateTo } from "../../routes/navigate.js";
import { DashboardItem } from "../../components/Dashboard/DashboardItem.js";
import { fetchUserById } from "../../handlers/users/userHandler.js";
import { DashboardContent } from "../../components/Dashboard/DashboardContent.js";

export async function DashboardStudent({ userId }) {
  const student = await fetchUserById(userId);

  const subjects = student?.subjects || [];
  const hasSubjects = subjects.length > 0;

  return DashboardContent({
    title: "Dashboard",
    subtitle: "Bem-vindo, Aluno!",
    listTitle: hasSubjects ? "Disciplinas" : "",
    itemsLoader: async () => {
      const student = await fetchUserById(userId);
      return (student?.subjects || []).map((subject) =>
        DashboardItem({
          title: subject.name,
          onClick: () => navigateTo(`#/quizzes/${subject._id}`),
        })
      );
    },
  });
}
