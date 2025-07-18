import { Toaster } from "../../../components/Toaster.js";
import { fetchSubjectById } from "./subjectHandler.js";
import { API_URL } from "../../../config/config.js";

export async function loadSubjectData(subjectId, inputs, setOriginalValues) {
  try {
    const subject = await fetchSubjectById(subjectId);
    inputs.name.value = subject.name || "";
    inputs.teacher.value = subject.teacher || "";

    setOriginalValues({
      name: subject.name || "",
      teacher: subject.teacher || "",
    });
  } catch (err) {
    Toaster({
      title: "Erro",
      description: "Erro ao carregar dados da disciplina.",
      type: "error",
    });
  }
}

export function hasSubjectChanges(inputs, originalValues) {
  return (
    inputs.name.value !== originalValues.name ||
    inputs.teacher.value !== originalValues.teacher
  );
}

export async function submitSubjectEdit(subjectId, inputs, originalValues) {
  const updatedSubject = {
    name: inputs.name.value,
    teacher: inputs.teacher ? inputs.teacher.value : null,
  };

  try {
    const res = await fetch(`${API_URL}/subjects/${subjectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSubject),
    });

    if (!res.ok) throw new Error("Erro ao atualizar disciplina");

    Toaster({
      title: "Sucesso!",
      description: `Alterações salvas da disciplina ${inputs.name.value}!`,
      type: "success",
    });

    window.location.hash = "#/subjects";
  } catch (err) {
    console.error("Erro ao atualizar disciplina:", err);
    Toaster({
      title: "Erro",
      description: "Erro ao atualizar disciplina.",
      type: "error",
    });
  }
}
