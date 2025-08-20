export function TextareaInputField({ placeholder, name }) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("question-input-field");

  const textarea = document.createElement("textarea");
  textarea.classList.add("register-textarea");
  textarea.placeholder = placeholder;
  textarea.name = name;

  wrapper.appendChild(textarea);
  return wrapper;
}
