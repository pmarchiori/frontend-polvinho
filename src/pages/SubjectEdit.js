import { FormButton } from "../components/Buttons/FormButton.js";
import { ReturnButton } from "../components/Buttons/ReturnButton.js";
import { SelectInputField } from "../components/SelectInputField.js";
import { TextInputField } from "../components/TextInputField.js";
import { Title } from "../components/Title.js";

export function SubjectEdit(subjectId) {
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

  const editForm = document.createElement("form");
  editForm.classList.add("register-container");

  const inputRow = document.createElement("div");
  inputRow.classList.add("input-row");

  const nameInput = TextInputField({
    label: "Nome",
    fieldClass: "input-field",
    inputClass: "register-input",
    placeholder: "Nome da disciplina",
    name: "name",
  });

  const nameInput2 = TextInputField({
    label: "Nome",
    fieldClass: "input-field",
    inputClass: "register-input",
    placeholder: "Nome da disciplina",
    name: "name",
  });

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const registerButton = FormButton({
    btnName: "Salvar alterações",
    btnClass: "form-btn",
  });

  buttonContainer.appendChild(registerButton);

  inputRow.append(nameInput, nameInput2);

  editForm.appendChild(inputRow);

  subjectEdit.appendChild(header);
  subjectEdit.appendChild(editForm);
  subjectEdit.appendChild(buttonContainer);

  returnButton.addEventListener("click", (e) => {
    e.preventDefault();

    window.location.hash = "#/subjects";
    // if (hasUserChanges(inputs, originalValues)) {
    //   const modal = AlertModal({
    //     title: "Alterações serão perdidas",
    //     message:
    //       "Se voltar agora as alterações feitas não serão salvas. Deseja continuar?",
    //     type: "delete",
    //     onConfirm: () => {
    //       window.location.hash = "#/subjects";
    //     },
    //     onCancel: () => {},
    //   });
    //   document.body.appendChild(modal);
    // } else {
    //   window.location.hash = "#/subjects";
    // }
  });

  return subjectEdit;
}
