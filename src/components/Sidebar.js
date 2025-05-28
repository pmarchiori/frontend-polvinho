import { SidebarBottom } from "./SidebarBottom.js";
import { SidebarTop } from "./SidebarTop.js";

export function Sidebar() {
  const sidebar = document.createElement("aside");
  sidebar.classList.add("sidebar");

  const sidebarTop = SidebarTop();
  sidebar.appendChild(sidebarTop);

  const sidebarBottom = SidebarBottom();
  sidebar.appendChild(sidebarBottom);

  return sidebar;
}
