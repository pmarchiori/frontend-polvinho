export function SelectInputField({
  label,
  fieldClass,
  inputClass,
  placeholder,
  disciplines,
  name,
  multiple = false,
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
  select.classList.add(inputClass);
  select.name = name;
  if (multiple) {
    select.multiple = true;
  }

  const dropdownIcon = document.createElement("img");
  dropdownIcon.src = "/assets/caret-down-dark.svg";
  dropdownIcon.alt = "Abrir lista";
  dropdownIcon.classList.add("dropdown-icon");

  if (!multiple) {
    const placeholderOption = document.createElement("option");
    placeholderOption.textContent = "Selecione uma disciplina";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    select.appendChild(placeholderOption);
  }

  disciplines.forEach((discipline) => {
    const option = document.createElement("option");
    option.value = discipline._id;
    option.textContent = discipline.name;
    select.appendChild(option);
  });

  inputWrapper.appendChild(select);
  inputWrapper.appendChild(dropdownIcon);

  selectInputField.appendChild(inputLabel);
  selectInputField.appendChild(inputWrapper);

  selectInputField.select = select;

  return selectInputField;
}
