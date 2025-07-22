import { Toaster } from "../../../components/Toaster.js";
import { API_URL } from "../../../config/config.js";

export async function handleSubjectRegisterSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const inputs = form.querySelectorAll("input, select");

  const data = {};
  inputs.forEach((input) => {
    if (input.name) {
      if (input.name === "teacher") {
        data[input.name] = input.value
          ? JSON.parse(input.value)[0] || null
          : null;
      } else {
        data[input.name] = input.value.trim();
      }
    }
  });

  if (!data.subject || data.subject.length === 0) {
    Toaster({
      title: "Erro",
      description: "O nome da disciplina é obrigatório.",
      type: "error",
    });
    return;
  }
  if (!data.teacher) {
    Toaster({
      title: "Erro",
      description: "O professor é obrigatório.",
      type: "error",
    });
    return;
  }

  const payload = {
    name: data.subject,
    teacher: data.teacher,
  };

  try {
    const response = await fetch(`${API_URL}/subjects`, {
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
        description: "Disciplina cadastrada com sucesso.",
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
