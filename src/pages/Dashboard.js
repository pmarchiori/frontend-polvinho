import { createSidebar } from "../components/Sidebar.js";

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  const sidebar = createSidebar();
  container.appendChild(sidebar);
});
