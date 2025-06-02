export function InputField({
  label,
  inputType,
  fieldClass,
  inputClass,
  showPasswordToggle = false,
  placeholder = "",
}) {
  const inputField = document.createElement("div");
  inputField.classList.add(fieldClass);

  const inputLabel = document.createElement("label");
  inputLabel.textContent = label;
  inputLabel.classList.add("textMd");
  inputLabel.style.color = "var(--stone-900)";

  const inputWrapper = document.createElement("div");
  inputWrapper.classList.add("input-wrapper");

  const input = document.createElement("input");
  input.type = inputType;
  input.placeholder = placeholder;
  input.classList.add(inputClass);

  inputWrapper.appendChild(input);

  if (inputType === "password" && showPasswordToggle) {
    const toggleIcon = document.createElement("img");
    toggleIcon.src = "/assets/Eye.svg";
    toggleIcon.alt = "Mostrar senha";
    toggleIcon.classList.add("toggle-password");

    toggleIcon.addEventListener("click", () => {
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      toggleIcon.src = isHidden ? "/assets/EyeSlash.svg" : "/assets/Eye.svg";
      toggleIcon.alt = isHidden ? "Ocultar senha" : "Mostrar senha";
    });

    inputWrapper.appendChild(toggleIcon);
  }

  const errorSpan = document.createElement("span");
  errorSpan.classList.add("input-error");
  errorSpan.style.display = "none";

  inputField.appendChild(inputLabel);
  inputField.appendChild(inputWrapper);
  inputField.appendChild(errorSpan);

  inputField.input = input;
  inputField.errorSpan = errorSpan;

  return inputField;
}
