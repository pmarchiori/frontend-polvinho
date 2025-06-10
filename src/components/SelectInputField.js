export function SelectInputField({
  label,
  fieldClass,
  inputClass,
  placeholder,
  disciplines,
}) {
  const selectInputField = document.createElement("div");
  selectInputField.classList.add(fieldClass);

  const inputLabel = document.createElement("label");
  inputLabel.textContent = label;
  inputLabel.classList.add("textMd");
  inputLabel.style.color = "var(--stone-900)";

  const inputWrapper = document.createElement("div");
  inputWrapper.classList.add("input-wrapper");

  const select = document.createElement("select");
  select.placeholder = placeholder;
  select.classList.add(inputClass);

  const placeholderOption = document.createElement("option");
  placeholderOption.textContent = placeholder;
  placeholderOption.disabled = true;
  placeholderOption.selected = true;
  select.appendChild(placeholderOption);

  disciplines.forEach((discipline) => {
    const option = document.createElement("option");
    option.value = discipline;
    option.textContent = discipline;
    select.appendChild(option);
  });

  inputWrapper.appendChild(select);

  selectInputField.appendChild(inputLabel);
  selectInputField.appendChild(inputWrapper);

  selectInputField.select = select;

  return selectInputField;
}
