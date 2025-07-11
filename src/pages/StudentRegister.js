import { FormButton } from "../components/Buttons/FormButton.js";
import { Title } from "../components/Title.js";
import { handleRegisterSubmit } from "../utils/handlers/registerHandler.js";
import { ReturnButton } from "../components/Buttons/ReturnButton.js";
import { UserRegisterForm } from "../components/UserRegisterForm.js";

export function StudentRegister() {
  const studentRegister = document.createElement("form");
  studentRegister.classList.add("user-register");

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

  const registerForm = UserRegisterForm();

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const registerButton = FormButton({
    btnName: "Cadastrar",
    btnClass: "form-btn",
  });

  buttonContainer.appendChild(registerButton);

  studentRegister.appendChild(header);
  studentRegister.appendChild(registerForm);
  studentRegister.appendChild(buttonContainer);

  returnButton.addEventListener("click", () => {
    window.history.back();
  });

  studentRegister.addEventListener("submit", async (event) => {
    handleRegisterSubmit(event, "student");
  });

  return studentRegister;
}
