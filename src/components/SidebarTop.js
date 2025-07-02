import { navigateTo } from "../routes/navigate.js";
import { SidebarItem } from "./SidebarItem.js";

export function SidebarTop() {
  const sidebarTop = document.createElement("div");
  sidebarTop.classList.add("sidebar-top");

  const sidebarDashboard = SidebarItem({
    text: "Dashboard",
    iconSrc: "/assets/House.svg",
    onClick: () => {
      navigateTo("#/dashboard");
    },
  });

  const sidebarPanel = SidebarItem({
    text: "Painel",
    iconSrc: "/assets/Books.svg",
    helperIconSrc: "/assets/caret-down.svg",
    onClick: () => {
      navigateTo("#/students"); //TEMPORARIO, ATE FAZER LOGICA DE PERFIS
    },
  });

  const polvoLogo = document.createElement("img");

  polvoLogo.src = "/assets/polvo-logo-light.svg";
  polvoLogo.alt = "Logo do polvinho clara";
  polvoLogo.classList.add("polvo-logo");

  sidebarTop.appendChild(polvoLogo);
  sidebarTop.appendChild(sidebarDashboard);
  sidebarTop.appendChild(sidebarPanel);

  return sidebarTop;
}
