import { isValidEmail } from "../validators.js";

export async function handleRegisterSubmit(event, emailInputField) {
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
    console.log("E-mail inválido!");
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
      console.log("Usuário cadastrado com sucesso!");
      form.reset();
    } else {
      console.log(`Erro: ${result.error}`);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    console.log("Erro ao cadastrar usuário.");
  }
}
