import { AlertModal } from "../../components/AlertModal.js";
import { FormButton } from "../../components/Buttons/FormButton.js";
import { ReturnButton } from "../../components/Buttons/ReturnButton.js";
import { SubjectRegisterForm } from "../../components/SubjectRegisterForm.js";
import { Title } from "../../components/Title.js";
import { navigateTo } from "../../routes/navigate.js";
import {
  hasSubjectChanges,
  loadSubjectData,
  submitSubjectEdit,
} from "../../utils/handlers/subjects/subjectEditHandler.js";

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

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const registerButton = FormButton({
    btnName: "Salvar alterações",
    btnClass: "form-btn",
  });

  buttonContainer.appendChild(registerButton);

  subjectEdit.appendChild(header);
  subjectEdit.appendChild(editForm);
  subjectEdit.appendChild(buttonContainer);

  const inputs = {
    name: editForm.querySelector('input[name="subject"]'),
    teacher: editForm.querySelector('input[name="teacher"]'),
  };

  let originalValues = {};

  loadSubjectData(subjectId, inputs, (values) => {
    originalValues = values;
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
