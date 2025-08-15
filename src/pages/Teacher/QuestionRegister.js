import { ReturnButton } from "../../components/Buttons/ReturnButton.js";
import { QuestionOptionInput } from "../../components/Inputs/QuestionOptionInput.js";
import { TextInputField } from "../../components/Inputs/TextInputField.js";
import { Title } from "../../components/Title.js";
import { fetchQuizById } from "../../handlers/quizzes/quizHandler.js";

export async function QuestionRegister(quizId) {
  const questionRegister = document.createElement("div");
  questionRegister.classList.add("user-list");

  const header = document.createElement("div");
  header.classList.add("register-header");

  const returnButton = ReturnButton();
  returnButton.addEventListener("click", () => window.history.back());

  const quiz = await fetchQuizById(quizId);

  const title = Title({
    title: quiz?.name || "Criar Perguntas",
    subtitle: quiz?.subject?.name || "Disciplina",
    titleClass: "title2",
    titleColor: "var(--stone-900)",
    subtitleClass: "textLg",
    subtitleColor: "var(--stone-700)",
  });

  header.append(returnButton, title);

  const inputsContainer = document.createElement("div");
  inputsContainer.classList.add("inputs-container");

  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question-div");

  const questionIssueInput = TextInputField({
    label: "Questão",
    inputClass: "register-input",
    placeholder: "Digite aqui a pergunta...",
    inputWrapperClass: "input-wrapper-quiz",
    name: "question",
    fieldClass: "question-input-field",
  });

  questionDiv.appendChild(questionIssueInput);

  const optionsDiv = document.createElement("div");
  optionsDiv.classList.add("options-div");

  const correctOption = QuestionOptionInput({
    correct: true,
    placeholder: "Digite aqui a resposta correta...",
    name: "resposta1",
  });

  const incorrectOption1 = QuestionOptionInput({
    correct: false,
    placeholder: "Digite aqui uma alternativa incorreta...",
    name: "resposta2",
  });

  const incorrectOption2 = QuestionOptionInput({
    correct: false,
    placeholder: "Digite aqui uma alternativa incorreta...",
    name: "resposta3",
  });

  const incorrectOption3 = QuestionOptionInput({
    correct: false,
    placeholder: "Digite aqui uma alternativa incorreta...",
    name: "resposta4",
  });

  optionsDiv.append(
    correctOption,
    incorrectOption1,
    incorrectOption2,
    incorrectOption3
  );

  inputsContainer.append(questionDiv, optionsDiv);
  questionRegister.append(header, inputsContainer);

  return questionRegister;
}
