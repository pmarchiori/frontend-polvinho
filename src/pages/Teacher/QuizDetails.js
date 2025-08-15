import { AlertModal } from "../../components/AlertModal.js";
import { FormButton } from "../../components/Buttons/FormButton.js";
import { ReturnButton } from "../../components/Buttons/ReturnButton.js";
import { Title } from "../../components/Title.js";
import { Toaster } from "../../components/Toaster.js";
import {
  fetchQuizById,
  removeQuiz,
} from "../../handlers/quizzes/quizHandler.js";
import { navigateTo } from "../../routes/navigate.js";

export async function QuizDetails(quizId) {
  const quiz = await fetchQuizById(quizId);

  const quizDetails = document.createElement("div");
  quizDetails.classList.add("user-list");

  const titleArea = document.createElement("div");
  titleArea.classList.add("title-area");

  const returnButton = ReturnButton();
  returnButton.addEventListener("click", () => window.history.back());

  const title = Title({
    title: quiz.name,
    subtitle: quiz.subject?.name || "Sem disciplina",
    titleClass: "title2",
    titleColor: "var(--stone-900)",
    subtitleClass: "textLg",
    subtitleColor: "var(--stone-700)",
  });

  const guidelinesContainer = document.createElement("div");
  guidelinesContainer.classList.add("guidelines-container");

  const guidelinesTitle = document.createElement("p");
  guidelinesTitle.classList.add("title4");
  guidelinesTitle.style.color = "var(--stone-700)";
  guidelinesTitle.textContent = "Orientações do Professor";

  const guidelines = document.createElement("p");
  guidelines.classList.add("textMd");
  guidelines.style.color = "var(--stone-700)";
  guidelines.textContent = quiz.description || "Sem orientações";

  const quizInfo = document.createElement("ul");
  quizInfo.classList.add("quiz-info-list");

  const triesAmountInfo = document.createElement("li");
  triesAmountInfo.textContent = `Tentativas: ${
    quiz.maxAttempts || "Ilimitadas"
  }`;

  const maxTimeInfo = document.createElement("li");
  maxTimeInfo.textContent = `Tempo máximo: ${quiz.duration} minutos`;

  const submitDateInfo = document.createElement("li");
  submitDateInfo.textContent = `Data de Entrega: ${new Date(
    quiz.finishedDate
  ).toLocaleDateString("pt-BR")}`;

  const studentsContainer = document.createElement("div");
  studentsContainer.classList.add("students-container");

  const studentsTitle = document.createElement("p");
  studentsTitle.textContent = "Alunos que responderam";
  studentsTitle.classList.add("title4");
  studentsTitle.style.color = "var(--stone-700)";

  const deleteQuizBtn = FormButton({
    btnName: "Eliminar Quiz",
    btnClass: "delete-quiz-btn",
  });

  deleteQuizBtn.addEventListener("click", () => {
    const confirmDeleteModal = AlertModal({
      title: "Tem certeza?",
      message: `Você irá eliminar o quiz ${quiz.name}. Esta ação não pode ser desfeita.`,
      type: "delete",
      confirmText: "Eliminar",
      onConfirm: () => {
        removeQuiz(quizId)
          .then(() => {
            Toaster({
              title: "Sucesso!",
              description: `O quiz ${quiz.name} foi removido.`,
              type: "success",
            });
          })
          .catch(() => {
            Toaster({
              title: "Erro ao remover",
              description: "Não foi possível remover o quiz",
              type: "error",
            });
          });
        const subjectId = quiz.subject?._id || quiz.subject;
        navigateTo(`#/subject-quizzes/${subjectId}`);
      },
    });
    document.body.appendChild(confirmDeleteModal);
  });

  quizInfo.append(triesAmountInfo, maxTimeInfo, submitDateInfo);
  guidelinesContainer.append(guidelinesTitle, guidelines, quizInfo);

  studentsContainer.append(studentsTitle, deleteQuizBtn);

  titleArea.append(returnButton, title);
  quizDetails.append(titleArea, guidelinesContainer, studentsContainer);

  return quizDetails;
}
