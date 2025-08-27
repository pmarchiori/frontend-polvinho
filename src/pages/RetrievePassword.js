import { FormButton } from "../components/Buttons/FormButton.js";
import { TextInputField } from "../components/Inputs/TextInputField.js";
import { Title } from "../components/Title.js";
import { showInlineError } from "../utils/showInlineError.js";
import { navigateTo } from "../routes/navigate.js";

export function RetrievePassword() {
  const retrievePasswordBackground = document.createElement("div");
  retrievePasswordBackground.classList.add("retrieve-password-background");

  const polvoLogo = document.createElement("img");
  polvoLogo.src = "/assets/polvo-logo-light.svg";
  polvoLogo.alt = "Logo do polvinho";
  polvoLogo.classList.add("polvo-logo-login");

  const retrievePasswordForm = document.createElement("form");
  retrievePasswordForm.classList.add("retrieve-password-form");

  const retrievePasswordTitle = Title({
    title: "Recuperar Senha",
    subtitle: "Digite seu email cadastrado e você poderá alterar sua senha",
    titleClass: "title2",
    titleColor: "var(--stone-900)",
    subtitleClass: "textMd",
    subtitleColor: "var(--stone-700)",
  });

  retrievePasswordTitle.classList.add("composed-title-center");
  retrievePasswordTitle.style.marginTop = "2rem";

  const splitLine = document.createElement("div");
  splitLine.classList.add("split-line-big");

  const userEmailField = TextInputField({
    label: "Email cadastrado",
    fieldClass: "input-field",
    inputClass: "form-input",
    placeholder: "usuario@gmail.com",
  });

  const retrievePasswordButton = FormButton({
    btnName: "Enviar",
    btnClass: "form-btn",
  });

  retrievePasswordForm.append(
    retrievePasswordTitle,
    splitLine,
    userEmailField,
    retrievePasswordButton
  );

  retrievePasswordBackground.append(polvoLogo, retrievePasswordForm);

  retrievePasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = userEmailField.querySelector("input");
    const email = emailInput.value.trim();

    const oldError = userEmailField.querySelector(".input-error");
    if (oldError) oldError.remove();
    emailInput.classList.remove("error");

    if (!email) {
      showInlineError(emailInput, "Informe um email válido.");
      return;
    }

    sessionStorage.setItem("resetEmail", email);
    navigateTo("#/change-password");
  });

  return retrievePasswordBackground;
}
