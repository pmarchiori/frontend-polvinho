import { isValidEmail } from "../../utils/validators.js";
import { API_URL } from "../../config/config.js";
import { fetchWithAuth } from "../../utils/fetchWithAuth.js";
import { Toaster } from "../../components/Toaster.js";
import { showInlineError } from "../../utils/showInlineError.js";

export async function handleRegisterSubmit(event, role) {
  event.preventDefault();

  const form = event.target;
  const inputs = form.querySelectorAll("input, select");

  form.querySelectorAll(".input-error").forEach((el) => el.remove());
  form.querySelectorAll(".error").forEach((el) => el.classList.remove("error"));

  const data = {};
  let hasError = false;

  inputs.forEach((input) => {
    const name = input.name;
    const value = input.value.trim();

    if (!name) return;

    const parent = input.closest(".input-field");
    if (parent) {
      const oldError = parent.querySelector(".input-error");
      if (oldError) oldError.remove();
    }

    if (name === "email" && !isValidEmail(value)) {
      showInlineError(input, "Por favor, insira um e-mail válido.");
      hasError = true;
    } else if (value === "" && name !== "subjects") {
      showInlineError(input, "Este campo é obrigatório.");
      hasError = true;
    }

    if (name === "subjects") {
      data[name] = input.value ? JSON.parse(input.value) : [];
    } else if (input.multiple) {
      data[name] = Array.from(input.selectedOptions).map((o) => o.value);
    } else {
      data[name] = value;
    }
  });

  if (hasError) return;

  const payload = {
    name: data.name,
    email: data.email,
    registration: data.registration,
    subjects: data.subjects || [],
    role: role,
  };

  try {
    await fetchWithAuth(`${API_URL}/users`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    form.reset();

    Toaster({
      title: "Sucesso!",
      description: "Usuário cadastrado com sucesso.",
      type: "success",
    });
  } catch (error) {
    console.error("Erro:", error);
    Toaster({
      title: "Erro",
      description: error.message || "Não foi possível conectar com o servidor.",
      type: "error",
    });
  }
}
