import { Title } from "./Title.js";

export function Question({
  question,
  index,
  onAnswer,
  selectedOptionId = null,
  isResult = false,
}) {
  const questionContainer = document.createElement("div");
  questionContainer.classList.add("question");

  const questionTitle = Title({
    title: `Pergunta ${index + 1}`,
    subtitle: question.text || question.question,
    titleClass: "title4",
    subtitleClass: "textMd",
  });

  questionContainer.append(questionTitle);

  let selectedOption = null;

  question.options.forEach((opt, optIndex) => {
    const questionOption = document.createElement("div");
    questionOption.classList.add("question-option");

    const questionLetter = document.createElement("p");
    questionLetter.textContent = String.fromCharCode(97 + optIndex);
    questionLetter.classList.add("question-letter", "textSm");

    const optionText = document.createElement("p");
    optionText.textContent = opt.text || opt.option || "-";

    questionOption.append(questionLetter, optionText);

    if (isResult) {
      if (selectedOptionId === opt._id) {
        if (opt.isCorrect) {
          questionOption.classList.add("correct");
        } else {
          questionOption.classList.add("wrong");
        }
      }
    } else {
      if (selectedOptionId && selectedOptionId === opt._id) {
        questionOption.classList.add("selected");
        selectedOption = questionOption;
      }

      questionOption.addEventListener("click", () => {
        if (selectedOption) selectedOption.classList.remove("selected");
        questionOption.classList.add("selected");
        selectedOption = questionOption;

        if (onAnswer) {
          onAnswer(question._id, opt._id, optIndex);
        }
      });
    }

    questionContainer.append(questionOption);
  });

  return questionContainer;
}
