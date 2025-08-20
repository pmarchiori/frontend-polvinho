import { SelectInputField } from "../components/Inputs/SelectInputField.js";
import { TextInputField } from "./Inputs/TextInputField.js";

export function UserRegisterForm(subjects = []) {
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

  let subjectsInput;
  if (subjects.length > 0) {
    subjectsInput = SelectInputField({
      label: "Disciplinas",
      fieldClass: "input-field",
      inputClass: "select-input",
      name: "subjects",
      placeholder: "Disciplinas do usuário",
      disciplines: subjects.map((subject) => ({
        _id: subject._id,
        name: subject.name,
      })),
      multiple: true,
    });
  } else {
    const noSubjectMsg = document.createElement("p");
    noSubjectMsg.textContent = "Nenhuma disciplina cadastrada no sistema.";
    subjectsInput = noSubjectMsg;
  }

  upperInputRow.append(nameInput, registrationInput);
  lowerInputRow.append(emailInput, subjectsInput);

  userRegisterForm.append(upperInputRow, lowerInputRow);

  return userRegisterForm;
}
