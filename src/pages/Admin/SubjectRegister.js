import { FormButton } from "../../components/Buttons/FormButton.js";
import { ReturnButton } from "../../components/Buttons/ReturnButton.js";
import { SubjectRegisterForm } from "../../components/SubjectRegisterForm.js";
import { Title } from "../../components/Title.js";
import { handleSubjectRegisterSubmit } from "../../utils/handlers/subjects/subjectRegisterHandler.js";

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

  const registerForm = await SubjectRegisterForm();

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const registerButton = FormButton({
    btnName: "Cadastrar",
    btnClass: "form-btn",
  });

  buttonContainer.appendChild(registerButton);

  subjectRegister.appendChild(header);
  subjectRegister.appendChild(registerForm);
  subjectRegister.appendChild(buttonContainer);

  returnButton.addEventListener("click", () => {
    window.history.back();
  });

  subjectRegister.addEventListener("submit", handleSubjectRegisterSubmit);

  return subjectRegister;
}
