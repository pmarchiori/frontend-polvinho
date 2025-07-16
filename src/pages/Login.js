import { FormButton } from "../components/Buttons/FormButton.js";
import { TextInputField } from "../components/TextInputField.js";
import { Title } from "../components/Title.js";
import { navigateTo } from "../routes/navigate.js";
import { handleLoginSubmit } from "../utils/handlers/auth/loginHandler.js";

export function Login() {
  const loginBackground = document.createElement("div");
  loginBackground.classList.add("login-background");

  const polvoLogoLogin = document.createElement("img");
  polvoLogoLogin.src = "/assets/polvo-logo-dark.svg";
  polvoLogoLogin.alt = "Logo do polvinho escura";
  polvoLogoLogin.classList.add("polvo-logo-login");

  const loginForm = document.createElement("form");
  loginForm.classList.add("login-form");

  const loginFormTitle = Title({
    title: "Faça login",
    titleClass: "title2",
    titleColor: "var(--stone-900)",
  });

  loginFormTitle.style.marginTop = "2rem";

  const splitLine = document.createElement("div");
  splitLine.classList.add("split-line");

  const userLoginField = TextInputField({
    label: "Matrícula ou Email",
    fieldClass: "input-field",
    inputClass: "form-input",
    placeholder: "usuario@gmail.com",
  });

  const userPasswordField = TextInputField({
    label: "Senha",
    inputType: "password",
    fieldClass: "input-field",
    inputClass: "form-input",
    showPasswordToggle: true,
    placeholder: "•••••••",
  });

  const forgotPassword = document.createElement("a");
  forgotPassword.textContent = "Esqueceu a senha ou deseja trocar?";
  forgotPassword.classList.add("textMd");
  forgotPassword.classList.add("forgot-password");

  forgotPassword.href = "#/retrieve-password";

  const loginButton = FormButton({ btnName: "Entrar", btnClass: "form-btn" });

  loginForm.appendChild(loginFormTitle);
  loginForm.appendChild(splitLine);
  loginForm.appendChild(userLoginField);
  loginForm.appendChild(userPasswordField);
  loginForm.appendChild(forgotPassword);
  loginForm.appendChild(loginButton);

  loginBackground.appendChild(polvoLogoLogin);
  loginBackground.appendChild(loginForm);

  loginForm.addEventListener("submit", async (event) => {
    const success = await handleLoginSubmit(
      event,
      userLoginField,
      userPasswordField
    );
    if (success) navigateTo("#/dashboard");
  });

  return loginBackground;
}
