import { FormButton } from "../components/Buttons/FormButton.js";
import { SelectInputField } from "../components/SelectInputField.js";
import { TextInputField } from "../components/TextInputField.js";
import { Title } from "../components/Title.js";
import { handleRegisterSubmit } from "../utils/handlers/registerHandler.js";
import { ReturnButton } from "../components/Buttons/ReturnButton.js";

export function StudentRegister() {
  const studentRegister = document.createElement("form");
  studentRegister.classList.add("student-register");

  const header = document.createElement("div");
  header.classList.add("register-header");

  const returnButton = ReturnButton();

  const title = Title({
    title: "Cadastro do Aluno",
    titleClass: "title2",
    titleColor: "var(--stone-900)",
  });

  header.appendChild(returnButton);
  header.appendChild(title);

  const registerForm = document.createElement("form");
  registerForm.classList.add("register-container");

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
    ],
    name: "subject",
  });

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const registerButton = FormButton({
    btnName: "Cadastrar",
    btnClass: "form-btn",
  });

  buttonContainer.appendChild(registerButton);

  upperInputRow.appendChild(nameInput);
  upperInputRow.appendChild(registrationInput);
  lowerInputRow.appendChild(emailInput);
  lowerInputRow.appendChild(subjectsInput);

  registerForm.appendChild(upperInputRow);
  registerForm.appendChild(lowerInputRow);

  studentRegister.appendChild(header);
  studentRegister.appendChild(registerForm);
  studentRegister.appendChild(buttonContainer);

  returnButton.addEventListener("click", () => {
    window.history.back();
  });

  studentRegister.addEventListener("submit", async (event) => {
    handleRegisterSubmit(event, emailInput);
  });

  return studentRegister;
}
