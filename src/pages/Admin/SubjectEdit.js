import { AlertModal } from "../../components/Modals/AlertModal.js";
import { FormButton } from "../../components/Buttons/FormButton.js";
import { ReturnButton } from "../../components/Buttons/ReturnButton.js";
import { SubjectRegisterForm } from "../../components/Forms/SubjectRegisterForm.js";
import { Title } from "../../components/Title.js";
import { navigateTo } from "../../routes/navigate.js";
import {
  hasSubjectChanges,
  loadSubjectData,
  submitSubjectEdit,
} from "../../handlers/subjects/subjectEditHandler.js";
import { QuizList } from "../../components/Listing/QuizList.js";

export async function SubjectEdit(subjectId) {
  const subjectEdit = document.createElement("form");
  subjectEdit.classList.add("user-register");

  const header = document.createElement("div");
  header.classList.add("register-header");

  const returnButton = ReturnButton();

  const title = Title({
    title: "Edição da disciplina",
    titleClass: "title2",
    titleColor: "var(--stone-900)",
  });

  header.append(returnButton, title);

  const editForm = await SubjectRegisterForm();

  const quizzesContainer = document.createElement("div");
  quizzesContainer.classList.add("quizzes-container");

  const quizzesTitle = Title({
    title: "Quizzes",
    titleClass: "title4",
    titleColor: "var(--stone-900)",
  });

  quizzesContainer.appendChild(quizzesTitle);
  editForm.appendChild(quizzesContainer);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const registerButton = FormButton({
    btnName: "Salvar alterações",
    btnClass: "form-btn",
  });

  buttonContainer.appendChild(registerButton);

  subjectEdit.append(header, editForm, buttonContainer);

  const inputs = {
    name: editForm.querySelector('input[name="subject"]'),
    teacher: editForm.querySelector('input[name="teacher"]'),
  };

  let originalValues = {};

  loadSubjectData(subjectId, inputs, (values) => {
    console.log("Subject carregado:", values);
    originalValues = values;

    if (values.quizzes) {
      const quizList = QuizList(values.quizzes, subjectId);
      quizzesContainer.appendChild(quizList);
    }
  });

  returnButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (hasSubjectChanges(inputs, originalValues)) {
      const modal = AlertModal({
        title: "Alterações serão perdidas",
        message:
          "Se voltar agora as alterações feitas não serão salvas. Deseja continuar?",
        type: "delete",
        onConfirm: () => {
          navigateTo("#/subjects");
        },
        onCancel: () => {},
      });
      document.body.appendChild(modal);
    } else {
      navigateTo("#/subjects");
    }
  });

  registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    submitSubjectEdit(subjectId, inputs, originalValues);
  });

  return subjectEdit;
}
