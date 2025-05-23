export function SidebarTop() {
  const sidebarTop = document.createElement("div");
  sidebarTop.classList.add("sidebar-top");

  // const sidebarTopMenu = document.createElement("div");
  // sidebarTopMenu.classList.add("sidebar-menu");

  const sidebarDashboard = document.createElement("div");
  sidebarDashboard.classList.add("sidebar-dashboard");

  const dashboardText = document.createElement("a");
  dashboardText.classList.add("sidebar-menu-text");
  dashboardText.textContent = "Dashboard";

  const sidebarDisciplines = document.createElement("div");
  sidebarDisciplines.classList.add("sidebar-disciplines");

  const disciplinesText = document.createElement("a");
  disciplinesText.classList.add("sidebar-menu-text");
  disciplinesText.textContent = "Painel";

  const polvoLogo = document.createElement("img");
  const dashboardIcon = document.createElement("img");
  const disciplinesIcon = document.createElement("img");

  polvoLogo.src = "/assets/polvo-logo-light.svg";
  polvoLogo.alt = "Logo do polvinho escura";
  polvoLogo.classList.add("polvo-logo");

  dashboardIcon.src = "/assets/House.svg";
  dashboardIcon.alt = "Ícone do dashboard";
  dashboardIcon.classList.add("dashboard-icon");

  disciplinesIcon.src = "/assets/Books.svg";
  disciplinesIcon.alt = "Ícone de disciplinas";
  disciplinesIcon.classList.add("disciplines-icon");

  sidebarDashboard.appendChild(dashboardIcon);
  sidebarDashboard.appendChild(dashboardText);

  sidebarDisciplines.appendChild(disciplinesIcon);
  sidebarDisciplines.appendChild(disciplinesText);

  sidebarTop.appendChild(polvoLogo);
  sidebarTop.appendChild(sidebarDashboard);
  sidebarTop.appendChild(sidebarDisciplines);

  return sidebarTop;
}
