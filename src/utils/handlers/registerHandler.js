import { isValidEmail } from "../validators.js";
import { Toaster } from "../../components/Toaster.js";

export async function handleRegisterSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const inputs = form.querySelectorAll("input, select");

  const data = {};
  inputs.forEach((input) => {
    if (input.name) {
      data[input.name] = input.value.trim();
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
    subject: data.subject || null,
  };

  try {
    const response = await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      Toaster({
        title: "Sucesso!",
        description: "Aluno cadastrado com sucesso.",
        type: "success",
      });
      form.reset();
    } else {
      Toaster({
        title: "Erro",
        description: result.error || "Algo deu errado.",
        type: "error",
      });
    }
  } catch (error) {
    console.error("Erro:", error);
    Toaster({
      title: "Erro",
      description: "Não foi possível conectar com o servidor.",
      type: "error",
    });
  }
}
