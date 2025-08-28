import { AlertModal } from "../../components/Modals/AlertModal.js";
import { FormButton } from "../../components/Buttons/FormButton.js";
import { InfoCard } from "../../components/Quiz/InfoCard.js";
import { QuizDetails } from "../../components/Quiz/QuizDetails.js";
import { fetchQuizById } from "../../handlers/quizzes/quizHandler.js";
import { fetchStudentAttempts } from "../../handlers/answers/answerHandler.js";
import { navigateTo } from "../../routes/navigate.js";
import { Toaster } from "../../components/Toaster.js";

export async function QuizDetailsStudent(quizId) {
  const quiz = await fetchQuizById(quizId);

  const quizDetails = QuizDetails(quiz);

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("students-container");

  const attempts = await fetchStudentAttempts(quizId);

  const infoCard = InfoCard({
    quizId,
    titleText: "Suas Tentativas",
    titleClass: "textMd",
    contentType: "attempts",
    attempts,
  });

  const startQuizBtn = FormButton({
    btnName: "Começar",
    btnClass: "save-quiz-btn",
  });

  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
  );

  const startDate = new Date(quiz.startedDate);
  const endDate = new Date(quiz.finishedDate);

  endDate.setDate(endDate.getDate() + 1);

  if (now < startDate || now >= endDate) {
    startQuizBtn.disabled = true;
  }

  startQuizBtn.addEventListener("click", () => {
    const startQuizModal = AlertModal({
      title: "Deseja começar agora?",
      confirmText: "Começar",
      message:
        "Ao clicar no botão o quiz começará imediatamente e deve ser entregue para sair.",
      onConfirm: () => {
        if (attempts.length < quiz.maxAttempts) {
          navigateTo(`#/quiz-answer/${quiz._id}`);
        } else {
          Toaster({
            type: "error",
            title: "Máximo de tentativas atingido.",
            description: "Você não possui mais tentativas nesse quiz.",
          });
        }
      },
    });
    document.body.appendChild(startQuizModal);
  });

  btnContainer.appendChild(startQuizBtn);
  quizDetails.append(btnContainer, infoCard);

  return quizDetails;
}
