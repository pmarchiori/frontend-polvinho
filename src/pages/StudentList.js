import { CreationButton } from "../components/CreationButton.js";
import { Title } from "../components/Title.js";

export function StudentList() {
  const studentList = document.createElement("div");
  studentList.classList.add("user-list");

  const header = document.createElement("div");
  header.classList.add("list-header");

  const titleArea = document.createElement("div");
  titleArea.classList.add("title-area");
  const btnArea = document.createElement("div");

  const returnButton = document.createElement("img");
  returnButton.src = "/assets/caret-left.svg";
  returnButton.classList.add("return-button");

  const title = Title({
    title: "Alunos",
    titleClass: "title2",
    titleColor: "var(--stone-900)",
    subtitle: "X Cadastrados",
    subtitleClass: "textLg",
    subtitleColor: "var(--stone-700)",
  });

  const addQuizButton = CreationButton({
    btnName: "Criar Quiz",
    btnClass: "creation-btn",
  });

  titleArea.appendChild(returnButton);
  titleArea.appendChild(title);
  btnArea.appendChild(addQuizButton);

  header.appendChild(titleArea);
  header.appendChild(btnArea);

  studentList.appendChild(header);

  return studentList;
}
