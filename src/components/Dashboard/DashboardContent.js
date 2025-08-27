import { Title } from "../../components/Title.js";
import { EmptyData } from "../../components/EmptyData.js";

export async function DashboardContent({
  title,
  subtitle,
  listTitle,
  itemsLoader,
}) {
  const dashboard = document.createElement("div");
  dashboard.classList.add("dashboard");

  const titleContent = Title({
    title,
    subtitle,
    titleClass: "title2",
    subtitleClass: "textXl",
    titleColor: "var(--stone-900)",
    subtitleColor: "var(--stone-700)",
  });
  titleContent.classList.add("dashboard-title");
  dashboard.appendChild(titleContent);

  const itemsArea = document.createElement("div");
  itemsArea.classList.add("items-area");

  const listTitleText = document.createElement("p");
  listTitleText.textContent = listTitle;
  listTitleText.classList.add("title4", "dashboard-list-title");

  itemsArea.append(listTitleText);

  try {
    const items = await itemsLoader();
    if (items && items.length > 0) {
      items.forEach((item) => itemsArea.appendChild(item));
    } else {
      itemsArea.appendChild(
        EmptyData({ text: "Nenhuma disciplina cadastrada" })
      );
    }
  } catch (err) {
    console.error("Erro ao carregar dados do dashboard:", err);
    itemsArea.appendChild(EmptyData({ text: "Erro ao carregar dados" }));
  }

  dashboard.appendChild(itemsArea);
  return dashboard;
}
