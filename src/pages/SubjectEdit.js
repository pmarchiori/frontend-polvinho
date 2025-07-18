import { AlertModal } from "../components/AlertModal.js";
import { FormButton } from "../components/Buttons/FormButton.js";
import { ReturnButton } from "../components/Buttons/ReturnButton.js";
import { SelectInputField } from "../components/SelectInputField.js";
import { TextInputField } from "../components/TextInputField.js";
import { Title } from "../components/Title.js";
import { navigateTo } from "../routes/navigate.js";
import {
  hasSubjectChanges,
  loadSubjectData,
  submitSubjectEdit,
} from "../utils/handlers/subjects/subjectEditHandler.js";
import { fetchTeachers } from "../utils/handlers/users/userHandler.js";

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

  const editForm = document.createElement("form");
  editForm.classList.add("register-container");

  const inputRow = document.createElement("div");
  inputRow.classList.add("input-row");

  const nameInput = TextInputField({
    label: "Nome",
    fieldClass: "input-field",
    inputClass: "register-input",
    placeholder: "Nome da disciplina",
    name: "name",
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
    btnName: "Salvar alterações",
    btnClass: "form-btn",
  });

  buttonContainer.appendChild(registerButton);

  inputRow.append(nameInput, teachersInput);

  editForm.appendChild(inputRow);

  subjectEdit.appendChild(header);
  subjectEdit.appendChild(editForm);
  subjectEdit.appendChild(buttonContainer);

  const inputs = {
    name: nameInput.querySelector("input"),
    teacher: teachersInput.querySelector("select") || null,
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
