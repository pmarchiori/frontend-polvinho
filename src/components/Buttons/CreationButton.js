import { navigateTo } from "../../routes/navigate.js";

export function CreationButton({ btnName, btnClass, route }) {
  const creationButton = document.createElement("button");
  creationButton.classList.add(btnClass);
  creationButton.classList.add("textMd");

  const creationIcon = document.createElement("img");
  creationIcon.src = "/assets/FilePlus.svg";
  creationIcon.alt = "Ícone de adicionar novo item";

  const textSpan = document.createElement("span");
  textSpan.textContent = btnName;

  creationButton.appendChild(creationIcon);
  creationButton.appendChild(textSpan);

  if (route) {
    creationButton.addEventListener("click", () => {
      navigateTo(route);
    });
  }

  return creationButton;
}
