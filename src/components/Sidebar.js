import { SidebarBottom } from "./SidebarBottom.js";
import { SidebarTop } from "./SidebarTop.js";

export function createSidebar() {
  const sidebar = document.createElement("aside");
  sidebar.classList.add("sidebar");

  // const p = document.createElement("p");
  // p.textContent = "testando essa bomba";
  // sidebar.appendChild(p);

  const sidebarTop = SidebarTop();
  sidebar.appendChild(sidebarTop);

  const sidebarBottom = SidebarBottom();
  sidebar.appendChild(sidebarBottom);

  return sidebar;
}
