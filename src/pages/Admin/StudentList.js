import { CreationButton } from "../../components/Buttons/CreationButton.js";
import { EmptyData } from "../../components/EmptyData.js";
import { ReturnButton } from "../../components/Buttons/ReturnButton.js";
import { Title } from "../../components/Title.js";
import { UserListing } from "../../components/UserListing.js";
import {
  fetchStudents,
  removeStudent,
} from "../../utils/handlers/users/userHandler.js";
import { Toaster } from "../../components/Toaster.js";
import { ChartNames } from "../../components/ChartNames.js";
import { PaginationButton } from "../../components/Buttons/PaginationButton.js";

export function StudentList() {
  let currentPage = 1;

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

  function loadStudents(page = 1) {
    usersArea.innerHTML = "";
    fetchStudents(page)
      .then(({ users, total, currentPage, totalPages }) => {
        currentPage = page;

        title.querySelector(".textLg").textContent = `${total} Cadastrados`;
        paginationText.textContent = `Mostrando ${users.length} de ${total} entradas.`;

        if (users.length === 0) {
          const emptyComponent = EmptyData({ text: "Nenhum aluno cadastrado" });
          usersArea.appendChild(emptyComponent);
        } else {
          users.forEach((user) => {
            const userComponent = UserListing({
              registration: user.registration,
              name: user.name,
              subjects: Array.isArray(user.subjects) ? user.subjects : [],
              onEdit: () => {
                window.location.hash = `#/student-edit/${user._id}`;
              },
              onRemove: () => {
                removeStudent(user._id)
                  .then(() => {
                    Toaster({
                      title: "Aluno removido!",
                      description: "O aluno foi eliminado com sucesso.",
                      type: "success",
                    });
                    loadStudents(currentPage);
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
            usersArea.appendChild(userComponent);
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
    loadStudents(currentPage);
  });

  nextButton.addEventListener("click", () => {
    currentPage++;
    loadStudents(currentPage);
  });

  titleArea.appendChild(returnButton);
  titleArea.appendChild(title);
  btnArea.appendChild(createButton);

  header.appendChild(titleArea);
  header.appendChild(btnArea);

  studentList.appendChild(header);
  studentList.appendChild(chartNames);
  studentList.appendChild(usersArea);
  studentList.appendChild(paginationArea);

  returnButton.addEventListener("click", () => {
    window.history.back();
  });

  loadStudents(currentPage);

  return studentList;
}
