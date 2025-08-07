import { handleRegisterSubmit } from "../handlers/users/userRegisterHandler.js";
import { FormButton } from "./Buttons/FormButton.js";
import { ReturnButton } from "./Buttons/ReturnButton.js";
import { Title } from "./Title.js";

export async function UserRegister({
  titleText,
  userType,
  fetchData,
  createForm,
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

  const registerButton = FormButton({
    btnName: "Cadastrar",
    btnClass: "form-btn",
  });
  buttonContainer.appendChild(registerButton);

  form.append(header, formFields, buttonContainer);

  returnButton.addEventListener("click", () => window.history.back());

  form.addEventListener("submit", (event) => {
    handleRegisterSubmit(event, userType);
  });

  return form;
}
