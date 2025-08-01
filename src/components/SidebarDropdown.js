import { SidebarDropdownButton } from "./Buttons/SidebarDropdownButton.js";
import { SidebarItem } from "./SidebarItem.js";

export function SidebarDropdown() {
  const sidebarDropdown = document.createElement("div");
  sidebarDropdown.classList.add("sidebar-dropdown");

  const dropdown = SidebarItem({
    text: "Painel",
    iconSrc: "/assets/Books.svg",
    helperIconSrc: "/assets/caret-down.svg",
  });

  const submenu = document.createElement("div");
  submenu.classList.add("sidebar-submenu");
  submenu.style.display = "none";

  const btnStudents = SidebarDropdownButton({
    text: "Alunos",
    route: "students",
  });

  const btnTeachers = SidebarDropdownButton({
    text: "Professores",
    route: "teachers",
  });

  const btnSubjects = SidebarDropdownButton({
    text: "Disciplinas",
    route: "subjects",
  });

  submenu.append(btnStudents, btnTeachers, btnSubjects);

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
