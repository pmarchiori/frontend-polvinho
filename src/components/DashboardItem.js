export function DashboardItem(title, description) {
  const dashboardItem = document.createElement("div");
  dashboardItem.classList.add("dashboard-item");

  const dashboardItemTitle = document.createElement("p");
  dashboardItemTitle.textContent = title;

  //CRIAR AS CLASSES DE TEXTO DO FIGMA E APLICAR AQUI
  const dashboardItemDescription = document.createElement("a");
  dashboardItemDescription.textContent = description;
  dashboardItemDescription.style.color = "var(--indigo-700)";

  dashboardItem.appendChild(dashboardItemTitle);
  dashboardItem.appendChild(dashboardItemDescription);

  return dashboardItem;
}
