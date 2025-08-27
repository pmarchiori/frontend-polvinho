import { SidebarDropdownButton } from "../Buttons/SidebarDropdownButton.js";
import { SidebarItem } from "./SidebarItem.js";

export function SidebarDropdown({ text, iconSrc, options = [] }) {
  const sidebarDropdown = document.createElement("div");
  sidebarDropdown.classList.add("sidebar-dropdown");

  const dropdown = SidebarItem({
    text,
    iconSrc,
    helperIconSrc: "/assets/caret-down.svg",
  });

  const submenu = document.createElement("div");
  submenu.classList.add("sidebar-submenu");
  submenu.style.display = "none";

  options.forEach((opt) => {
    const btn = SidebarDropdownButton({
      text: opt.text,
      route: opt.route,
    });
    submenu.appendChild(btn);
  });

  sidebarDropdown.appendChild(dropdown);
  sidebarDropdown.appendChild(submenu);

  sidebarDropdown.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    submenu.style.display = submenu.style.display === "none" ? "flex" : "none";
  });

  document.addEventListener("click", () => {
    submenu.style.display = "none";
  });

  return sidebarDropdown;
}
