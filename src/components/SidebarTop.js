import { SidebarItem } from "./SidebarItem.js";

export function SidebarTop() {
  const sidebarTop = document.createElement("div");
  sidebarTop.classList.add("sidebar-top");

  const sidebarDashboard = SidebarItem({
    text: "Dashboard",
    iconSrc: "/assets/House.svg",
  });

  const sidebarPanel = SidebarItem({
    text: "Painel",
    iconSrc: "/assets/Books.svg",
    helperIconSrc: "/assets/caret-down.svg",
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
