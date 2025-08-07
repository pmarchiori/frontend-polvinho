import { FormButton } from "../components/Buttons/FormButton.js";
import { TextInputField } from "../components/TextInputField.js";
import { Title } from "../components/Title.js";

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
    subtitle:
      "Digite seu email cadastrado e enviaremos um link para realizar a troca da sua senha :)",
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

  return retrievePasswordBackground;
}
