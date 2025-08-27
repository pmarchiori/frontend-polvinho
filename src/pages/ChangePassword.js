import { FormButton } from "../components/Buttons/FormButton.js";
import { TextInputField } from "../components/Inputs/TextInputField.js";
import { Title } from "../components/Title.js";
import { showInlineError } from "../utils/showInlineError.js";
import { API_URL } from "../config/config.js";
import { navigateTo } from "../routes/navigate.js";
import { Toaster } from "../components/Toaster.js";

export function ChangePassword() {
  const changePasswordBackground = document.createElement("div");
  changePasswordBackground.classList.add("retrieve-password-background");

  const polvoLogo = document.createElement("img");
  polvoLogo.src = "/assets/polvo-logo-light.svg";
  polvoLogo.alt = "Logo do polvinho";
  polvoLogo.classList.add("polvo-logo-login");

  const changePasswordForm = document.createElement("form");
  changePasswordForm.classList.add("retrieve-password-form");

  const changePasswordTitle = Title({
    title: "Trocar Senha",
    titleClass: "title2",
    titleColor: "var(--stone-900)",
  });

  changePasswordTitle.classList.add("composed-title-center");
  changePasswordTitle.style.marginTop = "2rem";

  const splitLine = document.createElement("div");
  splitLine.classList.add("split-line");

  const newPasswordField = TextInputField({
    label: "Nova Senha",
    inputType: "password",
    fieldClass: "input-field",
    inputClass: "form-input",
    placeholder: "•••••••",
  });

  const confirmNewPasswordField = TextInputField({
    label: "Confirmar Senha",
    inputType: "password",
    fieldClass: "input-field",
    inputClass: "form-input",
    placeholder: "•••••••",
  });

  const changePasswordButton = FormButton({
    btnName: "Salvar",
    btnClass: "form-btn",
  });

  changePasswordForm.append(
    changePasswordTitle,
    splitLine,
    newPasswordField,
    confirmNewPasswordField,
    changePasswordButton
  );

  changePasswordBackground.append(polvoLogo, changePasswordForm);

  changePasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = sessionStorage.getItem("resetEmail");
    if (!email) return navigateTo("#/retrieve-password");

    const newPasswordInput = newPasswordField.querySelector("input");
    const confirmPasswordInput = confirmNewPasswordField.querySelector("input");

    [newPasswordInput, confirmPasswordInput].forEach((input) => {
      const oldError = input
        .closest(".input-field")
        .querySelector(".input-error");
      if (oldError) oldError.remove();
      input.classList.remove("error");
    });

    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (!newPassword)
      return showInlineError(newPasswordInput, "Preencha a nova senha.");
    if (!confirmPassword)
      return showInlineError(confirmPasswordInput, "Confirme a nova senha.");
    if (newPassword !== confirmPassword)
      return showInlineError(confirmPasswordInput, "As senhas não coincidem.");

    try {
      const res = await fetch(`${API_URL}/users/change-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      if (!res.ok) {
        let errorMsg = "Erro ao alterar senha.";
        try {
          const data = await res.json();
          errorMsg = data.error || errorMsg;
        } catch {}
        return showInlineError(newPasswordInput, errorMsg);
      }

      Toaster({
        title: "Sucesso!",
        description: "Senha alterada com sucesso.",
        type: "success",
      });

      sessionStorage.removeItem("resetEmail");
      navigateTo("#/login");
    } catch (err) {
      showInlineError(newPasswordInput, "Erro de conexão.");
    }
  });

  return changePasswordBackground;
}
