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

  loginFormTitle.style.marginTop = "2rem";

  const splitLine = document.createElement("div");
  splitLine.classList.add("split-line");

  const userLoginField = InputField({
    label: "Matrícula ou Email",
    inputType: "text",
    fieldClass: "input-field",
    inputClass: "form-input",
    placeholder: "usuario@gmail.com",
  });

  const userPasswordField = InputField({
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

  const loginButton = FormButton({ btnName: "Entrar", btnClass: "form-btn" });

  loginForm.appendChild(loginFormTitle);
  loginForm.appendChild(splitLine);
  loginForm.appendChild(userLoginField);
  loginForm.appendChild(userPasswordField);
  loginForm.appendChild(forgotPassword);
  loginForm.appendChild(loginButton);

  loginBackground.appendChild(polvoLogoLogin);
  loginBackground.appendChild(loginForm);

  //ORGANIZAR ESSA VALIDAÇÃO, TIRAR TUDO DO LOGIN.JS
  //ADICIONAR VALIDAÇÃO DE MATRÍCULA
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailInput = userLoginField.input;
    const passwordInput = userPasswordField.input;

    const inputError = userPasswordField.errorSpan;
    inputError.classList.add("textSm");

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{5,}$/;

    let isValid = true;

    inputError.style.display = "none";
    emailInput.classList.remove("error");
    passwordInput.classList.remove("error");

    if (!passwordRegex.test(password) || !emailRegex.test(email)) {
      inputError.textContent = "Usuário ou senha incorreta!";
      inputError.style.display = "block";

      emailInput.classList.add("error");
      passwordInput.classList.add("error");

      isValid = false;
    }

    if (isValid) {
      console.log("Login válido!");
    }
  });

  return loginBackground;
}
