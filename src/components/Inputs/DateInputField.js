import { TextInputField } from "./TextInputField.js";

export function DateInputField({ placeholder, name }) {
  return TextInputField({
    inputType: "date",
    fieldClass: "input-field",
    inputClass: "register-input",
    placeholder,
    name,
  });
}
