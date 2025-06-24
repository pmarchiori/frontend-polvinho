import { CreationButton } from "../components/CreationButton.js";
import { Title } from "../components/Title.js";
import { UserListing } from "../components/UserListing.js";

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
  returnButton.classList.add("return-btn");

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

  const chartNames = document.createElement("div");
  chartNames.classList.add("chart-names");

  const registration = document.createElement("p");
  registration.textContent = "Matrícula";
  const name = document.createElement("p");
  name.textContent = "Nome";
  const subjects = document.createElement("p");
  subjects.textContent = "Disciplinas";
  const actions = document.createElement("p");
  actions.textContent = "Ações";

  chartNames.append(registration, name, subjects, actions);

  const userList = UserListing();

  titleArea.appendChild(returnButton);
  titleArea.appendChild(title);
  btnArea.appendChild(addQuizButton);

  header.appendChild(titleArea);
  header.appendChild(btnArea);

  studentList.appendChild(header);
  studentList.appendChild(chartNames);
  studentList.appendChild(userList);

  return studentList;
}
