export function QuestionOptionInput({
  correct = false,
  placeholder = "",
  name,
}) {
  const answerInputField = document.createElement("div");
  answerInputField.classList.add("option-input-field");

  const icon = document.createElement("img");
  icon.classList.add("answer-icon");
  icon.src = correct ? "../assets/CheckCircle.svg" : "../assets/XCircle.svg";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = placeholder;
  input.classList.add("option-input");
  input.classList.add(correct ? "correct-option" : "incorrect-option");
  input.name = name;

  input.dataset.correct = correct ? "true" : "false";

  answerInputField.append(icon, input);

  answerInputField.input = input;

  return answerInputField;
}
