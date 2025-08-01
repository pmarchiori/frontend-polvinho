import { Title } from "../../components/Title.js";
import { navigateTo } from "../../routes/navigate.js";
import { DashboardItem } from "../../components/Dashboard/DashboardItem.js";
import { fetchUserById } from "../../handlers/users/userHandler.js";
import { EmptyData } from "../../components/EmptyData.js";

export async function DashboardTeacher({ userId }) {
  const dashboard = document.createElement("div");
  dashboard.classList.add("dashboard");

  const titleContent = Title({
    title: "Dashboard",
    subtitle: `Bem-vindo, Professor!`,
    titleClass: "title2",
    subtitleClass: "textXl",
    titleColor: "var(--stone-900)",
    subtitleColor: "var(--stone-700)",
  });
  titleContent.classList.add("dashboard-title");
  dashboard.appendChild(titleContent);

  const itemsArea = document.createElement("div");
  itemsArea.classList.add("items-area");

  try {
    const teacher = await fetchUserById(userId);

    if (teacher?.subjects && teacher.subjects.length > 0) {
      teacher.subjects.forEach((subject) => {
        itemsArea.appendChild(
          DashboardItem({
            title: subject.name,
            onClick: () => navigateTo(404),
          })
        );
      });
    } else {
      itemsArea.appendChild(EmptyData());
    }
  } catch (err) {
    console.error("Erro ao carregar disciplinas do professor:", err);
    const emptyData = EmptyData({ text: "Nenhuma disciplina cadastrada" });
    itemsArea.appendChild(emptyData);
  }

  dashboard.appendChild(itemsArea);
  return dashboard;
}
