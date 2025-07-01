import { CreationButton } from "../components/CreationButton.js";
import { EmptyData } from "../components/EmptyData.js";
import { ReturnButton } from "../components/ReturnButton.js";
import { Title } from "../components/Title.js";
import { UserListing } from "../components/UserListing.js";
import { fetchStudents } from "../utils/handlers/userHandler.js";

export function StudentList() {
  const studentList = document.createElement("div");
  studentList.classList.add("user-list");

  const header = document.createElement("div");
  header.classList.add("list-header");

  const titleArea = document.createElement("div");
  titleArea.classList.add("title-area");
  const btnArea = document.createElement("div");

  const returnButton = ReturnButton();

  const title = Title({
    title: "Alunos",
    titleClass: "title2",
    titleColor: "var(--stone-900)",
    subtitle: "0 Cadastrados",
    subtitleClass: "textLg",
    subtitleColor: "var(--stone-700)",
  });

  const createButton = CreationButton({
    btnName: "Cadastrar",
    btnClass: "creation-btn",
    route: "#/student-register",
  });

  const chartNames = document.createElement("div");
  chartNames.classList.add("chart-names");

  const registration = document.createElement("p");
  registration.textContent = "Matrícula";
  registration.classList.add("col-registration", "textSm", "chart-names-text");

  const name = document.createElement("p");
  name.textContent = "Nome";
  name.classList.add("col-name", "textSm", "chart-names-text");

  const subjects = document.createElement("p");
  subjects.textContent = "Disciplinas";
  subjects.classList.add("col-subjects", "textSm", "chart-names-text");

  const actions = document.createElement("p");
  actions.textContent = "Ações";
  actions.classList.add("col-actions", "textSm", "chart-names-text");

  chartNames.append(registration, name, subjects, actions);

  const usersArea = document.createElement("div");
  usersArea.classList.add("users-area");

  fetchStudents()
    .then((alunos) => {
      title.querySelector(
        ".textLg"
      ).textContent = `${alunos.length} Cadastrados`;

      if (alunos.length === 0) {
        const emptyComponent = EmptyData({ text: "Nenhum aluno cadastrado" });
        studentList.appendChild(emptyComponent);
      } else {
        alunos.forEach((user) => {
          const userComponent = UserListing({
            registration: user.registration,
            name: user.name,
            subjects: user.subject ? [user.subject] : [],
            onEdit: () => {
              window.location.hash = `#/student-edit/${user._id}`;
            },
          });
          usersArea.appendChild(userComponent);
        });

        //TESTANDO PRA FAZER A PAGINAÇÃO
        // alunos.forEach((user) => {
        //   const userComponent2 = UserListing({
        //     registration: user.registration,
        //     name: user.name,
        //     subjects: user.subject ? [user.subject] : [],
        //   });
        //   usersArea.appendChild(userComponent2);
        // });

        studentList.appendChild(chartNames);
        studentList.appendChild(usersArea);
      }
    })
    .catch((err) => {
      title.querySelector(".textLg").textContent = "Erro ao carregar";
    });

  titleArea.appendChild(returnButton);
  titleArea.appendChild(title);
  btnArea.appendChild(createButton);

  header.appendChild(titleArea);
  header.appendChild(btnArea);

  studentList.appendChild(header);

  return studentList;
}
