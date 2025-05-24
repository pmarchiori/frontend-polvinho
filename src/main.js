import { createSidebar } from "../src/components/Sidebar.js";
import { Dashboard } from "../src/pages/Dashboard.js";

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const sidebar = createSidebar();
  container.appendChild(sidebar);

  const dashboard = Dashboard();
  container.appendChild(dashboard);
});
