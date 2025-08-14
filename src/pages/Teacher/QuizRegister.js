import { fetchSubjects } from "../../handlers/subjects/subjectHandler.js";
import { ReturnButton } from "../../components/Buttons/ReturnButton.js";
import { TextInputField } from "../../components/Inputs/TextInputField.js";
import { SelectInputField } from "../../components/Inputs/SelectInputField.js";
import { NumberInputField } from "../../components/Inputs/NumberInputField.js";
import { DateInputField } from "../../components/Inputs/DateInputField.js";
import { TextareaInputField } from "../../components/Inputs/TextareaInputField.js";
import { Title } from "../../components/Title.js";
import { handleQuizRegisterSubmit } from "../../handlers/quizzes/quizRegisterHandler.js";

export async function QuizRegister() {
  const form = document.createElement("form");
  form.classList.add("user-list");

  const header = document.createElement("div");
  header.classList.add("register-header");

  const returnButton = ReturnButton();
  returnButton.addEventListener("click", () => window.history.back());

  const title = Title({
    title: "Informações do Quiz",
    titleClass: "title2",
    titleColor: "var(--stone-900)",
  });

  header.append(returnButton, title);

  const registerForm = document.createElement("div");
  registerForm.classList.add("register-container");

  let subjectsList = [];
  try {
    const { subjects } = await fetchSubjects();
    subjectsList = subjects.map((s) => ({ _id: s._id, name: s.name }));
  } catch (err) {
    console.error("Erro ao buscar disciplinas:", err);
  }

  const nameInput = TextInputField({
    fieldClass: "input-field",
    inputClass: "register-input",
    placeholder: "Nome do quiz",
    name: "quizName",
  });

  const subjectInput = SelectInputField({
    fieldClass: "input-field",
    inputClass: "select-input",
    name: "subject",
    placeholder: "Selecione a disciplina",
    multiple: false,
    disciplines: subjectsList,
  });

  const quizTypeInput = SelectInputField({
    fieldClass: "input-field",
    inputClass: "select-input",
    placeholder: "Selecione o tipo de quiz",
    multiple: false,
    disciplines: [
      { _id: "prova", name: "Prova" },
      { _id: "simulado", name: "Simulado" },
    ],
  });

  const attemptsInput = NumberInputField({
    placeholder: "Tentativas para realizar o quiz",
    name: "attempts",
  });

  const timeLimitInput = SelectInputField({
    fieldClass: "input-field",
    inputClass: "select-input",
    placeholder: "Tempo máximo do quiz",
    multiple: false,
    disciplines: [
      { _id: "30", name: "30 minutos" },
      { _id: "60", name: "1 hora" },
      { _id: "120", name: "2 horas" },
    ],
  });

  const startDateInput = DateInputField({
    placeholder: "Data de início",
    name: "startDate",
  });

  const endDateInput = DateInputField({
    placeholder: "Data de entrega",
    name: "endDate",
  });

  const instructionsInput = TextareaInputField({
    placeholder: "Escreva aqui as orientações para o aluno...",
    name: "instructions",
  });

  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.classList.add("buttons-wrapper");

  const saveDraftBtn = document.createElement("button");
  saveDraftBtn.type = "button";
  saveDraftBtn.textContent = "Guardar Rascunho";
  saveDraftBtn.classList.add("save-draft-btn");

  const createQuestionsBtn = document.createElement("button");
  createQuestionsBtn.type = "submit";
  createQuestionsBtn.textContent = "Criar Perguntas";
  createQuestionsBtn.classList.add("create-questions-btn");

  buttonsWrapper.append(saveDraftBtn, createQuestionsBtn);

  registerForm.append(
    nameInput,
    subjectInput,
    quizTypeInput,
    attemptsInput,
    timeLimitInput,
    startDateInput,
    endDateInput,
    instructionsInput,
    buttonsWrapper
  );

  form.append(header, registerForm);

  form.addEventListener("submit", handleQuizRegisterSubmit);

  return form;
}
