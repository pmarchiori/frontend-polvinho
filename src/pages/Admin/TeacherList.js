import { CreationButton } from "../../components/Buttons/CreationButton.js";
import { PaginationButton } from "../../components/Buttons/PaginationButton.js";
import { ReturnButton } from "../../components/Buttons/ReturnButton.js";
import { ChartNames } from "../../components/ChartNames.js";
import { EmptyData } from "../../components/EmptyData.js";
import { Title } from "../../components/Title.js";
import { Toaster } from "../../components/Toaster.js";
import { UserListing } from "../../components/UserListing.js";
import {
  fetchTeachers,
  removeTeacher,
} from "../../handlers/users/userHandler.js";

export function TeacherList() {
  let currentPage = 1;

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

  const chartNames = ChartNames({
    text1: "Matrícula",
    text2: "Nome",
    text3: "Disciplinas",
    text4: "Ações",
  });

  const usersArea = document.createElement("div");
  usersArea.classList.add("users-area");

  const paginationArea = document.createElement("div");
  paginationArea.classList.add("pagination");

  const paginationText = document.createElement("p");
  paginationText.classList.add("pagination-text");
  paginationText.textContent = "Mostrando X de X entradas.";

  const paginationButtons = document.createElement("div");
  paginationButtons.classList.add("pagination-btns-container");

  const prevButton = PaginationButton({
    btnName: "Anterior",
    initiateDisabled: true,
  });

  const nextButton = PaginationButton({
    btnName: "Próxima",
  });

  paginationButtons.append(prevButton, nextButton);
  paginationArea.append(paginationText, paginationButtons);

  function loadTeachers(page = 1) {
    usersArea.innerHTML = "";
    fetchTeachers(page)
      .then(({ users, total, currentPage, totalPages }) => {
        currentPage = page;

        title.querySelector(".textLg").textContent = `${total} Cadastrados`;
        paginationText.textContent = `Mostrando ${users.length} de ${total} entradas.`;

        if (users.length === 0) {
          const emptyComponent = EmptyData({
            text: "Nenhum professor cadastrado",
          });
          usersArea.appendChild(emptyComponent);
        } else {
          users.forEach((user) => {
            const userComponent = UserListing({
              registration: user.registration,
              name: user.name,
              subjects: Array.isArray(user.subjects) ? user.subjects : [],
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
                    loadTeachers(currentPage);
                  })
                  .catch((error) => {
                    console.error(error);
                    Toaster({
                      title: "Erro ao remover",
                      description: "Não foi possível eliminar o professor.",
                      type: "error",
                    });
                  });
              },
            });
            usersArea.append(userComponent);
          });
        }
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
      })
      .catch((err) => {
        title.querySelector(".textLg").textContent = "Erro ao carregar";
      });
  }

  prevButton.addEventListener("click", () => {
    currentPage--;
    loadTeachers(currentPage);
  });

  nextButton.addEventListener("click", () => {
    currentPage++;
    loadTeachers(currentPage);
  });

  titleArea.append(returnButton, title);
  btnArea.appendChild(createButton);

  header.append(titleArea, btnArea);

  teacherList.appendChild(header);
  teacherList.appendChild(chartNames);
  teacherList.appendChild(usersArea);
  teacherList.appendChild(paginationArea);

  returnButton.addEventListener("click", () => {
    window.history.back();
  });

  loadTeachers(currentPage);

  return teacherList;
}
