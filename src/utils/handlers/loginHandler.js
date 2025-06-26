import { validateLoginCredentials } from "../validators.js";

export async function handleLoginSubmit(
  event,
  userLoginField,
  userPasswordField
) {
  event.preventDefault();

  const emailInput = userLoginField.input;
  const passwordInput = userPasswordField.input;

  const inputError = userPasswordField.errorSpan;
  inputError.classList.add("textSm", "input-error");

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
}
