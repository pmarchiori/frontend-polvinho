import { CreationButton } from "../components/Buttons/CreationButton.js";
import { ReturnButton } from "../components/Buttons/ReturnButton.js";
import { EmptyData } from "../components/EmptyData.js";
import { Title } from "../components/Title.js";
import { Toaster } from "../components/Toaster.js";
import { UserListing } from "../components/UserListing.js";
import { fetchTeachers, removeTeacher } from "../utils/handlers/userHandler.js";

export function TeacherList() {
  const teacherList = document.createElement("div");
  teacherList.classList.add("user-list");

  const header = document.createElement("div");
  header.classList.add("list-header");

  const titleArea = document.createElement("div");
  titleArea.classList.add("title-area");

  const btnArea = document.createElement("div");

  const returnButton = ReturnButton();

  const title = Title({
    title: "Professores",
    titleClass: "title2",
    titleColor: "var(--stone-900)",
    subtitle: "0 Cadastrados",
    subtitleClass: "textLg",
    subtitleColor: "var(--stone-700)",
  });

  const createButton = CreationButton({
    btnName: "Cadastrar",
    btnClass: "creation-btn",
    route: "#/teacher-register",
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

  fetchTeachers()
    .then((teachers) => {
      title.querySelector(
        ".textLg"
      ).textContent = `${teachers.length} Cadastrados`;

      if (teachers.length === 0) {
        const emptyComponent = EmptyData({
          text: "Nenhum professor cadastrado",
        });
        teacherList.appendChild(emptyComponent);
      } else {
        teachers.forEach((user) => {
          const userComponent = UserListing({
            registration: user.registration,
            name: user.name,
            subjects: user.subject ? [user.subject] : [],
            onEdit: () => {
              window.location.hash = `#/teacher-edit/${user._id}`;
            },
            onRemove: () => {
              removeTeacher(user._id)
                .then(() => {
                  Toaster({
                    title: "Professor removido",
                    description: "O professor foi eliminado com sucesso.",
                    type: "success",
                  });
                })
                .catch((error) => {
                  console.error(error);
                  Toaster({
                    title: "Erro ao remover",
                    description: "Não foi possível eliminar o aluno.",
                    type: "error",
                  });
                });
            },
          });
          usersArea.append(userComponent);
        });

        teacherList.appendChild(chartNames);
        teacherList.appendChild(usersArea);
      }
    })
    .catch((err) => {
      title.querySelector(".textLg").textContent = "Erro ao carregar";
    });

  titleArea.append(returnButton, title);
  btnArea.appendChild(createButton);

  header.append(titleArea, btnArea);

  teacherList.appendChild(header);

  returnButton.addEventListener("click", () => {
    window.history.back();
  });

  return teacherList;
}
