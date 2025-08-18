import { ReturnButton } from "../../components/Buttons/ReturnButton.js";
import { QuestionOptionInput } from "../../components/Inputs/QuestionOptionInput.js";
import { TextInputField } from "../../components/Inputs/TextInputField.js";
import { Title } from "../../components/Title.js";
import { Toaster } from "../../components/Toaster.js";
import { fetchQuizById } from "../../handlers/quizzes/quizHandler.js";
import {
  fetchQuestionsByQuiz,
  createQuestion,
} from "../../handlers/questions/questionHandler.js";

export async function QuestionRegister(quizId) {
  const questionRegister = document.createElement("div");
  questionRegister.classList.add("question-register");

  const upperContainer = document.createElement("div");

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

  const existingQuestions = await fetchQuestionsByQuiz(quizId);
  let questionNumber = (existingQuestions?.length || 0) + 1;

  const questionInput = TextInputField({
    label: `Pergunta ${questionNumber}`,
    inputClass: "register-input",
    placeholder: "Digite aqui a pergunta...",
    inputWrapperClass: "input-wrapper-quiz",
    name: "question",
    fieldClass: "question-input-field",
  });

  questionDiv.appendChild(questionInput);

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

  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.classList.add("buttons-wrapper");

  const saveDraftBtn = document.createElement("button");
  saveDraftBtn.type = "submit";
  saveDraftBtn.textContent = "Guardar Rascunho";
  saveDraftBtn.classList.add("save-draft-btn");

  const saveQuestionBtn = document.createElement("button");
  saveQuestionBtn.type = "button";
  saveQuestionBtn.textContent = "Postar";
  saveQuestionBtn.classList.add("save-quiz-btn");

  buttonsWrapper.append(saveDraftBtn, saveQuestionBtn);

  optionsDiv.append(
    correctOption,
    incorrectOption1,
    incorrectOption2,
    incorrectOption3
  );

  inputsContainer.append(questionDiv, optionsDiv);
  upperContainer.append(header, inputsContainer);
  questionRegister.append(upperContainer, buttonsWrapper);

  function resetForm() {
    questionInput.querySelector("input").value = "";
    optionsDiv.querySelectorAll("input").forEach((input) => (input.value = ""));
  }

  saveQuestionBtn.addEventListener("click", async () => {
    const questionText = questionInput.querySelector("input").value.trim();

    if (!questionText) {
      Toaster({
        type: "error",
        title: "Erro",
        description: "Digite o enunciado antes de salvar!",
      });
      return;
    }

    const optionInputs = optionsDiv.querySelectorAll("input");
    const options = Array.from(optionInputs).map((input) => ({
      option: input.value.trim(),
      isCorrect: input.dataset.correct === "true",
    }));

    if (options.some((opt) => !opt.option)) {
      Toaster({
        type: "error",
        title: "Erro",
        description: "Preencha todos os campos antes de salvar!",
      });
      return;
    }

    const newQuestion = {
      question: questionText,
      options,
      quiz: quizId,
    };

    try {
      await createQuestion(newQuestion);
      console.log("Questão criada com sucesso!");

      resetForm();

      const updatedQuestions = await fetchQuestionsByQuiz(quizId);
      questionNumber = (updatedQuestions?.length || 0) + 1;
      questionInput.querySelector(
        "label"
      ).textContent = `Pergunta ${questionNumber}`;
    } catch (error) {
      console.error("Erro ao criar questão:", error);
      Toaster({
        type: "error",
        title: "Erro",
        description: "Erro ao criar questão",
      });
    }
  });

  return questionRegister;
}
