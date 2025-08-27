import { FormButton } from "../Buttons/FormButton.js";
import { AlertModal } from "../Modals/AlertModal.js";
import { Title } from "../Title.js";
import { navigateTo } from "../../routes/navigate.js";

export function InfoCard({
  titleText,
  titleClass,
  showButton = false,
  buttonConfig = {},
  contentType = "attempts",
  attempts = [],
  answers = [],
  isResult = false,
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
  infoCard.appendChild(contentWrapper);

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
        spanTry.style.color = "var(--stone-700)";

        const score = document.createElement("strong");
        score.textContent = `${attempt.score} / ${attempt.total}`;
        score.style.color = "var(--stone-900)";

        const viewBtn = document.createElement("button");
        viewBtn.textContent = "Gabarito";
        viewBtn.classList.add("link-btn");
        viewBtn.addEventListener("click", () => {
          console.log("Tentativa selecionada:", attempt);
          navigateTo(`#/quiz-answer-sheet/${attempt._id}`);
        });

        attemptItem.append(spanTry, score, viewBtn);
        contentWrapper.appendChild(attemptItem);
      });
    }
  }

  if (contentType === "answers") {
    const renderAnswers = (answersList) => {
      contentWrapper
        .querySelectorAll(".answer-item, .empty-message")
        .forEach((el) => el.remove());

      if (answersList.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.textContent = "Nenhuma resposta encontrada.";
        emptyMsg.classList.add("empty-message");
        contentWrapper.appendChild(emptyMsg);
      } else {
        answersList.forEach((answer, i) => {
          const answerItem = document.createElement("div");
          answerItem.classList.add("answer-item");

          const spanQuestion = document.createElement("span");
          spanQuestion.textContent = `Pergunta ${i + 1}`;
          spanQuestion.style.color = "var(--stone-700)";

          const spanAnswer = document.createElement("span");
          spanAnswer.textContent = answer.letter.toUpperCase() || "-";

          if (isResult) {
            if (answer.isCorrect) {
              spanAnswer.classList.add("correct");
            } else {
              spanAnswer.classList.add("wrong");
            }
          } else {
            spanAnswer.classList.remove("correct", "wrong");
          }

          answerItem.append(spanQuestion, spanAnswer);
          contentWrapper.appendChild(answerItem);
        });
      }
    };

    renderAnswers(answers);
    infoCard.updateAnswers = renderAnswers;
  }

  if (showButton && !isResult) {
    const infoCardBtn = FormButton({
      btnName: buttonConfig.btnName || "Enviar",
      btnClass: buttonConfig.btnClass || "default-btn",
    });
    infoCard.appendChild(infoCardBtn);

    infoCardBtn.addEventListener("click", () => {
      const confirmFinishQuizModal = AlertModal({
        title: "Entregar quiz?",
        message: "Você irá entregar o quiz. Esta ação não pode ser desfeita.",
        confirmText: "Entregar",
        onConfirm: buttonConfig.onConfirm,
      });
      document.body.appendChild(confirmFinishQuizModal);
    });
  }

  return infoCard;
}
