import { CreationButton } from "../components/Buttons/CreationButton.js";
import { ReturnButton } from "../components/Buttons/ReturnButton.js";
import { ChartNames } from "../components/ChartNames.js";
import { Title } from "../components/Title.js";

export function SubjectList() {
  let currentPage = 1;

  const subjectList = document.createElement("div");
  subjectList.classList.add("user-list");

  const header = document.createElement("div");
  header.classList.add("list-header");

  const titleArea = document.createElement("div");
  titleArea.classList.add("title-area");

  const btnArea = document.createElement("div");

  const returnButton = ReturnButton();

  const title = Title({
    title: "Disciplinas",
    titleClass: "title2",
    titleColor: "var(--stone-900)",
    subtitle: "0 Cadastrados",
    subtitleClass: "textLg",
    subtitleColor: "var(--stone-700)",
  });

  const createButton = CreationButton({
    btnName: "Cadastrar",
    btnClass: "creation-btn",
    route: "",
  });

  const chartNames = ChartNames({
    text1: "Nome",
    text2: "Professor",
    text3: "Quiz",
    text4: "Ações",
  });

  const usersArea = document.createElement("div");
  usersArea.classList.add("users-area");

  titleArea.append(returnButton, title);
  btnArea.append(createButton);

  header.append(titleArea, btnArea);

  subjectList.append(header, chartNames, usersArea);

  returnButton.addEventListener("click", () => {
    window.history.back();
  });

  return subjectList;
}
