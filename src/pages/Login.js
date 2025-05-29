import { FormButton } from "../components/FormButton.js";
import { InputField } from "../components/InputField.js";
import { Title } from "../components/Title.js";

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

  loginFormTitle.style.marginTop = "45px";

  const splitLine = document.createElement("div");
  splitLine.classList.add("split-line");

  const userLoginField = InputField({
    label: "Matrícula ou Email",
    inputType: "text",
    fieldClass: "input-field",
    inputClass: "form-input",
  });

  const userPasswordField = InputField({
    label: "Senha",
    inputType: "password",
    fieldClass: "input-field",
    inputClass: "form-input",
  });

  const forgotPassword = document.createElement("a");
  forgotPassword.textContent = "Esqueceu a senha ou deseja trocar?";
  forgotPassword.classList.add("textMd");
  forgotPassword.classList.add("forgot-password");

  const loginButton = FormButton({ btnName: "Entrar", btnClass: "form-btn" });

  loginForm.appendChild(loginFormTitle);
  loginForm.appendChild(splitLine);
  loginForm.appendChild(userLoginField);
  loginForm.appendChild(userPasswordField);
  loginForm.appendChild(forgotPassword);
  loginForm.appendChild(loginButton);

  loginBackground.appendChild(polvoLogoLogin);
  loginBackground.appendChild(loginForm);

  return loginBackground;
}
