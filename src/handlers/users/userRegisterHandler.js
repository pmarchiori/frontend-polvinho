import { isValidEmail } from "../../utils/validators.js";
import { Toaster } from "../../components/Toaster.js";
import { API_URL } from "../../config/config.js";
import { fetchWithAuth } from "../../utils/fetchWithAuth.js";

export async function handleRegisterSubmit(event, role) {
  event.preventDefault();

  const form = event.target;
  const inputs = form.querySelectorAll("input, select");

  const data = {};
  inputs.forEach((input) => {
    if (input.name) {
      if (input.name === "subjects") {
        data[input.name] = input.value ? JSON.parse(input.value) : [];
      } else if (input.multiple) {
        data[input.name] = Array.from(input.selectedOptions).map(
          (option) => option.value
        );
      } else {
        data[input.name] = input.value.trim();
      }
    }
  });

  if (!isValidEmail(data.email)) {
    Toaster({
      title: "Email inválido",
      description: "Por favor, insira um e-mail válido.",
      type: "error",
    });
    return;
  }

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

    Toaster({
      title: "Sucesso!",
      description: "Usuário cadastrado com sucesso.",
      type: "success",
    });
    form.reset();
  } catch (error) {
    console.error("Erro:", error);
    Toaster({
      title: "Erro",
      description: error.message || "Não foi possível conectar com o servidor.",
      type: "error",
    });
  }
}
