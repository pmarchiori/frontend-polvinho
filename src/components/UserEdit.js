import {
  hasUserChanges,
  loadUserData,
  submitUserEdit,
} from "../handlers/users/userEditHandler.js";
import { navigateTo } from "../routes/navigate.js";
import { AlertModal } from "./AlertModal.js";
import { FormButton } from "./Buttons/FormButton.js";
import { ReturnButton } from "./Buttons/ReturnButton.js";
import { Title } from "./Title.js";

export async function UserEdit({
  titleText,
  userId,
  fetchData,
  createForm,
  routeName,
}) {
  const form = document.createElement("form");
  form.classList.add("user-register");

  const header = document.createElement("div");
  header.classList.add("register-header");

  const returnButton = ReturnButton();
  const title = Title({
    title: titleText,
    titleClass: "title2",
    titleColor: "var(--stone-900)",
  });

  header.append(returnButton, title);

  let data = {};
  try {
    data = await fetchData();
  } catch (err) {
    console.error("Erro ao carregar dados:", err);
  }

  const formFields = createForm(data);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const saveButton = FormButton({
    btnName: "Salvar alterações",
    btnClass: "form-btn",
  });
  buttonContainer.appendChild(saveButton);

  form.append(header, formFields, buttonContainer);

  const inputs = {
    name: formFields.querySelector('input[name="name"]'),
    registration: formFields.querySelector('input[name="registration"]'),
    email: formFields.querySelector('input[name="email"]'),
    subjects: formFields.querySelector('input[name="subjects"]'),
  };

  let originalValues = {};
  loadUserData(userId, inputs, (values) => {
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
        onConfirm: () => navigateTo(`#/${routeName}`),
        onCancel: () => {},
      });
      document.body.appendChild(modal);
    } else {
      navigateTo(`#/${routeName}`);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitUserEdit(userId, inputs, originalValues, routeName);
  });

  return form;
}
