export function SelectInputField({
  label,
  fieldClass = "input-field",
  inputClass = "register-input",
  placeholder = "Selecione...",
  disciplines,
  name,
}) {
  const fieldWrapper = document.createElement("div");
  fieldWrapper.classList.add(fieldClass);

  const wrapper = document.createElement("div");
  wrapper.classList.add("select-wrapper", inputClass);

  const inputLabel = document.createElement("label");
  inputLabel.textContent = label;
  inputLabel.classList.add("textMd");
  inputLabel.style.color = "var(--stone-900)";

  const container = document.createElement("div");
  container.classList.add("select-container");

  const selectedTags = document.createElement("div");
  selectedTags.classList.add("selected-tags");

  const placeholderSpan = document.createElement("span");
  placeholderSpan.classList.add("placeholder");
  placeholderSpan.textContent = placeholder;
  selectedTags.appendChild(placeholderSpan);

  const toggleIcon = document.createElement("img");
  toggleIcon.src = "/assets/caret-down-dark.svg";
  toggleIcon.alt = "Abrir lista";
  toggleIcon.classList.add("dropdown-icon");

  const dropdown = document.createElement("div");
  dropdown.classList.add("dropdown", "hidden");

  disciplines.forEach((discipline) => {
    const option = document.createElement("div");
    option.classList.add("option");
    option.dataset.value = discipline._id;
    option.textContent = discipline.name;
    dropdown.appendChild(option);
  });

  let selectedValues = [];

  wrapper.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("hidden");
    toggleIcon.classList.toggle("rotated");
  });

  document.addEventListener("click", (e) => {
    if (!fieldWrapper.contains(e.target)) {
      dropdown.classList.add("hidden");
      toggleIcon.classList.remove("rotated");
    }
  });

  dropdown.addEventListener("click", (e) => {
    if (e.target.classList.contains("option")) {
      const value = e.target.dataset.value;

      if (selectedValues.includes(value)) {
        selectedValues = selectedValues.filter((v) => v !== value);
        e.target.classList.remove("selected");
      } else {
        selectedValues.push(value);
        e.target.classList.add("selected");
      }

      updateSelectedTags();
      updateHiddenInput();
    }
  });

  function updateSelectedTags() {
    selectedTags.innerHTML = "";

    if (selectedValues.length === 0) {
      selectedTags.appendChild(placeholderSpan);
      return;
    }

    selectedValues.forEach((value) => {
      const discipline = disciplines.find((d) => d._id === value);
      const tag = document.createElement("span");
      tag.classList.add("tag");
      tag.textContent = discipline.name;

      tag.addEventListener("click", () => {
        selectedValues = selectedValues.filter((v) => v !== value);
        const option = dropdown.querySelector(`[data-value="${value}"]`);
        if (option) option.classList.remove("selected");
        updateSelectedTags();
        updateHiddenInput();
      });

      selectedTags.appendChild(tag);
    });
  }

  const hiddenInput = document.createElement("input");
  hiddenInput.type = "hidden";
  hiddenInput.name = name;

  function updateHiddenInput() {
    hiddenInput.value = JSON.stringify(selectedValues);
  }

  wrapper.append(selectedTags, toggleIcon);
  container.append(wrapper, dropdown);
  fieldWrapper.append(inputLabel, container, hiddenInput);

  return fieldWrapper;
}
