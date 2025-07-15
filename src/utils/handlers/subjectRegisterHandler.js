const API_URL = "http://localhost:8000";

export async function createSubjectHandler(data) {
  try {
    const res = await fetch(`${API_URL}/subjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || "Erro ao cadastrar disciplina");
    }

    const result = await res.json();
    return result;
  } catch (err) {
    console.error("Erro ao cadastrar disciplina:", err);
    throw err;
  }
}
