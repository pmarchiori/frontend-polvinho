import { createTitle } from "../components/Titles.js";

export function Dashboard() {
  const dashboard = document.createElement("div");
  dashboard.classList.add("dashboard");

  const titleContent = createTitle("Dashboard", "Bem vindo, Admin!");

  dashboard.appendChild(titleContent);
  return dashboard;
}
