import { CreationButton } from "../components/Buttons/CreationButton.js";
import { PaginationButton } from "../components/Buttons/PaginationButton.js";
import { ReturnButton } from "../components/Buttons/ReturnButton.js";
import { ChartNames } from "../components/ChartNames.js";
import { SubjectListing } from "../components/SubjectListing.js";
import { Title } from "../components/Title.js";
import { Toaster } from "../components/Toaster.js";
import {
  fetchSubjects,
  removeSubject,
} from "../utils/handlers/subjects/subjectHandler.js";
import { EmptyData } from "../components/EmptyData.js";

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
    route: "#/subject-register",
  });

  const chartNames = ChartNames({
    text1: "Nome",
    text2: "Professor",
    text3: "Quiz",
    text4: "Ações",
  });

  const subjectsArea = document.createElement("div");
  subjectsArea.classList.add("users-area");

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

  function loadSubjects(page = 1) {
    subjectsArea.innerHTML = "";
    fetchSubjects(page)
      .then(({ subjects, total, currentPage, totalPages }) => {
        currentPage = page;

        title.querySelector(
          ".textLg"
        ).textContent = `${total} Disciplinas Cadastradas`;
        paginationText.textContent = `Mostrando ${subjects.length} de ${total} entradas.`;

        if (subjects.length === 0) {
          const emptyComponent = EmptyData({
            text: "Nenhuma disciplina cadastrada",
          });
          subjectsArea.appendChild(emptyComponent);
        } else {
          subjects.forEach((subject) => {
            const subjectComponent = SubjectListing({
              name: subject.name,
              teacher: subject.teacher?.name || "Nenhum professor",
              quizzes: Array.isArray(subject.quizzes) ? subject.quizzes : [],
              onEdit: () => {
                window.location.hash = `#/subject-edit/${subject._id}`;
              },
              onRemove: () => {
                removeSubject(subject._id)
                  .then(() => {
                    Toaster({
                      title: "Disciplina removida!",
                      description: "A disciplina foi eliminada com sucesso.",
                      type: "success",
                    });
                    loadSubjects(currentPage);
                  })
                  .catch((error) => {
                    console.error(error);
                    Toaster({
                      title: "Erro ao remover",
                      description: "Não foi possível eliminar a disciplina.",
                      type: "error",
                    });
                  });
              },
            });
            subjectsArea.appendChild(subjectComponent);
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
    loadSubjects(currentPage);
  });

  nextButton.addEventListener("click", () => {
    currentPage++;
    loadSubjects(currentPage);
  });

  titleArea.append(returnButton, title);
  btnArea.append(createButton);

  header.append(titleArea, btnArea);

  subjectList.append(header, chartNames, subjectsArea, paginationArea);

  returnButton.addEventListener("click", () => {
    window.history.back();
  });

  loadSubjects(currentPage);

  return subjectList;
}
