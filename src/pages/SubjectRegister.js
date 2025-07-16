import { FormButton } from "../components/Buttons/FormButton.js";
import { ReturnButton } from "../components/Buttons/ReturnButton.js";
import { SelectInputField } from "../components/SelectInputField.js";
import { TextInputField } from "../components/TextInputField.js";
import { Title } from "../components/Title.js";
import { UserRegisterForm } from "../components/UserRegisterForm.js";
import { handleSubjectRegisterSubmit } from "../utils/handlers/subjects/subjectRegisterHandler.js";

export function SubjectRegister() {
  const subjectRegister = document.createElement("form");
  subjectRegister.classList.add("user-register");

  const header = document.createElement("div");
  header.classList.add("register-header");

  const returnButton = ReturnButton();

  const title = Title({
    title: "Cadastro da disciplina",
    titleClass: "title2",
    titleColor: "var(--stone-900)",
  });

  header.append(returnButton, title);

  const registerForm = document.createElement("form");
  registerForm.classList.add("register-container");

  const nameInput = TextInputField({
    label: "Nome",
    fieldClass: "input-field",
    inputClass: "register-input",
    placeholder: "Disciplina",
    name: "subject",
  });

  const teachersInput = SelectInputField({
    label: "Disciplinas",
    fieldClass: "input-field",
    inputClass: "select-input",
    placeholder: "Disciplinas do usuário",
    disciplines: [
      { _id: "666b5a6a93be74d1c1e3271c", name: "professor 1" },
      { _id: "56655a7a93be74d1c1e3271c", name: "professor 2" },
      { _id: "466b5a1a93be74d1c1e3271c", name: "professor 3" },
    ],
    name: "teacher",
  });

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const registerButton = FormButton({
    btnName: "Cadastrar",
    btnClass: "form-btn",
  });

  buttonContainer.appendChild(registerButton);

  registerForm.append(nameInput, teachersInput);

  subjectRegister.appendChild(header);
  subjectRegister.appendChild(registerForm);
  subjectRegister.appendChild(buttonContainer);

  returnButton.addEventListener("click", () => {
    window.history.back();
  });

  subjectRegister.addEventListener("submit", handleSubjectRegisterSubmit);

  return subjectRegister;
}
