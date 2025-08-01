import { navigateTo } from "../../routes/navigate.js";

export function SidebarDropdownButton({ text, route }) {
  const sidebarDropdownButton = document.createElement("button");
  sidebarDropdownButton.textContent = text;
  sidebarDropdownButton.classList.add("sidebar-dropdown-btn");

  sidebarDropdownButton.onclick = (e) => {
    e.stopPropagation();
    navigateTo(`#/${route}`);
  };

  return sidebarDropdownButton;
}
