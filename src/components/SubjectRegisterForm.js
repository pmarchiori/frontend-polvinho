import { fetchTeachers } from "../utils/handlers/users/userHandler.js";
import { SelectInputField } from "./SelectInputField.js";
import { TextInputField } from "./TextInputField.js";

export async function SubjectRegisterForm() {
  const subjectRegisterForm = document.createElement("form");
  subjectRegisterForm.classList.add("register-container");

  const inputRow = document.createElement("form");
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
      placeholder: "Nome do professor",
      multiple: false,
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

  inputRow.append(nameInput, teachersInput);
  subjectRegisterForm.appendChild(inputRow);

  return subjectRegisterForm;
}
