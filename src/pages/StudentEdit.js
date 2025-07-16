import { FormButton } from "../components/Buttons/FormButton.js";
import { SelectInputField } from "../components/SelectInputField.js";
import { TextInputField } from "../components/TextInputField.js";
import { Title } from "../components/Title.js";
import { ReturnButton } from "../components/Buttons/ReturnButton.js";
import { AlertModal } from "../components/AlertModal.js";
import {
  loadUserData,
  hasUserChanges,
  submitUserEdit,
} from "../utils/handlers/users/userEditHandler.js";
import { navigateTo } from "../routes/navigate.js";

export function StudentEdit(studentId) {
  const studentEdit = document.createElement("form");
  studentEdit.classList.add("user-register");

  const header = document.createElement("div");
  header.classList.add("register-header");

  const returnButton = ReturnButton();
  const title = Title({
    title: "Edição do Aluno",
    titleClass: "title2",
    titleColor: "var(--stone-900)",
  });

  header.appendChild(returnButton);
  header.appendChild(title);

  const editForm = document.createElement("form");
  editForm.classList.add("register-container");

  const upperInputRow = document.createElement("div");
  upperInputRow.classList.add("input-row");

  const lowerInputRow = document.createElement("div");
  lowerInputRow.classList.add("input-row");

  const nameInput = TextInputField({
    label: "Nome Completo",
    fieldClass: "input-field",
    inputClass: "register-input",
    placeholder: "Nome Sobrenome",
    name: "name",
  });

  const registrationInput = TextInputField({
    label: "Matrícula",
    fieldClass: "input-field",
    inputClass: "register-input",
    placeholder: "000000",
    name: "registration",
  });

  const emailInput = TextInputField({
    label: "Email",
    fieldClass: "input-field",
    inputClass: "register-input",
    placeholder: "email@email.com",
    name: "email",
  });

  const subjectsInput = SelectInputField({
    label: "Disciplinas",
    fieldClass: "input-field",
    inputClass: "select-input",
    placeholder: "Disciplinas do usuário",
    disciplines: [
      { _id: "666b5a7a93be74d1c1e3271c", name: "disciplina 1" },
      { _id: "566b5a7a93be74d1c1e3271c", name: "disciplina 2" },
      { _id: "466b5a7a93be74d1c1e3271c", name: "disciplina 3" },
    ],
    name: "subject",
  });

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const registerButton = FormButton({
    btnName: "Salvar alterações",
    btnClass: "form-btn",
  });

  buttonContainer.appendChild(registerButton);

  upperInputRow.appendChild(nameInput);
  upperInputRow.appendChild(registrationInput);
  lowerInputRow.appendChild(emailInput);
  lowerInputRow.appendChild(subjectsInput);

  editForm.appendChild(upperInputRow);
  editForm.appendChild(lowerInputRow);

  studentEdit.appendChild(header);
  studentEdit.appendChild(editForm);
  studentEdit.appendChild(buttonContainer);

  const inputs = {
    name: nameInput.querySelector("input"),
    registration: registrationInput.querySelector("input"),
    email: emailInput.querySelector("input"),
    subject: subjectsInput.querySelector("select"),
  };

  let originalValues = {};

  loadUserData(studentId, inputs, (values) => {
    originalValues = values;
  });

  returnButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (hasUserChanges(inputs, originalValues)) {
      const modal = AlertModal({
        title: "Alterações serão perdidas",
        message:
          "Se voltar agora as alterações feitas não serão salvas. Deseja continuar?",
        type: "delete",
        onConfirm: () => {
          navigateTo("#/students");
        },
        onCancel: () => {},
      });
      document.body.appendChild(modal);
    } else {
      navigateTo("#/students");
    }
  });

  registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    submitUserEdit(studentId, inputs, originalValues);
  });

  return studentEdit;
}
