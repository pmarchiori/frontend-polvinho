import { SidebarBottom } from "./SidebarBottom.js";
import { SidebarTop } from "./SidebarTop.js";

export function Sidebar({ role, subjects = [] }) {
  const sidebar = document.createElement("aside");
  sidebar.classList.add("sidebar");

  const sidebarTop = SidebarTop({ role, subjects });
  sidebar.appendChild(sidebarTop);

  const sidebarBottom = SidebarBottom();
  sidebar.appendChild(sidebarBottom);

  return sidebar;
}
