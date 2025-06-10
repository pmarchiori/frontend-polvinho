import { FormButton } from "../components/FormButton.js";
import { TextInputField } from "../components/TextInputField.js";
import { Title } from "../components/Title.js";
import { validateLoginCredentials } from "../utils/validators.js";

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
    event.preventDefault();

    const emailInput = userLoginField.input;
    const passwordInput = userPasswordField.input;

    const inputError = userPasswordField.errorSpan;
    inputError.classList.add("textSm");
    inputError.classList.add("input-error");

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    inputError.style.display = "none";
    inputError.textContent = "";
    emailInput.classList.remove("error");
    passwordInput.classList.remove("error");

    const { isValid, message } = validateLoginCredentials(email, password);

    if (!isValid) {
      inputError.textContent = message;
      inputError.style.display = "block";
      emailInput.classList.add("error");
      passwordInput.classList.add("error");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("login successful!", data);
        localStorage.setItem("authToken", data.token);

        inputError.textContent = "";
        inputError.style.display = "none";
        // window.location.href = '/dashboard'; // redirect se o login der bom
      } else {
        console.error("login error:", data.error || "unknown error");
        inputError.textContent =
          data.error || "Erro ao tentar fazer login. Credenciais inválidas.";
        inputError.style.display = "block";
        emailInput.classList.add("error");
        passwordInput.classList.add("error");
      }
    } catch (error) {
      console.error("backend error:", error);
      inputError.textContent =
        "Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.";
      inputError.style.display = "block";
      emailInput.classList.add("error");
      passwordInput.classList.add("error");
    }
  });

  return loginBackground;
}
