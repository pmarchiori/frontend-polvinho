export function InputField({ label, inputType, fieldClass, inputClass }) {
  const inputField = document.createElement("div");
  inputField.classList.add(fieldClass);

  const inputLabel = document.createElement("label");
  inputLabel.textContent = label;
  inputLabel.classList.add("textMd");
  inputLabel.style.color = "var(--stone-900)";

  const input = document.createElement("input");
  input.type = inputType;
  input.classList.add(inputClass);

  inputField.appendChild(inputLabel);
  inputField.appendChild(input);

  return inputField;
}
