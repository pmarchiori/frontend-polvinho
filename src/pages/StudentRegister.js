import { FormButton } from "../components/FormButton.js";
import { SelectInputField } from "../components/SelectInputField.js";
import { TextInputField } from "../components/TextInputField.js";
import { Title } from "../components/Title.js";

export function StudentRegister() {
  const studentRegister = document.createElement("div");
  studentRegister.classList.add("student-register");

  const header = document.createElement("div");
  header.classList.add("register-header");

  const returnButton = document.createElement("img");
  returnButton.src = "/assets/caret-left.svg";
  returnButton.classList.add("return-button");

  const title = Title({
    title: "Cadastro do Aluno",
    titleClass: "title2",
    titleColor: "var(--stone-900)",
  });

  header.appendChild(returnButton);
  header.appendChild(title);

  const registerContainer = document.createElement("div");
  registerContainer.classList.add("register-container");

  const upperInputRow = document.createElement("div");
  upperInputRow.classList.add("input-row");
  const lowerInputRow = document.createElement("div");
  lowerInputRow.classList.add("input-row");

  const nameInput = TextInputField({
    label: "Nome Completo",
    fieldClass: "input-field",
    inputClass: "register-input",
    placeholder: "Nome Sobrenome",
  });

  const registrationInput = TextInputField({
    label: "Matrícula",
    fieldClass: "input-field",
    inputClass: "register-input",
    placeholder: "000000",
  });

  const emailInput = TextInputField({
    label: "Email",
    fieldClass: "input-field",
    inputClass: "register-input",
    placeholder: "email@email.com",
  });

  const subjectsInput = SelectInputField({
    label: "Disciplinas",
    fieldClass: "input-field",
    inputClass: "register-input",
    placeholder: "Disciplinas do usuário",
    disciplines: ["disciplina1", "disciplina2", "disciplina3"],
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

  registerContainer.appendChild(upperInputRow);
  registerContainer.appendChild(lowerInputRow);

  studentRegister.appendChild(header);
  studentRegister.appendChild(registerContainer);
  studentRegister.appendChild(buttonContainer);

  return studentRegister;
}
