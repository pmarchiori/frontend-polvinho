export function DashboardItem({ title, description }) {
  const dashboardItem = document.createElement("div");
  dashboardItem.classList.add("dashboard-item");

  const dashboardItemTitle = document.createElement("p");
  dashboardItemTitle.textContent = title;
  dashboardItemTitle.classList.add("textMd");

  const dashboardItemDescription = document.createElement("a");
  dashboardItemDescription.textContent = description;
  dashboardItemDescription.classList.add("textMd");
  dashboardItemDescription.style.color = "var(--indigo-700)";

  dashboardItem.appendChild(dashboardItemTitle);
  dashboardItem.appendChild(dashboardItemDescription);

  return dashboardItem;
}
