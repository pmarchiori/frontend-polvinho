export async function fetchWithAuth(url, options = {}) {
  const authToken = localStorage.getItem("authToken");

  const headers = {
    Authorization: `Bearer ${authToken}`,
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    headers,
  };

  const res = await fetch(url, config);

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      console.warn("Token inválido ou acesso negado");
    }

    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Erro na requisição");
  }

  return res.json();
}
