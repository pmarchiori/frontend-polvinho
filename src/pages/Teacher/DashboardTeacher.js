import { navigateTo } from "../../routes/navigate.js";
import { DashboardItem } from "../../components/Dashboard/DashboardItem.js";
import { fetchUserById } from "../../handlers/users/userHandler.js";
import { DashboardContent } from "../../components/Dashboard/DashboardContent.js";

export async function DashboardTeacher({ userId }) {
  const teacher = await fetchUserById(userId);

  const subjects = teacher?.subjects || [];
  const hasSubjects = subjects.length > 0;

  return DashboardContent({
    title: "Dashboard",
    subtitle: "Bem-vindo, Professor!",
    listTitle: hasSubjects ? "Disciplinas" : "",
    itemsLoader: async () => {
      return subjects.map((subject) =>
        DashboardItem({
          title: subject.name,
          onClick: () => navigateTo(`#/subject-quizzes/${subject._id}`),
        })
      );
    },
  });
}
