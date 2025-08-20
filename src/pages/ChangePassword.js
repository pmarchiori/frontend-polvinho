import { FormButton } from "../components/Buttons/FormButton.js";
import { TextInputField } from "../components/Inputs/TextInputField.js";
import { Title } from "../components/Title.js";

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

  changePasswordForm.appendChild(changePasswordTitle);
  changePasswordForm.appendChild(splitLine);
  changePasswordForm.appendChild(newPasswordField);
  changePasswordForm.appendChild(confirmNewPasswordField);
  changePasswordForm.appendChild(changePasswordButton);

  changePasswordBackground.appendChild(polvoLogo);
  changePasswordBackground.appendChild(changePasswordForm);

  return changePasswordBackground;
}
