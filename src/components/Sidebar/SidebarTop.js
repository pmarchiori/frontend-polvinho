import { navigateTo } from "../../routes/navigate.js";
import { SidebarDropdown } from "./SidebarDropdown.js";
import { SidebarItem } from "./SidebarItem.js";

export function SidebarTop({ role, subjects }) {
  const sidebarTop = document.createElement("div");
  sidebarTop.classList.add("sidebar-top");

  const polvoLogo = document.createElement("img");
  polvoLogo.src = "/assets/polvo-logo-light.svg";
  polvoLogo.alt = "Logo do polvinho clara";
  polvoLogo.classList.add("polvo-logo");

  const sidebarDashboard = SidebarItem({
    text: "Dashboard",
    iconSrc: "/assets/House.svg",
    onClick: () => {
      navigateTo("#/dashboard");
    },
  });

  sidebarTop.append(polvoLogo, sidebarDashboard);

  if (role === "admin") {
    const sidebarPanel = SidebarDropdown({
      text: "Painel",
      iconSrc: "/assets/Books.svg",
      options: [
        { text: "Alunos", route: "students" },
        { text: "Professores", route: "teachers" },
        { text: "Disciplinas", route: "subjects" },
      ],
    });
    sidebarTop.appendChild(sidebarPanel);
  } else if (role === "student") {
    const subjectsDropdown = SidebarDropdown({
      text: "Disciplinas",
      iconSrc: "/assets/Books.svg",
      options: subjects.map((s) => ({
        text: s.name,
        route: `subjects/${s._id}`,
      })),
    });
    sidebarTop.appendChild(subjectsDropdown);
  } else if (role === "teacher") {
    const subjectsDropdown = SidebarDropdown({
      text: "Disciplinas",
      iconSrc: "/assets/Books.svg",
      options: subjects.map((s) => ({
        text: s.name,
        route: `subjects/${s._id}`,
      })),
    });
    sidebarTop.appendChild(subjectsDropdown);

    const createQuizBtn = SidebarItem({
      text: "Criar Quiz",
      iconSrc: "/assets/file-plus.svg",
      onClick: () => {
        navigateTo("#/quiz-register");
      },
    });
    sidebarTop.appendChild(createQuizBtn);
  }

  return sidebarTop;
}
