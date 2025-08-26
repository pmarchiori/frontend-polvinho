import { AlertModal } from "../../components/AlertModal.js";
import { FormButton } from "../../components/Buttons/FormButton.js";
import { QuizDetails } from "../../components/QuizDetails.js";
import { StudentAnswerList } from "../../components/StudentAnswerList.js";
import { Title } from "../../components/Title.js";
import { Toaster } from "../../components/Toaster.js";
import {
  fetchQuizById,
  removeQuiz,
  fetchQuizResultsById,
} from "../../handlers/quizzes/quizHandler.js";
import { navigateTo } from "../../routes/navigate.js";

export async function QuizDetailsTeacher(quizId) {
  const [quiz, results] = await Promise.all([
    fetchQuizById(quizId),
    fetchQuizResultsById(quizId),
  ]);

  const quizDetails = QuizDetails(quiz);

  const studentsContainer = document.createElement("div");
  studentsContainer.classList.add("students-container");

  const studentsTitle = Title({
    title: "Alunos que responderam",
    titleClass: "title4",
    titleColor: "var(--stone-700)",
  });

  const deleteQuizBtn = FormButton({
    btnName: "Eliminar Quiz",
    btnClass: "delete-quiz-btn",
  });

  const students = (results || []).map(({ studentId, name, bestScore }) => ({
    _id: studentId,
    name,
    bestScore,
  }));

  const studentList = StudentAnswerList(students, (studentId) => {
    //add navegacao ate a tela de gabarito do aluno -> utilizar answerId
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

  studentsContainer.append(studentsTitle, studentList, deleteQuizBtn);

  quizDetails.append(studentsContainer);
  return quizDetails;
}
