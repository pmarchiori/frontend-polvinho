import { AlertModal } from "../../components/AlertModal.js";
import { FormButton } from "../../components/Buttons/FormButton.js";
import { QuizDetails } from "../../components/QuizDetails.js";
import { Toaster } from "../../components/Toaster.js";
import {
  fetchQuizById,
  removeQuiz,
} from "../../handlers/quizzes/quizHandler.js";
import { navigateTo } from "../../routes/navigate.js";

export async function QuizDetailsTeacher(quizId) {
  const quiz = await fetchQuizById(quizId);

  const quizDetails = QuizDetails(quiz);

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

  studentsContainer.append(studentsTitle, deleteQuizBtn);

  quizDetails.append(studentsContainer);

  return quizDetails;
}
