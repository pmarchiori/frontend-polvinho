import { AlertModal } from "../../components/AlertModal.js";
import { FormButton } from "../../components/Buttons/FormButton.js";
import { InfoCard } from "../../components/InfoCard.js";
import { QuizDetails } from "../../components/QuizDetails.js";
import { fetchQuizById } from "../../handlers/quizzes/quizHandler.js";

export async function QuizDetailsStudent(quizId) {
  const quiz = await fetchQuizById(quizId);

  const quizDetails = QuizDetails(quiz);

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("students-container");

  const infoCard = InfoCard({
    titleText: "Suas tentativas",
    titleClass: "textMd",
  });

  const startQuizBtn = FormButton({
    btnName: "Começar",
    btnClass: "save-quiz-btn",
  });

  //TIRAR ISSO DAQUI, ISSO SO DEVE ESTAR NA TELA DE RESPONDER O QUIZ
  startQuizBtn.addEventListener("click", () => {
    const startQuizModal = AlertModal({
      title: "Deseja começar agora?",
      confirmText: "Começar",
      message:
        "Ao clicar no botão o quiz começará imediatamente e deve ser entregue para sair.",
      onConfirm: () => {
        //ADICIONAR A LOGICA DE COMEÇAR O QUIZ
      },
    });
    document.body.appendChild(startQuizModal);
  });

  btnContainer.appendChild(startQuizBtn);
  quizDetails.append(btnContainer, infoCard);

  return quizDetails;
}
