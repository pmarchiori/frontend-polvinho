export function FormButton({ btnName, btnClass }) {
  const formButton = document.createElement("button");
  formButton.type = "submit";
  formButton.textContent = btnName;
  formButton.classList.add(btnClass);
  formButton.classList.add("textMd");

  return formButton;
}
