import { QuizAnswer } from "../pages/Student/QuizAnswer.js";
import { AlertModal } from "./AlertModal.js";
import { FormButton } from "./Buttons/FormButton.js";
import { ConfirmModal } from "./ConfirmModal.js";
import { Title } from "./Title.js";

export function InfoCard({
  titleText,
  titleClass,
  showButton = false,
  buttonConfig = {},
  contentType = "attempts",
  attempts = [],
  answers = [],
}) {
  const infoCard = document.createElement("div");
  infoCard.classList.add("info-card");

  const title = Title({
    title: titleText,
    titleClass: titleClass,
    titleColor: "var(--stone-700)",
  });
  infoCard.appendChild(title);

  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add("info-card-content");

  if (contentType === "attempts") {
    if (attempts.length === 0) {
      const emptyMsg = document.createElement("p");
      emptyMsg.textContent = "Você não possui \n nenhuma tentativa.";
      emptyMsg.classList.add("textSm", "empty-message");
      contentWrapper.appendChild(emptyMsg);
    } else {
      attempts.forEach((attempt, i) => {
        const attemptItem = document.createElement("div");
        attemptItem.classList.add("attempt-item");

        const spanTry = document.createElement("span");
        spanTry.textContent = `${i + 1}º Tentativa`;

        const score = document.createElement("strong");
        score.textContent = `${attempt.score} / ${attempt.total}`;

        const link = document.createElement("a");
        link.href = "#";
        link.textContent = "Gabarito";

        attemptItem.append(spanTry, score, link);

        contentWrapper.appendChild(attemptItem);
      });
    }
  }

  if (contentType === "answers") {
    if (answers.length === 0) {
      const emptyMsg = document.createElement("p");
      emptyMsg.textContent = "Nenhuma resposta encontrada.";
      emptyMsg.classList.add("empty-message");
      contentWrapper.appendChild(emptyMsg);
    } else {
      answers.forEach((answer, i) => {
        const answerItem = document.createElement("div");
        answerItem.classList.add("answer-item");

        const spanQuestion = document.createElement("span");
        spanQuestion.textContent = `Pergunta ${i + 1}`;
        spanQuestion.style.color = "var(--stone-700)";

        const spanAnswer = document.createElement("span");
        spanAnswer.textContent = answer;
        spanAnswer.style.color = "var(--stone-700)";

        answerItem.append(spanQuestion, spanAnswer);

        contentWrapper.appendChild(answerItem);
      });
    }
  }

  infoCard.appendChild(contentWrapper);

  if (showButton) {
    const infoCardBtn = FormButton({
      btnName: buttonConfig.btnName || "Enviar",
      btnClass: buttonConfig.btnClass || "default-btn",
    });
    infoCard.appendChild(infoCardBtn);

    infoCardBtn.addEventListener("click", () => {
      const finishQuizModal = ConfirmModal({
        title: "Entregue!",
        message: `O quiz "ADICIONAR NOME DO QUIZ" foi entregue com sucesso.`,
        btnText: "Ver Gabarito",
        onConfirm: () => {
          //adicionar funcionalidade de entregar o quiz
        },
      });
      document.body.appendChild(finishQuizModal);
    });
  }

  return infoCard;
}
