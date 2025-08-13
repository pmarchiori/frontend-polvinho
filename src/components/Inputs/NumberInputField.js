import { TextInputField } from "./TextInputField.js";

export function NumberInputField({ placeholder, name }) {
  return TextInputField({
    inputType: "number",
    fieldClass: "input-field",
    inputClass: "register-input",
    placeholder,
    name,
  });
}
