import { SidebarItem } from "./SidebarItem.js";

export function SidebarBottom() {
  const sidebarBottom = document.createElement("div");
  sidebarBottom.classList.add("sidebar-bottom");

  const sidebarPassword = SidebarItem({
    text: "Trocar senha",
    iconSrc: "/assets/Password.svg",
  });

  const sidebarFinishSession = SidebarItem({
    text: "Encerrar sessão",
    iconSrc: "/assets/SignOut.svg",
  });

  sidebarBottom.appendChild(sidebarPassword);
  sidebarBottom.appendChild(sidebarFinishSession);

  return sidebarBottom;
}
