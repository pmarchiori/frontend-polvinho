import { navigateTo } from "../routes/navigate.js";
import { SidebarItem } from "./SidebarItem.js";

export function SidebarBottom() {
  const sidebarBottom = document.createElement("div");
  sidebarBottom.classList.add("sidebar-bottom");

  const sidebarPassword = SidebarItem({
    text: "Trocar senha",
    iconSrc: "/assets/Password.svg",
    onClick: () => {
      navigateTo("#/change-password");
    },
  });

  const sidebarFinishSession = SidebarItem({
    text: "Encerrar sessão",
    iconSrc: "/assets/SignOut.svg",
    onClick: () => {
      navigateTo("#/login");
    },
  });

  sidebarBottom.appendChild(sidebarPassword);
  sidebarBottom.appendChild(sidebarFinishSession);

  return sidebarBottom;
}
