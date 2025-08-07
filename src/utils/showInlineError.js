export function showInlineError(input, message) {
  input.classList.add("error");

  if (input.classList.contains("select-input")) {
    const selectContainer = input.closest(".select-container");
    if (selectContainer) {
      selectContainer.classList.add("error");
    }
  }

  const parent = input.closest(".input-field");
  if (!parent) return;

  const errorMsg = document.createElement("div");
  errorMsg.className = "input-error";
  errorMsg.textContent = message;

  parent.appendChild(errorMsg);
}
