import { Title } from "./Title.js";

export function Question({ question, index }) {
  const questionContainer = document.createElement("div");
  questionContainer.classList.add("question");

  const questionTitle = Title({
    title: `Pergunta ${index + 1}`,
    subtitle: question.question,
    titleClass: "title4",
    subtitleClass: "textMd",
  });

  questionContainer.append(questionTitle);

  question.options.forEach((opt, optIndex) => {
    const questionOption = document.createElement("div");
    questionOption.classList.add("question-option");

    const questionLetter = document.createElement("p");
    questionLetter.textContent = String.fromCharCode(97 + optIndex);
    questionLetter.classList.add("question-letter", "textSm");

    const optionText = document.createElement("p");
    optionText.textContent = opt.option;

    questionOption.append(questionLetter, optionText);
    questionContainer.append(questionOption);
  });

  return questionContainer;
}
