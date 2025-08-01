export function DashboardItem({ title, description = "", onClick }) {
  const dashboardItem = document.createElement("div");
  dashboardItem.classList.add("dashboard-item");

  const dashboardItemTitle = document.createElement("p");
  dashboardItemTitle.textContent = title;
  dashboardItemTitle.classList.add("textMd");

  dashboardItem.appendChild(dashboardItemTitle);

  if (description) {
    const dashboardItemDescription = document.createElement("a");
    dashboardItemDescription.textContent = description;
    dashboardItemDescription.classList.add("textMd");
    dashboardItemDescription.style.color = "var(--indigo-700)";

    dashboardItem.appendChild(dashboardItemDescription);
  }

  if (typeof onClick === "function") {
    dashboardItem.addEventListener("click", (e) => {
      e.preventDefault();
      onClick();
    });
  }

  return dashboardItem;
}
