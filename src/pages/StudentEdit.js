import { FormButton } from "../components/Buttons/FormButton.js";
import { SelectInputField } from "../components/SelectInputField.js";
import { TextInputField } from "../components/TextInputField.js";
import { Title } from "../components/Title.js";
import { ReturnButton } from "../components/Buttons/ReturnButton.js";
import { AlertModal } from "../components/AlertModal.js";
import {
  loadUserData,
  hasUserChanges,
  submitUserEdit,
} from "../utils/handlers/users/userEditHandler.js";
import { navigateTo } from "../routes/navigate.js";
import { UserRegisterForm } from "../components/UserRegisterForm.js";
import { fetchSubjects } from "../utils/handlers/subjects/subjectHandler.js";

export async function StudentEdit(studentId) {
  const studentEdit = document.createElement("form");
  studentEdit.classList.add("user-register");

  const header = document.createElement("div");
  header.classList.add("register-header");

  const returnButton = ReturnButton();

  const title = Title({
    title: "Edição do Aluno",
    titleClass: "title2",
    titleColor: "var(--stone-900)",
  });

  header.appendChild(returnButton);
  header.appendChild(title);

  let subjects = [];
  try {
    const { subjects: fetchedSubjects } = await fetchSubjects();
    subjects = fetchedSubjects;
  } catch (error) {
    console.error("Erro ao carregar disciplinas:", error);
  }

  const editForm = UserRegisterForm(subjects);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const registerButton = FormButton({
    btnName: "Salvar alterações",
    btnClass: "form-btn",
  });

  buttonContainer.appendChild(registerButton);

  studentEdit.appendChild(header);
  studentEdit.appendChild(editForm);
  studentEdit.appendChild(buttonContainer);

  const inputs = {
    name: editForm.querySelector('input[name="name"]'),
    registration: editForm.querySelector('input[name="registration"]'),
    email: editForm.querySelector('input[name="email"]'),
    subjects: editForm.querySelector('select[name="subjects"]'),
  };

  let originalValues = {};

  loadUserData(studentId, inputs, (values) => {
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
        onConfirm: () => {
          navigateTo("#/students");
        },
        onCancel: () => {},
      });
      document.body.appendChild(modal);
    } else {
      navigateTo("#/students");
    }
  });

  registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    submitUserEdit(studentId, inputs, originalValues);
  });

  return studentEdit;
}
