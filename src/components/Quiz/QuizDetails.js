import { formatDate } from "../../utils/formatDate.js";
import { ReturnButton } from "../Buttons/ReturnButton.js";
import { Title } from "../Title.js";

export function QuizDetails(quiz) {
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
  submitDateInfo.textContent = `Data de Entrega: ${formatDate(
    quiz.finishedDate
  )}`;

  quizInfo.append(triesAmountInfo, maxTimeInfo, submitDateInfo);
  guidelinesContainer.append(guidelinesTitle, guidelines, quizInfo);
  titleArea.append(returnButton, title);

  quizDetails.append(titleArea, guidelinesContainer);

  return quizDetails;
}
