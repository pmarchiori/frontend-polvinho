import { navigateTo } from "../routes/navigate.js";
import { SidebarDropdown } from "./SidebarDropdown.js";
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

  const sidebarPanel = SidebarDropdown();

  const polvoLogo = document.createElement("img");

  polvoLogo.src = "/assets/polvo-logo-light.svg";
  polvoLogo.alt = "Logo do polvinho clara";
  polvoLogo.classList.add("polvo-logo");

  sidebarTop.appendChild(polvoLogo);
  sidebarTop.appendChild(sidebarDashboard);
  sidebarTop.appendChild(sidebarPanel);

  return sidebarTop;
}
