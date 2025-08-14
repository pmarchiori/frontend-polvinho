import { Toaster } from "../../components/Toaster.js";
import { API_URL } from "../../config/config.js";
import { fetchWithAuth } from "../../utils/fetchWithAuth.js";
import { showInlineError } from "../../utils/showInlineError.js";

export async function handleQuizRegisterSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const inputs = form.querySelectorAll("input, select, textarea");

  const data = {};
  let hasError = false;

  inputs.forEach((input) => {
    const parent = input.closest(".input-field");
    if (parent) {
      const oldError = parent.querySelector(".input-error");
      if (oldError) oldError.remove();
    }

    if (input.name === "subject") {
      data[input.name] = input.value ? JSON.parse(input.value)[0] : null;
    } else {
      data[input.name] = input.value.trim();
    }
  });

  if (!data.quizName) {
    showInlineError(
      form.querySelector('input[name="quizName"]'),
      "O nome do quiz é obrigatório."
    );
    hasError = true;
  }
  if (!data.subject) {
    const subjectInput = form.querySelector('input[name="subject"]');
    if (subjectInput) {
      showInlineError(subjectInput, "A disciplina é obrigatória.");
    }
    hasError = true;
  }
  if (!data.startDate) {
    showInlineError(
      form.querySelector('input[name="startDate"]'),
      "A data de início é obrigatória."
    );
    hasError = true;
  }
  if (!data.endDate) {
    showInlineError(
      form.querySelector('input[name="endDate"]'),
      "A data de entrega é obrigatória."
    );
    hasError = true;
  }

  if (hasError) return;

  const payload = {
    name: data.quizName,
    subject: data.subject,
    description: data.instructions || "",
    duration: parseInt(data.timeLimit) || 30,
    maxAttempts: parseInt(data.attempts) || null,
    startedDate: data.startDate,
    finishedDate: data.endDate,
  };

  try {
    const result = await fetchWithAuth(`${API_URL}/quizzes`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    Toaster({
      title: "Sucesso!",
      description: "Quiz criado com sucesso.",
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
