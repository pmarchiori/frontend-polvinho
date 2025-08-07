import { Toaster } from "../../components/Toaster.js";
import { API_URL } from "../../config/config.js";
import { fetchWithAuth } from "../../utils/fetchWithAuth.js";
import { showInlineError } from "../../utils/showInlineError.js";

export async function handleSubjectRegisterSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const inputs = form.querySelectorAll("input, select");

  const data = {};
  let hasError = false;

  inputs.forEach((input) => {
    const parent = input.closest(".input-field");
    if (parent) {
      const oldError = parent.querySelector(".input-error");
      if (oldError) oldError.remove();
    }

    if (input.name === "teacher") {
      data[input.name] = input.value
        ? JSON.parse(input.value)[0] || null
        : null;
    } else {
      data[input.name] = input.value.trim();
    }
  });

  if (!data.subject || data.subject.length === 0) {
    const subjectInput = form.querySelector('input[name="subject"]');
    if (subjectInput) {
      showInlineError(subjectInput, "O nome da disciplina é obrigatório.");
    }

    hasError = true;
  }

  if (hasError) return;

  const payload = {
    name: data.subject,
    teacher: data.teacher || null,
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
