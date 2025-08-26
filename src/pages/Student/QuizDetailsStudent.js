import { AlertModal } from "../../components/AlertModal.js";
import { FormButton } from "../../components/Buttons/FormButton.js";
import { InfoCard } from "../../components/InfoCard.js";
import { QuizDetails } from "../../components/QuizDetails.js";
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
