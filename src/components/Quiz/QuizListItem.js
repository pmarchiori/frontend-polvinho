export function QuizListItem({ title, finalDate, quizType, onClick }) {
  const quizListItem = document.createElement("div");
  quizListItem.classList.add("dashboard-item");

  const quizListItemTitle = document.createElement("p");
  quizListItemTitle.textContent = title;
  quizListItemTitle.classList.add("textMd", "col-quiz-name", "list-text");

  const finalDateText = document.createElement("p");
  finalDateText.textContent = finalDate;
  finalDateText.classList.add("textMd", "col-data", "list-text");
  finalDateText.style.color = "var(--stone-600)";

  const type = document.createElement("p");
  type.textContent = quizType;
  type.classList.add("textMd", "quiz-type", "list-text", "col-type");

  quizListItem.append(quizListItemTitle, finalDateText, type);

  if (typeof onClick === "function") {
    quizListItem.addEventListener("click", (e) => {
      e.preventDefault();
      onClick();
    });
  }

  return quizListItem;
}
