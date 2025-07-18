import { FormButton } from "../components/Buttons/FormButton.js";
import { ReturnButton } from "../components/Buttons/ReturnButton.js";
import { Title } from "../components/Title.js";
import { UserRegisterForm } from "../components/UserRegisterForm.js";
import { fetchSubjects } from "../utils/handlers/subjects/subjectHandler.js";
import { handleRegisterSubmit } from "../utils/handlers/users/userRegisterHandler.js";

export async function TeacherRegister() {
  const teacherRegister = document.createElement("form");
  teacherRegister.classList.add("user-register");

  const header = document.createElement("div");
  header.classList.add("register-header");

  const returnButton = ReturnButton();

  const title = Title({
    title: "Cadastro do Professor",
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

  const registerForm = UserRegisterForm(subjects);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const registerButton = FormButton({
    btnName: "Cadastrar",
    btnClass: "form-btn",
  });

  buttonContainer.appendChild(registerButton);

  teacherRegister.appendChild(header);
  teacherRegister.appendChild(registerForm);
  teacherRegister.appendChild(buttonContainer);

  returnButton.addEventListener("click", () => {
    window.history.back();
  });

  teacherRegister.addEventListener("submit", async (event) => {
    handleRegisterSubmit(event, "teacher");
  });

  return teacherRegister;
}
