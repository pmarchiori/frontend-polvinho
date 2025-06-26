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
    dashboardItemDescription.href = "#";

    if (typeof onClick === "function") {
      dashboardItemDescription.addEventListener("click", (e) => {
        e.preventDefault();
        onClick();
      });
    }

    dashboardItem.appendChild(dashboardItemDescription);
  }

  return dashboardItem;
}
