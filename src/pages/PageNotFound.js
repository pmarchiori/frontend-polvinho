import { FormButton } from "../components/FormButton.js";
import { Title } from "../components/Title.js";
import { navigateTo } from "../routes/navigate.js";

export function PageNotFound() {
  const notFoundContainer = document.createElement("div");
  notFoundContainer.classList.add("not-found-container");

  const notFoundImage = document.createElement("img");
  notFoundImage.src = "/assets/404-error.png";
  notFoundImage.alt = "Página não encontrada";
  notFoundImage.classList.add("not-found-image");

  const notFoundTitle = Title({
    title: "Página não encontrada",
    subtitle: "Não conseguimos encontrar a página que você procura :(",
    titleClass: "title1",
    subtitleClass: "textMd",
  });

  const notFoundButton = FormButton({
    btnName: "Voltar",
    btnClass: "form-btn",
  });

  notFoundButton.addEventListener("click", () => {
    navigateTo("#/login");
  });

  notFoundContainer.appendChild(notFoundImage);
  notFoundContainer.appendChild(notFoundTitle);
  notFoundContainer.appendChild(notFoundButton);

  return notFoundContainer;
}
