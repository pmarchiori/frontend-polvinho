import { fetchUserById } from "./userHandler.js";
import { Toaster } from "../../../components/Toaster.js";
import { API_URL } from "../../../config/config.js";

export async function loadUserData(userId, inputs, setOriginalValues) {
  try {
    const user = await fetchUserById(userId);
    inputs.name.value = user.name || "";
    inputs.registration.value = user.registration || "";
    inputs.email.value = user.email || "";

    if (
      inputs.subjects &&
      inputs.subjects.multiple &&
      Array.isArray(user.subjects)
    ) {
      Array.from(inputs.subjects.options).forEach((option) => {
        option.selected = user.subjects.some(
          (subj) => subj._id === option.value
        );
      });
    }

    setOriginalValues({
      name: user.name || "",
      registration: user.registration || "",
      email: user.email || "",
      subjects: Array.isArray(user.subjects)
        ? user.subjects.map((s) => s._id)
        : [],
    });
  } catch (err) {
    Toaster({
      title: "Erro",
      description: "Erro ao carregar dados do usuário.",
      type: "error",
    });
  }
}

export function hasUserChanges(inputs, originalValues) {
  const selectedSubjects =
    inputs.subjects && inputs.subjects.multiple
      ? Array.from(inputs.subjects.selectedOptions).map((opt) => opt.value)
      : [inputs.subjects.value];

  const originalSubjects = originalValues.subjects || [];
  const subjectsChanged =
    selectedSubjects.length !== originalSubjects.length ||
    selectedSubjects.some((val, idx) => val !== originalSubjects[idx]);

  return (
    inputs.name.value !== originalValues.name ||
    inputs.registration.value !== originalValues.registration ||
    inputs.email.value !== originalValues.email ||
    subjectsChanged
  );
}

export async function submitUserEdit(userId, inputs, originalValues) {
  const updatedUser = {
    name: inputs.name.value,
    registration: inputs.registration.value,
    email: inputs.email.value,
    subjects:
      inputs.subjects && inputs.subjects.multiple
        ? Array.from(inputs.subjects.selectedOptions).map((opt) => opt.value)
        : [inputs.subjects.value],
  };

  if (updatedUser.registration === originalValues.registration) {
    delete updatedUser.registration;
  }

  try {
    const res = await fetch(`${API_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    if (!res.ok) throw new Error("Erro ao atualizar usuário");

    Toaster({
      title: "Sucesso!",
      description: `Alterações salvas do usuário ${inputs.name.value}!`,
      type: "success",
    });

    window.location.hash = "#/students";
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    Toaster({
      title: "Erro",
      description: "Erro ao atualizar usuário.",
      type: "error",
    });
  }
}
