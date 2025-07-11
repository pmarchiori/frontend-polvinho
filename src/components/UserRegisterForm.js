import { SelectInputField } from "./SelectInputField.js";
import { TextInputField } from "./TextInputField.js";

export function UserRegisterForm() {
  const userRegisterForm = document.createElement("form");
  userRegisterForm.classList.add("register-container");

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

  upperInputRow.append(nameInput, registrationInput);
  lowerInputRow.append(emailInput, subjectsInput);

  userRegisterForm.append(upperInputRow, lowerInputRow);

  return userRegisterForm;
}
