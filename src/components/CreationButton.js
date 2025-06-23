export function CreationButton({ btnName, btnClass }) {
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

  return creationButton;
}
