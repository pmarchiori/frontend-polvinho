import { Toaster } from "../../components/Toaster.js";
import { API_URL } from "../../config/config.js";
import { fetchWithAuth } from "../../utils/fetchWithAuth.js";

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
    const result = await fetchWithAuth(`${API_URL}/subjects`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    Toaster({
      title: "Sucesso!",
      description: "Disciplina cadastrada com sucesso.",
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
