import { fetchUserById, API_URL } from "./userHandler.js";
import { Toaster } from "../../components/Toaster.js";

export async function loadUserData(userId, inputs, setOriginalValues) {
  try {
    const user = await fetchUserById(userId);
    inputs.name.value = user.name || "";
    inputs.registration.value = user.registration || "";
    inputs.email.value = user.email || "";
    inputs.subject.value = user.subject?._id || "";

    setOriginalValues({
      name: user.name || "",
      registration: user.registration || "",
      email: user.email || "",
      subject: user.subject?._id || "",
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
  return (
    inputs.name.value !== originalValues.name ||
    inputs.registration.value !== originalValues.registration ||
    inputs.email.value !== originalValues.email ||
    inputs.subject.value !== originalValues.subject
  );
}

export async function submitUserEdit(userId, inputs, originalValues) {
  const updatedUser = {
    name: inputs.name.value,
    registration: inputs.registration.value,
    email: inputs.email.value,
    subject: inputs.subject.value || null,
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

    window.location.hash = "#/dashboard";
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    Toaster({
      title: "Erro",
      description: "Erro ao atualizar usuário.",
      type: "error",
    });
  }
}
