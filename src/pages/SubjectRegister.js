import { FormButton } from "../components/Buttons/FormButton.js";
import { ReturnButton } from "../components/Buttons/ReturnButton.js";
import { SelectInputField } from "../components/SelectInputField.js";
import { TextInputField } from "../components/TextInputField.js";
import { Title } from "../components/Title.js";
import { handleSubjectRegisterSubmit } from "../utils/handlers/subjects/subjectRegisterHandler.js";
import { fetchTeachers } from "../utils/handlers/users/userHandler.js";

export async function SubjectRegister() {
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

  const inputRow = document.createElement("div");
  inputRow.classList.add("input-row");

  const nameInput = TextInputField({
    label: "Nome",
    fieldClass: "input-field",
    inputClass: "register-input",
    placeholder: "Disciplina",
    name: "subject",
  });

  let teachers = [];
  try {
    const { users } = await fetchTeachers();
    teachers = users;
  } catch (error) {
    console.error("Erro ao carregar professores:", error);
  }

  let teachersInput;
  if (teachers.length > 0) {
    teachersInput = SelectInputField({
      label: "Professor",
      fieldClass: "input-field",
      inputClass: "select-input",
      name: "teacher",
      disciplines: teachers.map((teacher) => ({
        _id: teacher._id,
        name: teacher.name,
      })),
    });
  } else {
    const noTeachersMsg = document.createElement("p");
    noTeachersMsg.textContent = "Nenhum professor cadastrado no sistema.";
    teachersInput = noTeachersMsg;
  }

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const registerButton = FormButton({
    btnName: "Cadastrar",
    btnClass: "form-btn",
  });

  buttonContainer.appendChild(registerButton);

  inputRow.append(nameInput, teachersInput);
  registerForm.append(inputRow);

  subjectRegister.appendChild(header);
  subjectRegister.appendChild(registerForm);
  subjectRegister.appendChild(buttonContainer);

  returnButton.addEventListener("click", () => {
    window.history.back();
  });

  subjectRegister.addEventListener("submit", handleSubjectRegisterSubmit);

  return subjectRegister;
}
